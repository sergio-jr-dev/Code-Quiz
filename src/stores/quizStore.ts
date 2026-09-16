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
  selectQuizSubject,
  startConfiguredQuiz,
} from '../lib/quizRound';
import {
  advanceQuiz,
  answerCurrentQuestion,
  retryIncorrectAnswers as retryIncorrectAnswersTransition,
  returnToMenu as returnToMenuTransition,
  showReview as showReviewTransition,
} from '../lib/quizTransitions';
import type { QuizState, QuizStore } from '../types/quizStore';

const defaultQuizState: QuizState = {
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

  selectSubject: (subject) => {
    set((state) => selectQuizSubject(state, subject));
  },
  selectLevel: (level) => {
    set((state) => selectQuizLevel(state, level));
  },
  startRound: () => {
    set((state) => startConfiguredQuiz(state, questionCatalog));
  },
  selectOption: (optionId) => {
    set((state) => answerCurrentQuestion(state, optionId));
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
