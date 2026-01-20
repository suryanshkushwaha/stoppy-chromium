 (() => {
     let isProcessing = false;
     let countdownInterval;

     const UI_SELECTORS = {
         timer: '[data-uia="next-episode-seamless-button-draining"]',
         stop: '[data-uia="watch-credits-seamless-button"]',
         exit: '[data-uia="nfplayer-exit"]'
     };

     const createOverlay = (seconds) => {
         const div = document.createElement('div');
         div.id = 'stoppy-overlay';
         div.style = `
             position: fixed; top: 10%; right: 20px; z-index: 9999;
             background: rgba(0, 0, 0, 0.9); color: white; padding: 15px 25px;
             border-left: 4px solid #e50914; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
             border-radius: 4px; font-size: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.6);
         `;
         div.innerText = `stoppy: Redirecting in ${seconds}s...`;
         document.body.appendChild(div);
         return div;
     };

     const executeRedirect = (destination, customUrl) => {
         console.log(`stoppy: Executing redirect to ${destination}`);

         switch (destination) {
             case 'title':
                 const exitBtn = document.querySelector(UI_SELECTORS.exit);
                 if (exitBtn) {
                     exitBtn.click();
                 } else {
                     window.history.back();
                 }
                 break;

             case 'custom':
                 if (customUrl && customUrl.startsWith('http')) {
                     window.location.href = customUrl;
                 } else {
                     window.location.href = 'https://' + customUrl;
                 }
                 break;

             case 'home':
             default:
                 window.location.href = 'https://www.netflix.com/browse';
                 break;
         }
     };

     const handleIntercept = () => {
         chrome.storage.local.get(['enabled', 'delay', 'destination', 'customUrl'], (settings) => {
             const isEnabled = settings.enabled ?? true;
             if (!isEnabled) return;

             const timerBtn = document.querySelector(UI_SELECTORS.timer);
             if (timerBtn && !isProcessing) {
                 isProcessing = true;

                 // Stop the Netflix advance
                 const watchCreditsBtn = document.querySelector(UI_SELECTORS.stop);
                 if (watchCreditsBtn) watchCreditsBtn.click();

                 // Start Visual Countdown
                 let timeLeft = settings.delay ?? 5;
                 const overlay = createOverlay(timeLeft);

                 countdownInterval = setInterval(() => {
                     timeLeft -= 1;
                     if (timeLeft > 0) {
                         overlay.innerText = `stoppy: Redirecting in ${timeLeft}s...`;
                     } else {
                         clearInterval(countdownInterval);
                         overlay.remove();
                     }
                 }, 1000);

                 setTimeout(() => {
                     executeRedirect(settings.destination ?? 'home', settings.customUrl);
                     isProcessing = false;
                 }, (settings.delay ?? 5) * 1000);
             }
         });
     };

     const observer = new MutationObserver(() => handleIntercept());
     observer.observe(document.body, { childList: true, subtree: true });
 })();
