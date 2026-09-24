import { useEffect, useReducer } from 'react';

import { getRemainingTimeMs } from '../lib/quizTransitions';
import type { QuizTimerState } from '../types/quizStore';
import { systemQuizTimerClock, type QuizTimerClock } from './useQuizTimer';

const getNextSecondDelay = (remainingMs: number): number => remainingMs % 1_000 || 1_000;

export const useRemainingTime = (
  timer: QuizTimerState | null,
  clock: QuizTimerClock = systemQuizTimerClock,
): number | null => {
  const [, refresh] = useReducer((version: number) => version + 1, 0);

  useEffect(() => {
    if (timer?.status !== 'running') return;

    let scheduledTask: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const scheduleNextSecond = () => {
      const currentTimeMs = clock.now();
      const remainingMs = getRemainingTimeMs(timer, currentTimeMs);
      if (cancelled || remainingMs <= 0) return;

      scheduledTask = clock.schedule(() => {
        refresh();
        scheduleNextSecond();
      }, getNextSecondDelay(remainingMs));
    };

    scheduleNextSecond();

    return () => {
      cancelled = true;
      if (scheduledTask !== null) clock.cancel(scheduledTask);
    };
  }, [clock, timer]);

  if (timer === null) return null;
  return timer.status === 'running' ? getRemainingTimeMs(timer, clock.now()) : timer.remainingMs;
};
