import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import confetti from 'canvas-confetti';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { questionCatalog } from '../../../data/questionCatalog';
import { useQuizStore } from '../../../stores/quizStore';
import { Buttons } from './Buttons';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

const prepareRound = (score: number, total = 10, timedOut = false) => {
  const round = questionCatalog.slice(0, total);
  useQuizStore.setState({
    mode: 'normal',
    timer: null,
    round,
    currentQuestionIndex: total - 1,
    view: 'playing',
    roundSource: 'incorrect-retry',
    bestResults: {},
    answers: round.map((question, index) =>
      index >= score && timedOut
        ? {
            questionId: question.id,
            selectedOptionId: null,
            timedOut: true as const,
          }
        : {
            questionId: question.id,
            selectedOptionId:
              index < score
                ? question.correctAnswer
                : question.options.find((option) => option.id !== question.correctAnswer)!.id,
          },
    ),
  });
};

describe('end-of-round celebration', () => {
  beforeEach(() => {
    vi.mocked(confetti).mockClear();
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList);
  });
  afterEach(() => vi.restoreAllMocks());

  it.each([
    [7, 0],
    [8, 1],
    [9, 1],
    [10, 2],
  ])('celebrates %i/10 with %i bursts only on completion', async (score, bursts) => {
    prepareRound(score);
    const user = userEvent.setup();
    render(<Buttons />);
    expect(confetti).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Finalizar' }));
    expect(useQuizStore.getState().view).toBe('score');
    expect(confetti).toHaveBeenCalledTimes(bursts);
    await user.click(screen.getByRole('button', { name: 'Finalizar' }));
    expect(confetti).toHaveBeenCalledTimes(bursts);
  });

  it('uses the real retry size and retains expired questions in the denominator', async () => {
    prepareRound(4, 5, true);
    const user = userEvent.setup();
    render(<Buttons />);
    await user.click(screen.getByRole('button', { name: 'Finalizar' }));
    expect(confetti).toHaveBeenCalledTimes(1);
  });

  it('omits even perfect-round celebration with reduced motion', async () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    prepareRound(10);
    const user = userEvent.setup();
    render(<Buttons />);
    await user.click(screen.getByRole('button', { name: 'Finalizar' }));
    expect(useQuizStore.getState().view).toBe('score');
    expect(confetti).not.toHaveBeenCalled();
  });
});
