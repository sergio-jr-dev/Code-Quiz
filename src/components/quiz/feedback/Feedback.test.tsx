import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useQuizStore } from '../../../stores/quizStore';
import { questionExamples } from '../../../test/fixtures/questionExamples';
import { Feedback } from './Feedback';

describe('Feedback', () => {
  it('identifies the selected and correct positions outside the answer cards', () => {
    const question = questionExamples[0];
    useQuizStore.setState({
      round: [question],
      currentQuestionIndex: 0,
      answers: [{ questionId: question.id, selectedOptionId: 'b' }],
      view: 'playing',
    });

    render(<Feedback />);

    expect(screen.getByRole('status')).toHaveTextContent(
      'Tu respuesta B no es correcta. La opción A es la respuesta.',
    );
  });
});
