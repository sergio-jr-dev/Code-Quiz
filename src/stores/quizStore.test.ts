import { beforeEach, describe, expect, it } from 'vitest';

import { questionCatalog } from '../data/questionCatalog';
import {
  migratePersistedQuizState,
  partializeQuizState,
  QUIZ_STORAGE_KEY,
  QUIZ_STORAGE_VERSION,
  type PersistedQuizStateV2,
} from '../lib/quizPersistence';
import { questionExamples as questions } from '../test/fixtures/questionExamples';
import type { QuizMode, QuizState } from '../types/quizStore';
import { useQuizStore } from './quizStore';

const createPersistablePlayingState = (mode: QuizMode): QuizState => {
  const candidates = questionCatalog.filter(
    (question) => question.subject === 'html' && question.level === 'basic',
  );
  const round = candidates.slice(0, 10);

  return {
    mode,
    timer:
      mode === 'timed'
        ? {
            questionId: round[1]!.id,
            durationMs: 60_000,
            remainingMs: 48_000,
            status: 'running',
            referenceTimeMs: 12_000,
          }
        : null,
    configuration: { subject: 'html', level: 'basic' },
    round,
    currentQuestionIndex: 1,
    answers: [{ questionId: round[0]!.id, selectedOptionId: round[0]!.correctAnswer }],
    view: 'playing',
    roundSource: 'configured',
    decks: { 'html:basic:html': candidates.slice(10).map((question) => question.id) },
    mixedExtraSubjects: { basic: 'css' },
    bestResults: { 'html:basic': 8, 'html:basic:timed': 6 },
  };
};

