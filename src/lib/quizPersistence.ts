import { z } from 'zod';
import type { PersistStorage, StateStorage, StorageValue } from 'zustand/middleware';

import type { BankQuestion, QuestionId } from '../types/questionBank';
import { LEVELS, SUBJECTS } from '../types/questionBank';
import type { QuizAnswer, QuizConfiguration, QuizState } from '../types/quizStore';
import { quizConfigurationKey } from './quizRecords';

export const QUIZ_STORAGE_KEY = 'code-quiz:quiz-state';
export const QUIZ_STORAGE_VERSION = 1;

const subjectSchema = z.enum(SUBJECTS);
const levelSchema = z.enum(LEVELS);
const quizSubjectSchema = z.enum([...SUBJECTS, 'mixed']);

const quizConfigurationSchema = z.strictObject({
  subject: quizSubjectSchema,
  level: levelSchema,
});

const quizAnswerSchema = z.strictObject({
  questionId: z.string(),
  selectedOptionId: z.string(),
});

const persistedRoundQuestionSchema = z.strictObject({
  questionId: z.string(),
  optionIds: z.array(z.string()),
});

const persistedQuizStateSchema = z.strictObject({
  configuration: quizConfigurationSchema,
  progress: z.strictObject({
    round: z.array(persistedRoundQuestionSchema),
    currentQuestionIndex: z.number().int().nonnegative(),
    answers: z.array(quizAnswerSchema),
    view: z.enum(['menu', 'playing', 'score', 'review']),
    roundSource: z.enum(['configured', 'incorrect-retry']),
  }),
  decks: z.record(z.string(), z.array(z.string())),
  mixedExtraSubjects: z.strictObject({
    basic: subjectSchema.optional(),
    intermediate: subjectSchema.optional(),
    advanced: subjectSchema.optional(),
  }),
  bestResults: z.record(z.string(), z.number().int().min(0).max(10)),
});

const persistedStorageValueSchema = z.strictObject({
  state: persistedQuizStateSchema,
  version: z.number().int().nonnegative().optional(),
});

export type PersistedQuizStateV1 = z.infer<typeof persistedQuizStateSchema>;

const expectedDecks = (catalog: readonly BankQuestion[]): ReadonlyMap<string, Set<QuestionId>> => {
  const decks = new Map<string, Set<QuestionId>>();

  for (const level of LEVELS) {
    for (const subject of SUBJECTS) {
      const ids = new Set(
        catalog
          .filter((question) => question.subject === subject && question.level === level)
          .map((question) => question.id),
      );
      decks.set(`${subject}:${level}:${subject}`, ids);
      decks.set(`mixed:${level}:${subject}`, ids);
    }
  }

  return decks;
};

const readDecks = (
  value: PersistedQuizStateV1['decks'],
  catalog: readonly BankQuestion[],
): QuizState['decks'] | null => {
  const allowedDecks = expectedDecks(catalog);
  const decks: Record<string, readonly QuestionId[]> = {};

  for (const [key, candidateIds] of Object.entries(value)) {
    const allowedIds = allowedDecks.get(key);
    if (!allowedIds || candidateIds.some((id) => !allowedIds.has(id as QuestionId))) {
      return null;
    }
    if (new Set(candidateIds).size !== candidateIds.length) return null;
    decks[key] = candidateIds as QuestionId[];
  }

  return decks;
};

const readBestResults = (
  value: PersistedQuizStateV1['bestResults'],
): QuizState['bestResults'] | null => {
  const allowedKeys = new Set<string>();

  for (const level of LEVELS) {
    for (const subject of [...SUBJECTS, 'mixed'] as const) {
      allowedKeys.add(quizConfigurationKey({ subject, level }));
    }
  }

  const results: Record<string, number> = {};
  for (const [key, score] of Object.entries(value)) {
    if (!allowedKeys.has(key)) return null;
    results[key] = score;
  }

  return results;
};

const restoreRound = (
  value: PersistedQuizStateV1['progress']['round'],
  catalog: readonly BankQuestion[],
  configuration: QuizConfiguration,
): readonly BankQuestion[] | null => {
  const questionMap = new Map(catalog.map((question) => [question.id, question]));
  const seenQuestionIds = new Set<QuestionId>();
  const round: BankQuestion[] = [];

  for (const entry of value) {
    const question = questionMap.get(entry.questionId as QuestionId);
    if (!question || seenQuestionIds.has(question.id)) return null;
    if (question.level !== configuration.level) return null;
    if (configuration.subject !== 'mixed' && question.subject !== configuration.subject)
      return null;

    const optionIds = entry.optionIds;
    const validOptionIds = new Set(question.options.map((option) => option.id));
    if (
      optionIds.length !== question.options.length ||
      new Set(optionIds).size !== optionIds.length ||
      optionIds.some((id) => !validOptionIds.has(id))
    ) {
      return null;
    }

    const optionMap = new Map(question.options.map((option) => [option.id, option]));
    round.push({
      ...question,
      options: optionIds.map((id) => optionMap.get(id as string)!),
    });
    seenQuestionIds.add(question.id);
  }

  if (configuration.subject === 'mixed' && round.length === 10) {
    const subjectCounts = SUBJECTS.map(
      (subject) => round.filter((question) => question.subject === subject).length,
    ).sort((left, right) => left - right);
    if (subjectCounts[0] !== 3 || subjectCounts[1] !== 3 || subjectCounts[2] !== 4) return null;
  }

  return round;
};

