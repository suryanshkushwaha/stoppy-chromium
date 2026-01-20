(() => {
  let isProcessing = false;
  let countdownInterval;

  // Check if user is banned from watching (limit exceeded)
  const checkAndEnforceBan = async () => {
    if (!chrome.runtime?.id) return;

    const settings = await new Promise(resolve => {
      chrome.storage.local.get(['enabled', 'episodeLimit', 'customUrl'], resolve);
    });

    const isEnabled = settings.enabled ?? true;
    if (!isEnabled) return;

    const episodeLimit = settings.episodeLimit ?? StoppyConfig.DEFAULTS.episodeLimit;
    const currentCount = await DailyQuota.getCount();

    // If limit exceeded and user is on watch page, redirect them immediately
    if (currentCount > episodeLimit && window.location.pathname.includes('/watch/')) {
      StoppyActions.redirect(settings.customUrl);
    }
  };

  const handleIntercept = async () => {
    // Prevent "Extension context invalidated" error on reload
    if (!chrome.runtime?.id) return;

    chrome.storage.local.get(['enabled', 'delay', 'customUrl', 'episodeLimit'], async (settings) => {
      if (chrome.runtime.lastError) return;

      const isEnabled = settings.enabled ?? true;
      if (!isEnabled) return;

      const timerBtn = document.querySelector(StoppyConfig.UI_SELECTORS.timer);
      // Ensure we don't start processing if already processing
      const shouldIntercept = timerBtn && !isProcessing;

      if (shouldIntercept) {
        // Increment episode count first
        await DailyQuota.increment();
        
        // Check if we've now reached or exceeded the limit
        const episodeLimit = settings.episodeLimit ?? StoppyConfig.DEFAULTS.episodeLimit;
        const currentCount = await DailyQuota.getCount();
        
        // Only intercept if we're at or below the limit (redirect on hitting limit)
        if (currentCount > episodeLimit) {
          return; // Already exceeded limit, don't intercept
        }
        
        isProcessing = true;

        // 1. Stop the Netflix advance
        const watchCreditsBtn = document.querySelector(StoppyConfig.UI_SELECTORS.stop);
        if (watchCreditsBtn) watchCreditsBtn.click();

        // 2. Start Visual Countdown
        // Capture the initial delay for the timeout
        const initialDelay = settings.delay ?? StoppyConfig.DEFAULTS.delay;
        let timeLeft = initialDelay;

        const overlay = StoppyOverlay.create(timeLeft);

        countdownInterval = setInterval(() => {
          timeLeft -= 1;
          if (timeLeft > 0) {
            StoppyOverlay.update(overlay, timeLeft);
          } else {
            clearInterval(countdownInterval);
            StoppyOverlay.remove(overlay);
          }
        }, 1000);

        // 3. Execute Redirect
        setTimeout(() => {
          StoppyActions.redirect(settings.customUrl);
          isProcessing = false;
        }, initialDelay * 1000);
      }
    });
  };

  const observer = new MutationObserver(() => handleIntercept());
  observer.observe(document.body, { childList: true, subtree: true });

  // Enforce ban continuously - check every 2 seconds if user tries to watch
  setInterval(checkAndEnforceBan, 2000);
  
  // Also check on page load
  checkAndEnforceBan();
})();
