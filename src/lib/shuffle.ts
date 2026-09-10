export type RandomSource = () => number;

export function shuffleWith<T>(items: readonly T[], random: RandomSource): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    // Both indices are within the array for a random value in [0, 1).
    [result[i], result[j]] = [result[j]!, result[i]!];
  }

  return result;
}

export function shuffle<T>(items: readonly T[], random: RandomSource = Math.random): T[] {
  return shuffleWith(items, random);
}
