import { Easing, interpolate, useCurrentFrame } from 'remotion';

import { demoQuestion } from '../data';

type Props = {
  state?: 'unanswered' | 'correct' | 'review';
  seconds?: number;
  entry?: 'static' | 'cascade';
};

export const QuizCard = ({ state = 'unanswered', seconds, entry = 'static' }: Props) => {
  const frame = useCurrentFrame();
  return (
    <div
      className="quiz-perimeter"
      style={
        seconds === undefined
          ? undefined
          : {
              background: `conic-gradient(var(--accent) ${(seconds / 60) * 360}deg, var(--option) 0deg)`,
              padding: 5,
            }
      }
    >
      <div className="quiz-card">
        <div className="quiz-meta">
          <span>{state === 'review' ? 'Revisión · HTML' : 'Pregunta 1 de 10'}</span>
          <span>
            {seconds === undefined ? 'HTML · Básico' : `${Math.ceil(seconds)} s · En curso`}
          </span>
        </div>
        <div className="progress-track">
          <div />
        </div>
        <h2>{demoQuestion.prompt}</h2>
        <div className="answers">
          {demoQuestion.options.map((option, index) => {
            const correct = state !== 'unanswered' && option.id === demoQuestion.correctAnswer;
            const wrong = state === 'review' && option.id === 'b';
            return (
              <div
                key={option.id}
                className={`answer ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}
                style={
                  entry === 'cascade'
                    ? {
                        opacity: interpolate(frame, [22 + index * 9, 36 + index * 9], [0, 1], {
                          extrapolateLeft: 'clamp',
                          extrapolateRight: 'clamp',
                        }),
                        translate: `0px ${interpolate(
                          frame,
                          [22 + index * 9, 40 + index * 9],
                          [28, 0],
                          {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                            easing: Easing.out(Easing.cubic),
                          },
                        )}px`,
                      }
                    : undefined
                }
              >
                <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                <code>{option.text}</code>
                {correct ? (
                  <span className="answer-mark">✓</span>
                ) : wrong ? (
                  <span className="answer-mark">×</span>
                ) : null}
              </div>
            );
          })}
        </div>
        {state !== 'unanswered' ? (
          <div className="feedback">
            <p className={state === 'review' ? 'error-copy' : 'success-copy'}>
              {state === 'review'
                ? 'Elegiste B. La correcta es A.'
                : '✓ ¡Correcto! La opción A es la respuesta.'}
            </p>
            <div className="explanation">
              <strong>Por qué es correcta</strong>
              <p>{demoQuestion.explanation}</p>
            </div>
          </div>
        ) : (
          <div className="quiz-actions">
            <span>Salir de la partida</span>
            <span className="next-disabled">Siguiente →</span>
          </div>
        )}
      </div>
    </div>
  );
};
