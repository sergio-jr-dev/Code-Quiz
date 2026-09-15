import { beforeEach, describe, expect, it } from 'vitest';

import { questions } from '../data/questions';
import { useQuizStore } from './quizStore';

describe('quizStore', () => {
  beforeEach(() => {
    const question = questions[0]!;

    useQuizStore.setState({
      configuration: { subject: 'html', level: 'basic' },
      round: [question],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
      decks: {},
      mixedExtraSubjects: {},
    });
  });

  it('stores the selected option through the store action', () => {
    const question = questions[0]!;
    const validOption = question.options[0]!;

    const selectOption = useQuizStore.getState().selectOption;

    selectOption(validOption.id);

    const answers = useQuizStore.getState().answers;

    expect(answers).toEqual([
      {
        questionId: question.id,
        selectedOptionId: validOption.id,
      },
    ]);
  });

  it('moves from playing to score and then to review', () => {
    const question = questions[0]!;
    const validOption = question.options[0]!;

    const selectOption = useQuizStore.getState().selectOption;
    const goToNextQuestion = useQuizStore.getState().goToNextQuestion;
    const showReview = useQuizStore.getState().showReview;

    selectOption(validOption.id);
    goToNextQuestion();

    expect(useQuizStore.getState().view).toBe('score');

    showReview();

    expect(useQuizStore.getState().view).toBe('review');
  });

  it('reset the quiz', () => {
    const firstQuestion = questions[0]!;
    const secondQuestion = questions[1]!;
    const option = secondQuestion.options[0]!;

    useQuizStore.setState({
      round: [firstQuestion, secondQuestion],
      currentQuestionIndex: 1,
      answers: [
        {
          questionId: secondQuestion.id,
          selectedOptionId: option.id,
        },
      ],
      view: 'review',
    });

    const restartRound = useQuizStore.getState().restartRound;

    restartRound();

    const state = useQuizStore.getState();

    expect(state.currentQuestionIndex).toBe(0);
    expect(state.answers).toEqual([]);
    expect(state.view).toBe('playing');
    expect(state.round).toHaveLength(10);
    expect(state.round.every((question) => question.subject === 'html')).toBe(true);
    expect(state.round.every((question) => question.level === 'basic')).toBe(true);
  });

  it('configures and starts a round through public store actions', () => {
    useQuizStore.setState({
      configuration: { subject: 'html', level: 'basic' },
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
      decks: {},
      mixedExtraSubjects: {},
    });

    useQuizStore.getState().selectSubject('javascript');
    useQuizStore.getState().selectLevel('advanced');
    useQuizStore.getState().startRound();

    const state = useQuizStore.getState();
    expect(state.configuration).toEqual({ subject: 'javascript', level: 'advanced' });
    expect(state.view).toBe('playing');
    expect(state.round).toHaveLength(10);
    expect(
      state.round.every(
        (question) => question.subject === 'javascript' && question.level === 'advanced',
      ),
    ).toBe(true);
  });

  it('retries incorrect answers and returns to the menu through public actions', () => {
    const correctQuestion = questions[0]!;
    const incorrectQuestion = questions[1]!;
    const incorrectOption = incorrectQuestion.options.find(
      (option) => option.id !== incorrectQuestion.correctAnswer,
    )!;

    useQuizStore.setState({
      round: [correctQuestion, incorrectQuestion],
      currentQuestionIndex: 1,
      answers: [
        { questionId: correctQuestion.id, selectedOptionId: correctQuestion.correctAnswer },
        { questionId: incorrectQuestion.id, selectedOptionId: incorrectOption.id },
      ],
      view: 'score',
    });

    useQuizStore.getState().retryIncorrectAnswers();

    expect(useQuizStore.getState()).toMatchObject({
      round: [incorrectQuestion],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
    });

    useQuizStore.setState({ view: 'score' });
    useQuizStore.getState().returnToMenu();

    expect(useQuizStore.getState()).toMatchObject({
      round: [],
      currentQuestionIndex: 0,
      answers: [],
      view: 'menu',
    });
  });
});
