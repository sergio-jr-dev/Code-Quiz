import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ContentBlock } from '../../components/content/ContentBlock';
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
  expect(matches.every((match) => match.classList.contains('syntax-code'))).toBe(true);
}

function expectHighlightedText(term: string, occurrences?: number) {
  const matches = screen.getAllByText(term);

  if (occurrences !== undefined) expect(matches).toHaveLength(occurrences);
  expect(matches.every((match) => match.classList.contains('technical-highlight'))).toBe(true);
  expect(matches.every((match) => !match.classList.contains('syntax-code'))).toBe(true);
}

function expectEveryAuthoredCodeBlockIsHighlightable(id: string) {
  const question = questionCatalog.find((candidate) => candidate.id === id);
  if (!question) throw new Error(`Missing question ${id}`);

  const expectedCodeBlocks = [
    ...question.prompt,
    ...question.options.flatMap((option) => option.content),
    ...question.explanation,
  ].filter((block) => block.type === 'code');

  expect(
    screen.getAllByText(
      (_, element) => element?.matches('code.syntax-code:not(.inline-code)') ?? false,
    ),
  ).toHaveLength(expectedCodeBlocks.length);
}

describe('question bank inline code', () => {
  it('keeps every authored code block in the syntax-highlighting contract', () => {
    const codeBlocks = questionCatalog.flatMap((question) =>
      [
        ...question.prompt,
        ...question.options.flatMap((option) => option.content),
        ...question.explanation,
      ].filter((block) => block.type === 'code'),
    );
    const { container } = render(
      <>
        {codeBlocks.map((block, index) => (
          <ContentBlock block={block} key={`${index}-${block.code}`} />
        ))}
      </>,
    );

    expect(container.querySelectorAll('code.syntax-code')).toHaveLength(codeBlocks.length);
  });

  it('marks the HTML element and object-fit values in the CSS question', () => {
    renderQuestion('css-object-fit-101');

    expectHighlightedText('img');
    expectInlineCode('object-fit: cover');
    expectHighlightedText('cover');
    expectHighlightedText('contain');
  });

  it('marks JSON methods and eval in the JavaScript question', () => {
    renderQuestion('javascript-json-parse-101');

    expectInlineCode('JSON.parse', 2);
    expectInlineCode('JSON.stringify');
    expectHighlightedText('parse');
    expectHighlightedText('eval');
  });

  it('annotates JavaScript keywords in basic questions', () => {
    renderQuestion('javascript-variables-101');

    expectInlineCode('let');
    expectInlineCode('const');
    expectInlineCode('var');
  });

  it('annotates JavaScript methods and return values in intermediate questions', () => {
    renderQuestion('javascript-array-find-101');

    expectInlineCode('find', 2);
    expectInlineCode('findIndex');
    expectInlineCode('undefined', 2);
    expectInlineCode('-1', 2);
  });

  it('distinguishes JavaScript syntax from conceptual names in advanced questions', () => {
    renderQuestion('javascript-object-is-101');

    expectInlineCode('Object.is');
    expectInlineCode('NaN', 2);
    expectInlineCode('false', 2);
    expectHighlightedText('SameValue');
    expectHighlightedText('===');
  });

  it('marks every slice and splice mention in the JavaScript question', () => {
    renderQuestion('javascript-array-slice-101');

    expectInlineCode('slice', 4);
    expectInlineCode('splice', 4);
  });

  it('highlights every stylesheet answer and its complete rel attribute', () => {
    renderQuestion('html-stylesheets-001');

    expectEveryAuthoredCodeBlockIsHighlightable('html-stylesheets-001');
    expectInlineCode('rel="stylesheet"');
    expectHighlightedText('href');
  });

  it('highlights every multiline-text answer', () => {
    renderQuestion('html-forms-101');

    expectEveryAuthoredCodeBlockIsHighlightable('html-forms-101');
  });

  it('marks download and target in the PDF explanation', () => {
    renderQuestion('html-links-002');

    expectEveryAuthoredCodeBlockIsHighlightable('html-links-002');
    expectHighlightedText('download', 2);
    expectInlineCode('target="_blank"');
  });

  it('uses complete HTML tags without matching letters inside prose', () => {
    renderQuestion('html-paragraphs-101');

    expectInlineCode('<p>');
    expectInlineCode('<div>');
    expectInlineCode('<span>');
    expectInlineCode('<section>');
    expect(screen.queryByText('p')).not.toBeInTheDocument();
  });

  it('keeps complete CSS identifiers together in the flex explanation', () => {
    renderQuestion('css-flex-wrap-101');

    expectHighlightedText('flex');
    expectHighlightedText('flex-wrap: wrap');
    expectHighlightedText('flex-direction');
  });

  it('distinguishes highlighted property names from a CSS declaration', () => {
    renderQuestion('css-inheritance-101');

    expectHighlightedText('color', 7);
    expectInlineCode('color: purple');
  });
});
