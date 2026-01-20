const TimeTracker = {
    // Configuration
    STORAGE_KEY: 'stoppy_stats',
    SAVE_INTERVAL_MS: 1000, // Save every second for live updates

    // State
    stats: {
        date: null,
        watchedSeconds: 0,
        browsedSeconds: 0
    },

    // Helpers
    getDateString: () => new Date().toLocaleDateString(),

    isWatching: () => window.location.pathname.includes('/watch/'),

    isActive: () => document.hasFocus() && !document.hidden,

    // Methods
    async load() {
        return new Promise(resolve => {
            chrome.storage.local.get([this.STORAGE_KEY], (result) => {
                const data = result[this.STORAGE_KEY];
                const today = this.getDateString();

                if (data && data.date === today) {
                    this.stats = data;
                } else {
                    // Reset for new day
                    this.stats = {
                        date: today,
                        watchedSeconds: 0,
                        browsedSeconds: 0
                    };
                    this.save();
                }
                resolve();
            });
        });
    },

    save() {
        chrome.storage.local.set({ [this.STORAGE_KEY]: this.stats });
    },

    start() {
        this.load().then(() => {
            setInterval(() => {
                // Only track if tab is active/focused
                if (!this.isActive()) return;

                if (this.isWatching()) {
                    this.stats.watchedSeconds++;
                } else {
                    this.stats.browsedSeconds++;
                }

                // Check for day change
                const today = this.getDateString();
                if (this.stats.date !== today) {
                    this.stats = {
                        date: today,
                        watchedSeconds: 0,
                        browsedSeconds: 0
                    };
                }

            }, 1000);

            // Periodically save to storage
            setInterval(() => this.save(), this.SAVE_INTERVAL_MS);

            // Save on exit
            window.addEventListener('beforeunload', () => this.save());
        });
    }
};

// Start tracking
if (window.location.hostname.includes('netflix')) { // Double check we are on Netflix
    TimeTracker.start();
}
