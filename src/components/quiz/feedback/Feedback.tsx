import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';

import { useQuizStore } from '../../../stores/quizStore';

import './feedback.css';

export function Feedback() {
  const question = useQuizStore((state) => state.round[state.currentQuestionIndex]);
  const selectedOptionId = useQuizStore((state) => {
    const currentQuestion = state.round[state.currentQuestionIndex];

    return state.answers.find((answer) => answer.questionId === currentQuestion?.id)
      ?.selectedOptionId;
  });

  if (!question || selectedOptionId === undefined) return null;

  const correctPosition = question.options.findIndex(
    (option) => option.id === question.correctAnswer,
  );
  const selectedPosition = question.options.findIndex((option) => option.id === selectedOptionId);
  const correctMarker = String.fromCharCode(65 + correctPosition);
  const selectedMarker = String.fromCharCode(65 + selectedPosition);
  const isCorrect = selectedOptionId === question.correctAnswer;

  return (
    <p className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`} role="status">
      {isCorrect ? (
        <IconCircleCheckFilled aria-hidden="true" />
      ) : (
        <IconCircleXFilled aria-hidden="true" />
      )}
      <span>
        {isCorrect
          ? `¡Correcto! La opción ${correctMarker} es la respuesta.`
          : `Tu respuesta ${selectedMarker} no es correcta. La opción ${correctMarker} es la respuesta.`}
      </span>
    </p>
  );
}
