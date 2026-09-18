import { describe, expect, it, vi } from 'vitest';

import { questionCatalog } from '../data/questionCatalog';
import type { QuizState } from '../types/quizStore';
import {
  createQuizPersistStorage,
  mergePersistedQuizState,
  partializeQuizState,
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
      storage.setItem('quiz', { state: partializeQuizState(createState()), version: 1 }),
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
    const storedValue = { state: partializeQuizState(createState()), version: 1 };

    storage.setItem('quiz', storedValue);

    expect(JSON.parse(values.get('quiz')!)).toEqual(storedValue);
    expect(storage.getItem('quiz')).toEqual(storedValue);
  });

  it.each([
    ['malformed JSON', '{'],
    ['an incomplete state', JSON.stringify({ state: { configuration: {} }, version: 1 })],
    [
      'an invalid persist version',
      JSON.stringify({ state: partializeQuizState(createState()), version: '1' }),
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

    storage.setItem('quiz', { state: {}, version: 1 } as never);

    expect(setItem).not.toHaveBeenCalled();
  });
});
