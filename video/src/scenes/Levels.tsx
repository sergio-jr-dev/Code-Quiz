import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

import { SceneFrame } from '../components/SceneFrame';
import { levels } from '../data';

export const Levels = () => {
  const frame = useCurrentFrame();
  const selected = Math.min(2, Math.floor(frame / 48));
  return (
    <SceneFrame chapter="ELIGE TU NIVEL">
      <h1 className="headline">
        Tres niveles.
        <br />
        <span>En cada materia.</span>
      </h1>
      <div className="level-list">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className={`level-row ${selected === index ? 'selected' : ''}`}
            style={{
              translate: `0px ${interpolate(frame, [index * 8, 20 + index * 8], [38, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px`,
              opacity: interpolate(frame, [index * 8, 16 + index * 8], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <Img src={staticFile(`images/levels/${level.id}.png`)} />
            <strong>{level.label}</strong>
            <span>{selected === index ? '✓' : `0${index + 1}`}</span>
          </div>
        ))}
      </div>
      <p className="support">
        Empieza por tus fundamentos.
        <br />
        Avanza hasta los casos difíciles.
      </p>
    </SceneFrame>
  );
};
