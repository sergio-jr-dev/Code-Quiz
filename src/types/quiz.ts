import type { BankQuestion, OptionId } from './questionBank';

export interface QuizContextValue {
  currentQuestion: number;
  question: BankQuestion;
  selectedOption: OptionId | null;
  score: number;
  completed: boolean;
  userAnswers: readonly OptionId[];
  showResults: boolean;
  shuffleQuestions: readonly BankQuestion[];
  selectOption: (id: OptionId) => void;
  handleNext: () => void;
  handleRestart: () => void;
  showReview: () => void;
}
