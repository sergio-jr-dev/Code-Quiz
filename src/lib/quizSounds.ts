export type QuizSound = 'success' | 'error' | 'warning' | 'complete';

let unlocked = false;
let activeAudio: HTMLAudioElement | null = null;

// Called only from an explicit control or quiz interaction, never during hydration.
export const unlockQuizSounds = () => {
  unlocked = true;
};

export const stopQuizSound = () => {
  activeAudio?.pause();
  activeAudio = null;
};

export const playQuizSound = (cue: QuizSound, enabled: boolean) => {
  if (!enabled || !unlocked || typeof Audio === 'undefined') return;
  if (typeof document !== 'undefined' && document.hidden) return;
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  stopQuizSound();

  try {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/soft/${cue}.mp3`);
    audio.volume = 0.25;
    activeAudio = audio;
    audio.addEventListener(
      'ended',
      () => {
        if (activeAudio === audio) activeAudio = null;
      },
      { once: true },
    );
    void audio.play().catch(() => {
      if (activeAudio === audio) activeAudio = null;
    });
  } catch {
    activeAudio = null;
  }
};
