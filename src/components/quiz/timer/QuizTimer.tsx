import { IconClock } from '@tabler/icons-react';
import type { CSSProperties } from 'react';

import { systemQuizTimerClock, type QuizTimerClock } from '../../../hooks/useQuizTimer';
import { useRemainingTime } from '../../../hooks/useRemainingTime';
import { useQuizStore } from '../../../stores/quizStore';
import type { QuizTimerStatus } from '../../../types/quizStore';

import './quizTimer.css';

const timerStatusLabels: Readonly<Record<QuizTimerStatus, string>> = {
  running: 'En curso',
  paused: 'Pausado',
  answered: 'Detenido',
  expired: 'Agotado',
};

export const QuizTimer = ({ clock = systemQuizTimerClock }: { clock?: QuizTimerClock }) => {
  const mode = useQuizStore((state) => state.mode);
  const timer = useQuizStore((state) => state.timer);
  const remainingMs = useRemainingTime(timer, clock);

  if (mode !== 'timed' || timer === null || remainingMs === null) return null;

  const remainingSeconds = Math.ceil(remainingMs / 1_000);
  const durationSeconds = timer.durationMs / 1_000;
  const remainingRatio = remainingSeconds / durationSeconds;
  const perimeterStyle = {
    '--timer-progress': `${Math.min(100, Math.max(0, remainingRatio * 100))}%`,
  } as CSSProperties;
  const urgency =
    remainingSeconds <= 5 ? 'critical' : remainingSeconds <= 10 ? 'warning' : 'normal';
  const statusLabel =
    timer.status === 'running' && urgency === 'critical'
      ? 'Últimos segundos'
      : timerStatusLabels[timer.status];

  return (
    <div className="quiz-timer" data-status={timer.status} data-urgency={urgency}>
      <div className="quiz-timer-copy">
        <IconClock aria-hidden="true" stroke={2} />
        <span id="quiz-timer-label">
          Tiempo restante: <strong>{remainingSeconds} s</strong>
        </span>
        <span id="quiz-timer-status" className="quiz-timer-status">
          {statusLabel}
        </span>
      </div>
      <progress
        className="visually-hidden"
        aria-labelledby="quiz-timer-label quiz-timer-status"
        value={remainingSeconds}
        max={durationSeconds}
      >
        {remainingSeconds} de {durationSeconds} segundos
      </progress>
      <span className="timer-perimeter" style={perimeterStyle} aria-hidden="true" />
    </div>
  );
};
