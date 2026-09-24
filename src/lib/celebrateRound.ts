import confetti from 'canvas-confetti';

import { prefersReducedMotion } from './motionPreference';

export const celebrateRound = (score: number, total: number) => {
  if (total <= 0 || score / total < 0.8 || prefersReducedMotion()) return;

  const options = { disableForReducedMotion: true, ticks: 160, gravity: 1.1 };
  if (score === total) {
    void confetti({
      ...options,
      particleCount: 70,
      spread: 65,
      angle: 60,
      origin: { x: 0.1, y: 0.65 },
    });
    void confetti({
      ...options,
      particleCount: 70,
      spread: 65,
      angle: 120,
      origin: { x: 0.9, y: 0.65 },
    });
  } else {
    void confetti({
      ...options,
      particleCount: 55,
      spread: 65,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.55 },
    });
  }
};
