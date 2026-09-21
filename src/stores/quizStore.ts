import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { questionCatalog } from '../data/questionCatalog';
import {
  createQuizPersistStorage,
  mergePersistedQuizState,
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
    set((state) => expireCurrentQuestion(state, nowMs));
  },
  selectOption: (optionId, nowMs = Date.now()) => {
    set((state) => answerCurrentQuestion(state, optionId, nowMs));
  },
  goToNextQuestion: () => {
    set((state) => {
      const progress = advanceQuiz(state);
      if (progress === state) return state;
      return recordBestResult({ ...state, ...progress });
    });
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
      merge: (persistedState, currentState) =>
        mergePersistedQuizState(persistedState, currentState, questionCatalog),
    }),
    {
      name: 'quiz-store',
    },
  ),
);
