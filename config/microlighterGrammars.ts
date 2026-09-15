import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

import type { Plugin } from 'vite';

const require = createRequire(import.meta.url);
const grammars = ['html', 'css', 'javascript', 'json'] as const;

export function microlighterGrammars(): Plugin {
  let assetsDir = 'assets';

  return {
    name: 'code-quiz-microlighter-grammars',
    apply: 'build',
    configResolved(config) {
      assetsDir = config.build.assetsDir;
    },
    async generateBundle() {
      for (const grammar of grammars) {
        const source = await readFile(
          require.resolve(`microlighter/grammars/${grammar}.js`),
          'utf8',
        );

        this.emitFile({
          type: 'asset',
          fileName: `${assetsDir}/grammars/${grammar}.js`,
          source,
        });
      }
    },
  };
}
