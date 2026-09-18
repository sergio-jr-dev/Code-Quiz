import { describe, expect, it } from 'vitest';

import { questionExamples as questions } from '../test/fixtures/questionExamples';
import type {
  QuizProgressState as QuizState,
  QuizState as FullQuizState,
} from '../types/quizStore';
import {
  abandonRound,
  advanceQuiz,
  answerCurrentQuestion,
  calculateScore,
  expireCurrentQuestion,
  getRemainingTimeMs,
  pauseQuestionTimer,
  restartQuiz,
  resumeQuestionTimer,
  retryIncorrectAnswers,
  returnToMenu,
  showReview,
  startQuestionTimer,
} from './quizTransitions';

const timedState = (questionIndex: number): FullQuizState => {
  const question = questions[questionIndex]!;

  return {
    mode: 'timed',
    timer: null,
    configuration: { subject: question.subject, level: question.level },
    round: [question],
    currentQuestionIndex: 0,
    answers: [],
    view: 'playing',
    roundSource: 'configured',
    decks: {},
    mixedExtraSubjects: {},
    bestResults: {},
  };
};

describe('quizTransitions', () => {
  it.each([
    [0, 60_000],
    [1, 45_000],
    [2, 30_000],
  ])('starts the level timer for question fixture %i at %i ms', (questionIndex, durationMs) => {
    const state = timedState(questionIndex);
    const result = startQuestionTimer(state, 1_000);

    expect(result).not.toBe(state);
    expect(result.timer).toEqual({
      questionId: state.round[0]!.id,
      durationMs,
      remainingMs: durationMs,
      status: 'running',
      referenceTimeMs: 1_000,
    });
    expect(startQuestionTimer(result, 2_000)).toBe(result);
  });

  it('does not create temporal state in normal mode', () => {
    const state = { ...timedState(0), mode: 'normal' as const };

    expect(startQuestionTimer(state, 1_000)).toBe(state);
    expect(state.timer).toBeNull();
  });

  it('calculates remaining time from a reference and excludes a paused interval', () => {
    const started = startQuestionTimer(timedState(0), 1_000);
    const runningTimer = started.timer!;

    expect(getRemainingTimeMs(runningTimer, 11_000)).toBe(50_000);

    const paused = pauseQuestionTimer(started, 11_000);
    expect(paused.timer).toMatchObject({
      remainingMs: 50_000,
      status: 'paused',
      referenceTimeMs: null,
    });
    expect(getRemainingTimeMs(paused.timer!, 100_000)).toBe(50_000);

    const resumed = resumeQuestionTimer(paused, 100_000);
    expect(getRemainingTimeMs(resumed.timer!, 105_000)).toBe(45_000);
  });

  it('stops the timer immediately when a timed answer is recorded', () => {
    const state = startQuestionTimer(timedState(1), 5_000);
    const option = state.round[0]!.options[0]!;
    const result = answerCurrentQuestion(state, option.id, 15_000);

    expect(result.answers).toEqual([
      { questionId: state.round[0]!.id, selectedOptionId: option.id },
    ]);
    expect(result.timer).toMatchObject({
      remainingMs: 35_000,
      status: 'answered',
      referenceTimeMs: null,
    });
    expect(answerCurrentQuestion(result, option.id, 16_000)).toBe(result);
  });

  it('records one explicit timed-out result only when the deadline is reached', () => {
    const started = startQuestionTimer(timedState(2), 10_000);

    expect(expireCurrentQuestion(started, 39_999)).toBe(started);

    const expired = expireCurrentQuestion(started, 40_000);
    expect(expired.answers).toEqual([
      {
        questionId: started.round[0]!.id,
        selectedOptionId: null,
        timedOut: true,
      },
    ]);
    expect(expired.timer).toMatchObject({
      remainingMs: 0,
      status: 'expired',
      referenceTimeMs: null,
    });
    expect(calculateScore(expired)).toBe(0);
    expect(expireCurrentQuestion(expired, 41_000)).toBe(expired);

    const completed = advanceQuiz(expired);
    expect(completed.view).toBe('score');
    expect(completed.timer).toBeNull();
  });

  it('does not create an answer when a timed response arrives at or after the deadline', () => {
    const started = startQuestionTimer(timedState(0), 1_000);
    const option = started.round[0]!.options[0]!;

    expect(answerCurrentQuestion(started, option.id, 61_000)).toBe(started);
    expect(answerCurrentQuestion(started, option.id)).toBe(started);
  });

  it('adds an answer for the current question without mutating the previous state', () => {
    const currentQuestion = questions[0]!;
    const selectedOption = currentQuestion.options[0]!;

    const state: QuizState = {
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal',
      timer: null,
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
      mode: 'normal' as const,
      timer: null,
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
      mode: 'normal' as const,
      timer: null,
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
      mode: 'normal' as const,
      timer: null,
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
      mode: 'normal' as const,
      timer: null,
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

  it('abandons a playing round while preserving configuration, decks and records', () => {
    const question = questions[0]!;
    const state = {
      mode: 'normal' as const,
      timer: null,
      configuration: { subject: 'html' as const, level: 'basic' as const },
      round: [question],
      currentQuestionIndex: 0,
      answers: [{ questionId: question.id, selectedOptionId: question.correctAnswer }],
      view: 'playing' as const,
      roundSource: 'incorrect-retry' as const,
      decks: { 'html:basic:html': [questions[1]!.id] },
      mixedExtraSubjects: { basic: 'css' as const },
      bestResults: { 'html:basic': 8 },
    };

    const result = abandonRound(state);

    expect(result).toMatchObject({
      configuration: state.configuration,
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
      roundSource: 'configured',
      decks: state.decks,
      mixedExtraSubjects: state.mixedExtraSubjects,
      bestResults: state.bestResults,
    });
    const scoreState = { ...state, view: 'score' as const };
    expect(abandonRound(scoreState)).toBe(scoreState);
  });
});
