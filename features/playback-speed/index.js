const PlaybackSpeed = {
  // Configuration
  STORAGE_KEY: 'playbackSpeed',
  currentSpeed: 1,
  video: null,
  observer: null,
  speedMenuObserver: null,
  isApplyingSpeed: false,

  // Get stored speed
  async getStoredSpeed() {
    return new Promise((resolve) => {
      if (!chrome.runtime?.id) {
        resolve(StoppyConfig.DEFAULTS.playbackSpeed);
        return;
      }
      chrome.storage.local.get([this.STORAGE_KEY], (result) => {
        if (chrome.runtime.lastError) {
          resolve(StoppyConfig.DEFAULTS.playbackSpeed);
          return;
        }
        const speed = result[this.STORAGE_KEY] ?? StoppyConfig.DEFAULTS.playbackSpeed;
        resolve(speed);
      });
    });
  },

  // Save speed to storage
  async saveSpeed(speed) {
    if (!chrome.runtime?.id) return;
    this.currentSpeed = speed;
    chrome.storage.local.set({ [this.STORAGE_KEY]: speed });
  },

  // Parse speed from Netflix label (e.g., "1.5x" -> 1.5, "1x (Normal)" -> 1)
  parseSpeedFromLabel(label) {
    const match = label.match(/(\d+\.?\d*)\s*x/i);
    return match ? parseFloat(match[1]) : null;
  },

  // Monitor Netflix speed menu for changes
  monitorNetflixSpeedMenu() {
    // Watch for the active speed item to change
    const checkActiveSpeed = () => {
      const activeItem = document.querySelector('[data-uia="playback-speed-item-active"]');
      if (activeItem) {
        const label = activeItem.querySelector('[data-uia="playback-speed-label"]');
        if (label) {
          const speed = this.parseSpeedFromLabel(label.textContent);
          if (speed && speed !== this.currentSpeed && !this.isApplyingSpeed) {
            console.log('stoppy: Netflix speed changed to', speed);
            this.saveSpeed(speed);
          }
        }
      }
    };

    // Check immediately
    checkActiveSpeed();

    // Watch for changes in the speed menu
    if (this.speedMenuObserver) {
      this.speedMenuObserver.disconnect();
    }

    this.speedMenuObserver = new MutationObserver(() => {
      checkActiveSpeed();
    });

    // Observe the entire document for speed menu changes
    this.speedMenuObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-uia'],
    });
  },

  // Apply speed to video element
  applySpeed(speed) {
    if (!this.video) return;
    
    this.isApplyingSpeed = true;
    this.video.playbackRate = speed;
    this.currentSpeed = speed;
    
    console.log('stoppy: Applied playback speed', speed);
    
    // Reset flag after a short delay
    setTimeout(() => {
      this.isApplyingSpeed = false;
    }, 500);
  },

  // Find and attach to video element
  findAndAttachVideo() {
    const video = document.querySelector('video');
    
    if (video && video !== this.video) {
      this.video = video;
      console.log('stoppy: Video element found');
      
      // Apply stored speed immediately
      this.getStoredSpeed().then(speed => {
        this.applySpeed(speed);
      });

      // Also apply speed when video starts playing
      video.addEventListener('playing', () => {
        this.getStoredSpeed().then(speed => {
          if (Math.abs(video.playbackRate - speed) > 0.01) {
            this.applySpeed(speed);
          }
        });
      });

      // Apply when video is loaded
      video.addEventListener('loadedmetadata', () => {
        this.getStoredSpeed().then(speed => {
          this.applySpeed(speed);
        });
      });

      // Continuously enforce speed every 500ms (in case Netflix resets it)
      setInterval(() => {
        if (!this.isApplyingSpeed && this.video) {
          this.getStoredSpeed().then(speed => {
            if (Math.abs(this.video.playbackRate - speed) > 0.01) {
              this.applySpeed(speed);
            }
          });
        }
      }, 500);
    }
  },

  // Start monitoring
  start() {
    // Monitor Netflix speed menu
    this.monitorNetflixSpeedMenu();

    // Initial attempt to find video
    this.findAndAttachVideo();

    // Watch for video element changes (Netflix dynamically loads videos)
    this.observer = new MutationObserver(() => {
      if (window.location.pathname.includes('/watch/')) {
        this.findAndAttachVideo();
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also check periodically (fallback)
    setInterval(() => {
      if (window.location.pathname.includes('/watch/')) {
        this.findAndAttachVideo();
      }
    }, 1000);

    // Listen for storage changes from popup
    chrome.storage.onChanged.addListener((changes) => {
      if (changes[this.STORAGE_KEY]) {
        const newSpeed = changes[this.STORAGE_KEY].newValue;
        if (newSpeed && this.video) {
          this.applySpeed(newSpeed);
        }
      }
    });
  },
};

// Start playback speed control
if (window.location.hostname.includes('netflix')) {
  PlaybackSpeed.start();
}
