import { describe, expect, it } from 'vitest';

import { questionCatalog } from '../data/questionCatalog';
import type { QuizState } from '../types/quizStore';
import {
  quizConfigurationKey,
  recordBestResult,
  selectBestResult,
  selectBestResultForConfiguration,
} from './quizRecords';

const completedState = (score: number, overrides: Partial<QuizState> = {}): QuizState => {
  const round = questionCatalog
    .filter((question) => question.subject === 'css' && question.level === 'intermediate')
    .slice(0, 10);

  return {
    mode: 'normal',
    timer: null,
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
    expect(quizConfigurationKey({ subject: 'html', level: 'basic' }, 'timed')).toBe(
      'html:basic:timed',
    );
  });

  it('keeps normal and timed records separate for the same configuration', () => {
    const normal = recordBestResult(completedState(7));
    const timed = recordBestResult(
      completedState(9, {
        mode: 'timed',
        bestResults: normal.bestResults,
      }),
    );

    expect(selectBestResult(normal)).toBe(7);
    expect(selectBestResult(timed)).toBe(9);
    expect(timed.bestResults).toEqual({
      'css:intermediate': 7,
      'css:intermediate:timed': 9,
    });
  });

  it('reads an explicit configuration and mode without interpreting other record keys', () => {
    const bestResults = { 'html:basic': 0, 'html:basic:timed': 8, 'css:basic': 5 };

    expect(
      selectBestResultForConfiguration(bestResults, { subject: 'html', level: 'basic' }, 'normal'),
    ).toBe(0);
    expect(
      selectBestResultForConfiguration(bestResults, { subject: 'html', level: 'basic' }, 'timed'),
    ).toBe(8);
    expect(
      selectBestResultForConfiguration(
        bestResults,
        { subject: 'mixed', level: 'advanced' },
        'normal',
      ),
    ).toBeUndefined();
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
