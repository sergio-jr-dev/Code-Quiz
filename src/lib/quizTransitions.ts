import type { BankQuestion, OptionId } from '../types/questionBank';
import type { QuizProgressState, QuizState } from '../types/quizStore';

export const answerCurrentQuestion = (
  state: QuizProgressState,
  optionId: OptionId,
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

  const newAnswer = {
    questionId: currentQuestion.id,
    selectedOptionId: optionId,
  };

  return {
    ...state,
    answers: [...state.answers, newAnswer],
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
    };
  }

  return {
    ...state,
    currentQuestionIndex: state.currentQuestionIndex + 1,
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
  };
};
