export const UI = {
  elements: {
    statusToggle: document.getElementById('masterStatus'),
    delayInput: document.getElementById('delay'),
    customUrlInput: document.getElementById('customUrl'),
    episodeLimitInput: document.getElementById('episodeLimit'),
    settingsTitle: document.querySelector('.settings-title'),
    settingsContent: document.querySelector('.settings-content'),
  },

  toggleSettings(isExpanded) {
    const { settingsContent, settingsTitle } = this.elements;
    if (isExpanded) {
      settingsContent.style.maxHeight = settingsContent.scrollHeight + 'px';
      settingsTitle.textContent = '▼ Settings';
    } else {
      settingsContent.style.maxHeight = '0';
      settingsTitle.textContent = '► Settings';
    }
  },
};
