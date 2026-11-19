import { Img, staticFile, useCurrentFrame } from 'remotion';

import { Confetti } from '../components/Confetti';
import { QuizCard } from '../components/QuizCard';
import { SceneFrame } from '../components/SceneFrame';

export const Results = () => {
  const frame = useCurrentFrame();
  const review = frame >= 105;
  return (
    <SceneFrame chapter={review ? 'CADA FALLO CUENTA' : 'CELEBRA LO APRENDIDO'}>
      <h1 className="headline">
        {review ? (
          <>
            Aprende
            <br />
            <span>de tus fallos.</span>
          </>
        ) : (
          <>
            Supera
            <br />
            <span>tu marca.</span>
          </>
        )}
      </h1>
      {review ? (
        <div className="review-card">
          <QuizCard state="review" />
        </div>
      ) : (
        <>
          <div className="result-block">
            <Img src={staticFile('images/levels/advanced.png')} />
            <strong className="result-score">
              10<span>/10</span>
            </strong>
            <p className="support">¡Partida perfecta!</p>
            <div className="result-details">
              <span>0 errores</span>
              <span>100 % de aciertos</span>
            </div>
          </div>
          <Confetti />
        </>
      )}
    </SceneFrame>
  );
};
