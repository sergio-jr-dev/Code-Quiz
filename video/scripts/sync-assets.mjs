import { copyFile, mkdir } from 'node:fs/promises';

// Only the assets used by the composition. The application owns the originals.
const assets = [
  'code-quiz-logo-dark.webp',
  'game-background.svg',
  'subjects/html-logo-3d.png',
  'subjects/css-logo-3d.png',
  'subjects/javascript-logo-3d.png',
  'levels/basic.png',
  'levels/intermediate.png',
  'levels/advanced.png',
  'modes/normal.png',
  'modes/timed.png',
];

for (const asset of assets) {
  const target = new URL(`../public/images/${asset}`, import.meta.url);
  await mkdir(new URL('.', target), { recursive: true });
  await copyFile(new URL(`../../public/images/${asset}`, import.meta.url), target);
}
console.log(`Recursos preparados: ${assets.length}`);
