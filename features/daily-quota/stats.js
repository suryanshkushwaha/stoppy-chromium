export const QuotaDisplay = {
  STORAGE_KEY: 'stoppy_daily_quota',

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
    const quotaEl = document.getElementById('quota-count');
    const quotaLimitEl = document.getElementById('quota-limit');

    if (!quotaEl || !quotaLimitEl) return;

    // Fetch Data
    chrome.storage.local.get([this.STORAGE_KEY, 'episodeLimit'], (result) => {
      const data = result[this.STORAGE_KEY];
      const today = new Date().toLocaleDateString();
      const limit = result.episodeLimit ?? 1;

      let episodesWatched = 0;

      if (data && data.date === today) {
        episodesWatched = data.episodesWatched || 0;
      }

      // Update UI
      quotaEl.textContent = episodesWatched;
      quotaLimitEl.textContent = limit;
    });
  },
};
