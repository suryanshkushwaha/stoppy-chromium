const StoppyOverlay = {
  create: (seconds) => {
    const div = document.createElement('div');
    div.id = 'stoppy-overlay';
    div.style = `
             position: fixed; top: 10%; right: 20px; z-index: 99999;
             background: rgba(0, 0, 0, 0.9); color: white; padding: 15px 25px;
             border-left: 4px solid #e50914; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
             border-radius: 4px; font-size: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.6);
         `;
    div.innerText = `stoppy: Redirecting in ${seconds}s...`;

    // Append to fullscreen element if in fullscreen, otherwise to body
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement;
    const container = fullscreenElement || document.body;
    container.appendChild(div);

    return div;
  },

  update: (element, seconds) => {
    if (element) {
      element.innerText = `stoppy: Redirecting in ${seconds}s...`;
    }
  },

  remove: (element) => {
    if (element) element.remove();
  },

  // Create full screen overlay with episode count and action buttons
  createEpisodeWarning: (currentCount, episodeLimit, seconds, onContinue, onCancel) => {
    const overlay = document.createElement('div');
    overlay.id = 'stoppy-episode-overlay';
    overlay.style = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    `;

    const content = document.createElement('div');
    content.style = `
      text-align: center;
      color: white;
      max-width: 500px;
      padding: 40px;
    `;

    const title = document.createElement('h1');
    title.style = `
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #e50914;
    `;
    title.innerText = 'stoppy';

    const message = document.createElement('p');
    message.id = 'stoppy-episode-message';
    message.style = `
      font-size: 20px;
      line-height: 1.5;
      margin-bottom: 30px;
      color: #ffffff;
    `;
    message.innerHTML = `You have watched <strong style="color: #e50914;">${currentCount}</strong> episode${currentCount !== 1 ? 's' : ''} out of <strong style="color: #e50914;">${episodeLimit}</strong>.<br><br>Continuing to next episode in <span id="stoppy-countdown" style="color: #e50914; font-weight: 700;">${seconds}</span> seconds`;

    const buttonContainer = document.createElement('div');
    buttonContainer.style = `
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;
    `;

    const continueBtn = document.createElement('button');
    continueBtn.innerText = 'Continue';
    continueBtn.style = `
      background: #e50914;
      color: white;
      border: none;
      padding: 15px 40px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    `;
    continueBtn.onmouseover = () => (continueBtn.style.background = '#f40612');
    continueBtn.onmouseout = () => (continueBtn.style.background = '#e50914');
    continueBtn.onclick = onContinue;

    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = 'Cancel';
    cancelBtn.style = `
      background: transparent;
      color: white;
      border: 2px solid white;
      padding: 15px 40px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    `;
    cancelBtn.onmouseover = () => {
      cancelBtn.style.background = 'white';
      cancelBtn.style.color = 'black';
    };
    cancelBtn.onmouseout = () => {
      cancelBtn.style.background = 'transparent';
      cancelBtn.style.color = 'white';
    };
    cancelBtn.onclick = onCancel;

    buttonContainer.appendChild(continueBtn);
    buttonContainer.appendChild(cancelBtn);

    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(buttonContainer);
    overlay.appendChild(content);

    // Append to fullscreen element if in fullscreen, otherwise to body
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement;
    const container = fullscreenElement || document.body;
    container.appendChild(overlay);

    return overlay;
  },

  updateEpisodeWarning: (seconds) => {
    const countdown = document.getElementById('stoppy-countdown');
    if (countdown) {
      countdown.innerText = seconds;
    }
  },

  removeEpisodeWarning: () => {
    const overlay = document.getElementById('stoppy-episode-overlay');
    if (overlay) overlay.remove();
  },
};
