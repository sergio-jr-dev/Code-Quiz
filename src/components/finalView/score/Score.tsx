import { IconReload, IconReportAnalytics } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';

import { calculateScore } from '../../../lib/quizTransitions';
import { useQuizStore } from '../../../stores/quizStore';

import './score.css';

export const Score = () => {
  const score = useQuizStore(calculateScore);
  const totalQuestions = useQuizStore((state) => state.round.length);
  const restartRound = useQuizStore((state) => state.restartRound);
  const showReview = useQuizStore((state) => state.showReview);
  const showResults = useQuizStore((state) => state.view === 'review');

  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const percentage = (score / totalQuestions) * 100;
  const message =
    percentage >= 80
      ? '¡Excelente trabajo!'
      : percentage >= 60
        ? '¡Buen intento!'
        : '¡Sigue practicando!';

  return (
    <article className="score">
      <h2 className="message" ref={headingRef} tabIndex={-1}>
        {message}
      </h2>
      <div className="score-circles">
        <div>
          <span>
            {score} / {totalQuestions}
          </span>
        </div>
        <div>
          <span>{percentage.toFixed()}%</span>
        </div>
      </div>
      <p>
        Has contestado correctamente {score} preguntas de un total de {totalQuestions}, consiguiendo
        un porcentaje de acierto de ({percentage.toFixed()}%).
      </p>

      <div className="buttons">
        {!showResults && (
          <button onClick={showReview}>
            <IconReportAnalytics aria-hidden="true" stroke={2} />
            Ver resultados
          </button>
        )}
        <button onClick={restartRound}>
          <IconReload aria-hidden="true" stroke={2} />
          Jugar de nuevo
        </button>
      </div>
    </article>
  );
};
