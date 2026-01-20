<div align="center">
  <img src="images/icon-256.png" alt="Stoppy logo" width="180">
  <h1>stoppy</h1>
  <p><strong>because you can't be trusted.</strong></p>
  <p>Kill Netflix autoplay at the buzzer, track your watch time, set daily limits, and bounce to somewhere better before the binge spiral begins.</p>
</div>

<div align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/Privacy-Local%20Only-brightgreen?style=for-the-badge" alt="Privacy: Local Only">
  <img src="https://img.shields.io/badge/Platform-Netflix-red?style=for-the-badge" alt="Platform: Netflix">
  <img src="https://img.shields.io/badge/Browser-Chromium%20family-orange?style=for-the-badge&logo=google-chrome" alt="Chromium browsers supported">
</div>

<div align="center">
  <a href="https://github.com/suryanshkushwaha/stoppy-safari"><img src="https://img.shields.io/badge/Safari%20users-Get%20stoppy--safari-0A84FF?style=for-the-badge&logo=safari" alt="Get stoppy-safari"></a>
</div>

**Stoppy** is a tiny, loud, zero-backend Chrome/Edge/Brave/Arc extension that body-checks Netflix's autoplay and helps you take control of your watch time. When the "Next Episode" timer shows up, Stoppy taps the brakes, gives you a countdown, and redirects you away. Plus, track your watching habits, set daily episode limits, and control video playback speed to stay mindful.

---

## ✨ Highlights

- **Autoplay Interception** - Stops Netflix autoplay at the exact countdown moment
- **Time Tracking** - See how much time you spend watching vs. browsing Netflix
- **Daily Episode Budget** - Set a limit on episodes per day; get automatically redirected when you hit your limit
- **Playback Speed Control** - Adjust video playback speed from 0.25x to 10x with persistent settings
- **Custom Redirect** - Redirect to any URL after an episode ends (e.g., productivity app, gym schedule)
- **Adjustable Delay** - Change the countdown timer (0-60 seconds) before redirect
- **Real-time Stats** - View today's watched time, browsed time, and episode count in the popup
- **One-click Master Toggle** - Enable/disable the extension instantly
- **Privacy-First** - No accounts, no analytics, 100% local storage

## 🌍 Browser Support

- Chrome
- Brave
- Microsoft Edge
- Opera
- Arc
- Any Chromium-based browser

