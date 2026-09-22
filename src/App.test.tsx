import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import confetti from 'canvas-confetti';
import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import App from './App';
import { questionCatalog } from './data/questionCatalog';
import { useQuizStore } from './stores/quizStore';
import { questionExamples } from './test/fixtures/questionExamples';
import type { BankQuestion, QuestionContent } from './types/questionBank';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

function contentText(content: QuestionContent): string {
  return content.map((block) => (block.type === 'text' ? block.text : block.code)).join(' ');
}

function buildCodeIntegrationRound(): BankQuestion[] {
  const [html, css, javascript] = questionExamples;

  if (!html || !css || !javascript) {
    throw new Error('Missing integration question fixtures');
  }

  return [
    {
      ...html,
      prompt: [
        ...html.prompt,
        {
          type: 'code',
          language: 'html',
          code: '<main>\n  <h1>Code Quiz</h1>\n</main>',
        },
      ],
      options: [html.options[3]!, html.options[2]!, html.options[1]!, html.options[0]!],
    },
    {
      ...css,
      options: [css.options[3]!, css.options[1]!, css.options[0]!, css.options[2]!],
    },
    {
      ...javascript,
      options: [
        javascript.options[1]!,
        javascript.options[2]!,
        javascript.options[0]!,
        javascript.options[3]!,
      ],
    },
  ];
}

describe('configured quiz flow', () => {
  it('configures, completes and restarts a ten-question round using the keyboard', async () => {
    const user = userEvent.setup();
    useQuizStore.setState({
      mode: 'normal',
      timer: null,
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

    const configurationProgress = screen.getByRole('list', {
      name: 'Progreso de la configuración',
    });
    expect(configurationProgress).toBeVisible();
    expect(within(configurationProgress).getByText('Materia').closest('li')).toHaveAttribute(
      'aria-current',
      'step',
    );
    expect(screen.queryByRole('radio', { name: /^Normal/ })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: '¿Qué quieres practicar hoy?' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('radio', { name: /^HTML/ })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: /^CSS/ })).toBeChecked();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Continuar' })).toHaveFocus();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('heading', { name: 'Completa tu partida' })).toHaveFocus();
    expect(within(configurationProgress).getByText('Partida').closest('li')).toHaveAttribute(
      'aria-current',
      'step',
    );
    expect(
      screen.getByText('Has elegido CSS. Ahora selecciona el nivel y la modalidad.'),
    ).toBeVisible();
    expect(screen.getByRole('radio', { name: /^Normal/ })).toBeChecked();
    expect(screen.getByText('Sin límite de tiempo, con el mismo contenido.')).toBeVisible();
    expect(screen.getByText('60 segundos por pregunta, sin bonificaciones.')).toBeVisible();
    expect(
      document.querySelector('.mode-icon img[src="/images/modes/normal.png"]'),
    ).toHaveAttribute('alt', '');
    expect(document.querySelector('.mode-icon img[src="/images/modes/timed.png"]')).toHaveAttribute(
      'alt',
      '',
    );

    await user.click(screen.getByRole('radio', { name: /^Intermedio/ }));
    expect(screen.getByText('45 segundos por pregunta, sin bonificaciones.')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Cambiar materia' }));
    expect(screen.getByRole('heading', { name: '¿Qué quieres practicar hoy?' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: /^CSS/ })).toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByRole('radio', { name: /^Intermedio/ })).toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Comenzar partida' }));

    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
    expect(screen.getByRole('progressbar', { name: 'Pregunta 1 de 10' })).toHaveAttribute(
      'value',
      '1',
    );
    expect(screen.queryByRole('progressbar', { name: /Tiempo restante/ })).not.toBeInTheDocument();
    expect(screen.queryByText(/Tiempo restante:/)).not.toBeInTheDocument();
    expect(useQuizStore.getState().timer).toBeNull();
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
    expect(
      screen.getByLabelText('Resumen de la puntuación').querySelector('strong'),
    ).toHaveTextContent(/^\d+$/);
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
    expect(screen.getByText('10')).toBeVisible();
    expect(screen.getByText('100%')).toBeVisible();
    expect(screen.getByText('Mejor resultado en esta configuración: 10 / 10')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Resultado: 10 de 10 aciertos. Precisión: 100%.',
    );
    expect(confetti).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Revisar respuestas' })).toBeVisible();
    expect(screen.queryByRole('article', { name: 'Pregunta 1' })).not.toBeInTheDocument();
    expect(useQuizStore.getState().timer).toBeNull();
  });

  it('keeps reordered option IDs, code content and progress aligned through user interactions', async () => {
    const user = userEvent.setup();
    const round = buildCodeIntegrationRound();

    useQuizStore.setState({
      configuration: { subject: 'mixed', level: 'basic' },
      round,
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
      roundSource: 'configured',
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    });

    const { container } = render(<App />);

    expect(screen.getByRole('progressbar', { name: 'Pregunta 1 de 3' })).toHaveAttribute(
      'value',
      '1',
    );
    expect(container.querySelector('pre > code.language-html')).toHaveTextContent(
      '<main>\n  <h1>Code Quiz</h1>\n</main>',
      { normalizeWhitespace: false },
    );

    await user.click(screen.getByRole('radio', { name: '<footer>' }));

    expect(useQuizStore.getState().answers[0]).toEqual({
      questionId: round[0]!.id,
      selectedOptionId: 'd',
    });
    expect(screen.getByRole('status')).toHaveTextContent(
      'Tu respuesta A no es correcta. La opción D es la respuesta.',
    );

    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    expect(screen.getByRole('progressbar', { name: 'Pregunta 2 de 3' })).toHaveAttribute(
      'value',
      '2',
    );
    await user.click(screen.getByRole('radio', { name: 'color: var(--accent);' }));
    expect(useQuizStore.getState().answers[1]).toEqual({
      questionId: round[1]!.id,
      selectedOptionId: 'b',
    });
    expect(screen.getByRole('status')).toHaveTextContent('¡Correcto! La opción B es la respuesta.');
    expect(container.querySelector('pre > code.language-css')).toHaveTextContent(
      ':root { --accent: rebeccapurple; }\np { color: var(--accent); }',
      { normalizeWhitespace: false },
    );

    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    expect(screen.getByRole('progressbar', { name: 'Pregunta 3 de 3' })).toHaveAttribute(
      'value',
      '3',
    );
    expect(container.querySelector('pre > code.language-javascript')).toHaveTextContent(
      'const numbers = [3, 1, 2];\nconst result = numbers.toSorted();',
      { normalizeWhitespace: false },
    );
    await user.click(screen.getByRole('radio', { name: 'Un array nuevo con [1, 2, 3]' }));
    expect(useQuizStore.getState().answers[2]).toEqual({
      questionId: round[2]!.id,
      selectedOptionId: 'a',
    });
    expect(screen.getByRole('status')).toHaveTextContent('¡Correcto! La opción C es la respuesta.');

    await user.click(screen.getByRole('button', { name: 'Finalizar' }));

    expect(screen.getByText('2')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Resultado: 2 de 3 aciertos. Precisión: 67%.',
    );
    expect(screen.queryByRole('progressbar', { name: /Pregunta/ })).not.toBeInTheDocument();
  });
});
