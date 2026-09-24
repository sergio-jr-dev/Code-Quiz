import { Img, Interactive, interpolate, staticFile, useCurrentFrame } from 'remotion';

import { SceneFrame } from '../components/SceneFrame';
import { subjects } from '../data';

export const Brand = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame chapter="TRES MATERIAS">
      <Interactive.Div
        name="Marca"
        style={{
          marginBlockStart: 55,
          scale: interpolate(frame, [0, 22], [0.88, 1], { extrapolateRight: 'clamp' }),
          opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <Img className="brand-logo" src={staticFile('images/code-quiz-logo-dark.webp')} />
      </Interactive.Div>
      <h1 className="headline centered">
        Aprende.
        <br />
        <span>Juega. Repite.</span>
      </h1>
      <div className="subjects-row">
        {subjects.map((subject, index) => (
          <div
            key={subject.id}
            style={{
              opacity: interpolate(frame, [25 + index * 9, 42 + index * 9], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              translate: `0px ${interpolate(frame, [25 + index * 9, 46 + index * 9], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px`,
            }}
          >
            <Img src={staticFile(`images/subjects/${subject.id}-logo-3d.png`)} />
            <strong>{subject.label}</strong>
          </div>
        ))}
      </div>
    </SceneFrame>
  );
};
