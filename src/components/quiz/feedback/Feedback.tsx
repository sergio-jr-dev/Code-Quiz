import { IconCircleCheckFilled, IconCircleXFilled, IconClockX } from '@tabler/icons-react';

import { useQuizStore } from '../../../stores/quizStore';

import './feedback.css';

export function Feedback() {
  const question = useQuizStore((state) => state.round[state.currentQuestionIndex]);
  const answer = useQuizStore((state) => {
    const currentQuestion = state.round[state.currentQuestionIndex];

    return state.answers.find((candidate) => candidate.questionId === currentQuestion?.id);
  });

  if (!question || answer === undefined) return null;

  const correctPosition = question.options.findIndex(
    (option) => option.id === question.correctAnswer,
  );
  const correctMarker = String.fromCharCode(65 + correctPosition);
  if (answer.timedOut) {
    return (
      <p className="quiz-feedback timed-out" role="status" aria-atomic="true">
        <IconClockX aria-hidden="true" />
        <span>Sin responder · Tiempo agotado. La opción {correctMarker} es la respuesta.</span>
      </p>
    );
  }

  const selectedPosition = question.options.findIndex(
    (option) => option.id === answer.selectedOptionId,
  );
  const selectedMarker = String.fromCharCode(65 + selectedPosition);
  const isCorrect = answer.selectedOptionId === question.correctAnswer;

  return (
    <p
      className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}
      role="status"
      aria-atomic="true"
    >
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
