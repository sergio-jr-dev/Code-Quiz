import { describe, expect, it, vi } from 'vitest';

import { questionCatalog } from '../data/questionCatalog';
import type { QuizState } from '../types/quizStore';
import {
  createQuizPersistStorage,
  mergePersistedQuizState,
  migratePersistedQuizState,
  partializeQuizState,
  QUIZ_STORAGE_VERSION,
  type PersistedQuizStateV1,
} from './quizPersistence';

const createState = (): QuizState => {
  const round = questionCatalog
    .filter((question) => question.subject === 'html' && question.level === 'basic')
    .slice(0, 10)
    .map((question) => ({ ...question, options: [...question.options].reverse() }));

  return {
    mode: 'normal',
    timer: null,
    configuration: { subject: 'html', level: 'basic' },
    round,
    roundSource: 'configured',
    currentQuestionIndex: 1,
    answers: round.slice(0, 2).map((question) => ({
      questionId: question.id,
      selectedOptionId: question.options[0]!.id,
    })),
    view: 'playing',
    decks: {
      'html:basic:html': questionCatalog
        .filter((question) => question.subject === 'html' && question.level === 'basic')
        .slice(10)
        .map((question) => question.id),
    },
    mixedExtraSubjects: { basic: 'css' },
    bestResults: { 'html:basic': 7 },
  };
};

const createV1State = (): PersistedQuizStateV1 => {
  const state = createState();
  const persisted = partializeQuizState(state);

  return {
    configuration: persisted.configuration,
    progress: {
      ...persisted.progress,
      answers: state.answers.map((answer) => ({
        questionId: answer.questionId,
        selectedOptionId: answer.selectedOptionId!,
      })),
    },
    decks: persisted.decks,
    mixedExtraSubjects: persisted.mixedExtraSubjects,
    bestResults: persisted.bestResults,
  };
};

