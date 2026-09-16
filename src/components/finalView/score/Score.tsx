import { useEffect, useRef } from 'react';

import { selectBestResult } from '../../../lib/quizRecords';
import { calculateScore } from '../../../lib/quizTransitions';
import { useQuizStore } from '../../../stores/quizStore';
import { PostQuizActions } from '../postQuizActions/PostQuizActions';
import { ResultsSummary } from '../summary/ResultsSummary';
import { CircularMetric } from './CircularMetric';

import './score.css';

export const Score = () => {
  const score = useQuizStore(calculateScore);
  const totalQuestions = useQuizStore((state) => state.round.length);
  const bestResult = useQuizStore(selectBestResult);

  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const percentage = (score / totalQuestions) * 100;
  const message =
    percentage === 100
      ? '¡Ronda perfecta!'
      : percentage >= 80
        ? '¡Excelente trabajo!'
        : percentage >= 60
          ? '¡Buen progreso!'
          : 'Cada intento suma';

  const supportingMessage =
    percentage === 100
      ? 'Has dominado esta selección. ¿Te atreves con otra ronda?'
      : percentage >= 80
        ? 'Muy cerca del pleno. Revisa los detalles y consolida lo aprendido.'
        : percentage >= 60
          ? 'La base está ahí. La revisión te mostrará dónde ganar precisión.'
          : 'Revisa las respuestas con calma: entender el porqué es el verdadero avance.';

  return (
    <article className="score">
      <div className="score-heading">
        <img
          className="score-trophy"
          src={`${import.meta.env.BASE_URL}images/results/trophy.png`}
          alt=""
          aria-hidden="true"
          width="256"
          height="256"
        />
        <div>
          <p className="score-eyebrow">Partida completada</p>
          <h2 className="message" ref={headingRef} tabIndex={-1}>
            {message}
          </h2>
          <p className="score-message">{supportingMessage}</p>
          {bestResult !== undefined ? (
            <p className="score-best-result">
              Mejor resultado en esta configuración: {bestResult} / 10
            </p>
          ) : null}
        </div>
      </div>

      <div className="score-metrics" aria-label="Resumen de la puntuación">
        <CircularMetric
          label="Aciertos"
          displayValue={`${score} / ${totalQuestions}`}
          value={score}
          max={totalQuestions}
          icon={`${import.meta.env.BASE_URL}images/results/correct.png`}
          tone="correct"
        />
        <CircularMetric
          label="Errores"
          displayValue={String(totalQuestions - score)}
          value={totalQuestions - score}
          max={totalQuestions}
          icon={`${import.meta.env.BASE_URL}images/results/errors.png`}
          tone="incorrect"
        />
        <CircularMetric
          label="Precisión"
          displayValue={`${percentage.toFixed()}%`}
          value={percentage}
          max={100}
          icon={`${import.meta.env.BASE_URL}images/results/accuracy.png`}
          tone="progress"
        />
      </div>

      <ResultsSummary />

      <PostQuizActions />
    </article>
  );
};
