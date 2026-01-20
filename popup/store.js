export const Store = {
    get: (keys) => new Promise((resolve) => chrome.storage.local.get(keys, resolve)),
    set: (data) => new Promise((resolve) => chrome.storage.local.set(data, resolve)),

    // Use the shared source of truth
    DEFAULTS: StoppyConfig.DEFAULTS
};
