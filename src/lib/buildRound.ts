import type { BankQuestion } from '../types/questionBank';
import { shuffleWith, type RandomSource } from './shuffle';

export function buildBalancedPositions(
  questionCount: number,
  optionCount: number,
  random: RandomSource = Math.random,
): number[] {
  if (!Number.isInteger(questionCount) || questionCount < 0) {
    throw new RangeError('questionCount must be a non-negative integer');
  }
  if (!Number.isInteger(optionCount) || optionCount < 2) {
    throw new RangeError('optionCount must be an integer greater than one');
  }

  const positions = shuffleWith(
    Array.from({ length: optionCount }, (_, index) => index),
    random,
  );
  const planned = Array.from(
    { length: questionCount },
    (_, index) => positions[index % optionCount]!,
  );
  return shuffleWith(planned, random);
}

export function buildRound(
  bank: readonly BankQuestion[],
  size: number,
  random: RandomSource = Math.random,
): BankQuestion[] {
  if (!Number.isInteger(size) || size < 0 || size > bank.length) {
    throw new RangeError('size must be an integer between zero and the bank length');
  }
  if (size === 0) return [];

  const selected = shuffleWith(bank, random).slice(0, size);
  const optionCount = selected[0]!.options.length;
  if (optionCount < 2 || selected.some((question) => question.options.length !== optionCount)) {
    throw new Error('Every selected question must have the same number of options');
  }

  const positions = buildBalancedPositions(size, optionCount, random);
  return selected.map((question, index) => {
    const correct = question.options.find((option) => option.id === question.correctAnswer);
    if (!correct) throw new Error(`Question ${question.id} has no matching correct answer`);

    const distractors = shuffleWith(
      question.options.filter((option) => option.id !== question.correctAnswer),
      random,
    );
    const options = [...distractors];
    options.splice(positions[index]!, 0, correct);
    return { ...question, options };
  });
}
