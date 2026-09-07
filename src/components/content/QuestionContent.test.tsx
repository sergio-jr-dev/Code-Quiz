import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { QuestionContent } from './QuestionContent';

describe('QuestionContent', () => {
  it('renders the first text block as its semantic heading', () => {
    render(<QuestionContent
      headingId="question-title"
      content={[
        { type: 'text', text: '¿Qué imprime este fragmento?' },
        { type: 'code', language: 'javascript', code: 'console.log("hola");' },
      ]}
    />);

    expect(screen.getByRole('heading', { level: 2, name: '¿Qué imprime este fragmento?' }))
      .toHaveAttribute('id', 'question-title');
    expect(screen.getByText('console.log("hola");')).toHaveAttribute('data-language', 'javascript');
  });
});
