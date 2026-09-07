import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle';
import { questions } from '../data/questions';
import { validateQuestionBank } from './validateQuestionBank';

describe('current question bank', () => {
  it('keeps the 25 migrated questions valid with stable domain IDs', () => {
    expect(questions).toHaveLength(25);
    expect(new Set(questions.map(question => question.id)).size).toBe(25);
    expect(validateQuestionBank(questions)).toEqual({ valid: true, issues: [] });
    for (const question of questions) {
      expect(question.id).toMatch(/^(html|css|javascript)-[a-z0-9]+(?:-[a-z0-9]+)*-\d{3}$/);
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options.map(option => option.id)).size).toBe(4);
      expect(question.options.some(option => option.id === question.correctAnswer)).toBe(true);
      expect(question.explanation).not.toHaveLength(0);
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
