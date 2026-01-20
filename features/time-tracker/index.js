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

    isWatching: () => {
        // Must be on watch URL AND content must be playing
        if (!window.location.pathname.includes('/watch/')) return false;

        const video = document.querySelector('video');
        // Check if video exists, is playing, and has data
        return video && !video.paused && !video.ended && video.readyState > 2;
    },

    // Browsing is defined as NOT being on the watch page
    isBrowsing: () => !window.location.pathname.includes('/watch/'),

    isActive: () => (document.hasFocus() && !document.hidden),

    // Methods
    async load() {
        return new Promise(resolve => {
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
        if (!chrome.runtime?.id) return;
        chrome.storage.local.set({ [this.STORAGE_KEY]: this.stats });
    },

    start() {
        const self = this;
        this.load().then(() => {
            // Use arrow function to preserve 'this' context, or bind it directly
            setInterval(() => {
                // Only track if tab is active/focused
                if (!self.isActive()) return;

                if (self.isWatching()) {
                    self.stats.watchedSeconds++;
                } else if (self.isBrowsing()) {
                    self.stats.browsedSeconds++;
                }
                // If on /watch/ but paused/locked, we track nothing

                // Check for day change
                const today = self.getDateString();
                if (self.stats.date !== today) {
                    self.stats = {
                        date: today,
                        watchedSeconds: 0,
                        browsedSeconds: 0
                    };
                }

            }, 1000);

            // Periodically save to storage
            setInterval(() => self.save(), self.SAVE_INTERVAL_MS);

            // Save on exit
            window.addEventListener('beforeunload', () => self.save());
        });
    }
};

// Start tracking
if (window.location.hostname.includes('netflix')) { // Double check we are on Netflix
    TimeTracker.start();
}
