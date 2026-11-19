import { Interactive, interpolate, useCurrentFrame } from 'remotion';

import { QuizCard } from '../components/QuizCard';
import { SceneFrame } from '../components/SceneFrame';

export const Hook = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame chapter="EL RETO">
      <Interactive.H1
        name="Pregunta inicial"
        className="headline"
        style={{
          opacity: interpolate(frame, [0, 12], [0.3, 1], { extrapolateRight: 'clamp' }),
          translate: interpolate(frame, [0, 18], ['0px 24px', '0px 0px'], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        ¿Cuánto sabes
        <br />
        de <span>desarrollo web?</span>
      </Interactive.H1>
      <Interactive.Div
        name="Pregunta del catálogo"
        style={{
          marginBlockStart: 30,
          scale: interpolate(frame, [0, 119], [0.96, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <QuizCard entry="cascade" />
      </Interactive.Div>
    </SceneFrame>
  );
};
