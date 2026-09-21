import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import type { QuizTimerClock } from '../../../hooks/useQuizTimer';
import { useQuizStore } from '../../../stores/quizStore';
import { questionExamples } from '../../../test/fixtures/questionExamples';
import { QuizTimer } from './QuizTimer';

class FakeClock implements QuizTimerClock {
  nowMs = 1_000;
  nextTaskId = 1;
  tasks = new Map<number, { callback: () => void; dueAt: number }>();

  now = () => this.nowMs;

  schedule = (callback: () => void, delayMs: number) => {
    const taskId = this.nextTaskId++;
    this.tasks.set(taskId, { callback, dueAt: this.nowMs + delayMs });
    return taskId as ReturnType<typeof setTimeout>;
  };

  cancel = (task: ReturnType<typeof setTimeout>) => {
    this.tasks.delete(task as number);
  };

  advanceBy(deltaMs: number) {
    const targetTime = this.nowMs + deltaMs;

    while (true) {
      const nextTask = [...this.tasks.entries()]
        .filter(([, task]) => task.dueAt <= targetTime)
        .sort(([, first], [, second]) => first.dueAt - second.dueAt)[0];
      if (!nextTask) break;

      const [taskId, task] = nextTask;
      this.tasks.delete(taskId);
      this.nowMs = task.dueAt;
      task.callback();
    }

    this.nowMs = targetTime;
  }
}

describe('QuizTimer', () => {
  beforeEach(() => {
    useQuizStore.setState({
      mode: 'timed',
      timer: {
        questionId: questionExamples[0]!.id,
        durationMs: 60_000,
        remainingMs: 60_000,
        status: 'running',
        referenceTimeMs: 1_000,
      },
    });
  });

  it('keeps its text and visual value synchronized with the absolute time', () => {
    const clock = new FakeClock();
    render(<QuizTimer clock={clock} />);

    expect(screen.getByText('Tiempo restante:')).toHaveTextContent('Tiempo restante: 60 s');
    expect(screen.getByText('En curso')).toBeVisible();
    expect(screen.getByRole('progressbar', { name: /Tiempo restante: 60 s En curso/ })).toHaveValue(
      60,
    );

    act(() => clock.advanceBy(1_000));

    expect(screen.getByText('Tiempo restante:')).toHaveTextContent('Tiempo restante: 59 s');
    expect(screen.getByRole('progressbar', { name: /Tiempo restante: 59 s En curso/ })).toHaveValue(
      59,
    );
  });

  it('freezes the displayed value and names the stopped state after answering', () => {
    const clock = new FakeClock();
    render(<QuizTimer clock={clock} />);

    act(() => {
      clock.advanceBy(5_000);
      useQuizStore.setState({
        timer: {
          ...useQuizStore.getState().timer!,
          remainingMs: 55_000,
          status: 'answered',
          referenceTimeMs: null,
        },
      });
    });

    expect(screen.getByText('Tiempo restante:')).toHaveTextContent('Tiempo restante: 55 s');
    expect(screen.getByText('Detenido')).toBeVisible();
    expect(clock.tasks).toHaveLength(0);

    act(() => clock.advanceBy(20_000));
    expect(screen.getByText('Tiempo restante:')).toHaveTextContent('Tiempo restante: 55 s');
  });

  it('uses textual urgency states and keeps the decorative perimeter synchronized', () => {
    const clock = new FakeClock();
    const { container } = render(<QuizTimer clock={clock} />);

    act(() => clock.advanceBy(50_000));

    expect(container.querySelector('.quiz-timer')).toHaveAttribute('data-urgency', 'warning');
    expect(screen.getByText('En curso')).toBeVisible();

    act(() => clock.advanceBy(5_001));

    expect(container.querySelector('.quiz-timer')).toHaveAttribute('data-urgency', 'critical');
    expect(screen.getByText('Últimos segundos')).toBeVisible();

    const perimeter = container.querySelector<HTMLElement>('.timer-perimeter');
    expect(perimeter).toHaveStyle({ '--timer-progress': `${(5 / 60) * 100}%` });
    expect(perimeter).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getAllByRole('progressbar')).toHaveLength(1);
  });

  it('is absent in normal mode', () => {
    useQuizStore.setState({ mode: 'normal', timer: null });

    render(<QuizTimer clock={new FakeClock()} />);

    expect(screen.queryByText(/Tiempo restante/)).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
