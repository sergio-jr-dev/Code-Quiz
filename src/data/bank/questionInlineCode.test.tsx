import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExplanationContent } from '../../components/content/ExplanationContent';
import { OptionContent } from '../../components/content/OptionContent';
import { QuestionContent } from '../../components/content/QuestionContent';
import { questionCatalog } from '../questionCatalog';

function renderQuestion(id: string) {
  const question = questionCatalog.find((candidate) => candidate.id === id);
  if (!question) throw new Error(`Missing question ${id}`);

  render(
    <>
      <QuestionContent
        content={question.prompt}
        headingId={`${question.id}-title`}
        language={question.subject}
      />
      {question.options.map((option) => (
        <OptionContent content={option.content} key={option.id} language={question.subject} />
      ))}
      <ExplanationContent content={question.explanation} language={question.subject} />
    </>,
  );
}

function expectInlineCode(term: string, occurrences?: number) {
  const matches = screen.getAllByText(term);

  if (occurrences !== undefined) expect(matches).toHaveLength(occurrences);
  expect(matches.every((match) => match.classList.contains('inline-code'))).toBe(true);
}

describe('question bank inline code', () => {
  it('marks the HTML element and object-fit values in the CSS question', () => {
    renderQuestion('css-object-fit-101');

    expectInlineCode('img');
    expectInlineCode('object-fit: cover');
    expectInlineCode('cover');
    expectInlineCode('contain');
  });

  it('marks JSON methods and eval in the JavaScript question', () => {
    renderQuestion('javascript-json-parse-101');

    expectInlineCode('JSON.parse', 2);
    expectInlineCode('JSON.stringify');
    expectInlineCode('parse');
    expectInlineCode('eval');
  });

  it('marks every slice and splice mention in the JavaScript question', () => {
    renderQuestion('javascript-array-slice-101');

    expectInlineCode('slice', 4);
    expectInlineCode('splice', 4);
  });
});