describe('quizStore', () => {
  beforeEach(() => {
    const question = questions[0]!;

    useQuizStore.setState({
      mode: 'normal',
      timer: null,
      configuration: { subject: 'html', level: 'basic' },
      round: [question],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
      roundSource: 'configured',
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    });
  });

  it('stores the selected option through the store action', () => {
    const question = questions[0]!;
    const validOption = question.options[0]!;

    const selectOption = useQuizStore.getState().selectOption;

    selectOption(validOption.id);

    const answers = useQuizStore.getState().answers;

    expect(answers).toEqual([
      {
        questionId: question.id,
        selectedOptionId: validOption.id,
      },
    ]);
  });

  it('uses Zustand persist with the versioned minimal state', () => {
    const persisted = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY)!) as {
      state: PersistedQuizStateV2;
      version: number;
    };

    expect(useQuizStore.persist.getOptions()).toMatchObject({
      name: QUIZ_STORAGE_KEY,
      version: QUIZ_STORAGE_VERSION,
      migrate: migratePersistedQuizState,
    });
    expect(persisted.version).toBe(QUIZ_STORAGE_VERSION);
    expect(persisted.state.mode).toBe('normal');
    expect(persisted.state.progress.round[0]?.questionId).toBe(questions[0]!.id);
    expect(JSON.stringify(persisted)).not.toContain('prompt');
    expect(JSON.stringify(persisted)).not.toContain('explanation');
  });

  it('rehydrates an active normal round through the Zustand middleware', async () => {
    const persistedState = createPersistablePlayingState('normal');
    localStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({
        state: partializeQuizState(persistedState),
        version: QUIZ_STORAGE_VERSION,
      }),
    );

    await useQuizStore.persist.rehydrate();

    expect(useQuizStore.getState()).toMatchObject({
      mode: 'normal',
      timer: null,
      configuration: persistedState.configuration,
      currentQuestionIndex: 1,
      answers: persistedState.answers,
      view: 'playing',
      decks: persistedState.decks,
      mixedExtraSubjects: persistedState.mixedExtraSubjects,
      bestResults: persistedState.bestResults,
    });
    expect(useQuizStore.getState().round.map((question) => question.id)).toEqual(
      persistedState.round.map((question) => question.id),
    );
  });

  it('rehydrates an active timed round as an abandoned round through the middleware', async () => {
    const persistedState = createPersistablePlayingState('timed');
    localStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({
        state: partializeQuizState(persistedState),
        version: QUIZ_STORAGE_VERSION,
      }),
    );

    await useQuizStore.persist.rehydrate();

    expect(useQuizStore.getState()).toMatchObject({
      mode: 'timed',
      timer: null,
      configuration: persistedState.configuration,
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
      roundSource: 'configured',
      decks: persistedState.decks,
      mixedExtraSubjects: persistedState.mixedExtraSubjects,
      bestResults: persistedState.bestResults,
    });
  });

  it('moves from playing to score and then to review', () => {
    const question = questions[0]!;
    const validOption = question.options[0]!;

    const selectOption = useQuizStore.getState().selectOption;
    const goToNextQuestion = useQuizStore.getState().goToNextQuestion;
    const showReview = useQuizStore.getState().showReview;

    selectOption(validOption.id);
    goToNextQuestion();

    expect(useQuizStore.getState().view).toBe('score');

    showReview();

    expect(useQuizStore.getState().view).toBe('review');
  });

  it('records a completed configured round through the final advance action', () => {
    const round = questionCatalog
      .filter((question) => question.subject === 'html' && question.level === 'basic')
      .slice(0, 10);
    useQuizStore.setState({
      round,
      roundSource: 'configured',
      currentQuestionIndex: 9,
      answers: round.map((question) => ({
        questionId: question.id,
        selectedOptionId: question.correctAnswer,
      })),
      view: 'playing',
      bestResults: {},
    });

    useQuizStore.getState().goToNextQuestion();

    expect(useQuizStore.getState()).toMatchObject({
      view: 'score',
      bestResults: { 'html:basic': 10 },
    });
  });

  it('reset the quiz', () => {
    const firstQuestion = questions[0]!;
    const secondQuestion = questions[1]!;
    const option = secondQuestion.options[0]!;

    useQuizStore.setState({
      round: [firstQuestion, secondQuestion],
      currentQuestionIndex: 1,
      answers: [
        {
          questionId: secondQuestion.id,
          selectedOptionId: option.id,
        },
      ],
      view: 'review',
    });

    const restartRound = useQuizStore.getState().restartRound;

    restartRound();

    const state = useQuizStore.getState();

    expect(state.currentQuestionIndex).toBe(0);
    expect(state.answers).toEqual([]);
    expect(state.view).toBe('playing');
    expect(state.round).toHaveLength(10);
    expect(state.round.every((question) => question.subject === 'html')).toBe(true);
    expect(state.round.every((question) => question.level === 'basic')).toBe(true);
  });

  it('configures and starts a round through public store actions', () => {
    useQuizStore.setState({
      mode: 'normal',
      timer: null,
      configuration: { subject: 'html', level: 'basic' },
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
      roundSource: 'configured',
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    });

    useQuizStore.getState().selectSubject('javascript');
    useQuizStore.getState().selectLevel('advanced');
    useQuizStore.getState().selectMode('timed');
    useQuizStore.getState().startRound();

    const state = useQuizStore.getState();
    expect(state.configuration).toEqual({ subject: 'javascript', level: 'advanced' });
    expect(state.mode).toBe('timed');
    expect(state.view).toBe('playing');
    expect(state.round).toHaveLength(10);
    expect(
      state.round.every(
        (question) => question.subject === 'javascript' && question.level === 'advanced',
      ),
    ).toBe(true);
  });

  it('retries incorrect answers and returns to the menu through public actions', () => {
    const correctQuestion = questions[0]!;
    const incorrectQuestion = questions[1]!;
    const incorrectOption = incorrectQuestion.options.find(
      (option) => option.id !== incorrectQuestion.correctAnswer,
    )!;

    useQuizStore.setState({
      round: [correctQuestion, incorrectQuestion],
      currentQuestionIndex: 1,
      answers: [
        { questionId: correctQuestion.id, selectedOptionId: correctQuestion.correctAnswer },
        { questionId: incorrectQuestion.id, selectedOptionId: incorrectOption.id },
      ],
      view: 'score',
    });

    useQuizStore.getState().retryIncorrectAnswers();

    expect(useQuizStore.getState()).toMatchObject({
      round: [incorrectQuestion],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    });

    useQuizStore.setState({ view: 'score' });
    useQuizStore.getState().returnToMenu();

    expect(useQuizStore.getState()).toMatchObject({
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
    });
  });
});
