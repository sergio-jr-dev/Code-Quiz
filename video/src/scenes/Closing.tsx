import { Img, Interactive, interpolate, staticFile, useCurrentFrame } from 'remotion';

import { SceneFrame } from '../components/SceneFrame';

export const Closing = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame chapter="¿JUGAMOS?">
      <Interactive.Div
        name="Cierre y enlace"
        className="closing"
        style={{
          opacity: interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' }),
          translate: interpolate(frame, [0, 24], ['0px 30px', '0px 0px'], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <Img className="brand-logo" src={staticFile('images/code-quiz-logo-dark.webp')} />
        <h1 className="headline centered">
          Tu próxima
          <br />
          partida
          <br />
          <span>empieza aquí.</span>
        </h1>
        <Interactive.Div
          name="Juega gratis"
          className="closing-cta"
          style={{
            scale: interpolate(frame, [18, 34, 43, 54], [0.88, 1.08, 0.98, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            opacity: interpolate(frame, [18, 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          Juega gratis
          <span
            className="cta-glint"
            aria-hidden="true"
            style={{
              translate: interpolate(frame, [36, 58], ['-220px 0px', '620px 0px'], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              opacity: interpolate(frame, [35, 36, 56, 58], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        </Interactive.Div>
        <Interactive.P
          name="Enlace al juego"
          className="url"
          style={{
            opacity: interpolate(frame, [30, 48], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            translate: interpolate(frame, [30, 50], ['0px 24px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          codequiz-game.vercel.app
          <span
            className="url-underline"
            aria-hidden="true"
            style={{
              scale: `${interpolate(frame, [44, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} 1`,
            }}
          />
        </Interactive.P>
        <p className="closing-detail">HTML · CSS · JavaScript</p>
      </Interactive.Div>
      <small
        className="music-credit"
        style={{
          opacity: interpolate(frame, [42, 60], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Música: «Cipher» · Kevin MacLeod · incompetech.com
        <br />
        CC BY 4.0 · Fragmento con fundidos
      </small>
    </SceneFrame>
  );
};
