import { beforeEach, describe, expect, it, vi } from 'vitest';

import { playQuizSound } from '../lib/quizSounds';
import { questionExamples } from '../test/fixtures/questionExamples';
import { usePreferencesStore } from './preferencesStore';
import { useQuizStore } from './quizStore';

vi.mock('../lib/quizSounds', () => ({
  playQuizSound: vi.fn(),
  stopQuizSound: vi.fn(),
  unlockQuizSounds: vi.fn(),
}));

const question = questionExamples[0]!;
const incorrectOption = question.options.find((option) => option.id !== question.correctAnswer)!;

describe('sound cues on quiz transitions', () => {
  beforeEach(() => {
    vi.mocked(playQuizSound).mockClear();
    usePreferencesStore.setState({ soundEnabled: true });
    useQuizStore.setState({
      mode: 'normal',
      timer: null,
      round: [question],
      currentQuestionIndex: 0,
      answers: [],
      view: 'playing',
      roundSource: 'configured',
      bestResults: {},
    });
  });

  it('plays one correct or incorrect cue for a valid answer only', () => {
    useQuizStore.getState().selectOption(question.correctAnswer);
    useQuizStore.getState().selectOption(incorrectOption.id);
    expect(playQuizSound).toHaveBeenCalledTimes(1);
    expect(playQuizSound).toHaveBeenCalledWith('success', true);

    useQuizStore.setState({ answers: [] });
    useQuizStore.getState().selectOption(incorrectOption.id);
    expect(playQuizSound).toHaveBeenLastCalledWith('error', true);
  });

  it('plays warning once when the timer expires', () => {
    useQuizStore.setState({
      mode: 'timed',
      timer: {
        questionId: question.id,
        durationMs: 60_000,
        remainingMs: 1_000,
        status: 'running',
        referenceTimeMs: 0,
      },
    });
    useQuizStore.getState().expireQuestion(1_000);
    useQuizStore.getState().expireQuestion(1_001);
    expect(playQuizSound).toHaveBeenCalledExactlyOnceWith('warning', true);
  });

  it('plays complete for a configured round but not a retry', () => {
    useQuizStore.setState({
      answers: [{ questionId: question.id, selectedOptionId: question.correctAnswer }],
    });
    useQuizStore.getState().goToNextQuestion();
    useQuizStore.getState().goToNextQuestion();
    expect(playQuizSound).toHaveBeenCalledExactlyOnceWith('complete', true);

    vi.mocked(playQuizSound).mockClear();
    useQuizStore.setState({ view: 'playing', roundSource: 'incorrect-retry' });
    useQuizStore.getState().goToNextQuestion();
    expect(playQuizSound).not.toHaveBeenCalled();
  });
});
