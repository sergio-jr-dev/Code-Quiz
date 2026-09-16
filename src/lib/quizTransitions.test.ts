import { describe, expect, it } from 'vitest';

import { questions } from '../data/questions';
import type { QuizProgressState as QuizState } from '../types/quizStore';
import {
  advanceQuiz,
  answerCurrentQuestion,
  calculateScore,
  restartQuiz,
  retryIncorrectAnswers,
  returnToMenu,
  showReview,
} from './quizTransitions';

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

  it('advances to question 2 after answering question 1', () => {
    const firstQuestion = questions[0]!;
    const secondQuestion = questions[1]!;
    const selectedOption = firstQuestion.options[0]!;

    const state: QuizState = {
      round: [firstQuestion, secondQuestion],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: firstQuestion.id,
          selectedOptionId: selectedOption.id,
        },
      ],
      view: 'playing',
    };

    const result = advanceQuiz(state);

    expect(result).not.toBe(state);
    expect(result.currentQuestionIndex).toBe(1);
    expect(result.view).toBe('playing');
    expect(result.answers).toBe(state.answers);
  });

  it('moves to the score view after answering the last question', () => {
    const firstQuestion = questions[0]!;
    const selectedOption = firstQuestion.options[0]!;

    const state: QuizState = {
      round: [firstQuestion],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: firstQuestion.id,
          selectedOptionId: selectedOption.id,
        },
      ],
      view: 'playing',
    };

    const result = advanceQuiz(state);

    expect(result).not.toBe(state);
    expect(result.view).toBe('score');
    expect(result.currentQuestionIndex).toBe(0);
    expect(result.answers).toBe(state.answers);
  });

  it('returns the same state if the view is not "playing"', () => {
    const firstQuestion = questions[0]!;
    const secondQuestion = questions[1]!;
    const thirdQuestion = questions[2]!;
    const selectedOption = firstQuestion.options[0]!;

    const state: QuizState = {
      round: [firstQuestion, secondQuestion, thirdQuestion],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: firstQuestion.id,
          selectedOptionId: selectedOption.id,
        },
      ],
      view: 'score',
    };

    const result = advanceQuiz(state);

    expect(result).toBe(state);
  });

  it('returns the same state if round is empty', () => {
    const state: QuizState = {
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    };

    const result = advanceQuiz(state);

    expect(result).toBe(state);
  });

  it('returns the same state if the current question has not been answered', () => {
    const currentQuestion = questions[0]!;

    const state: QuizState = {
      round: [currentQuestion],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    };

    const result = advanceQuiz(state);

    expect(result).toBe(state);
  });

  it('returns the correct score based on the provided answers', () => {
    const firstQuestion = questions[0]!;
    const secondQuestion = questions[1]!;
    const thirdQuestion = questions[2]!;

    const correctOption = firstQuestion.options.find(
      (option) => option.id === firstQuestion.correctAnswer,
    )!;

    const incorrectOption = secondQuestion.options.find(
      (option) => option.id !== secondQuestion.correctAnswer,
    )!;

    const state: QuizState = {
      round: [firstQuestion, secondQuestion, thirdQuestion],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: secondQuestion.id,
          selectedOptionId: incorrectOption.id,
        },
        {
          questionId: firstQuestion.id,
          selectedOptionId: correctOption.id,
        },
      ],
      view: 'playing',
    };

    const result = calculateScore(state);

    expect(result).toBe(1);
  });

  it('returns a score of 0 if round and answers are empty', () => {
    const state: QuizState = {
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    };

    const result = calculateScore(state);

    expect(result).toBe(0);
  });

  it('counts at most one correct answer per question', () => {
    const question = questions[0]!;

    const correctOption = question.options.find((option) => option.id === question.correctAnswer)!;

    const state: QuizState = {
      round: [question],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: question.id,
          selectedOptionId: correctOption.id,
        },
        {
          questionId: question.id,
          selectedOptionId: correctOption.id,
        },
      ],
      view: 'playing',
    };

    const result = calculateScore(state);

    expect(result).toBe(1);
  });

  it('moves from the score view to the review view', () => {
    const question = questions[0]!;

    const state: QuizState = {
      round: [question],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: question.id,
          selectedOptionId: question.correctAnswer,
        },
      ],
      view: 'score',
    };

    const result = showReview(state);

    expect(result).not.toBe(state);
    expect(result.view).toBe('review');
    expect(result.round).toBe(state.round);
    expect(result.answers).toBe(state.answers);
    expect(result.currentQuestionIndex).toBe(state.currentQuestionIndex);
  });

  it('returns the same state when the view is playing', () => {
    const question = questions[0]!;

    const state: QuizState = {
      round: [question],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: question.id,
          selectedOptionId: question.correctAnswer,
        },
      ],
      view: 'playing',
    };

    const result = showReview(state);

    expect(result).toBe(state);
  });

  it('returns the same state when the view is already review', () => {
    const question = questions[0]!;

    const state: QuizState = {
      round: [question],
      currentQuestionIndex: 0,
      answers: [
        {
          questionId: question.id,
          selectedOptionId: question.correctAnswer,
        },
      ],
      view: 'review',
    };

    const result = showReview(state);

    expect(result).toBe(state);
  });

  it('resets the quiz state when restarting the quiz', () => {
    const previousRound = [questions[0]!, questions[1]!];
    const nextRound = [questions[2]!, questions[3]!];

    const state: QuizState = {
      round: previousRound,
      currentQuestionIndex: 1,
      answers: [
        {
          questionId: previousRound[0]!.id,
          selectedOptionId: previousRound[0]!.correctAnswer,
        },
      ],
      view: 'review',
    };

    const result = restartQuiz(state, nextRound);

    expect(result).not.toBe(state);
    expect(result.round).toBe(nextRound);
    expect(result.currentQuestionIndex).toBe(0);
    expect(result.answers).toEqual([]);
    expect(result.answers).not.toBe(state.answers);
    expect(result.view).toBe('playing');
    expect(state.round).toBe(previousRound);
    expect(state.currentQuestionIndex).toBe(1);
    expect(state.answers).toHaveLength(1);
    expect(state.view).toBe('review');
  });

  it('retries only incorrect questions in their original order without consuming decks', () => {
    const firstQuestion = questions[0]!;
    const secondQuestion = questions[1]!;
    const thirdQuestion = questions[2]!;
    const incorrectOption = thirdQuestion.options.find(
      (option) => option.id !== thirdQuestion.correctAnswer,
    )!;
    const decks = { 'html:basic:html': [questions[3]!.id] };
    const state = {
      configuration: { subject: 'html' as const, level: 'basic' as const },
      round: [firstQuestion, secondQuestion, thirdQuestion],
      currentQuestionIndex: 2,
      answers: [
        { questionId: firstQuestion.id, selectedOptionId: firstQuestion.correctAnswer },
        { questionId: secondQuestion.id, selectedOptionId: secondQuestion.correctAnswer },
        { questionId: thirdQuestion.id, selectedOptionId: incorrectOption.id },
      ],
      view: 'review' as const,
      roundSource: 'configured' as const,
      decks,
      mixedExtraSubjects: {},
      bestResults: {},
    };

    const result = retryIncorrectAnswers(state);

    expect(result.round).toEqual([thirdQuestion]);
    expect(result.currentQuestionIndex).toBe(0);
    expect(result.answers).toEqual([]);
    expect(result.view).toBe('playing');
    expect(result.decks).toBe(decks);
  });

  it('keeps every failed question in the order in which it was seen', () => {
    const round = [questions[0]!, questions[1]!, questions[2]!];
    const state = {
      configuration: { subject: 'html' as const, level: 'basic' as const },
      round,
      currentQuestionIndex: 2,
      answers: round.map((question) => ({
        questionId: question.id,
        selectedOptionId: question.options.find((option) => option.id !== question.correctAnswer)!
          .id,
      })),
      view: 'score' as const,
      roundSource: 'configured' as const,
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    };

    const result = retryIncorrectAnswers(state);

    expect(result.round).toEqual(round);
    expect(result.round).not.toBe(round);
  });

  it('does not retry when there are no incorrect answers or the view is invalid', () => {
    const question = questions[0]!;
    const state = {
      configuration: { subject: 'html' as const, level: 'basic' as const },
      round: [question],
      currentQuestionIndex: 0,
      answers: [{ questionId: question.id, selectedOptionId: question.correctAnswer }],
      view: 'score' as const,
      roundSource: 'configured' as const,
      decks: {},
      mixedExtraSubjects: {},
      bestResults: {},
    };

    const playingState = { ...state, view: 'playing' as const };

    expect(retryIncorrectAnswers(state)).toBe(state);
    expect(retryIncorrectAnswers(playingState)).toBe(playingState);
  });

  it('returns to the menu and clears completed-round progress while preserving configuration', () => {
    const question = questions[0]!;
    const state = {
      configuration: { subject: 'css' as const, level: 'advanced' as const },
      round: [question],
      currentQuestionIndex: 0,
      answers: [{ questionId: question.id, selectedOptionId: question.correctAnswer }],
      view: 'score' as const,
      roundSource: 'configured' as const,
      decks: { 'css:advanced:css': [question.id] },
      mixedExtraSubjects: {},
      bestResults: {},
    };

    const result = returnToMenu(state);

    expect(result).toMatchObject({
      configuration: state.configuration,
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
      decks: state.decks,
    });
    const playingState = { ...state, view: 'playing' as const };
    expect(returnToMenu(playingState)).toBe(playingState);
  });
});
