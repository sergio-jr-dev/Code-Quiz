(() => {
  let theme = 'auto';

  try {
    const serialized = localStorage.getItem('code-quiz:preferences');
    if (serialized !== null) {
      const value = JSON.parse(serialized);
      const state = value?.state;
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length === 2 &&
        value.version === 1 &&
        state &&
        typeof state === 'object' &&
        !Array.isArray(state) &&
        Object.keys(state).length === 2 &&
        ['auto', 'light', 'dark'].includes(state.theme) &&
        typeof state.soundEnabled === 'boolean'
      ) {
        theme = state.theme;
      }
    }
  } catch {
    // Storage may be unavailable; automatic follows the operating system.
  }

  if (theme === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
})();
