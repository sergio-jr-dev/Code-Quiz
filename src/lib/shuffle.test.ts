import { describe, expect, it } from 'vitest';

import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('is reproducible, preserves entries and does not mutate its input', () => {
    const input = Object.freeze([1, 2, 3, 4]);
    expect(shuffle(input, () => 0)).toEqual([2, 3, 4, 1]);
    expect(input).toEqual([1, 2, 3, 4]);
    expect(shuffle(input, () => 0.999)).toEqual(input);
    expect(shuffle(input)).not.toBe(input);
  });

  it('handles empty and singleton inputs', () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle([1])).toEqual([1]);
  });
});
