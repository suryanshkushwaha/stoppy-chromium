(() => {
    let isProcessing = false;
    let countdownInterval;

    const handleIntercept = () => {
        chrome.storage.local.get(['enabled', 'delay'], (settings) => {
            const isEnabled = settings.enabled ?? true;
            if (!isEnabled) return;

            const timerBtn = document.querySelector(StoppyConfig.UI_SELECTORS.timer);
            // Ensure we don't start processing if already processing
            const shouldIntercept = timerBtn && !isProcessing;

            if (shouldIntercept) {
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
})();
