import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useQuizStore } from '../../../stores/quizStore';
import { questionExamples } from '../../../test/fixtures/questionExamples';
import { Score } from './Score';

describe('Score', () => {
  const question = questionExamples[0]!;

  beforeEach(() => {
    useQuizStore.setState({
      configuration: { subject: 'html', level: 'basic' },
      round: [question],
      currentQuestionIndex: 0,
      answers: [{ questionId: question.id, selectedOptionId: question.correctAnswer }],
      view: 'score',
      roundSource: 'configured',
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    });
  });

  it('focuses the result heading and restores the page start without animated scrolling', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    render(<Score />);

    expect(screen.getByRole('heading', { name: '¡Ronda perfecta!' })).toHaveFocus();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });

  it('separates selected incorrect answers from timed-out questions in timed mode', () => {
    const correctQuestion = questionExamples[0]!;
    const incorrectQuestion = questionExamples[1]!;
    const timedOutQuestion = questionExamples[2]!;
    const incorrectOption = incorrectQuestion.options.find(
      (option) => option.id !== incorrectQuestion.correctAnswer,
    )!;

    useQuizStore.setState({
      mode: 'timed',
      round: [correctQuestion, incorrectQuestion, timedOutQuestion],
      answers: [
        { questionId: correctQuestion.id, selectedOptionId: correctQuestion.correctAnswer },
        { questionId: incorrectQuestion.id, selectedOptionId: incorrectOption.id },
        { questionId: timedOutQuestion.id, selectedOptionId: null, timedOut: true },
      ],
    });

    render(<Score />);

    expect(screen.getByText('Partida completada · Modo cronómetro')).toBeVisible();
    expect(screen.getByText('Incorrectas')).toBeVisible();
    expect(screen.getByText('Tiempo agotado')).toBeVisible();
    expect(screen.getAllByText('1')).toHaveLength(3);
  });
});
