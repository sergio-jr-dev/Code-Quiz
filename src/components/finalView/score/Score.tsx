import { IconReload, IconReportAnalytics } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';

import { useQuiz } from '../../../context/QuizContext';

import './score.css';

export const Score = () => {
  const { score, shuffleQuestions, handleRestart, showReview, showResults } = useQuiz();

  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const percentage = (score / shuffleQuestions.length) * 100;
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
            {score} / {shuffleQuestions.length}
          </span>
        </div>
        <div>
          <span>{percentage.toFixed()}%</span>
        </div>
      </div>
      <p>
        Has contestado correctamente {score} preguntas de un total de {shuffleQuestions.length},
        consiguiendo un porcentaje de acierto de ({percentage.toFixed()}%).
      </p>

      <div className="buttons">
        {!showResults && (
          <button onClick={showReview}>
            <IconReportAnalytics aria-hidden="true" stroke={2} />
            Ver resultados
          </button>
        )}
        <button onClick={handleRestart}>
          <IconReload aria-hidden="true" stroke={2} />
          Jugar de nuevo
        </button>
      </div>
    </article>
  );
};
