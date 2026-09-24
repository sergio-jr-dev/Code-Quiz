import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import confetti from 'canvas-confetti';
import { describe, expect, it, vi } from 'vitest';

import { useQuizStore } from '../../../stores/quizStore';
import { questionExamples } from '../../../test/fixtures/questionExamples';
import { Answers } from './Answers';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('Answers', () => {
  it('derives A–D markers from visible order while selecting by stable option ID', async () => {
    const user = userEvent.setup();
    const source = questionExamples[0];
    const question = { ...source, options: [...source.options].reverse() };

    useQuizStore.setState({
      round: [question],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    });

    render(<Answers />);

    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => expect(radio).toHaveClass('answer-input'));
    expect(
      radios.map((radio) => radio.closest('label')?.querySelector('.answer-marker')?.textContent),
    ).toEqual(['A', 'B', 'C', 'D']);

    await user.click(radios[0]!);

    expect(useQuizStore.getState().answers).toContainEqual({
      questionId: question.id,
      selectedOptionId: question.options[0]!.id,
    });
    expect(document.querySelector('.answers small')).not.toBeInTheDocument();
  });
  it('does not celebrate an individual correct answer', async () => {
    vi.mocked(confetti).mockClear();
    const media = vi
      .spyOn(window, 'matchMedia')
      .mockReturnValue({ matches: false } as MediaQueryList);
    const question = questionExamples[0]!;
    useQuizStore.setState({
      mode: 'normal',
      timer: null,
      round: [question],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    });
    const user = userEvent.setup();
    render(<Answers />);
    const index = question.options.findIndex((option) => option.id === question.correctAnswer);
    await user.click(screen.getAllByRole('radio')[index]!);
    expect(useQuizStore.getState().answers[0]?.selectedOptionId).toBe(question.correctAnswer);
    expect(confetti).not.toHaveBeenCalled();
    media.mockRestore();
  });
});