Looking for Safari? Check out [stoppy-safari](https://github.com/suryanshkushwaha/stoppy-safari/).

## 📥 Installation

### Quick Install

1. **[Download the latest release](https://github.com/suryanshkushwaha/stoppy-chromium/releases/download/v1.2.0/stoppy-v1.2.0.zip)** (stoppy-v1.2.0.zip)
2. **Unzip** the file to a folder on your computer
3. **Open your browser's extension page:**
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Brave: `brave://extensions`
   - Arc: `arc://extensions`
   - Opera: `opera://extensions`
4. **Enable "Developer mode"** (toggle in the top-right corner)
5. **Click "Load unpacked"** and select the unzipped stoppy folder
6. **Done!** The Stoppy icon should appear in your toolbar

> 💡 **Tip:** Pin the extension to your toolbar for quick access to settings and stats.

## 🎬 How Stoppy Works

1. You're watching Netflix and the episode ends
2. The "Next Episode" countdown appears
3. Stoppy increments your episode counter and checks your daily limit
4. If you haven't exceeded your limit:
   - Stoppy hits "Watch Credits" to kill the autoplay
   - A countdown overlay appears: _"Redirecting in 5s..."_
   - After the delay, you get redirected to your chosen destination
5. If you've hit your episode limit:
   - Stoppy automatically redirects you away from the watch page
   - Your daily counter resets at midnight
6. Meanwhile, Stoppy tracks your watching and browsing time in the background

## 🧭 Settings & Features

### Master Toggle

Turn Stoppy on or off instantly from the popup.

### Time Tracking Stats

The popup displays real-time statistics for today:

- **Watched** - Total time spent watching video content (while video is actively playing)
- **Browsed** - Total time spent browsing Netflix (on pages other than /watch/)
- **Episodes** - Current episode count vs. your daily limit (e.g., "2/3")

Stats reset automatically at midnight each day.

### Daily Episode Budget

Set a maximum number of episodes you want to watch per day (1-20 episodes). Once you reach your limit:

- The extension won't intercept the autoplay countdown
- If you try to watch another episode, you'll be automatically redirected
- Your counter resets at midnight

### Playback Speed Control

Control how fast or slow videos play on Netflix:

- **Speed Range** - Adjust from 0.25x (slow motion) to 10x (ultra fast)
- **Dual Controls** - Use the slider for quick adjustments or number input for precise speed
- **Persistent Settings** - Your speed preference is saved and applies automatically to all videos
- **Bidirectional Sync** - Changes sync between the extension popup and Netflix's built-in speed menu
- **Continuous Enforcement** - Speed is maintained even if Netflix tries to reset it

Perfect for speeding through content you want to watch quickly or slowing down for detailed viewing.

### Redirect Settings

- **Custom URL** - Enter any URL where you want to be redirected after an episode ends (e.g., `productivity-app.com`, `your-gym-schedule.com`)
- **Redirect Delay** - Set how many seconds (0-60) to wait before redirecting, giving you time to cancel if needed

## 🗄️ Storage Map

### Core Settings

- `enabled` — Boolean, is Stoppy on?
- `delay` — Number, seconds before redirect (default: 5)
- `customUrl` — String, where to redirect after episodes
- `episodeLimit` — Number, max episodes per day (default: 1)
- `playbackSpeed` — Number, video playback speed multiplier (default: 1, range: 0.25-10)

### Time Tracking Data

- `stoppy_time_tracker` — Object containing:
  - `date` — String, today's date
  - `watchedSeconds` — Number, seconds spent watching video content
  - `browsedSeconds` — Number, seconds spent browsing Netflix

### Daily Quota Data

- `stoppy_daily_quota` — Object containing:
  - `date` — String, today's date
  - `episodesWatched` — Number, episodes completed today

All data is stored locally in your browser. Statistics automatically reset at midnight.

## ✅ Features in Plain English

- **Netflix-only scope** — No interference with other websites
- **Lightweight and fast** — Minimal resource usage
- **Privacy-first** — 100% local storage, zero network calls, no telemetry
- **Visual countdown** — Always know when redirect is happening
- **Active tab tracking** — Time tracking only counts when Netflix tab is active/focused
- **Smart episode detection** — Only counts completed episodes (when autoplay countdown appears)
- **Daily reset** — All stats and counters reset automatically at midnight
- **Episode limit enforcement** — Automatically prevents watching beyond your daily budget
- **Custom playback speeds** — Control video speed from 0.25x to 10x with persistent settings
- **Bidirectional speed sync** — Extension and Netflix speed menus stay in sync
- **Handles Netflix UI changes gracefully** — Built with current Netflix DOM selectors

## 🛠️ Troubleshooting

**Extension not working?**

- Make sure it's enabled in the popup
- Verify you're on `netflix.com`
- Check that you haven't exceeded your daily episode limit
- Open DevTools (`Cmd+Option+I` on Mac, `F12` on Windows/Linux) and check the console for errors

**No redirect?**

- Confirm the custom URL setting is configured
- Verify the delay isn't set too high
- If Netflix changed their DOM structure, try refreshing the page and report an issue

**Stats not updating?**

- Make sure the Netflix tab is active and focused (tracking only works when tab is visible)
- For watch time: video must be actively playing (not paused)
- Check extension storage permissions in browser settings

**Settings not sticking?**

- Check extension storage permissions
- Try toggling the extension off and on once
- Clear browser cache and reload the extension

**Hit episode limit but want to watch more?**

- Increase your episode limit in the settings
- Or wait until midnight when the counter resets
- Or temporarily disable Stoppy using the master toggle

**Playback speed not working?**

- Make sure you're on a Netflix watch page (`/watch/`)
- Try refreshing the page to re-initialize the video element
- Check that the video element has loaded (wait for video to appear)
- Speed is continuously enforced every 500ms, so it should persist even if Netflix resets it

## 🤝 Contributing & Feature Requests

Looking to contribute? Check out the [Issues](https://github.com/suryanshkushwaha/stoppy-chromium/issues) tab for features in progress and bugs we're squashing. Have an idea? Open an issue—we'd love to hear it!

## 📄 License

MIT

---

Built with pure spite for autoplay (and a little love for your free time).
