import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExplanationContent } from './ExplanationContent';

describe('ExplanationContent', () => {
  it('identifies the explanation variant while reusing the content sequence', () => {
    const { container } = render(
      <ExplanationContent
        content={[
          { type: 'text', text: 'La cuadrícula organiza el contenido en filas y columnas.' },
        ]}
      />,
    );

    expect(container.firstChild).toHaveClass('content-blocks', 'explanation-content');
  });

  it('marks technical mentions as escaped inline code with an explicit language', () => {
    render(
      <ExplanationContent
        language="javascript"
        content={[
          {
            type: 'text',
            text: 'Object.is usa SameValue y considera iguales dos NaN. La igualdad === no lo hace.',
          },
        ]}
      />,
    );

    expect(screen.getByText('Object.is')).toHaveClass('inline-code', 'language-javascript');
    expect(screen.getByText('NaN')).toHaveAttribute('data-language', 'javascript');
    expect(screen.getByText('===')).toHaveClass('inline-code');
  });

  it('keeps a complete CSS declaration together as one inline snippet', () => {
    render(
      <ExplanationContent
        language="css"
        content={[
          { type: 'text', text: 'min-width: 0 elimina el mínimo automático del elemento.' },
        ]}
      />,
    );

    expect(screen.getByText('min-width: 0')).toHaveClass('inline-code', 'language-css');
  });

  it('recognizes HTML element names containing numbers in explanatory text', () => {
    render(
      <ExplanationContent
        language="html"
        content={[
          {
            type: 'text',
            text: 'h1 es el encabezado principal; header y head tienen otras funciones.',
          },
        ]}
      />,
    );

    expect(screen.getByText('h1')).toHaveClass('inline-code', 'language-html');
    expect(screen.getByText('header')).toHaveClass('inline-code', 'language-html');
    expect(screen.getByText('head')).toHaveClass('inline-code', 'language-html');
  });

  it('keeps explicitly authored expressions together ahead of heuristic matches', () => {
    render(
      <ExplanationContent
        language="javascript"
        content={[
          {
            type: 'text',
            text: 'Promise.all mantiene el orden y puede ordenarse con (a, b) => a - b.',
            inlineCode: ['Promise.all', '(a, b) => a - b'],
          },
        ]}
      />,
    );

    expect(screen.getByText('Promise.all')).toHaveClass('inline-code', 'language-javascript');
    expect(screen.getByText('(a, b) => a - b')).toHaveClass('inline-code', 'language-javascript');
    expect(screen.queryByText('Promise')).not.toBeInTheDocument();
    expect(screen.queryByText('=>')).not.toBeInTheDocument();
  });
});
