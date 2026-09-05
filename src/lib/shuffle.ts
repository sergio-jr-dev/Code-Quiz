export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    // Both indices are within the array for a random value in [0, 1).
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}
