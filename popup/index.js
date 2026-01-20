import { Store } from './store.js';
import { UI } from './ui.js';
import { StatsDisplay } from '../features/time-tracker/stats.js';
import { QuotaDisplay } from '../features/daily-quota/stats.js';

// State
let settingsExpanded = true;

// Initialize
const init = async () => {
  const settings = await Store.get(['enabled', 'delay', 'customUrl', 'episodeLimit']);

  // Populate UI
  UI.elements.statusToggle.checked = settings.enabled ?? Store.DEFAULTS.enabled;
  UI.elements.delayInput.value = settings.delay ?? Store.DEFAULTS.delay;
  UI.elements.customUrlInput.value = settings.customUrl ?? '';
  UI.elements.episodeLimitInput.value = settings.episodeLimit ?? Store.DEFAULTS.episodeLimit;

  // Set initial height for transition
  UI.elements.settingsContent.style.maxHeight = UI.elements.settingsContent.scrollHeight + 'px';

  // Render Stats
  StatsDisplay.init();
  QuotaDisplay.init();
};

// Event Listeners
UI.elements.settingsTitle.addEventListener('click', () => {
  settingsExpanded = !settingsExpanded;
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

// Start
init();
