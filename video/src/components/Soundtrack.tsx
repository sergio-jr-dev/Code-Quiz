import { Audio } from '@remotion/media';
import { interpolate, staticFile, useVideoConfig } from 'remotion';

export const Soundtrack = () => {
  const { durationInFrames } = useVideoConfig();
  return (
    <Audio
      src={staticFile('audio/cipher-kevin-macleod.mp3')}
      durationInFrames={durationInFrames}
      volume={(frame) =>
        interpolate(
          frame,
          [0, 18, durationInFrames - 75, durationInFrames - 1],
          [0, 0.55, 0.55, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          },
        )
      }
    />
  );
};
