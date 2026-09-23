import { afterEach, describe, expect, it, vi } from 'vitest';

import { applyTheme } from './theme';

describe('theme application', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    delete document.documentElement.dataset.theme;
    delete document.documentElement.dataset.themeChanging;
  });

  it('uses a temporary CSS transition only for an explicit user change', () => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));

    applyTheme('light');
    expect(document.documentElement.dataset.themeChanging).toBeUndefined();

    applyTheme('dark', true);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-theme-changing');

    vi.advanceTimersByTime(300);
    expect(document.documentElement.dataset.themeChanging).toBeUndefined();
  });

  it('omits the transition for reduced motion and forced colors', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
    }));
    applyTheme('light', true);
    expect(document.documentElement.dataset.themeChanging).toBeUndefined();

    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query === '(forced-colors: active)',
    }));
    applyTheme('dark', true);
    expect(document.documentElement.dataset.themeChanging).toBeUndefined();
  });
});
