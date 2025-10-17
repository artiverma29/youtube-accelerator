const speeds = [1.25,1.35,1.5,1.65,1.75,2,3,4,5,6,7,8,10,12,14,16];
const buttonsDiv = document.getElementById('buttons');
const status = document.getElementById('status');
const customInput = document.getElementById('customSpeed');
const applyCustom = document.getElementById('applyCustom');

function createButtons(selected){
  buttonsDiv.innerHTML = '';
  speeds.forEach(s=>{
    const btn = document.createElement('button');
    btn.className = 'speed';
    btn.textContent = s + 'x';
    btn.dataset.speed = s;
    if (String(s) === String(selected)) btn.classList.add('active');
    btn.addEventListener('click', () => {
      setSpeed(s);
      updateActive(s);
    });
    buttonsDiv.appendChild(btn);
  });
}

function updateActive(s){
  document.querySelectorAll('.speed').forEach(b=>b.classList.toggle('active', b.dataset.speed == s));
}

function setSpeed(speed){
  // send message to active tab
  chrome.tabs.query({active:true,currentWindow:true}, tabs=>{
    if (!tabs[0]) {
      status.textContent = 'No active tab found.';
      return;
    }
    chrome.tabs.sendMessage(tabs[0].id, { type: 'setSpeed', speed: Number(speed) }, resp=>{
      // optional response
    });
    // save selection
    chrome.storage.local.set({ytAcceleratorSpeed: Number(speed)}, ()=> {
      status.textContent = 'Applied ' + speed + 'x';
      setTimeout(()=> status.textContent = '', 2000);
    });
  });
}

applyCustom.addEventListener('click', ()=>{
  const val = parseFloat(customInput.value);
  if (!isFinite(val) || val <= 0) {
    status.textContent = 'Enter a valid positive number';
    return;
  }
  setSpeed(val);
  updateActive(val);
});

document.addEventListener('DOMContentLoaded', ()=>{
  chrome.storage.local.get(['ytAcceleratorSpeed'], (res)=>{
    const s = res.ytAcceleratorSpeed ?? 1.25;
    customInput.value = s;
    createButtons(s);
    updateActive(s);
  });
});
