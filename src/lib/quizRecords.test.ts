import { describe, expect, it } from 'vitest';

import { questionCatalog } from '../data/questionCatalog';
import type { QuizState } from '../types/quizStore';
import { quizConfigurationKey, recordBestResult, selectBestResult } from './quizRecords';

const completedState = (score: number, overrides: Partial<QuizState> = {}): QuizState => {
  const round = questionCatalog
    .filter((question) => question.subject === 'css' && question.level === 'intermediate')
    .slice(0, 10);

  return {
    configuration: { subject: 'css', level: 'intermediate' },
    round,
    roundSource: 'configured',
    currentQuestionIndex: 9,
    answers: round.map((question, index) => ({
      questionId: question.id,
      selectedOptionId:
        index < score
          ? question.correctAnswer
          : question.options.find((option) => option.id !== question.correctAnswer)!.id,
    })),
    view: 'score',
    decks: {},
    mixedExtraSubjects: {},
    bestResults: {},
    ...overrides,
  };
};

describe('quiz best results', () => {
  it('keys records by the exact subject or mixed mode and level', () => {
    expect(quizConfigurationKey({ subject: 'html', level: 'basic' })).toBe('html:basic');
    expect(quizConfigurationKey({ subject: 'mixed', level: 'advanced' })).toBe('mixed:advanced');
  });

  it('records only a strictly better completed configured round', () => {
    const first = recordBestResult(completedState(7));
    const tie = recordBestResult(completedState(7, { bestResults: first.bestResults }));
    const worse = recordBestResult(completedState(5, { bestResults: first.bestResults }));
    const better = recordBestResult(completedState(9, { bestResults: first.bestResults }));

    expect(selectBestResult(first)).toBe(7);
    expect(tie.bestResults).toBe(first.bestResults);
    expect(worse.bestResults).toBe(first.bestResults);
    expect(selectBestResult(better)).toBe(9);
  });

  it('does not count failed-question retries as records', () => {
    const retry = completedState(10, {
      roundSource: 'incorrect-retry',
      bestResults: { 'css:intermediate': 6 },
    });

    expect(recordBestResult(retry)).toBe(retry);
    expect(selectBestResult(retry)).toBe(6);
  });
});
