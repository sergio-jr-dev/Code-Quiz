import { interpolate, useCurrentFrame } from 'remotion';

import { QuizCard } from '../components/QuizCard';
import { SceneFrame } from '../components/SceneFrame';

export const Themes = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {(['dark', 'light'] as const).map((theme) => (
        <div
          key={theme}
          style={{
            position: 'absolute',
            inset: 0,
            clipPath:
              theme === 'light'
                ? `inset(0 ${interpolate(frame, [64, 94], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}% 0 0)`
                : undefined,
          }}
        >
          <SceneFrame chapter="TU FORMA DE JUGAR" theme={theme}>
            <h1 className="headline">
              Claro u oscuro.
              <br />
              <span>Tú eliges.</span>
            </h1>
            <div className="theme-label">
              <span>{theme === 'dark' ? '☾' : '☀'}</span> Modo{' '}
              {theme === 'dark' ? 'oscuro' : 'claro'}
            </div>
            <QuizCard />
          </SceneFrame>
        </div>
      ))}
    </>
  );
};
