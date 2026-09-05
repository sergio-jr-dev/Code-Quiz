import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle';
import { questions } from '../data/questions';

describe('current question bank', () => {
  it('keeps 25 unique questions with unique options and an existing correct answer', () => {
    expect(questions).toHaveLength(25);
    expect(new Set(questions.map(question => question.id)).size).toBe(25);
    for (const question of questions) {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options.map(option => option.id)).size).toBe(4);
      expect(question.options.some(option => option.id === question.correctAnswer)).toBe(true);
      expect(question.additionalInfo.trim()).not.toBe('');
    }
  });
});

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
