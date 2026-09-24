import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useQuizStore } from '../stores/quizStore';
import { questionExamples as questions } from '../test/fixtures/questionExamples';
import type { QuizTimerClock, QuizVisibilitySource } from './useQuizTimer';
import { useQuizTimer } from './useQuizTimer';

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

class FakeVisibilitySource implements QuizVisibilitySource {
  hidden = false;
  listeners = new Set<() => void>();

  addEventListener = (_type: 'visibilitychange', listener: () => void) => {
    this.listeners.add(listener);
  };

  removeEventListener = (_type: 'visibilitychange', listener: () => void) => {
    this.listeners.delete(listener);
  };

  setHidden(hidden: boolean) {
    this.hidden = hidden;
    for (const listener of this.listeners) listener();
  }
}

const setPlayingState = (mode: 'normal' | 'timed' = 'timed') => {
  const question = questions[0]!;
  useQuizStore.setState({
    mode,
    timer: null,
    configuration: { subject: question.subject, level: question.level },
    round: [question],
    currentQuestionIndex: 0,
    answers: [],
    view: 'playing',
    roundSource: 'configured',
    decks: {},
    mixedExtraSubjects: {},
    bestResults: {},
  });
};

describe('useQuizTimer', () => {
  beforeEach(() => setPlayingState());

  it('starts the current question and expires it once at its absolute deadline', () => {
    const clock = new FakeClock();
    const visibility = new FakeVisibilitySource();

    renderHook(() => useQuizTimer(clock, visibility));

    expect(useQuizStore.getState().timer).toMatchObject({
      remainingMs: 60_000,
      status: 'running',
      referenceTimeMs: 1_000,
    });
    expect(clock.tasks).toHaveLength(1);

    act(() => clock.advanceBy(60_000));

    expect(useQuizStore.getState().timer).toMatchObject({
      remainingMs: 0,
      status: 'expired',
      referenceTimeMs: null,
    });
    expect(useQuizStore.getState().answers).toEqual([
      {
        questionId: questions[0]!.id,
        selectedOptionId: null,
        timedOut: true,
      },
    ]);
    expect(clock.tasks).toHaveLength(0);
  });

  it('excludes hidden time and resumes from the exact paused remainder', () => {
    const clock = new FakeClock();
    const visibility = new FakeVisibilitySource();

    renderHook(() => useQuizTimer(clock, visibility));

    act(() => clock.advanceBy(10_000));
    act(() => visibility.setHidden(true));

    expect(useQuizStore.getState().timer).toMatchObject({
      remainingMs: 50_000,
      status: 'paused',
      referenceTimeMs: null,
    });
    expect(clock.tasks).toHaveLength(0);

    act(() => clock.advanceBy(120_000));
    expect(useQuizStore.getState().timer?.remainingMs).toBe(50_000);

    act(() => visibility.setHidden(false));
    expect(useQuizStore.getState().timer).toMatchObject({
      remainingMs: 50_000,
      status: 'running',
      referenceTimeMs: 131_000,
    });

    act(() => clock.advanceBy(49_999));
    expect(useQuizStore.getState().timer?.status).toBe('running');

    act(() => clock.advanceBy(1));
    expect(useQuizStore.getState().timer?.status).toBe('expired');
  });

  it('starts paused when the question is mounted in a hidden document', () => {
    const clock = new FakeClock();
    const visibility = new FakeVisibilitySource();
    visibility.hidden = true;

    renderHook(() => useQuizTimer(clock, visibility));

    expect(useQuizStore.getState().timer).toMatchObject({
      remainingMs: 60_000,
      status: 'paused',
      referenceTimeMs: null,
    });
    expect(clock.tasks).toHaveLength(0);
  });

  it('cleans scheduled work and the visibility listener after an answer and on unmount', () => {
    const clock = new FakeClock();
    const visibility = new FakeVisibilitySource();
    const { unmount } = renderHook(() => useQuizTimer(clock, visibility));

    expect(clock.tasks).toHaveLength(1);
    expect(visibility.listeners).toHaveLength(1);

    act(() => {
      clock.advanceBy(5_000);
      useQuizStore.getState().selectOption(questions[0]!.options[0]!.id, clock.now());
    });

    expect(useQuizStore.getState().timer).toMatchObject({
      remainingMs: 55_000,
      status: 'answered',
    });
    expect(clock.tasks).toHaveLength(0);

    unmount();
    expect(visibility.listeners).toHaveLength(0);
  });

  it('stops on response and starts a fresh deadline after advancing through store actions', () => {
    const clock = new FakeClock();
    const visibility = new FakeVisibilitySource();
    useQuizStore.setState({ round: [questions[0]!, questions[1]!] });

    renderHook(() => useQuizTimer(clock, visibility));
    const firstTaskId = [...clock.tasks.keys()][0];

    act(() => {
      clock.advanceBy(5_000);
      useQuizStore.getState().selectOption(questions[0]!.correctAnswer, clock.now());
    });

    expect(useQuizStore.getState().timer).toMatchObject({
      questionId: questions[0]!.id,
      remainingMs: 55_000,
      status: 'answered',
    });
    expect(clock.tasks).toHaveLength(0);

    act(() => useQuizStore.getState().goToNextQuestion());

    expect(useQuizStore.getState().currentQuestionIndex).toBe(1);
    expect(useQuizStore.getState().answers).toHaveLength(1);
    expect(clock.tasks).toHaveLength(1);
    expect(clock.tasks.has(firstTaskId!)).toBe(false);
    expect(useQuizStore.getState().timer).toMatchObject({
      questionId: questions[1]!.id,
      durationMs: 60_000,
      remainingMs: 60_000,
      status: 'running',
      referenceTimeMs: 6_000,
    });
  });

  it('starts with a clean full duration after restarting a completed configuration', () => {
    const clock = new FakeClock();
    const visibility = new FakeVisibilitySource();

    renderHook(() => useQuizTimer(clock, visibility));

    act(() => {
      clock.advanceBy(12_000);
      useQuizStore.getState().selectOption(questions[0]!.correctAnswer, clock.now());
      useQuizStore.getState().goToNextQuestion();
    });

    expect(useQuizStore.getState()).toMatchObject({ view: 'score', timer: null });
    expect(clock.tasks).toHaveLength(0);

    act(() => useQuizStore.getState().restartRound());

    expect(useQuizStore.getState()).toMatchObject({
      mode: 'timed',
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
      timer: {
        durationMs: 60_000,
        remainingMs: 60_000,
        status: 'running',
        referenceTimeMs: 13_000,
      },
    });
    expect(useQuizStore.getState().round).toHaveLength(10);
    expect(clock.tasks).toHaveLength(1);
  });

  it('does not create temporal work in normal mode', () => {
    setPlayingState('normal');
    const clock = new FakeClock();
    const visibility = new FakeVisibilitySource();

    renderHook(() => useQuizTimer(clock, visibility));

    expect(useQuizStore.getState().timer).toBeNull();
    expect(clock.tasks).toHaveLength(0);
    expect(visibility.listeners).toHaveLength(0);
  });
});
