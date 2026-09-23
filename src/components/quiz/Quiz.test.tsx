import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { questionCatalog } from '../../data/questionCatalog';
import { useQuizStore } from '../../stores/quizStore';
import { Quiz } from './Quiz';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('Quiz', () => {
  it('shows expired feedback and waits for the user before advancing', async () => {
    const user = userEvent.setup();
    const round = questionCatalog
      .filter((question) => question.subject === 'html' && question.level === 'basic')
      .slice(0, 2);
    const question = round[0]!;

    useQuizStore.setState({
      mode: 'timed',
      timer: {
        questionId: question.id,
        durationMs: 60_000,
        remainingMs: 0,
        status: 'expired',
        referenceTimeMs: null,
      },
      configuration: { subject: 'html', level: 'basic' },
      round,
      currentQuestionIndex: 0,
      answers: [{ questionId: question.id, selectedOptionId: null, timedOut: true }],
      view: 'playing',
      roundSource: 'configured',
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    });

    render(<Quiz />);

    expect(useQuizStore.getState().currentQuestionIndex).toBe(0);
    expect(screen.getByText('Agotado')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('Sin responder · Tiempo agotado');
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(document.querySelector('[aria-live="polite"]')).toBeEmptyDOMElement();
    expect(screen.getByRole('heading', { name: 'Por qué es correcta' })).toBeVisible();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    expect(screen.getAllByRole('radio').every((option) => option.hasAttribute('disabled'))).toBe(
      true,
    );
    expect(document.querySelectorAll('.answer.correct')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    expect(useQuizStore.getState().currentQuestionIndex).toBe(1);
    expect(useQuizStore.getState().timer).toMatchObject({
      questionId: round[1]!.id,
      status: 'running',
    });
  });
});
