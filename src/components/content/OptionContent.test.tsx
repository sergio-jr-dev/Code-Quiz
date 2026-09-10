import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { questionCatalog } from '../../data/questionCatalog';
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

  it.each(['html', 'css', 'javascript'] as const)(
    'renders a real %s code answer with its explicit language',
    (subject) => {
      const question = questionCatalog.find((candidate) => {
        if (candidate.subject !== subject) return false;
        const correct = candidate.options.find((option) => option.id === candidate.correctAnswer);
        return correct?.content.some(
          (block) => block.type === 'code' && block.language === subject,
        );
      });
      const correct = question?.options.find((option) => option.id === question.correctAnswer);
      const codeBlock = correct?.content.find((block) => block.type === 'code');
      if (!correct || !codeBlock || codeBlock.type !== 'code') {
        throw new Error(`Missing ${subject} code answer fixture`);
      }

      const { container } = render(<OptionContent content={correct.content} />);
      const code = container.querySelector('pre > code');

      expect(code).toHaveClass(`language-${subject}`);
      expect(code).toHaveAttribute('data-language', subject);
      expect(code?.textContent).toBe(codeBlock.code);
    },
  );
});
