import type { BankQuestion, OptionId, QuestionId } from './questionBank';

export type QuizView = 'playing' | 'score' | 'review';

export interface QuizAnswer {
  questionId: QuestionId;
  selectedOptionId: OptionId;
}

export interface QuizState {
  round: readonly BankQuestion[];
  currentQuestionIndex: number;
  answers: readonly QuizAnswer[];
  view: QuizView;
}

export interface QuizActions {
  selectOption: (optionId: OptionId) => void;
  goToNextQuestion: () => void;
  showReview: () => void;
  restartRound: () => void;
}

export type QuizStore = QuizState & QuizActions;
