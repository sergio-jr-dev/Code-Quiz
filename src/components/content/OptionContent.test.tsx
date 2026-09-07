import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { QuestionContent } from '../../types/questionBank';
import { OptionContent } from './OptionContent';

const mixedContent: QuestionContent = [
  { type: 'text', text: 'Usa esta declaración:' },
  { type: 'code', language: 'css', code: '.card { display: grid; }' },
];

describe('OptionContent', () => {
  it('supports a sequence of text and code', () => {
    render(<OptionContent content={mixedContent} />);

    expect(screen.getByText('Usa esta declaración:')).toBeInTheDocument();
    expect(screen.getByText('.card { display: grid; }')).toHaveClass('language-css');
  });
});
