import { Store } from './store.js';
import { UI } from './ui.js';
import { StatsDisplay } from '../features/time-tracker/stats.js';
import { QuotaDisplay } from '../features/daily-quota/stats.js';

// State
let settingsExpanded = false;

// Initialize
const init = async () => {
  const settings = await Store.get([
    'enabled',
    'delay',
    'customUrl',
    'episodeLimit',
    'playbackSpeed',
  ]);

  // Set toggle state immediately without transition
  const toggleChecked = settings.enabled ?? Store.DEFAULTS.enabled;
  UI.elements.statusToggle.checked = toggleChecked;

  // Remove no-transition class after state is set to enable future transitions
  setTimeout(() => {
    document.querySelector('.switch').classList.remove('no-transition');
  }, 50);

  // Populate UI
  UI.elements.delayInput.value = settings.delay ?? Store.DEFAULTS.delay;
  UI.elements.customUrlInput.value = settings.customUrl ?? '';
  UI.elements.episodeLimitInput.value = settings.episodeLimit ?? Store.DEFAULTS.episodeLimit;

  // Set playback speed (both slider and input)
  const playbackSpeed = settings.playbackSpeed ?? Store.DEFAULTS.playbackSpeed;
  UI.elements.speedSlider.value = playbackSpeed;
  UI.elements.speedInput.value = playbackSpeed;

  // Check if this is the first time opening the extension
  const hasVisited = localStorage.getItem('stoppy-has-visited');
  const savedSettingsState = localStorage.getItem('stoppy-settings-expanded');

  if (!hasVisited) {
    // First time - open settings and mark as visited
    settingsExpanded = true;
    localStorage.setItem('stoppy-has-visited', 'true');
    localStorage.setItem('stoppy-settings-expanded', 'true');
  } else if (savedSettingsState !== null) {
    // Use saved state
    settingsExpanded = savedSettingsState === 'true';
  }

  // Apply the settings state
  UI.toggleSettings(settingsExpanded);

  // Render Stats
  StatsDisplay.init();
  QuotaDisplay.init();

  // Listen for storage changes (e.g., speed updated from Netflix UI)
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.playbackSpeed) {
      const newSpeed = changes.playbackSpeed.newValue;
      if (newSpeed) {
        UI.elements.speedSlider.value = newSpeed;
        UI.elements.speedInput.value = newSpeed;
      }
    }
  });
};

// Event Listeners
UI.elements.settingsTitle.addEventListener('click', () => {
  settingsExpanded = !settingsExpanded;
  localStorage.setItem('stoppy-settings-expanded', settingsExpanded.toString());
  UI.toggleSettings(settingsExpanded);
});

UI.elements.statusToggle.addEventListener('change', () => {
  Store.set({ enabled: UI.elements.statusToggle.checked });
});

UI.elements.delayInput.addEventListener('change', () => {
  Store.set({ delay: parseInt(UI.elements.delayInput.value) });
});

UI.elements.customUrlInput.addEventListener('input', () => {
  Store.set({ customUrl: UI.elements.customUrlInput.value });
});

UI.elements.episodeLimitInput.addEventListener('change', () => {
  Store.set({ episodeLimit: parseInt(UI.elements.episodeLimitInput.value) });
});

// Sync slider and input for playback speed
UI.elements.speedSlider.addEventListener('input', () => {
  const speed = parseFloat(UI.elements.speedSlider.value);
  UI.elements.speedInput.value = speed;
  Store.set({ playbackSpeed: speed });
});

UI.elements.speedInput.addEventListener('input', () => {
  let speed = parseFloat(UI.elements.speedInput.value);

  // Clamp value between min and max
  if (speed < 0.25) speed = 0.25;
  if (speed > 10) speed = 10;

  UI.elements.speedSlider.value = speed;
  UI.elements.speedInput.value = speed;
  Store.set({ playbackSpeed: speed });
});

// Start
init();
