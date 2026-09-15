import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { questionExamples } from '../../../data/questionExamples';
import { useQuizStore } from '../../../stores/quizStore';
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
});