const readAnswers = (
  value: PersistedQuizStateV1['progress']['answers'],
  round: readonly BankQuestion[],
): readonly QuizAnswer[] | null => {
  const questionMap = new Map(round.map((question) => [question.id, question]));
  const seenQuestionIds = new Set<QuestionId>();
  const answers: QuizAnswer[] = [];

  for (const answer of value) {
    const question = questionMap.get(answer.questionId as QuestionId);
    if (!question || seenQuestionIds.has(question.id)) return null;
    if (!question.options.some((option) => option.id === answer.selectedOptionId)) return null;
    answers.push({ questionId: question.id, selectedOptionId: answer.selectedOptionId });
    seenQuestionIds.add(question.id);
  }

  return answers;
};

const readProgress = (
  value: PersistedQuizStateV1['progress'],
  catalog: readonly BankQuestion[],
  configuration: QuizConfiguration,
): Pick<
  QuizState,
  'round' | 'currentQuestionIndex' | 'answers' | 'view' | 'roundSource'
> | null => {
  const round = restoreRound(value.round, catalog, configuration);
  if (!round) return null;
  const answers = readAnswers(value.answers, round);
  if (!answers) return null;
  const currentQuestionIndex = value.currentQuestionIndex as number;

  if (value.view === 'menu') {
    if (
      round.length !== 0 ||
      currentQuestionIndex !== 0 ||
      answers.length !== 0 ||
      value.roundSource !== 'configured'
    ) {
      return null;
    }
  } else {
    if (round.length < 1 || round.length > 10) return null;
    if (value.roundSource === 'configured' && round.length !== 10) return null;
    if (currentQuestionIndex < 0 || currentQuestionIndex >= round.length) return null;

    const questionIndexes = new Map(round.map((question, index) => [question.id, index]));
    const answeredIds = new Set(answers.map((answer) => answer.questionId));
    if (answers.some((answer) => questionIndexes.get(answer.questionId)! > currentQuestionIndex)) {
      return null;
    }

    if (value.view === 'playing') {
      for (let index = 0; index < currentQuestionIndex; index++) {
        if (!answeredIds.has(round[index]!.id)) return null;
      }
      if (answers.length !== currentQuestionIndex && answers.length !== currentQuestionIndex + 1) {
        return null;
      }
    } else if (currentQuestionIndex !== round.length - 1 || answers.length !== round.length) {
      return null;
    }
  }

  return {
    round,
    currentQuestionIndex,
    answers,
    view: value.view,
    roundSource: value.roundSource,
  };
};

const restorePersistedQuizState = (
  value: unknown,
  catalog: readonly BankQuestion[],
): QuizState | null => {
  const parsed = persistedQuizStateSchema.safeParse(value);
  if (!parsed.success) return null;
  const persistedState = parsed.data;

  const configuration = persistedState.configuration;
  const progress = readProgress(persistedState.progress, catalog, configuration);
  const decks = readDecks(persistedState.decks, catalog);
  const bestResults = readBestResults(persistedState.bestResults);
  if (!progress || !decks || !bestResults) return null;

  return {
    mode: 'normal',
    timer: null,
    configuration,
    ...progress,
    decks,
    mixedExtraSubjects: persistedState.mixedExtraSubjects,
    bestResults,
  };
};

export const partializeQuizState = (state: QuizState): PersistedQuizStateV1 => ({
  configuration: { ...state.configuration },
  progress: {
    round: state.round.map((question) => ({
      questionId: question.id,
      optionIds: question.options.map((option) => option.id),
    })),
    currentQuestionIndex: state.currentQuestionIndex,
    answers: state.answers.flatMap((answer) =>
      answer.timedOut === true
        ? []
        : [{ questionId: answer.questionId, selectedOptionId: answer.selectedOptionId }],
    ),
    view: state.view,
    roundSource: state.roundSource,
  },
  decks: Object.fromEntries(Object.entries(state.decks).map(([key, ids]) => [key, [...ids]])),
  mixedExtraSubjects: { ...state.mixedExtraSubjects },
  bestResults: { ...state.bestResults },
});

export const mergePersistedQuizState = <State extends QuizState>(
  persistedState: unknown,
  currentState: State,
  catalog: readonly BankQuestion[],
): State => {
  const restoredState = restorePersistedQuizState(persistedState, catalog);
  return restoredState ? { ...currentState, ...restoredState } : currentState;
};

const unavailableStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

const createSafeStateStorage = (getStorage: () => StateStorage): StateStorage => {
  let storage: StateStorage;

  try {
    storage = getStorage();
  } catch {
    return unavailableStorage;
  }

  return {
    getItem: (name) => {
      try {
        return storage.getItem(name);
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      try {
        const result = storage.setItem(name, value);
        return result instanceof Promise ? result.catch(() => undefined) : result;
      } catch {
        return undefined;
      }
    },
    removeItem: (name) => {
      try {
        const result = storage.removeItem(name);
        return result instanceof Promise ? result.catch(() => undefined) : result;
      } catch {
        return undefined;
      }
    },
  };
};

export const createQuizPersistStorage = (
  getStorage: () => StateStorage = () => window.localStorage,
): PersistStorage<PersistedQuizStateV1> => {
  const storage = createSafeStateStorage(getStorage);

  const parseStorageValue = (
    serialized: string | null,
  ): StorageValue<PersistedQuizStateV1> | null => {
    if (serialized === null) return null;

    try {
      const parsed = persistedStorageValueSchema.safeParse(JSON.parse(serialized));
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  };

  return {
    getItem: (name) => {
      const serialized = storage.getItem(name);
      return serialized instanceof Promise
        ? serialized.then(parseStorageValue).catch(() => null)
        : parseStorageValue(serialized);
    },
    setItem: (name, value) => {
      const parsed = persistedStorageValueSchema.safeParse(value);
      if (!parsed.success) return undefined;

      return storage.setItem(name, JSON.stringify(parsed.data));
    },
    removeItem: (name) => storage.removeItem(name),
  };
};
