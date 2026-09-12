import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { questions } from '../data/questions';
import { buildRound } from '../lib/buildRound';
import {
  advanceQuiz,
  answerCurrentQuestion,
  restartQuiz,
  showReview as showReviewTransition,
} from '../lib/quizTransitions';
import type { QuizStore } from '../types/quizStore';

const quizStoreCreator: StateCreator<QuizStore> = (set) => ({
  round: buildRound(questions, questions.length),
  currentQuestionIndex: 0,
  answers: [],
  view: 'playing',

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
    set((state) => restartQuiz(state, buildRound(questions, questions.length)));
  },
});

export const useQuizStore = create<QuizStore>()(
  devtools(quizStoreCreator, {
    name: 'quiz-store',
  }),
);
