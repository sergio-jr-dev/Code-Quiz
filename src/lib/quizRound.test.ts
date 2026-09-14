import { describe, expect, it } from 'vitest';

import { questionCatalog } from '../data/questionCatalog';
import type { BankQuestion } from '../types/questionBank';
import type { QuizState } from '../types/quizStore';
import {
  isConfigurationPlayable,
  restartConfiguredQuiz,
  selectQuizLevel,
  selectQuizSubject,
  startConfiguredQuiz,
} from './quizRound';

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

const menuState = (overrides: Partial<QuizState> = {}): QuizState => ({
  configuration: { subject: 'html', level: 'basic' },
  round: [],
  currentQuestionIndex: 0,
  answers: [],
  view: 'menu',
  decks: {},
  mixedExtraSubjects: {},
  ...overrides,
});

describe('quiz round configuration', () => {
  it('only changes configuration while the menu is visible', () => {
    const state = menuState();
    const withSubject = selectQuizSubject(state, 'css');
    const withLevel = selectQuizLevel(withSubject, 'advanced');
    const playing = { ...withLevel, view: 'playing' as const };

    expect(withLevel.configuration).toEqual({ subject: 'css', level: 'advanced' });
    expect(selectQuizSubject(withLevel, 'css')).toBe(withLevel);
    expect(selectQuizLevel(playing, 'basic')).toBe(playing);
  });

  it('rejects a configuration with fewer than twenty candidates', () => {
    const otherQuestions = questionCatalog.filter(
      (question) => question.subject !== 'html' || question.level !== 'basic',
    );
    const incompleteCatalog = [
      ...otherQuestions,
      ...questionCatalog
        .filter((question) => question.subject === 'html' && question.level === 'basic')
        .slice(0, 19),
    ];

    expect(isConfigurationPlayable(incompleteCatalog, { subject: 'html', level: 'basic' })).toBe(
      false,
    );
    const state = menuState();
    expect(startConfiguredQuiz(state, incompleteCatalog, seededRandom(1))).toBe(state);
  });

  it('builds two disjoint ten-question rounds before starting a new deck cycle', () => {
    const random = seededRandom(2026);
    const first = startConfiguredQuiz(menuState(), questionCatalog, random);
    const second = restartConfiguredQuiz({ ...first, view: 'score' }, questionCatalog, random);
    const firstIds = new Set(first.round.map((question) => question.id));
    const secondIds = new Set(second.round.map((question) => question.id));

    expect(first.round).toHaveLength(10);
    expect(second.round).toHaveLength(10);
    expect([...firstIds].every((id) => !secondIds.has(id))).toBe(true);
    expect(
      [...first.round, ...second.round].every(
        (question) => question.subject === 'html' && question.level === 'basic',
      ),
    ).toBe(true);
  });

  it('builds mixed rounds as 4/3/3 and rotates the extra subject', () => {
    const random = seededRandom(42);
    const state = menuState({ configuration: { subject: 'mixed', level: 'intermediate' } });
    const first = startConfiguredQuiz(state, questionCatalog, random);
    const second = restartConfiguredQuiz({ ...first, view: 'review' }, questionCatalog, random);

    const counts = (round: readonly BankQuestion[]) =>
      Object.fromEntries(
        ['html', 'css', 'javascript'].map((subject) => [
          subject,
          round.filter((question) => question.subject === subject).length,
        ]),
      );

    expect(counts(first.round)).toEqual({ html: 4, css: 3, javascript: 3 });
    expect(counts(second.round)).toEqual({ html: 3, css: 4, javascript: 3 });
    expect(first.round.every((question) => question.level === 'intermediate')).toBe(true);
    expect(second.round.every((question) => question.level === 'intermediate')).toBe(true);
  });

  it('consumes every mixed candidate before repeating a question', () => {
    const random = seededRandom(73);
    let state = startConfiguredQuiz(
      menuState({ configuration: { subject: 'mixed', level: 'advanced' } }),
      questionCatalog,
      random,
    );
    const seenIds = new Set(state.round.map((question) => question.id));

    for (let roundIndex = 1; roundIndex < 6; roundIndex++) {
      state = restartConfiguredQuiz({ ...state, view: 'score' }, questionCatalog, random);
      for (const question of state.round) {
        expect(seenIds.has(question.id)).toBe(false);
        seenIds.add(question.id);
      }
    }

    expect(seenIds).toHaveLength(60);
  });

  it('does not start or restart from an invalid view', () => {
    const state = menuState();
    const playing = { ...state, view: 'playing' as const };

    expect(startConfiguredQuiz(playing, questionCatalog, seededRandom(1))).toBe(playing);
    expect(restartConfiguredQuiz(state, questionCatalog, seededRandom(1))).toBe(state);
  });
});
