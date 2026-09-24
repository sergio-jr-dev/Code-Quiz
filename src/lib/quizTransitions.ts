import type { BankQuestion, Level, OptionId } from '../types/questionBank';
import type { QuizProgressState, QuizState, QuizTimerState } from '../types/quizStore';

export const QUESTION_TIME_LIMITS_MS: Readonly<Record<Level, number>> = {
  basic: 60_000,
  intermediate: 45_000,
  advanced: 30_000,
};

const isValidTime = (timeMs: number): boolean => Number.isFinite(timeMs) && timeMs >= 0;

export const getRemainingTimeMs = (timer: QuizTimerState, nowMs: number): number => {
  if (timer.status !== 'running' || timer.referenceTimeMs === null) return timer.remainingMs;
  if (!isValidTime(nowMs)) return timer.remainingMs;

  const elapsedMs = Math.max(0, nowMs - timer.referenceTimeMs);
  return Math.max(0, timer.remainingMs - elapsedMs);
};

export const startQuestionTimer = (state: QuizState, nowMs: number): QuizState => {
  if (state.mode !== 'timed' || state.view !== 'playing' || !isValidTime(nowMs)) return state;

  const currentQuestion = state.round[state.currentQuestionIndex];
  if (!currentQuestion) return state;
  if (state.timer?.questionId === currentQuestion.id) return state;

  const durationMs = QUESTION_TIME_LIMITS_MS[state.configuration.level];

  return {
    ...state,
    timer: {
      questionId: currentQuestion.id,
      durationMs,
      remainingMs: durationMs,
      status: 'running',
      referenceTimeMs: nowMs,
    },
  };
};

export const pauseQuestionTimer = (state: QuizState, nowMs: number): QuizState => {
  const timer = state.timer;
  if (state.mode !== 'timed' || timer?.status !== 'running' || !isValidTime(nowMs)) return state;

  const remainingMs = getRemainingTimeMs(timer, nowMs);
  if (remainingMs <= 0) return state;

  return {
    ...state,
    timer: {
      ...timer,
      remainingMs,
      status: 'paused',
      referenceTimeMs: null,
    },
  };
};

export const resumeQuestionTimer = (state: QuizState, nowMs: number): QuizState => {
  const timer = state.timer;
  if (
    state.mode !== 'timed' ||
    timer?.status !== 'paused' ||
    timer.remainingMs <= 0 ||
    !isValidTime(nowMs)
  ) {
    return state;
  }

  return {
    ...state,
    timer: {
      ...timer,
      status: 'running',
      referenceTimeMs: nowMs,
    },
  };
};

export const answerCurrentQuestion = (
  state: QuizProgressState,
  optionId: OptionId,
  nowMs?: number,
): QuizProgressState => {
  if (state.view !== 'playing') return state;

  const currentQuestion = state.round[state.currentQuestionIndex];
  if (!currentQuestion) return state;

  const isValidOption = currentQuestion.options.some((option) => option.id === optionId);
  if (!isValidOption) return state;

  const hasAlreadyAnswered = state.answers.some(
    (answer) => answer.questionId === currentQuestion.id,
  );
  if (hasAlreadyAnswered) return state;

  let timer = state.timer;
  if (state.mode === 'timed') {
    if (!timer || timer.questionId !== currentQuestion.id) return state;
    if (timer.status !== 'running' && timer.status !== 'paused') return state;

    const remainingMs =
      timer.status === 'running'
        ? nowMs === undefined
          ? null
          : getRemainingTimeMs(timer, nowMs)
        : timer.remainingMs;
    if (remainingMs === null || remainingMs <= 0) return state;

    timer = {
      ...timer,
      remainingMs,
      status: 'answered',
      referenceTimeMs: null,
    };
  }

  const newAnswer = {
    questionId: currentQuestion.id,
    selectedOptionId: optionId,
  };

  return {
    ...state,
    answers: [...state.answers, newAnswer],
    timer,
  };
};

export const expireCurrentQuestion = (state: QuizState, nowMs: number): QuizState => {
  if (state.mode !== 'timed' || state.view !== 'playing' || !isValidTime(nowMs)) return state;

  const currentQuestion = state.round[state.currentQuestionIndex];
  const timer = state.timer;
  if (!currentQuestion || !timer || timer.questionId !== currentQuestion.id) return state;
  if (timer.status !== 'running') return state;
  if (state.answers.some((answer) => answer.questionId === currentQuestion.id)) return state;
  if (getRemainingTimeMs(timer, nowMs) > 0) return state;

  return {
    ...state,
    answers: [
      ...state.answers,
      {
        questionId: currentQuestion.id,
        selectedOptionId: null,
        timedOut: true,
      },
    ],
    timer: {
      ...timer,
      remainingMs: 0,
      status: 'expired',
      referenceTimeMs: null,
    },
  };
};

export const advanceQuiz = (state: QuizProgressState): QuizProgressState => {
  if (state.view !== 'playing') return state;

  const currentQuestion = state.round[state.currentQuestionIndex];
  if (!currentQuestion) return state;

  const hasAnsweredCurrentQuestion = state.answers.some(
    (answer) => answer.questionId === currentQuestion.id,
  );
  if (!hasAnsweredCurrentQuestion) return state;

  const isLastQuestion = state.currentQuestionIndex === state.round.length - 1;
  if (isLastQuestion) {
    return {
      ...state,
      view: 'score',
      timer: null,
    };
  }

  return {
    ...state,
    currentQuestionIndex: state.currentQuestionIndex + 1,
    timer: null,
  };
};

export const calculateScore = (state: QuizProgressState): number => {
  return state.round.reduce((score, question) => {
    const answer = state.answers.find((candidate) => candidate.questionId === question.id);

    return score + Number(answer?.selectedOptionId === question.correctAnswer);
  }, 0);
};

export const showReview = (state: QuizProgressState): QuizProgressState => {
  if (state.view !== 'score') return state;

  return {
    ...state,
    view: 'review',
  };
};

export const restartQuiz = (
  state: QuizProgressState,
  nextRound: readonly BankQuestion[],
): QuizProgressState => {
  return {
    ...state,
    round: nextRound,
    currentQuestionIndex: 0,
    answers: [],
    view: 'playing',
    timer: null,
  };
};

export const retryIncorrectAnswers = (state: QuizState): QuizState => {
  if (state.view !== 'score' && state.view !== 'review') return state;

  const selectedOptions = new Map(
    state.answers.map((answer) => [answer.questionId, answer.selectedOptionId]),
  );
  const incorrectQuestions = state.round.filter(
    (question) => selectedOptions.get(question.id) !== question.correctAnswer,
  );

  if (incorrectQuestions.length === 0) return state;

  return {
    ...state,
    round: incorrectQuestions,
    roundSource: 'incorrect-retry',
    currentQuestionIndex: 0,
    answers: [],
    view: 'playing',
    timer: null,
  };
};

export const returnToMenu = (state: QuizState): QuizState => {
  if (state.view !== 'score' && state.view !== 'review') return state;

  return {
    ...state,
    round: [],
    roundSource: 'configured',
    currentQuestionIndex: 0,
    answers: [],
    view: 'menu',
    timer: null,
  };
};

export const abandonRound = (state: QuizState): QuizState => {
  if (state.view !== 'playing') return state;

  return {
    ...state,
    round: [],
    roundSource: 'configured',
    currentQuestionIndex: 0,
    answers: [],
    view: 'menu',
    timer: null,
  };
};
