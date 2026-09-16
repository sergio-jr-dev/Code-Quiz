import type { BankQuestion, Level, QuestionId, Subject } from '../types/questionBank';
import { SUBJECTS } from '../types/questionBank';
import type {
  MixedExtraSubjects,
  QuizConfiguration,
  QuizDecks,
  QuizState,
  QuizSubject,
} from '../types/quizStore';
import { buildRound } from './buildRound';
import { shuffleWith, type RandomSource } from './shuffle';

export const ROUND_SIZE = 10;
export const MINIMUM_PLAYABLE_QUESTIONS = 20;

interface RoundSelection {
  round: readonly BankQuestion[];
  decks: QuizDecks;
  mixedExtraSubjects: MixedExtraSubjects;
}

interface DeckDraw {
  questionIds: readonly QuestionId[];
  remainingQuestionIds: readonly QuestionId[];
}

const isSubject = (value: QuizSubject): value is Subject => value !== 'mixed';

const configurationDeckKey = (configuration: QuizConfiguration, subject: Subject): string =>
  `${configuration.subject}:${configuration.level}:${subject}`;

const questionsFor = (
  catalog: readonly BankQuestion[],
  subject: Subject,
  level: Level,
): readonly BankQuestion[] =>
  catalog.filter((question) => question.subject === subject && question.level === level);

const drawFromDeck = (
  candidates: readonly BankQuestion[],
  previousDeck: readonly QuestionId[] | undefined,
  size: number,
  random: RandomSource,
): DeckDraw => {
  const candidateIds = candidates.map((question) => question.id);
  const validIds = new Set(candidateIds);
  const sanitizedDeck = [...new Set(previousDeck?.filter((id) => validIds.has(id)) ?? [])];
  const currentCycle =
    previousDeck === undefined || sanitizedDeck.length === 0
      ? shuffleWith(candidateIds, random)
      : sanitizedDeck;
  if (currentCycle.length >= size) {
    return {
      questionIds: currentCycle.slice(0, size),
      remainingQuestionIds: currentCycle.slice(size),
    };
  }

  const questionIds = [...currentCycle];
  const selectedIds = new Set(questionIds);
  const remainingQuestionIds: QuestionId[] = [];

  for (const id of shuffleWith(candidateIds, random)) {
    if (questionIds.length < size && !selectedIds.has(id)) {
      questionIds.push(id);
      selectedIds.add(id);
    } else {
      remainingQuestionIds.push(id);
    }
  }

  return { questionIds, remainingQuestionIds };
};

const getQuestionMap = (catalog: readonly BankQuestion[]): ReadonlyMap<QuestionId, BankQuestion> =>
  new Map(catalog.map((question) => [question.id, question]));

export const isConfigurationPlayable = (
  catalog: readonly BankQuestion[],
  configuration: QuizConfiguration,
): boolean => {
  if (isSubject(configuration.subject)) {
    return (
      questionsFor(catalog, configuration.subject, configuration.level).length >=
      MINIMUM_PLAYABLE_QUESTIONS
    );
  }

  return SUBJECTS.every(
    (subject) =>
      questionsFor(catalog, subject, configuration.level).length >= MINIMUM_PLAYABLE_QUESTIONS,
  );
};

export const selectConfiguredRound = (
  catalog: readonly BankQuestion[],
  configuration: QuizConfiguration,
  decks: QuizDecks,
  mixedExtraSubjects: MixedExtraSubjects,
  random: RandomSource = Math.random,
): RoundSelection | null => {
  if (!isConfigurationPlayable(catalog, configuration)) return null;

  const nextDecks = { ...decks };
  const selectedIds: QuestionId[] = [];
  const nextMixedExtraSubjects = { ...mixedExtraSubjects };

  if (isSubject(configuration.subject)) {
    const candidates = questionsFor(catalog, configuration.subject, configuration.level);
    const deckKey = configurationDeckKey(configuration, configuration.subject);
    const draw = drawFromDeck(candidates, decks[deckKey], ROUND_SIZE, random);
    selectedIds.push(...draw.questionIds);
    nextDecks[deckKey] = draw.remainingQuestionIds;
  } else {
    const extraSubject = mixedExtraSubjects[configuration.level] ?? SUBJECTS[0];

    for (const subject of SUBJECTS) {
      const candidates = questionsFor(catalog, subject, configuration.level);
      const deckKey = configurationDeckKey(configuration, subject);
      const size = subject === extraSubject ? 4 : 3;
      const draw = drawFromDeck(candidates, decks[deckKey], size, random);
      selectedIds.push(...draw.questionIds);
      nextDecks[deckKey] = draw.remainingQuestionIds;
    }

    const extraSubjectIndex = SUBJECTS.indexOf(extraSubject);
    nextMixedExtraSubjects[configuration.level] =
      SUBJECTS[(extraSubjectIndex + 1) % SUBJECTS.length]!;
  }

  const questionMap = getQuestionMap(catalog);
  const selectedQuestions = selectedIds.map((id) => questionMap.get(id)!);

  return {
    round: buildRound(selectedQuestions, ROUND_SIZE, random),
    decks: nextDecks,
    mixedExtraSubjects: nextMixedExtraSubjects,
  };
};

export const selectQuizSubject = (state: QuizState, subject: QuizSubject): QuizState => {
  if (state.view !== 'menu' || state.configuration.subject === subject) return state;

  return {
    ...state,
    configuration: { ...state.configuration, subject },
  };
};

export const selectQuizLevel = (state: QuizState, level: Level): QuizState => {
  if (state.view !== 'menu' || state.configuration.level === level) return state;

  return {
    ...state,
    configuration: { ...state.configuration, level },
  };
};

export const startConfiguredQuiz = (
  state: QuizState,
  catalog: readonly BankQuestion[],
  random: RandomSource = Math.random,
): QuizState => {
  if (state.view !== 'menu') return state;

  const selection = selectConfiguredRound(
    catalog,
    state.configuration,
    state.decks,
    state.mixedExtraSubjects,
    random,
  );
  if (!selection) return state;

  return {
    ...state,
    ...selection,
    roundSource: 'configured',
    currentQuestionIndex: 0,
    answers: [],
    view: 'playing',
  };
};

export const restartConfiguredQuiz = (
  state: QuizState,
  catalog: readonly BankQuestion[],
  random: RandomSource = Math.random,
): QuizState => {
  if (state.view !== 'score' && state.view !== 'review') return state;

  const selection = selectConfiguredRound(
    catalog,
    state.configuration,
    state.decks,
    state.mixedExtraSubjects,
    random,
  );
  if (!selection) return state;

  return {
    ...state,
    ...selection,
    roundSource: 'configured',
    currentQuestionIndex: 0,
    answers: [],
    view: 'playing',
  };
};
