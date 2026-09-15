import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { questionExamples } from '../../../data/questionExamples';
import { buildRound } from '../../../lib/buildRound';
import { useQuizStore } from '../../../stores/quizStore';
import { Results } from './Results';

describe('Results', () => {
  it('keeps the selected and correct options associated by ID after shuffling', () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });

    const source = questionExamples[0];
    const [shuffled] = buildRound([source], 1, () => 0);

    if (!shuffled) throw new Error('Missing shuffled question');

    expect(shuffled.options.map((option) => option.id)).not.toEqual(
      source.options.map((option) => option.id),
    );

    const selectedId = 'd';

    useQuizStore.setState({
      round: [shuffled],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: shuffled.id,
          selectedOptionId: selectedId,
        },
      ],
      view: 'review',
    });

    const { container } = render(<Results />);

    expect(screen.getByRole('heading', { name: 'Pregunta 1' })).toHaveFocus();
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start' });

    const correctAnswer = screen.getByText('<main>').closest('.answer');
    const selectedAnswer = screen.getByText('<footer>').closest('.answer');

    if (!correctAnswer || !selectedAnswer) throw new Error('Missing review answers');

    expect(correctAnswer).toHaveClass('correct');
    expect(within(correctAnswer as HTMLElement).getByText('Respuesta correcta')).toBeVisible();
    expect(
      within(correctAnswer as HTMLElement).queryByText('Tu respuesta'),
    ).not.toBeInTheDocument();
    expect(selectedAnswer).toHaveClass('incorrect');
    expect(within(selectedAnswer as HTMLElement).getByText(/Tu respuesta/)).toBeVisible();
    expect(
      within(selectedAnswer as HTMLElement).queryByText('Respuesta correcta'),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll('.answer.correct')).toHaveLength(1);
    expect(container.querySelectorAll('.answer.incorrect')).toHaveLength(1);
  });
});
