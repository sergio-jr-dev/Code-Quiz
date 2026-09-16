import type { BankQuestion, Level, OptionId, QuestionId, Subject } from './questionBank';

export type QuizSubject = Subject | 'mixed';
export type QuizView = 'menu' | 'playing' | 'score' | 'review';
export type QuizRoundSource = 'configured' | 'incorrect-retry';

export interface QuizConfiguration {
  subject: QuizSubject;
  level: Level;
}

export type QuizDecks = Readonly<Record<string, readonly QuestionId[]>>;
export type MixedExtraSubjects = Readonly<Partial<Record<Level, Subject>>>;
export type QuizBestResults = Readonly<Record<string, number>>;

export interface QuizAnswer {
  questionId: QuestionId;
  selectedOptionId: OptionId;
}

export interface QuizProgressState {
  round: readonly BankQuestion[];
  currentQuestionIndex: number;
  answers: readonly QuizAnswer[];
  view: QuizView;
}

export interface QuizState extends QuizProgressState {
  configuration: QuizConfiguration;
  roundSource: QuizRoundSource;
  decks: QuizDecks;
  mixedExtraSubjects: MixedExtraSubjects;
  bestResults: QuizBestResults;
}

export interface QuizActions {
  selectSubject: (subject: QuizSubject) => void;
  selectLevel: (level: Level) => void;
  startRound: () => void;
  selectOption: (optionId: OptionId) => void;
  goToNextQuestion: () => void;
  showReview: () => void;
  restartRound: () => void;
  retryIncorrectAnswers: () => void;
  returnToMenu: () => void;
}

export type QuizStore = QuizState & QuizActions;
