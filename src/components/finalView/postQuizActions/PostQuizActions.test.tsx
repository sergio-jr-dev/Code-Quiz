import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useQuizStore } from '../../../stores/quizStore';
import { questionExamples as questions } from '../../../test/fixtures/questionExamples';
import { PostQuizActions } from './PostQuizActions';

describe('PostQuizActions', () => {
  const correctQuestion = questions[0]!;
  const incorrectQuestion = questions[1]!;
  const incorrectOption = incorrectQuestion.options.find(
    (option) => option.id !== incorrectQuestion.correctAnswer,
  )!;

  beforeEach(() => {
    useQuizStore.setState({
      mode: 'timed',
      timer: null,
      configuration: { subject: 'html', level: 'basic' },
      round: [correctQuestion, incorrectQuestion],
      currentQuestionIndex: 1,
      answers: [
        { questionId: correctQuestion.id, selectedOptionId: correctQuestion.correctAnswer },
        { questionId: incorrectQuestion.id, selectedOptionId: incorrectOption.id },
      ],
      view: 'score',
      roundSource: 'configured',
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    });
  });

  it('offers review, failed-question retry, configuration replay and menu navigation', () => {
    render(<PostQuizActions />);

    expect(screen.getByRole('navigation', { name: 'Siguiente paso' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Revisar respuestas' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Repetir fallos' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Repetir configuración' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Volver al menú' })).toBeVisible();
  });

  it('starts a short retry containing only failed questions', async () => {
    const user = userEvent.setup();
    render(<PostQuizActions />);

    await user.click(screen.getByRole('button', { name: 'Repetir fallos' }));

    expect(useQuizStore.getState()).toMatchObject({
      mode: 'timed',
      round: [incorrectQuestion],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    });
  });

  it('preserves timed mode when repeating the configured round', async () => {
    const user = userEvent.setup();
    render(<PostQuizActions />);

    await user.click(screen.getByRole('button', { name: 'Repetir configuración' }));

    expect(useQuizStore.getState()).toMatchObject({
      mode: 'timed',
      timer: null,
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    });
  });

  it('hides failed-question retry after a perfect round', () => {
    useQuizStore.setState({
      round: [correctQuestion],
      answers: [
        { questionId: correctQuestion.id, selectedOptionId: correctQuestion.correctAnswer },
      ],
    });

    render(<PostQuizActions />);

    expect(screen.queryByRole('button', { name: 'Repetir fallos' })).not.toBeInTheDocument();
  });

  it('returns to the menu without keeping completed-round progress', async () => {
    const user = userEvent.setup();
    render(<PostQuizActions />);

    await user.click(screen.getByRole('button', { name: 'Volver al menú' }));

    expect(useQuizStore.getState()).toMatchObject({
      mode: 'timed',
      configuration: { subject: 'html', level: 'basic' },
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
    });
  });
});
