import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('quiz sounds', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.unstubAllGlobals();
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList);
  });

  it('stays silent until a quiz or preference interaction unlocks audio', async () => {
    const play = vi.fn().mockResolvedValue(undefined);
    const pause = vi.fn();
    const AudioMock = vi.fn(function AudioMock() {
      return { play, pause, addEventListener: vi.fn(), volume: 1 };
    });
    vi.stubGlobal('Audio', AudioMock);
    const sounds = await import('./quizSounds');

    sounds.playQuizSound('success', true);
    expect(AudioMock).not.toHaveBeenCalled();

    sounds.unlockQuizSounds();
    sounds.playQuizSound('success', false);
    expect(AudioMock).not.toHaveBeenCalled();

    sounds.playQuizSound('success', true);
    expect(AudioMock).toHaveBeenCalledWith('/sounds/soft/success.mp3');
    expect(play).toHaveBeenCalledOnce();
  });

  it('stops the previous cue and an active cue when muted', async () => {
    const instances: {
      play: ReturnType<typeof vi.fn>;
      pause: ReturnType<typeof vi.fn>;
      volume: number;
    }[] = [];
    vi.stubGlobal(
      'Audio',
      vi.fn(function AudioMock() {
        const audio = {
          play: vi.fn().mockResolvedValue(undefined),
          pause: vi.fn(),
          addEventListener: vi.fn(),
          volume: 1,
        };
        instances.push(audio);
        return audio;
      }),
    );
    const sounds = await import('./quizSounds');
    sounds.unlockQuizSounds();

    sounds.playQuizSound('error', true);
    sounds.playQuizSound('warning', true);
    expect(instances[0]?.pause).toHaveBeenCalledOnce();
    expect(instances[1]?.volume).toBe(0.25);
    sounds.stopQuizSound();
    expect(instances[1]?.pause).toHaveBeenCalledOnce();
  });

  it('does not create audio when reduced motion is requested', async () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    const AudioMock = vi.fn();
    vi.stubGlobal('Audio', AudioMock);
    const sounds = await import('./quizSounds');

    sounds.unlockQuizSounds();
    sounds.playQuizSound('complete', true);

    expect(AudioMock).not.toHaveBeenCalled();
  });
});
