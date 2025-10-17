// Content script: applies playback rate to video elements on YouTube and keeps it applied across SPA navigations.
const APPLY_KEY = 'ytAccelerator_appliedSpeed';

// Apply speed to all videos on page
function applySpeedToAll(speed){
  const vids = document.querySelectorAll('video');
  vids.forEach(v => {
    try {
      v.playbackRate = Number(speed);
    } catch(e){}
  });
}

// Try to read saved speed from chrome.storage and apply
function applySavedSpeed(){
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['ytAcceleratorSpeed'], (res)=>{
      const s = res.ytAcceleratorSpeed;
      if (s) {
        applySpeedToAll(s);
        // save recent applied to sessionStorage for quick checks
        try { sessionStorage.setItem(APPLY_KEY, String(s)); } catch(e){}
      }
    });
  }
}

// Listen to messages from popup
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.type === 'setSpeed') {
      applySpeedToAll(msg.speed);
      try { sessionStorage.setItem(APPLY_KEY, String(msg.speed)); } catch(e){}
      sendResponse && sendResponse({ok: true});
    }
  });
}

// Watch for new video elements (YouTube uses SPA navigation)
const observer = new MutationObserver((mutations)=>{
  // If videos are added or navigation happened, re-apply saved speed
  const vids = document.querySelectorAll('video');
  if (vids.length) {
    // small debounce
    clearTimeout(window.__ytAccelTimer);
    window.__ytAccelTimer = setTimeout(()=>{
      // prefer sessionStorage applied speed if available
      let s = null;
      try { s = sessionStorage.getItem(APPLY_KEY); } catch(e){}
      if (s) {
        applySpeedToAll(Number(s));
      } else {
        applySavedSpeed();
      }
    }, 150);
  }
});

observer.observe(document, {childList:true, subtree:true});

// Initial attempt
applySavedSpeed();

// Also poll for video elements (fallback)
let pollCount = 0;
const pollInterval = setInterval(()=>{
  const vids = document.querySelectorAll('video');
  if (vids.length) {
    // apply stored/session speed if any
    let s = null;
    try { s = sessionStorage.getItem(APPLY_KEY); } catch(e){}
    if (s) applySpeedToAll(Number(s));
    clearInterval(pollInterval);
  }
  pollCount++;
  if (pollCount > 80) clearInterval(pollInterval);
}, 300);
