import { describe, expect, it } from 'vitest';
import { questionExamples } from '../data/questionExamples';
import type { BankQuestion } from '../types/questionBank';
import { buildBalancedPositions, buildRound } from './buildRound';

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

describe('buildBalancedPositions', () => {
  it.each([1, 2, 3, 4, 5, 9, 10, 11, 20])('balances %i questions across four positions', size => {
    const positions = buildBalancedPositions(size, 4, seededRandom(42));
    const counts = Array.from({ length: 4 }, (_, position) =>
      positions.filter(candidate => candidate === position).length);

    expect(positions).toHaveLength(size);
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  });

  it('produces a 3/3/2/2 distribution for ten questions', () => {
    const positions = buildBalancedPositions(10, 4, seededRandom(7));
    const counts = Array.from({ length: 4 }, (_, position) =>
      positions.filter(candidate => candidate === position).length).sort((a, b) => b - a);
    expect(counts).toEqual([3, 3, 2, 2]);
  });
});

describe('buildRound', () => {
  const bank = Array.from({ length: 12 }, (_, index) => ({
    ...structuredClone(questionExamples[index % questionExamples.length]!),
    id: `${questionExamples[index % questionExamples.length]!.subject}-example-${String(index + 1).padStart(3, '0')}`,
  })) as BankQuestion[];

  it('is reproducible and does not mutate questions or options', () => {
    const snapshot = structuredClone(bank);
    const first = buildRound(bank, 10, seededRandom(2026));
    const second = buildRound(bank, 10, seededRandom(2026));

    expect(second).toEqual(first);
    expect(bank).toEqual(snapshot);
    expect(new Set(first.map(question => question.id))).toHaveLength(10);
  });

  it('preserves answer IDs while balancing their visual positions', () => {
    const round = buildRound(bank, 10, seededRandom(8));
    const correctPositions = round.map(question =>
      question.options.findIndex(option => option.id === question.correctAnswer));
    const counts = Array.from({ length: 4 }, (_, position) =>
      correctPositions.filter(candidate => candidate === position).length).sort((a, b) => b - a);

    expect(counts).toEqual([3, 3, 2, 2]);
    for (const question of round) {
      const source = bank.find(candidate => candidate.id === question.id)!;
      expect(question.correctAnswer).toBe(source.correctAnswer);
      expect(new Set(question.options.map(option => option.id))).toEqual(new Set(source.options.map(option => option.id)));
    }
  });

  it('rejects invalid sizes and inconsistent option counts', () => {
    expect(() => buildRound(bank, bank.length + 1, seededRandom(1))).toThrow(RangeError);
    const inconsistent = [{ ...bank[0]!, options: bank[0]!.options.slice(0, 3) }, bank[1]!];
    expect(() => buildRound(inconsistent, 2, seededRandom(1))).toThrow(/same number of options/);
  });
});
