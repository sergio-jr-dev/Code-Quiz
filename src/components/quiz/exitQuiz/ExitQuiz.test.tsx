import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useQuizStore } from '../../../stores/quizStore';
import { questionExamples as questions } from '../../../test/fixtures/questionExamples';
import { Game } from '../game/Game';

const setPlayingState = () => {
  const question = questions[0]!;

  useQuizStore.setState({
    configuration: { subject: 'html', level: 'basic' },
    round: [question],
    roundSource: 'configured',
    currentQuestionIndex: 0,
    answers: [{ questionId: question.id, selectedOptionId: question.correctAnswer }],
    view: 'playing',
    decks: { 'html:basic:html': [questions[1]!.id] },
    mixedExtraSubjects: { basic: 'css' },
    bestResults: { 'html:basic': 8 },
  });
};

describe('ExitQuiz', () => {
  it('keeps the round when the user cancels and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    setPlayingState();
    render(<Game />);

    const trigger = screen.getByRole('button', { name: 'Salir de la partida' });
    await user.click(trigger);

    expect(screen.getByRole('dialog', { name: '¿Salir de la partida?' })).toBeVisible();
    expect(screen.getByText(/Perderás el progreso/)).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Continuar partida' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(useQuizStore.getState().view).toBe('playing');
    expect(useQuizStore.getState().round).toHaveLength(1);
    expect(trigger).toHaveFocus();
  });

  it('clears only the active round after confirmation', async () => {
    const user = userEvent.setup();
    setPlayingState();
    render(<Game />);

    await user.click(screen.getByRole('button', { name: 'Salir de la partida' }));
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Salir de la partida' }),
    );

    expect(useQuizStore.getState()).toMatchObject({
      configuration: { subject: 'html', level: 'basic' },
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
      decks: { 'html:basic:html': [questions[1]!.id] },
      mixedExtraSubjects: { basic: 'css' },
      bestResults: { 'html:basic': 8 },
    });
    expect(screen.getByRole('heading', { name: '¿Qué quieres practicar hoy?' })).toHaveFocus();
  });
});
