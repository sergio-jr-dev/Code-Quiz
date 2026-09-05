import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { questions } from './data/questions';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('existing quiz flow', () => {
  it('answers all 25 questions, reviews and starts a fully reset round using the keyboard', async () => {
    const user = userEvent.setup();
    render(<StrictMode><App /></StrictMode>);
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
    const seen = new Set<string>();

    for (let index = 0; index < 25; index++) {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveFocus();
      const question = questions.find(item => item.question === heading.textContent);
      if (!question) throw new Error('Unknown question');
      seen.add(question.question);
      const options = screen.getAllByRole('radio');
      await user.tab();
      expect(options[0]).toHaveFocus();
      await user.keyboard(' ');
      expect(screen.getByRole('status')).toHaveTextContent('Respuesta');
      expect(screen.getByRole('heading', { name: 'Información adicional' })).toBeVisible();
      expect(options.filter(option => option.hasAttribute('disabled'))).toHaveLength(3);
      await user.tab();
      const next = screen.getByRole('button', { name: index === 24 ? 'Finalizar' : 'Siguiente' });
      expect(next).toHaveFocus();
      await user.keyboard('{Enter}');
    }

    expect(seen.size).toBe(25);
    const expectedScore = questions.filter(question => question.options[0]?.id === question.correctAnswer).length;
    expect(screen.getByText(`${expectedScore} / 25`)).toBeVisible();
    expect(screen.getByRole('heading', { level: 2 })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Ver resultados' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('heading', { name: 'Pregunta 1' })).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Ver resultados', hidden: true })).not.toBeInTheDocument();
    expect(screen.getAllByText('Tu respuesta')).toHaveLength(25);
    expect(screen.getAllByText('Respuesta correcta')).toHaveLength(25);
    expect(within(screen.getByRole('navigation', { name: 'Revisión de preguntas' })).getAllByRole('link')).toHaveLength(25);
    await user.click(screen.getByRole('button', { name: 'Jugar de nuevo' }));
    expect(screen.queryByRole('navigation', { name: 'Revisión de preguntas' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
    expect(screen.getAllByRole('radio').every(option => !(option as HTMLInputElement).checked)).toBe(true);
    expect(screen.getByRole('heading', { level: 2 })).toHaveFocus();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();

    // A second completed round proves score and review state do not leak across restarts.
    for (let index = 0; index < 25; index++) {
      const question = questions.find(item => item.question === screen.getByRole('heading', { level: 2 }).textContent);
      const answer = question?.options.find(option => option.id === question.correctAnswer);
      if (!answer) throw new Error('Missing correct answer');
      await user.click(screen.getByRole('radio', { name: answer.content }));
      await user.click(screen.getByRole('radio', { checked: true }));
      await user.click(screen.getByRole('button', { name: index === 24 ? 'Finalizar' : 'Siguiente' }));
    }
    expect(screen.getByText('25 / 25')).toBeVisible();
    expect(screen.getByText('100%')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Ver resultados' })).toBeVisible();
    expect(screen.queryByRole('article', { name: 'Pregunta 1' })).not.toBeInTheDocument();
  });
});
