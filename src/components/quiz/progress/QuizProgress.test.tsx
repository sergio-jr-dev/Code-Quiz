import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { questionCatalog } from '../../../data/questionCatalog';
import { useQuizStore } from '../../../stores/quizStore';
import { QuizProgress } from './QuizProgress';

describe('QuizProgress', () => {
  it('keeps its visual value and text synchronized', () => {
    useQuizStore.setState({
      mode: 'normal',
      round: questionCatalog.slice(0, 10),
      currentQuestionIndex: 2,
    });

    render(<QuizProgress />);

    const progress = screen.getByRole('progressbar', { name: 'Pregunta 3 de 10' });
    expect(progress).toHaveAttribute('value', '3');
    expect(progress).toHaveAttribute('max', '10');
    expect(screen.getByText('Pregunta 3 de 10', { selector: 'label' })).toBeVisible();
  });

  it('stacks the label above the bar in timed mode', () => {
    useQuizStore.setState({
      mode: 'timed',
      round: questionCatalog.slice(0, 10),
      currentQuestionIndex: 0,
    });

    const { container } = render(<QuizProgress />);

    expect(container.querySelector('.quiz-progress')).toHaveAttribute('data-layout', 'stacked');
    expect(screen.getByRole('progressbar', { name: 'Pregunta 1 de 10' })).toBeVisible();
  });
});
