const statusToggle = document.getElementById('masterStatus');
const delayInput = document.getElementById('delay');
const customUrlInput = document.getElementById('customUrl');
const radios = document.getElementsByName('dest');
const settingsTitle = document.querySelector('.settings-title');
const settingsContent = document.querySelector('.settings-content');

// Function to handle the visibility of the input box
function updateVisibility() {
    const selected = document.querySelector('input[name="dest"]:checked').value;
    customUrlInput.style.display = (selected === 'custom') ? 'block' : 'none';
}

// Toggle settings collapse
let settingsExpanded = true;
settingsTitle.addEventListener('click', () => {
    settingsExpanded = !settingsExpanded;
    if (settingsExpanded) {
        settingsContent.style.maxHeight = settingsContent.scrollHeight + 'px';
        settingsTitle.textContent = '▼ Settings';
    } else {
        settingsContent.style.maxHeight = '0';
        settingsTitle.textContent = '► Settings';
    }
});

// Load saved settings
chrome.storage.local.get(['enabled', 'delay', 'destination', 'customUrl'], (res) => {
    statusToggle.checked = res.enabled ?? true;
    delayInput.value = res.delay ?? 5;
    customUrlInput.value = res.customUrl ?? '';

    if (res.destination) {
        document.querySelector(`input[name="dest"][value="${res.destination}"]`).checked = true;
    }
    updateVisibility();

    // Set initial height for settings content
    settingsContent.style.maxHeight = settingsContent.scrollHeight + 'px';
});

// Listen for radio button changes
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        chrome.storage.local.set({ destination: radio.value });
        updateVisibility();
    });
});

// Other Listeners
statusToggle.addEventListener('change', () => chrome.storage.local.set({ enabled: statusToggle.checked }));
delayInput.addEventListener('change', () => chrome.storage.local.set({ delay: parseInt(delayInput.value) }));
customUrlInput.addEventListener('input', () => chrome.storage.local.set({ customUrl: customUrlInput.value }));
