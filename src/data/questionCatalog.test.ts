import { describe, expect, it } from 'vitest';
import { questionCatalog } from './questionCatalog';
import { questions } from './questions';
import { LEVELS, SUBJECTS } from '../types/questionBank';
import { validateQuestionBank } from '../lib/validateQuestionBank';

describe('complete question catalog', () => {
  it('contains at least 180 valid questions with no unexplained editorial warnings', () => {
    expect(questionCatalog.length).toBeGreaterThanOrEqual(180);
    expect(validateQuestionBank(questionCatalog)).toEqual({ valid: true, issues: [] });
  });

  for (const subject of SUBJECTS) {
    for (const level of LEVELS) {
      it(`provides at least 20 approved ${subject}/${level} questions`, () => {
        const bank = questionCatalog.filter(question => question.subject === subject && question.level === level);
        expect(bank.length).toBeGreaterThanOrEqual(20);
        expect(validateQuestionBank(bank)).toEqual({ valid: true, issues: [] });
      });
    }
  }

  it('retains every migrated question exactly once without changing the active round', () => {
    expect(questions).toHaveLength(25);
    for (const question of questions) {
      expect(questionCatalog.filter(candidate => candidate.id === question.id)).toEqual([question]);
    }
  });

  it('has unique prompts and distinct options in each question', () => {
    const normalized = (value: unknown) => JSON.stringify(value).replace(/\s+/g, ' ').trim();
    expect(new Set(questionCatalog.map(question => normalized(question.prompt))).size).toBe(questionCatalog.length);
    for (const question of questionCatalog) {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options.map(option => normalized(option.content))).size).toBe(4);
      expect(question.id).toMatch(new RegExp(`^${question.subject}-${question.topic}-\\d{3}$`));
    }
  });
});
