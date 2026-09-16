import { describe, expect, it, vi } from 'vitest';

import { prefersReducedMotion } from './motionPreference';

describe('prefersReducedMotion', () => {
  it('reflects the active media preference', () => {
    const matchMedia = vi.mocked(window.matchMedia);
    matchMedia.mockImplementationOnce(
      (query) => ({ matches: query === '(prefers-reduced-motion: reduce)' }) as MediaQueryList,
    );

    expect(prefersReducedMotion()).toBe(true);
  });

  it('returns false when reduced motion is not requested', () => {
    const matchMedia = vi.mocked(window.matchMedia);
    matchMedia.mockImplementationOnce(() => ({ matches: false }) as MediaQueryList);

    expect(prefersReducedMotion()).toBe(false);
  });
});
