import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExplanationContent } from './ExplanationContent';

describe('ExplanationContent', () => {
  it('identifies the explanation variant while reusing the content sequence', () => {
    const { container } = render(<ExplanationContent content={[
      { type: 'text', text: 'La cuadrícula organiza el contenido en filas y columnas.' },
    ]} />);

    expect(container.firstChild).toHaveClass('content-blocks', 'explanation-content');
  });
});
