import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { questionCatalog } from '../data/questionCatalog';
import {
  restartConfiguredQuiz,
  selectQuizLevel,
  selectQuizSubject,
  startConfiguredQuiz,
} from '../lib/quizRound';
import {
  advanceQuiz,
  answerCurrentQuestion,
  showReview as showReviewTransition,
} from '../lib/quizTransitions';
import type { QuizStore } from '../types/quizStore';

const quizStoreCreator: StateCreator<QuizStore> = (set) => ({
  configuration: {
    subject: 'html',
    level: 'basic',
  },
  round: [],
  currentQuestionIndex: 0,
  answers: [],
  view: 'menu',
  decks: {},
  mixedExtraSubjects: {},

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
    set((state) => advanceQuiz(state));
  },
  showReview: () => {
    set((state) => showReviewTransition(state));
  },
  restartRound: () => {
    set((state) => restartConfiguredQuiz(state, questionCatalog));
  },
});

export const useQuizStore = create<QuizStore>()(
  devtools(quizStoreCreator, {
    name: 'quiz-store',
  }),
);
