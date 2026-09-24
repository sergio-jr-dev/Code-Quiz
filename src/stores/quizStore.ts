import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { questionCatalog } from '../data/questionCatalog';
import {
  createQuizPersistStorage,
  mergePersistedQuizState,
  migratePersistedQuizState,
  partializeQuizState,
  QUIZ_STORAGE_KEY,
  QUIZ_STORAGE_VERSION,
} from '../lib/quizPersistence';
import { recordBestResult } from '../lib/quizRecords';
import {
  restartConfiguredQuiz,
  selectQuizLevel,
  selectQuizMode,
  selectQuizSubject,
  startConfiguredQuiz,
} from '../lib/quizRound';
import { playQuizSound } from '../lib/quizSounds';
import {
  abandonRound as abandonRoundTransition,
  advanceQuiz,
  answerCurrentQuestion,
  expireCurrentQuestion,
  pauseQuestionTimer,
  resumeQuestionTimer,
  retryIncorrectAnswers as retryIncorrectAnswersTransition,
  returnToMenu as returnToMenuTransition,
  showReview as showReviewTransition,
  startQuestionTimer,
} from '../lib/quizTransitions';
import type { QuizState, QuizStore } from '../types/quizStore';
import { usePreferencesStore } from './preferencesStore';

const defaultQuizState: QuizState = {
  mode: 'normal',
  timer: null,
  configuration: {
    subject: 'html',
    level: 'basic',
  },
  round: [],
  roundSource: 'configured',
  currentQuestionIndex: 0,
  answers: [],
  view: 'menu',
  decks: {},
  mixedExtraSubjects: {},
  bestResults: {},
};

const quizStoreCreator: StateCreator<QuizStore> = (set) => ({
  ...defaultQuizState,

  selectMode: (mode) => {
    set((state) => selectQuizMode(state, mode));
  },
  selectSubject: (subject) => {
    set((state) => selectQuizSubject(state, subject));
  },
  selectLevel: (level) => {
    set((state) => selectQuizLevel(state, level));
  },
  startRound: () => {
    set((state) => startConfiguredQuiz(state, questionCatalog));
  },
  startTimer: (nowMs) => {
    set((state) => startQuestionTimer(state, nowMs));
  },
  pauseTimer: (nowMs) => {
    set((state) => pauseQuestionTimer(state, nowMs));
  },
  resumeTimer: (nowMs) => {
    set((state) => resumeQuestionTimer(state, nowMs));
  },
  expireQuestion: (nowMs) => {
    const answerCount = useQuizStore.getState().answers.length;
    set((state) => expireCurrentQuestion(state, nowMs));
    const state = useQuizStore.getState();
    if (state.answers.length > answerCount && state.answers.at(-1)?.timedOut) {
      playQuizSound('warning', usePreferencesStore.getState().soundEnabled);
    }
  },
  selectOption: (optionId, nowMs = Date.now()) => {
    const before = useQuizStore.getState();
    set((state) => answerCurrentQuestion(state, optionId, nowMs));
    const after = useQuizStore.getState();
    if (after.answers.length !== before.answers.length) {
      const question = before.round[before.currentQuestionIndex];
      playQuizSound(
        optionId === question?.correctAnswer ? 'success' : 'error',
        usePreferencesStore.getState().soundEnabled,
      );
    }
  },
  goToNextQuestion: () => {
    const before = useQuizStore.getState();
    set((state) => {
      const progress = advanceQuiz(state);
      if (progress === state) return state;
      return recordBestResult({ ...state, ...progress });
    });
    const after = useQuizStore.getState();
    if (
      before.view === 'playing' &&
      after.view === 'score' &&
      before.roundSource === 'configured'
    ) {
      playQuizSound('complete', usePreferencesStore.getState().soundEnabled);
    }
  },
  showReview: () => {
    set((state) => showReviewTransition(state));
  },
  restartRound: () => {
    set((state) => restartConfiguredQuiz(state, questionCatalog));
  },
  retryIncorrectAnswers: () => {
    set((state) => retryIncorrectAnswersTransition(state));
  },
  abandonRound: () => {
    set((state) => abandonRoundTransition(state));
  },
  returnToMenu: () => {
    set((state) => returnToMenuTransition(state));
  },
});

export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(quizStoreCreator, {
      name: QUIZ_STORAGE_KEY,
      version: QUIZ_STORAGE_VERSION,
      storage: createQuizPersistStorage(),
      partialize: partializeQuizState,
      migrate: migratePersistedQuizState,
      merge: (persistedState, currentState) =>
        mergePersistedQuizState(persistedState, currentState, questionCatalog),
    }),
    {
      name: 'quiz-store',
    },
  ),
);
