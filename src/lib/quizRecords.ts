import type { QuizConfiguration, QuizState } from '../types/quizStore';
import { calculateScore } from './quizTransitions';

export const quizConfigurationKey = (configuration: QuizConfiguration): string =>
  `${configuration.subject}:${configuration.level}`;

export const selectBestResult = (state: QuizState): number | undefined =>
  state.bestResults[quizConfigurationKey(state.configuration)];

export const recordBestResult = (state: QuizState): QuizState => {
  if (
    state.view !== 'score' ||
    state.roundSource !== 'configured' ||
    state.round.length !== 10 ||
    state.answers.length !== 10
  ) {
    return state;
  }

  const key = quizConfigurationKey(state.configuration);
  const score = calculateScore(state);
  const previousBest = state.bestResults[key];

  if (previousBest !== undefined && previousBest >= score) return state;

  return {
    ...state,
    bestResults: {
      ...state.bestResults,
      [key]: score,
    },
  };
};
