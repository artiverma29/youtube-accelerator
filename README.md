# YouTube Accelerator

**Watch YouTube videos at lightning speed!**

Tired of YouTube's slow default speeds? **YouTube Accelerator** lets you turbocharge your video playback from **1.25x all the way up to 16x**, with a **custom speed option** to suit your pace. Perfect for binge-learning, tutorials, or just speeding through your favorite content.

---

## Features

- **Preset Speeds:** 1.25x, 1.35x, 1.5x, 1.65x, 1.75x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 10x, 12x, 14x, 16x  
- **Custom Speed:** Set any playback rate you want.  
- **Persistent Selection:** Your chosen speed is remembered and auto-applied on all YouTube pages.  
- **SPA-Friendly:** Works seamlessly across YouTube's single-page app navigation.  
- **Minimal & Stylish UI:** Quick access buttons and clean design.  

---

## Screenshots


![Popup UI](./icons/icon128.png)  

---

## How to Install (Developer Mode)

1. Download the **YouTube Accelerator.zip** and extract it.  
2. Open Chrome → `chrome://extensions/`.  
3. Enable **Developer Mode** (top-right).  
4. Click **Load unpacked** and select the extracted **YouTube Accelerator** folder.  
5. Open any YouTube video, click the extension icon, and choose your desired speed.  

---

## How It Works

- Uses a **content script** to detect all `<video>` elements on YouTube.  
- Automatically applies your saved speed across pages and new video loads.  
- Uses **MutationObserver + polling fallback** for YouTube’s SPA navigation.  

---

## Tips

- Combine with keyboard shortcuts for even faster control (coming soon!).  
- Replace icons in `/icons` with your own designs for a custom look.  
- Perfect for study sessions, tutorials, or fast-forwarding through long videos.  

---

## License

MIT License © 2025 YouTube Accelerator  

---

**Turbocharge your YouTube experience — because life is too short for 1x playback!**
