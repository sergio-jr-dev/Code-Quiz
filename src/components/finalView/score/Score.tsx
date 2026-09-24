import { useEffect, useRef } from 'react';

import { selectBestResult } from '../../../lib/quizRecords';
import { calculateScore } from '../../../lib/quizTransitions';
import { useQuizStore } from '../../../stores/quizStore';
import { PostQuizActions } from '../postQuizActions/PostQuizActions';
import { ResultsSummary } from '../summary/ResultsSummary';

import './score.css';

export const Score = () => {
  const score = useQuizStore(calculateScore);
  const totalQuestions = useQuizStore((state) => state.round.length);
  const answers = useQuizStore((state) => state.answers);
  const mode = useQuizStore((state) => state.mode);
  const bestResult = useQuizStore(selectBestResult);

  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const percentage = (score / totalQuestions) * 100;
  const timedOutAnswers = answers.filter((answer) => answer.timedOut === true).length;
  const selectedIncorrectAnswers = totalQuestions - score - timedOutAnswers;
  const modeLabel = mode === 'timed' ? 'Modo cronómetro' : 'Modo normal';
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

  const resultAnnouncement = `Resultado: ${score} de ${totalQuestions} aciertos. Precisión: ${percentage.toFixed()}%.`;

  return (
    <article className="score">
      <p className="visually-hidden" role="status" aria-atomic="true">
        {resultAnnouncement}
      </p>
      <div className="score-heading">
        <div>
          <p className="score-eyebrow">Partida completada · {modeLabel}</p>
          <h2 className="message" ref={headingRef} tabIndex={-1}>
            {message}
          </h2>
          <p className="score-message">{supportingMessage}</p>
        </div>
      </div>

      <div className="score-metrics" aria-label="Resumen de la puntuación">
        <dl className="score-primary">
          <dt>Aciertos</dt>
          <dd>
            <strong>{score}</strong>
            <span> / {totalQuestions}</span>
          </dd>
        </dl>
        <dl className="score-secondary">
          <div>
            <dt>{mode === 'timed' ? 'Incorrectas' : 'Errores'}</dt>
            <dd>{selectedIncorrectAnswers}</dd>
          </div>
          {mode === 'timed' && (
            <div>
              <dt>Tiempo agotado</dt>
              <dd>{timedOutAnswers}</dd>
            </div>
          )}
          <div>
            <dt>Precisión</dt>
            <dd>{percentage.toFixed()}%</dd>
          </div>
        </dl>
      </div>
      {bestResult !== undefined ? (
        <p className="score-best-result">
          {mode === 'timed'
            ? `Mejor resultado en modo cronómetro para esta configuración: ${bestResult} / 10`
            : `Mejor resultado en esta configuración: ${bestResult} / 10`}
        </p>
      ) : null}

      <ResultsSummary />

      <PostQuizActions />
    </article>
  );
};
