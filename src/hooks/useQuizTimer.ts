import { useEffect } from 'react';

import { getRemainingTimeMs } from '../lib/quizTransitions';
import { useQuizStore } from '../stores/quizStore';

export interface QuizTimerClock {
  now: () => number;
  schedule: (callback: () => void, delayMs: number) => ReturnType<typeof setTimeout>;
  cancel: (task: ReturnType<typeof setTimeout>) => void;
}

export interface QuizVisibilitySource {
  readonly hidden: boolean;
  addEventListener: (type: 'visibilitychange', listener: () => void) => void;
  removeEventListener: (type: 'visibilitychange', listener: () => void) => void;
}

const systemClock: QuizTimerClock = {
  now: Date.now,
  schedule: (callback, delayMs) => setTimeout(callback, delayMs),
  cancel: (task) => clearTimeout(task),
};

const getDocumentVisibility = (): QuizVisibilitySource | null =>
  typeof document === 'undefined' ? null : document;

export const useQuizTimer = (
  clock: QuizTimerClock = systemClock,
  visibilitySource: QuizVisibilitySource | null = getDocumentVisibility(),
) => {
  const mode = useQuizStore((state) => state.mode);
  const view = useQuizStore((state) => state.view);
  const questionId = useQuizStore((state) => state.round[state.currentQuestionIndex]?.id ?? null);
  const timer = useQuizStore((state) => state.timer);

  useEffect(() => {
    if (mode !== 'timed' || view !== 'playing' || questionId === null) return;

    const nowMs = clock.now();
    const { pauseTimer, startTimer } = useQuizStore.getState();
    startTimer(nowMs);

    if (visibilitySource?.hidden) pauseTimer(nowMs);
  }, [clock, mode, questionId, view, visibilitySource]);

  useEffect(() => {
    if (mode !== 'timed' || view !== 'playing' || timer?.status !== 'running') return;

    let scheduledTask: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const scheduleExpiration = () => {
      const currentTimer = useQuizStore.getState().timer;
      if (cancelled || currentTimer?.status !== 'running') return;

      const remainingMs = getRemainingTimeMs(currentTimer, clock.now());
      scheduledTask = clock.schedule(() => {
        const { expireQuestion } = useQuizStore.getState();
        expireQuestion(clock.now());

        if (useQuizStore.getState().timer?.status === 'running') scheduleExpiration();
      }, remainingMs);
    };

    scheduleExpiration();

    return () => {
      cancelled = true;
      if (scheduledTask !== null) clock.cancel(scheduledTask);
    };
  }, [clock, mode, timer, view]);

  useEffect(() => {
    if (mode !== 'timed' || view !== 'playing' || visibilitySource === null) return;

    const handleVisibilityChange = () => {
      const nowMs = clock.now();
      const { expireQuestion, pauseTimer, resumeTimer } = useQuizStore.getState();

      if (visibilitySource.hidden) {
        expireQuestion(nowMs);
        pauseTimer(nowMs);
        return;
      }

      resumeTimer(nowMs);
    };

    visibilitySource.addEventListener('visibilitychange', handleVisibilityChange);
    return () => visibilitySource.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [clock, mode, view, visibilitySource]);
};
