import { describe, expect, it } from 'vitest';

import { validateQuestionBank } from '../lib/validateQuestionBank';
import { LEVELS, SUBJECTS } from '../types/questionBank';
import { cssQuestions } from './bank/css';
import { htmlQuestions } from './bank/html';
import { questionCatalog } from './questionCatalog';

const originalHtmlQuestionIds = [
  'html-images-001',
  'html-links-001',
  'html-fundamentals-001',
  'html-document-metadata-001',
  'html-lists-001',
  'html-stylesheets-001',
  'html-viewport-001',
  'html-canvas-001',
  'html-disclosure-001',
  'html-links-002',
];

const originalCssQuestionIds = [
  'css-fundamentals-001',
  'css-comments-001',
  'css-color-001',
  'css-selectors-001',
  'css-box-model-001',
  'css-flexbox-001',
  'css-custom-properties-001',
  'css-attribute-selectors-001',
  'css-visibility-001',
  'css-calc-001',
  'css-media-queries-001',
  'css-color-mix-001',
  'css-numbers-001',
  'css-opacity-001',
  'css-selector-lists-001',
];

describe('complete question catalog', () => {
  it('contains at least 180 valid questions with no unexplained editorial warnings', () => {
    expect(questionCatalog).toHaveLength(180);
    expect(validateQuestionBank(questionCatalog)).toEqual({ valid: true, issues: [] });
  });

  for (const subject of SUBJECTS) {
    for (const level of LEVELS) {
      it(`provides at least 20 approved ${subject}/${level} questions`, () => {
        const bank = questionCatalog.filter(
          (question) => question.subject === subject && question.level === level,
        );
        expect(bank.length).toBeGreaterThanOrEqual(20);
        expect(validateQuestionBank(bank)).toEqual({ valid: true, issues: [] });
      });
    }
  }

  it('keeps the original questions first in their subject modules and in relative order', () => {
    expect(htmlQuestions.slice(0, originalHtmlQuestionIds.length).map(({ id }) => id)).toEqual(
      originalHtmlQuestionIds,
    );
    expect(cssQuestions.slice(0, originalCssQuestionIds.length).map(({ id }) => id)).toEqual(
      originalCssQuestionIds,
    );

    for (const id of [...originalHtmlQuestionIds, ...originalCssQuestionIds]) {
      expect(questionCatalog.filter((question) => question.id === id)).toHaveLength(1);
    }
  });

  it('has unique prompts and distinct options in each question', () => {
    const normalized = (value: unknown) => JSON.stringify(value).replace(/\s+/g, ' ').trim();
    expect(new Set(questionCatalog.map((question) => normalized(question.prompt))).size).toBe(
      questionCatalog.length,
    );
    for (const question of questionCatalog) {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options.map((option) => normalized(option.content))).size).toBe(4);
      expect(question.id).toMatch(new RegExp(`^${question.subject}-${question.topic}-\\d{3}$`));
    }
  });
});
