import { IconCheck, IconClockX, IconX } from '@tabler/icons-react';

import { useQuizStore } from '../../../stores/quizStore';

import './dots.css';

export const Dots = () => {
  const round = useQuizStore((state) => state.round);
  const answers = useQuizStore((state) => state.answers);

  return (
    <nav className="dots" aria-label="Revisión de preguntas">
      {round.map(({ id, correctAnswer }, i) => {
        const answer = answers.find((candidate) => candidate.questionId === id);
        const selectedOptionId = answer?.selectedOptionId;

        const isCorrect = correctAnswer === selectedOptionId;
        const timedOut = answer?.timedOut === true;
        const resultLabel = isCorrect
          ? 'correcta'
          : timedOut
            ? 'sin responder por tiempo agotado'
            : 'incorrecta';

        return (
          <a
            key={id}
            href={`#question-${i + 1}`}
            aria-label={`Pregunta ${i + 1}: ${resultLabel}`}
            className={`dot ${isCorrect ? 'correct' : timedOut ? 'timed-out' : 'incorrect'}`}
          >
            <span>{i + 1}</span>
            <span className="dot-state" aria-hidden="true">
              {isCorrect ? <IconCheck /> : timedOut ? <IconClockX /> : <IconX />}
            </span>
          </a>
        );
      })}
    </nav>
  );
};
