import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import App from './App';
import { questionCatalog } from './data/questionCatalog';
import { useQuizStore } from './stores/quizStore';
import type { QuestionContent } from './types/questionBank';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

function contentText(content: QuestionContent): string {
  return content.map((block) => (block.type === 'text' ? block.text : block.code)).join(' ');
}

describe('configured quiz flow', () => {
  it('configures, completes and restarts a ten-question round using the keyboard', async () => {
    const user = userEvent.setup();
    useQuizStore.setState({
      configuration: { subject: 'html', level: 'basic' },
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
      roundSource: 'configured',
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    });
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    );

    await user.click(screen.getByRole('radio', { name: /^CSS/ }));
    await user.click(screen.getByRole('radio', { name: /^Intermedio/ }));
    await user.click(screen.getByRole('button', { name: 'Comenzar partida' }));

    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
    expect(screen.getByRole('progressbar', { name: 'Pregunta 1 de 10' })).toHaveAttribute(
      'value',
      '1',
    );
    const seen = new Set<string>();

    for (let index = 0; index < 10; index++) {
      expect(
        screen.getByRole('progressbar', { name: `Pregunta ${index + 1} de 10` }),
      ).toHaveAttribute('value', String(index + 1));
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveFocus();
      const question = questionCatalog.find((item) => item.prompt[0].text === heading.textContent);
      if (!question) throw new Error('Unknown question');
      expect(question).toMatchObject({ subject: 'css', level: 'intermediate' });
      seen.add(question.id);
      const options = screen.getAllByRole('radio');
      await user.tab();
      expect(options[0]).toHaveFocus();
      await user.keyboard(' ');
      expect(screen.getByRole('status')).toHaveTextContent(/respuesta/i);
      expect(screen.getByRole('heading', { name: 'Información adicional' })).toBeVisible();
      expect(options.filter((option) => option.hasAttribute('disabled'))).toHaveLength(3);
      await user.tab();
      const next = screen.getByRole('button', { name: index === 9 ? 'Finalizar' : 'Siguiente' });
      expect(next).toHaveFocus();
      await user.keyboard('{Enter}');
    }

    expect(seen.size).toBe(10);
    expect(screen.getByText(/^\d+ \/ 10$/)).toBeVisible();
    expect(screen.getByRole('heading', { level: 2 })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Revisar respuestas' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('heading', { name: 'Pregunta 1' })).toHaveFocus();
    expect(
      screen.queryByRole('button', { name: 'Revisar respuestas', hidden: true }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByText(/Tu respuesta/)).toHaveLength(10);
    expect(document.querySelectorAll('.results .answer.correct')).toHaveLength(10);
    expect(
      within(screen.getByRole('navigation', { name: 'Revisión de preguntas' })).getAllByRole(
        'link',
      ),
    ).toHaveLength(10);
    await user.click(screen.getByRole('button', { name: 'Repetir configuración' }));
    expect(
      screen.queryByRole('navigation', { name: 'Revisión de preguntas' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
    expect(
      screen.getAllByRole('radio').every((option) => !(option as HTMLInputElement).checked),
    ).toBe(true);
    expect(screen.getByRole('heading', { level: 2 })).toHaveFocus();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    const secondRound = new Set(useQuizStore.getState().round.map((question) => question.id));
    expect([...secondRound].every((id) => !seen.has(id))).toBe(true);

    // A second completed round proves score and review state do not leak across restarts.
    for (let index = 0; index < 10; index++) {
      const question = questionCatalog.find(
        (item) => item.prompt[0].text === screen.getByRole('heading', { level: 2 }).textContent,
      );
      const answer = question?.options.find((option) => option.id === question.correctAnswer);
      if (!answer) throw new Error('Missing correct answer');
      await user.click(screen.getByRole('radio', { name: contentText(answer.content) }));
      await user.click(screen.getByRole('radio', { checked: true }));
      await user.click(
        screen.getByRole('button', { name: index === 9 ? 'Finalizar' : 'Siguiente' }),
      );
    }
    expect(screen.getByText('10 / 10')).toBeVisible();
    expect(screen.getByText('100%')).toBeVisible();
    expect(screen.getByText('Mejor resultado en esta configuración: 10 / 10')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Revisar respuestas' })).toBeVisible();
    expect(screen.queryByRole('article', { name: 'Pregunta 1' })).not.toBeInTheDocument();
  });
});
