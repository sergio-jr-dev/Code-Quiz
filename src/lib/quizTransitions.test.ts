import { describe, expect, it } from 'vitest';

import { questions } from '../data/questions';
import type { QuizState } from '../types/quizStore';
import { answerCurrentQuestion } from './quizTransitions';

describe('quizTransitions', () => {
  it('adds an answer for the current question without mutating the previous state', () => {
    const currentQuestion = questions[0]!;
    const selectedOption = currentQuestion.options[0]!;

    const state: QuizState = {
      round: [currentQuestion],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    };

    const result = answerCurrentQuestion(state, selectedOption.id);

    expect(result).not.toBe(state);
    expect(result.answers).not.toBe(state.answers);
    expect(result.answers).toEqual([
      {
        questionId: currentQuestion.id,
        selectedOptionId: selectedOption.id,
      },
    ]);
    expect(state.answers).toHaveLength(0);
  });

  it('a question can only be answered once', () => {
    const currentQuestion = questions[0]!;
    const firstOption = currentQuestion.options[0]!;
    const secondOption = currentQuestion.options[1]!;

    const state: QuizState = {
      round: [currentQuestion],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: currentQuestion.id,
          selectedOptionId: firstOption.id,
        },
      ],
      view: 'playing',
    };

    const result = answerCurrentQuestion(state, secondOption.id);

    expect(result).toBe(state);
    expect(result.answers).toHaveLength(1);
    expect(result.answers[0]!.selectedOptionId).toBe(firstOption.id);
  });

  it('returns the same state if the view is not "playing"', () => {
    const currentQuestion = questions[0]!;
    const selectedOption = currentQuestion.options[0]!;

    const state: QuizState = {
      round: [currentQuestion],
      currentQuestionIndex: 0,
      answers: [],
      view: 'score',
    };

    const result = answerCurrentQuestion(state, selectedOption.id);

    expect(result).toBe(state);
  });

  it('returns the same state if round is empty', () => {
    const currentQuestion = questions[0]!;
    const selectedOption = currentQuestion.options[0]!;

    const state: QuizState = {
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    };

    const result = answerCurrentQuestion(state, selectedOption.id);

    expect(result).toBe(state);
  });

  it('returns the same state if the optionId is invalid', () => {
    const currentQuestion = questions[0]!;

    const state: QuizState = {
      round: [currentQuestion],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    };

    const result = answerCurrentQuestion(state, 'invalid-option-id');

    expect(result).toBe(state);
  });
});
