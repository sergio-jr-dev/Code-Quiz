import { Img, staticFile, useCurrentFrame } from 'remotion';

import { QuizCard } from '../components/QuizCard';
import { SceneFrame } from '../components/SceneFrame';

export const Modes = () => {
  const frame = useCurrentFrame();
  const timed = frame >= 90;
  return (
    <SceneFrame chapter="DOS MODOS DE JUEGO">
      <h1 className="headline">
        {timed ? (
          <>
            …o <span>contrarreloj.</span>
          </>
        ) : (
          <>
            A <span>tu ritmo…</span>
          </>
        )}
      </h1>
      {timed ? (
        <div className="mode-game">
          <p className="mode-label">
            <Img src={staticFile('images/modes/timed.png')} />
            Cronómetro
          </p>
          <QuizCard seconds={60 - (frame - 90) / 30} />
        </div>
      ) : (
        <div className="normal-mode">
          <Img src={staticFile('images/modes/normal.png')} />
          <strong>Normal</strong>
          <p className="support">
            Sin límite de tiempo.
            <br />
            Piensa cada respuesta.
          </p>
        </div>
      )}
    </SceneFrame>
  );
};
