const DailyQuota = {
  // Configuration
  STORAGE_KEY: 'stoppy_daily_quota',

  // State
  quota: {
    date: null,
    episodesWatched: 0,
  },

  // Helpers
  getDateString: () => new Date().toLocaleDateString(),

  // Methods
  async load() {
    return new Promise((resolve) => {
      if (!chrome.runtime?.id) {
        resolve();
        return;
      }
      chrome.storage.local.get([this.STORAGE_KEY], (result) => {
        if (chrome.runtime.lastError) {
          resolve();
          return;
        }
        const data = result[this.STORAGE_KEY];
        const today = this.getDateString();

        if (data && data.date === today) {
          this.quota = data;
        } else {
          // Reset for new day
          this.quota = {
            date: today,
            episodesWatched: 0,
          };
          this.save();
        }
        resolve();
      });
    });
  },

  save() {
    if (!chrome.runtime?.id) return;
    chrome.storage.local.set({ [this.STORAGE_KEY]: this.quota });
  },

  async increment() {
    await this.load();
    
    // Check for day change
    const today = this.getDateString();
    if (this.quota.date !== today) {
      this.quota = {
        date: today,
        episodesWatched: 0,
      };
    }

    this.quota.episodesWatched++;
    this.save();
  },

  async getCount() {
    await this.load();
    return this.quota.episodesWatched;
  },

  async checkLimit(limit) {
    const count = await this.getCount();
    return count >= limit;
  },
};
