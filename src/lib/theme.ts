import type { ThemePreference } from '../types/preferences';

let transitionTimeout: ReturnType<typeof setTimeout> | undefined;

export const applyTheme = (theme: ThemePreference, animate = false): void => {
  const root = document.documentElement;
  if (transitionTimeout) clearTimeout(transitionTimeout);

  const allowTransition =
    animate &&
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia?.('(forced-colors: active)').matches;

  if (allowTransition) {
    root.dataset.themeChanging = '';
    void root.offsetWidth;
    transitionTimeout = setTimeout(() => {
      delete root.dataset.themeChanging;
      transitionTimeout = undefined;
    }, 300);
  } else {
    delete root.dataset.themeChanging;
  }

  if (theme === 'auto') delete root.dataset.theme;
  else root.dataset.theme = theme;
};
