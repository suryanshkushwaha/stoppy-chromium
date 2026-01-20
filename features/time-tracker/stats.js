export const StatsDisplay = {
  STORAGE_KEY: 'stoppy_stats',

  formatTime(seconds) {
    if (!seconds) return '0s';

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  },

  init() {
    this.render();
    // Listen for live updates
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes[this.STORAGE_KEY]) {
        this.render();
      }
    });
  },

  async render() {
    // Elements
    const watchedEl = document.getElementById('stats-watched');
    const browsedEl = document.getElementById('stats-browsed');

    if (!watchedEl || !browsedEl) return;

    // Fetch Data
    chrome.storage.local.get([this.STORAGE_KEY], (result) => {
      const data = result[this.STORAGE_KEY];
      const today = new Date().toLocaleDateString();

      let watched = 0;
      let browsed = 0;

      if (data && data.date === today) {
        watched = data.watchedSeconds || 0;
        browsed = data.browsedSeconds || 0;
      }

      // Update UI
      watchedEl.textContent = this.formatTime(watched);
      browsedEl.textContent = this.formatTime(browsed);
    });
  },
};
