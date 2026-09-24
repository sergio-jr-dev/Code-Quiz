import { describe, expect, it } from 'vitest';

import { isCompleteCodeBlock } from './codePresentation';

describe('isCompleteCodeBlock', () => {
  it('distinguishes CSS declarations from complete rules', () => {
    expect(isCompleteCodeBlock({ type: 'code', language: 'css', code: 'min-width: 0;' })).toBe(
      false,
    );
    expect(
      isCompleteCodeBlock({
        type: 'code',
        language: 'css',
        code: '.item {\n  min-width: 0;\n}',
      }),
    ).toBe(true);
  });

  it('recognizes complete HTML elements without treating isolated names as blocks', () => {
    expect(isCompleteCodeBlock({ type: 'code', language: 'html', code: 'download' })).toBe(false);
    expect(
      isCompleteCodeBlock({
        type: 'code',
        language: 'html',
        code: '<a href="document.pdf" download>Descargar</a>',
      }),
    ).toBe(true);
  });
});
