import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

import { SceneFrame } from '../components/SceneFrame';
import { subjects } from '../data';

export const Catalog = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame chapter="EL CATÁLOGO">
      <div className="catalog-number">
        {Math.round(interpolate(frame, [0, 32], [0, 180], { extrapolateRight: 'clamp' }))}
      </div>
      <h1 className="headline centered">
        preguntas.
        <br />
        <span>Mucho por aprender.</span>
      </h1>
      <div className="catalog-breakdown">
        {subjects.map((subject, index) => (
          <div
            key={subject.id}
            style={{
              opacity: interpolate(frame, [36 + index * 33, 45 + index * 33], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <Img src={staticFile(`images/subjects/${subject.id}-logo-3d.png`)} />
            <strong>
              {Math.round(
                interpolate(frame, [45 + index * 33, 72 + index * 33], [0, 60], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              )}
            </strong>
            <span>{subject.label}</span>
          </div>
        ))}
      </div>
      <p className="support centered">60 por lenguaje · 10 por partida</p>
    </SceneFrame>
  );
};
