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
