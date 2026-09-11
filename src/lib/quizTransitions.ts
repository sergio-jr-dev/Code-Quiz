import type { OptionId } from '../types/questionBank';
import type { QuizState } from '../types/quizStore';

export const answerCurrentQuestion = (state: QuizState, optionId: OptionId): QuizState => {
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

export const advanceQuiz = (state: QuizState): QuizState => {
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

export const calculateScore = (state: QuizState): number => {
  return state.round.reduce((score, question) => {
    const answer = state.answers.find((candidate) => candidate.questionId === question.id);

    return score + Number(answer?.selectedOptionId === question.correctAnswer);
  }, 0);
};

export const showReview = (state: QuizState): QuizState => {
  if (state.view !== 'score') return state;

  return {
    ...state,
    view: 'review',
  };
};
