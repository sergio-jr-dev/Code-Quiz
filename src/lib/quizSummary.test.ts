import { describe, expect, it } from 'vitest';

import { questionExamples } from '../test/fixtures/questionExamples';
import type { BankQuestion } from '../types/questionBank';
import { summarizeRoundBySubject } from './quizSummary';

describe('summarizeRoundBySubject', () => {
  it('groups correct answers by subjects present in the round', () => {
    const htmlQuestion = questionExamples[0]!;
    const cssQuestion: BankQuestion = {
      ...questionExamples[1]!,
      id: 'css-summary-101',
      subject: 'css',
    };

    expect(
      summarizeRoundBySubject(
        [htmlQuestion, cssQuestion],
        [
          { questionId: htmlQuestion.id, selectedOptionId: htmlQuestion.correctAnswer },
          { questionId: cssQuestion.id, selectedOptionId: 'missing-answer' },
        ],
      ),
    ).toEqual([
      { subject: 'html', correct: 1, total: 1 },
      { subject: 'css', correct: 0, total: 1 },
    ]);
  });
});
