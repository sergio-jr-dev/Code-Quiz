export interface Option {
  readonly id: number;
  readonly content: string;
}

export interface Question {
  readonly id: number;
  readonly question: string;
  readonly options: readonly Option[];
  readonly correctAnswer: Option['id'];
  readonly additionalInfo: string;
}

export interface QuizContextValue {
  currentQuestion: number;
  question: Question;
  selectedOption: Option['id'] | null;
  score: number;
  completed: boolean;
  userAnswers: readonly Option['id'][];
  showResults: boolean;
  shuffleQuestions: readonly Question[];
  selectOption: (id: Option['id']) => void;
  handleNext: () => void;
  handleRestart: () => void;
  showReview: () => void;
}