describe('quiz persistence', () => {
  it('restores valid progress, option order, decks, rotation and best results from IDs', () => {
    const state = createState();
    const currentState: QuizState = { ...state, round: [], answers: [], view: 'menu' };
    const restored = mergePersistedQuizState(
      partializeQuizState(state),
      currentState,
      questionCatalog,
    );

    expect(restored).toEqual(state);
    expect(restored.round[0]).not.toBe(state.round[0]);
    expect(restored.round[0]?.options.map((option) => option.id)).toEqual(
      state.round[0]?.options.map((option) => option.id),
    );
  });

  it('partializes only the minimal schema without catalog content', () => {
    const state = createState();
    const persisted = partializeQuizState(state);
    const serialized = JSON.stringify(persisted);

    expect(persisted).toHaveProperty('progress.round');
    expect(serialized).not.toContain('prompt');
    expect(serialized).not.toContain('explanation');
    expect(serialized).not.toContain('content');
    expect(persisted.mode).toBe('normal');
    expect(persisted).not.toHaveProperty('timer');
  });

  it('migrates version 1 data to normal mode', () => {
    const previousState = createV1State();
    previousState.bestResults['html:basic:timed'] = 6;
    const migrated = migratePersistedQuizState(previousState, 1);
    const currentState: QuizState = { ...createState(), round: [], answers: [], view: 'menu' };

    expect(migrated.mode).toBe('normal');
    expect(mergePersistedQuizState(migrated, currentState, questionCatalog)).toEqual({
      ...createState(),
      bestResults: { 'html:basic': 7, 'html:basic:timed': 6 },
    });
  });

  it('restores timed results and timed-out answers without persisting the timer', () => {
    const state = createState();
    const timedState: QuizState = {
      ...state,
      mode: 'timed',
      timer: {
        questionId: state.round[9]!.id,
        durationMs: 60_000,
        remainingMs: 0,
        status: 'expired',
        referenceTimeMs: null,
      },
      currentQuestionIndex: 9,
      answers: state.round.map((question, index) =>
        index === 9
          ? { questionId: question.id, selectedOptionId: null, timedOut: true }
          : { questionId: question.id, selectedOptionId: question.correctAnswer },
      ),
      view: 'score',
      bestResults: { 'html:basic': 7, 'html:basic:timed': 9 },
    };
    const persisted = partializeQuizState(timedState);
    const restored = mergePersistedQuizState(persisted, createState(), questionCatalog);

    expect(persisted.progress.answers[9]).toEqual({
      questionId: state.round[9]!.id,
      selectedOptionId: null,
      timedOut: true,
    });
    expect(persisted).not.toHaveProperty('timer');
    expect(restored).toMatchObject({
      mode: 'timed',
      timer: null,
      view: 'score',
      bestResults: { 'html:basic': 7, 'html:basic:timed': 9 },
    });
    expect(restored.answers[9]).toMatchObject({ selectedOptionId: null, timedOut: true });
  });

  it('abandons a persisted timed round while preserving its configuration and consumed decks', () => {
    const state: QuizState = {
      ...createState(),
      mode: 'timed',
      timer: {
        questionId: createState().round[1]!.id,
        durationMs: 60_000,
        remainingMs: 42_000,
        status: 'running',
        referenceTimeMs: 1_000,
      },
      bestResults: { 'html:basic': 7, 'html:basic:timed': 6 },
    };
    const restored = mergePersistedQuizState(
      partializeQuizState(state),
      { ...createState(), round: [], answers: [], view: 'menu' },
      questionCatalog,
    );

    expect(restored).toMatchObject({
      mode: 'timed',
      timer: null,
      configuration: state.configuration,
      round: [],
      roundSource: 'configured',
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
      decks: state.decks,
      mixedExtraSubjects: state.mixedExtraSubjects,
      bestResults: state.bestResults,
    });
  });

  it.each([
    ['an absent payload', null],
    [
      'a stale question ID',
      (() => {
        const persisted = partializeQuizState(createState());
        persisted.progress.round[0]!.questionId = 'html-removed-999';
        return persisted;
      })(),
    ],
    [
      'an unknown result mode',
      (() => {
        const persisted = partializeQuizState(createState());
        persisted.bestResults['html:basic:speed'] = 8;
        return persisted;
      })(),
    ],
    [
      'a timed-out answer in normal mode',
      (() => {
        const persisted = partializeQuizState(createState());
        persisted.progress.answers[0] = {
          questionId: persisted.progress.round[0]!.questionId,
          selectedOptionId: null,
          timedOut: true,
        };
        return persisted;
      })(),
    ],
  ])('keeps the current state for %s', (_case, persisted) => {
    const currentState = createState();
    expect(mergePersistedQuizState(persisted, currentState, questionCatalog)).toBe(currentState);
  });

  it('keeps the quiz usable when reading or writing storage throws', () => {
    const storage = createQuizPersistStorage(() => ({
      getItem: () => {
        throw new Error('Storage disabled');
      },
      setItem: () => {
        throw new Error('Quota exceeded');
      },
      removeItem: () => {
        throw new Error('Storage disabled');
      },
    }));

    expect(storage.getItem('quiz')).toBeNull();
    expect(() =>
      storage.setItem('quiz', {
        state: partializeQuizState(createState()),
        version: QUIZ_STORAGE_VERSION,
      }),
    ).not.toThrow();
    expect(() => storage.removeItem('quiz')).not.toThrow();
  });

  it('serializes and reads a Zod-validated persist envelope', () => {
    const values = new Map<string, string>();
    const storage = createQuizPersistStorage(() => ({
      getItem: (name) => values.get(name) ?? null,
      setItem: (name, value) => values.set(name, value),
      removeItem: (name) => values.delete(name),
    }));
    const storedValue = {
      state: partializeQuizState(createState()),
      version: QUIZ_STORAGE_VERSION,
    };

    storage.setItem('quiz', storedValue);

    expect(JSON.parse(values.get('quiz')!)).toEqual(storedValue);
    expect(storage.getItem('quiz')).toEqual(storedValue);
  });

  it('reads a version 1 envelope so Zustand can migrate it', () => {
    const storedValue = { state: createV1State(), version: 1 };
    const storage = createQuizPersistStorage(() => ({
      getItem: () => JSON.stringify(storedValue),
      setItem: () => undefined,
      removeItem: () => undefined,
    }));

    expect(storage.getItem('quiz')).toEqual(storedValue);
  });

  it.each([
    ['malformed JSON', '{'],
    ['an incomplete state', JSON.stringify({ state: { configuration: {} }, version: 1 })],
    [
      'an invalid persist version',
      JSON.stringify({ state: partializeQuizState(createState()), version: '1' }),
    ],
    [
      'an unsupported persist version',
      JSON.stringify({ state: partializeQuizState(createState()), version: 3 }),
    ],
  ])('ignores %s at the storage boundary', (_case, serialized) => {
    const storage = createQuizPersistStorage(() => ({
      getItem: () => serialized,
      setItem: () => undefined,
      removeItem: () => undefined,
    }));

    expect(storage.getItem('quiz')).toBeNull();
  });

  it('does not write a value that fails the persist schema', () => {
    const setItem = vi.fn();
    const storage = createQuizPersistStorage(() => ({
      getItem: () => null,
      setItem,
      removeItem: () => undefined,
    }));

    storage.setItem('quiz', { state: {}, version: QUIZ_STORAGE_VERSION } as never);

    expect(setItem).not.toHaveBeenCalled();
  });
});
