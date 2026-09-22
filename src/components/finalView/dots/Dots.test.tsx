import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useQuizStore } from '../../../stores/quizStore';
import { questionExamples } from '../../../test/fixtures/questionExamples';
import { Dots } from './Dots';

describe('Dots', () => {
  it('names timed-out questions separately from selected incorrect answers', () => {
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
      view: 'review',
    });

    render(<Dots />);

    expect(screen.getByRole('link', { name: 'Pregunta 1: correcta' })).toHaveClass('correct');
    expect(screen.getByRole('link', { name: 'Pregunta 2: incorrecta' })).toHaveClass('incorrect');
    expect(
      screen.getByRole('link', { name: 'Pregunta 3: sin responder por tiempo agotado' }),
    ).toHaveClass('timed-out');
  });
});
