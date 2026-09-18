import type { BankQuestion, Level, OptionId, QuestionId, Subject } from './questionBank';

export type QuizSubject = Subject | 'mixed';
export type QuizMode = 'normal' | 'timed';
export type QuizView = 'menu' | 'playing' | 'score' | 'review';
export type QuizRoundSource = 'configured' | 'incorrect-retry';
export type QuizTimerStatus = 'running' | 'paused' | 'answered' | 'expired';

export interface QuizConfiguration {
  subject: QuizSubject;
  level: Level;
}

export type QuizDecks = Readonly<Record<string, readonly QuestionId[]>>;
export type MixedExtraSubjects = Readonly<Partial<Record<Level, Subject>>>;
export type QuizBestResults = Readonly<Record<string, number>>;

export interface SelectedQuizAnswer {
  questionId: QuestionId;
  selectedOptionId: OptionId;
  timedOut?: false;
}

export interface TimedOutQuizAnswer {
  questionId: QuestionId;
  selectedOptionId: null;
  timedOut: true;
}

export type QuizAnswer = SelectedQuizAnswer | TimedOutQuizAnswer;

export interface QuizTimerState {
  questionId: QuestionId;
  durationMs: number;
  remainingMs: number;
  status: QuizTimerStatus;
  referenceTimeMs: number | null;
}

export interface QuizProgressState {
  mode: QuizMode;
  timer: QuizTimerState | null;
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
  abandonRound: () => void;
  returnToMenu: () => void;
}

export type QuizStore = QuizState & QuizActions;
