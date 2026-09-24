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
            annotations: [
              { kind: 'code', value: 'Object.is' },
              { kind: 'code', value: 'SameValue' },
              { kind: 'code', value: 'NaN' },
              { kind: 'code', value: '===' },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText('Object.is')).toHaveClass('inline-code', 'language-javascript');
    expect(screen.getByText('Object.is')).toHaveClass('syntax-code');
    expect(screen.getByText('NaN')).toHaveAttribute('data-language', 'javascript');
    expect(screen.getByText('===')).toHaveClass('inline-code');
  });

  it('keeps a complete CSS declaration together as one inline snippet', () => {
    render(
      <ExplanationContent
        language="css"
        content={[
          {
            type: 'text',
            text: 'min-width: 0 elimina el mínimo automático del elemento.',
            annotations: [{ kind: 'code', value: 'min-width: 0' }],
          },
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
            text: '<h1> es el encabezado principal; <header> y <head> tienen otras funciones.',
            annotations: [
              { kind: 'code', value: '<h1>' },
              { kind: 'code', value: '<header>' },
              { kind: 'code', value: '<head>' },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText('<h1>')).toHaveClass('inline-code', 'language-html');
    expect(screen.getByText('<header>')).toHaveClass('inline-code', 'language-html');
    expect(screen.getByText('<head>')).toHaveClass('inline-code', 'language-html');
  });

  it('keeps explicitly authored expressions together', () => {
    render(
      <ExplanationContent
        language="javascript"
        content={[
          {
            type: 'text',
            text: 'Promise.all mantiene el orden y puede ordenarse con (a, b) => a - b.',
            annotations: [
              { kind: 'code', value: 'Promise.all' },
              { kind: 'code', value: '(a, b) => a - b' },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText('Promise.all')).toHaveClass('inline-code', 'language-javascript');
    expect(screen.getByText('(a, b) => a - b')).toHaveClass('inline-code', 'language-javascript');
    expect(screen.queryByText('Promise')).not.toBeInTheDocument();
    expect(screen.queryByText('=>')).not.toBeInTheDocument();
  });

  it('recognizes bare member accesses and array method names', () => {
    render(
      <ExplanationContent
        language="javascript"
        content={[
          {
            type: 'text',
            text: 'Object.freeze es superficial y slice no modifica el array original.',
            annotations: [
              { kind: 'code', value: 'Object.freeze' },
              { kind: 'code', value: 'slice' },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText('Object.freeze')).toHaveClass('inline-code', 'language-javascript');
    expect(screen.getByText('slice')).toHaveClass('inline-code', 'language-javascript');
  });

  it('recognizes HTML element names and object-fit values in CSS prose', () => {
    render(
      <ExplanationContent
        language="css"
        content={[
          {
            type: 'text',
            text: 'La imagen img usa cover para cubrir la caja y contain para mostrarse completa.',
            annotations: [
              { kind: 'highlight', value: 'img' },
              { kind: 'highlight', value: 'cover' },
              { kind: 'highlight', value: 'contain' },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText('img')).toHaveClass('inline-code', 'technical-highlight');
    expect(screen.getByText('cover')).toHaveClass('inline-code', 'technical-highlight');
    expect(screen.getByText('contain')).toHaveClass('inline-code', 'technical-highlight');
    expect(screen.getByText('img')).not.toHaveClass('syntax-code');
  });

  it('leaves unannotated technical-looking words as plain prose', () => {
    render(
      <ExplanationContent
        language="css"
        content={[{ type: 'text', text: 'La palabra color permanece en la prosa.' }]}
      />,
    );

    expect(screen.getByText(/color permanece/)).not.toHaveClass('inline-code');
  });

  it('does not match a short identifier inside ordinary words', () => {
    const { container } = render(
      <ExplanationContent
        language="html"
        content={[
          {
            type: 'text',
            text: 'p representa un párrafo y agrupa texto.',
            annotations: [{ kind: 'code', value: 'p' }],
          },
        ]}
      />,
    );

    expect(screen.getAllByText('p')).toHaveLength(1);
    expect(screen.getByText('p')).toHaveClass('syntax-code');
    expect(container).toHaveTextContent('p representa un párrafo y agrupa texto.');
  });
});
