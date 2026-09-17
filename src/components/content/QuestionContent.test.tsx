import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { QuestionContent } from './QuestionContent';

describe('QuestionContent', () => {
  it('renders the first text block as its semantic heading', () => {
    render(
      <QuestionContent
        headingId="question-title"
        language="javascript"
        content={[
          { type: 'text', text: '¿Qué imprime este fragmento?' },
          { type: 'code', language: 'javascript', code: 'console.log("hola");' },
        ]}
      />,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: '¿Qué imprime este fragmento?' }),
    ).toHaveAttribute('id', 'question-title');
    expect(screen.getByText('console.log("hola");')).toHaveAttribute('data-language', 'javascript');
  });

  it('renders explicit inline code inside the question heading', () => {
    render(
      <QuestionContent
        headingId="question-title"
        language="javascript"
        content={[
          {
            type: 'text',
            text: '¿Qué devuelve Promise.all?',
            annotations: [{ kind: 'code', value: 'Promise.all' }],
          },
        ]}
      />,
    );

    expect(screen.getByText('Promise.all')).toHaveClass('inline-code', 'language-javascript');
    expect(screen.getByText('Promise.all')).toHaveClass('syntax-code');
  });
});
