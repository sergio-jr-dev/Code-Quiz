import { random, useCurrentFrame } from 'remotion';

// Frame-based particles are reproducible when scrubbing and exporting.
export const Confetti = () => {
  const frame = useCurrentFrame();
  const time = Math.max(0, frame - 14) / 30;
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 100 }, (_, index) => {
        const side = index % 2 === 0 ? 1 : -1;
        const velocityX = (150 + random(`x-${index}`) * 380) * side;
        const velocityY = -420 - random(`y-${index}`) * 460;
        return (
          <span
            key={index}
            style={{
              position: 'absolute',
              left: (side === 1 ? 100 : 980) + velocityX * time,
              top: 860 + velocityY * time + 270 * time * time,
              width: 9 + random(`size-${index}`) * 8,
              height: 18,
              background: ['#a78bfa', '#efeeee', '#f2c94c', '#75cf8a'][index % 4],
              rotate: `${time * (130 + random(`spin-${index}`) * 400)}deg`,
              opacity: frame < 14 ? 0 : Math.max(0, Math.min(1, 3.2 - time)),
            }}
          />
        );
      })}
    </div>
  );
};
