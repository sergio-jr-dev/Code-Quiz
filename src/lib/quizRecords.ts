import type { QuizBestResults, QuizConfiguration, QuizMode, QuizState } from '../types/quizStore';
import { calculateScore } from './quizTransitions';

export const quizConfigurationKey = (
  configuration: QuizConfiguration,
  mode: QuizMode = 'normal',
): string => {
  const configurationKey = `${configuration.subject}:${configuration.level}`;

  return mode === 'normal' ? configurationKey : `${configurationKey}:${mode}`;
};

export const selectBestResult = (state: QuizState): number | undefined =>
  state.bestResults[quizConfigurationKey(state.configuration, state.mode)];

export const selectBestResultForConfiguration = (
  bestResults: QuizBestResults,
  configuration: QuizConfiguration,
  mode: QuizMode,
): number | undefined => bestResults[quizConfigurationKey(configuration, mode)];

export const recordBestResult = (state: QuizState): QuizState => {
  if (
    state.view !== 'score' ||
    state.roundSource !== 'configured' ||
    state.round.length !== 10 ||
    state.answers.length !== 10
  ) {
    return state;
  }

  const key = quizConfigurationKey(state.configuration, state.mode);
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
