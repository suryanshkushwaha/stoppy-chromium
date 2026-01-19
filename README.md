# 🛑 stoppy

> skip the show, slay your day.

**Stoppy** is a Chrome extension that takes control of Netflix's autoplay feature. When that "next episode" countdown appears, Stoppy kicks in and redirects you before you can fall down another binge rabbit hole. Because sometimes you need a little help saying no.

## Why Stoppy?

Netflix's autoplay is designed to keep you scrolling endlessly. Stoppy gives you back control by:

- ⏱️ **Intercepting the autoplay countdown** — Catches Netflix right before it advances to the next episode
- 🎯 **Flexible redirection** — Choose where you go: Netflix home, back to the title page, or any custom URL
- ⏰ **Customizable delay** — Set how many seconds you want before the redirect happens (your last chance to change your mind)
- 🎮 **Toggle on/off instantly** — Enable/disable in one click through the popup

## How It Works

### The Flow
1. You're watching Netflix and an episode ends
2. The "Next Episode" countdown appears in the corner
3. Stoppy detects this and clicks "Watch Credits" to stop the autoplay
4. A notification appears: *"Stoppy: Redirecting in 5s..."*
5. You're redirected (or you can manually escape it)

### Settings

Click the Stoppy icon in your toolbar to access the popup:

- **Master Status** — Toggle the extension on/off
- **Delay** — How many seconds before redirect (1-60 seconds)
- **Destination** — Where to go when triggered:
  - 🏠 **Home** — Netflix browse page (default)
  - 🎬 **Title** — Back to the show you were watching
  - 🔗 **Custom** — Any URL you want (e.g., `productivity-app.com`, `your-gym-schedule.com`)

## Configuration

All settings are saved to Chrome local storage and persist across sessions. No servers, no tracking, just local storage.

### Storage Keys
- `enabled` — Extension enabled state (boolean)
- `delay` — Redirect delay in seconds (number)
- `destination` — Where to redirect: `'home'`, `'title'`, or `'custom'` (string)
- `customUrl` — Custom redirect URL (string)

## Features

✅ Netflix-focused — Only runs on Netflix URLs
✅ Lightweight — Minimal performance impact
✅ Privacy-first — No data collection, all local storage
✅ Customizable — 3 built-in destinations + custom URLs
✅ Visual feedback — See the countdown before redirect
✅ Graceful handling — Works with Netflix's current UI selectors

## Troubleshooting

**Extension not working?**
- Check that it's enabled in the popup
- Verify you're on a Netflix page (it only works on `netflix.com`)
- Open DevTools (`Cmd+Option+I`) and check the console for errors

**Redirect isn't happening?**
- Confirm your destination is set correctly
- If using custom URL, make sure it starts with `http://` or `https://`
- Netflix may have updated their selectors—check if the issue exists in fresh tab

**Settings not saving?**
- Check Chrome extension storage permissions
- Try disabling and re-enabling the extension

## Contributing

Found a bug? Have ideas? Feel free to open an issue or PR.

## License

MIT 

---

**Built with ❤️ and spite for Netflix's autoplay.**