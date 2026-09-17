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
});
