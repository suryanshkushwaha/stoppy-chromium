<div align="center">
  <img src="images/icon-256.png" alt="Stoppy logo" width="180">
  <h1>stoppy</h1>
  <p><strong>skip the show, slay your day.</strong></p>
  <p>Kill Netflix autoplay at the buzzer, get a countdown, and bounce to somewhere better before the binge spiral begins.</p>
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

**Stoppy** is a tiny, loud, zero-backend Chrome/Edge/Brave/Arc extension that body-checks Netflix's autoplay. When the "Next Episode" timer shows up, Stoppy taps the brakes, gives you a countdown, and punts you to somewhere better before the binge spiral begins.

---

## ✨ Highlights
- Stops Netflix autoplay at the exact countdown moment
- Redirect anywhere: Netflix home, the current title, or any custom URL
- Adjustable delay so you can change your mind mid-countdown
- One-click master toggle in the popup
- No accounts, no analytics, all local storage

## 🌍 Browser Support
- Chrome
- Brave
- Microsoft Edge
- Opera
- Arc
- Any Chromium-based browser

Looking for Safari? Check out [stoppy-safari](https://github.com/suryanshkushwaha/stoppy-safari/).

## 🎬 How Stoppy Runs the Play
1. You're watching Netflix and the episode ends.
2. The "Next Episode" countdown appears.
3. Stoppy hits "Watch Credits" to kill the autoplay.
4. A toast shows: *"Stoppy: Redirecting in 5s..."*
5. You get redirected to the spot you picked.

## 🧭 Settings (popup)
- **Master Status** — On/off instantly.
- **Delay** — 1-60s before redirect.
- **Destination** — Choose your exit:
  - 🏠 **Home** — Netflix browse page (default)
  - 🎬 **Title** — Back to the show you were on
  - 🔗 **Custom** — Any URL (e.g. `productivity-app.com`, `your-gym-schedule.com`)

## 🗄️ Storage Map
- `enabled` — Boolean, is Stoppy on?
- `delay` — Number, seconds before redirect
- `destination` — `'home' | 'title' | 'custom'`
- `customUrl` — String, where to go on custom

## ✅ Features in Plain English
- Netflix-only scope so nothing else is touched
- Lightweight and fast
- Privacy-first: 100% local storage, zero network calls
- Visual countdown so you always know what's happening
- Built to handle current Netflix UI selectors gracefully

## 🛠️ Troubleshooting
**Extension not working?**
- Make sure it's enabled in the popup.
- Verify you're on `netflix.com`.
- Pop open DevTools (`Cmd+Option+I`) and check the console.

**No redirect?**
- Confirm the destination setting.
- If Netflix tweaked their DOM, try a fresh tab and report an issue.

**Settings not sticking?**
- Check extension storage permissions.
- Toggle off/on once.

## 🤝 Contributing
Spotted a bug or have an idea? Open an issue or PR—friendly reviews await.

## 📄 License
MIT

---

Built with pure spite for autoplay (and a little love for your free time).