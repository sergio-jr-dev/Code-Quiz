import type { ReactNode } from 'react';

import type { CodeLanguage, InlineAnnotation } from '../../types/questionBank';

interface TechnicalMatch {
  readonly index: number;
  readonly value: string;
  readonly annotation: InlineAnnotation;
}

const IDENTIFIER = /^[\p{L}\p{N}_$-]+$/u;
const IDENTIFIER_CHARACTER = /[\p{L}\p{N}_$-]/u;

function isWholeIdentifier(text: string, index: number, value: string) {
  if (!IDENTIFIER.test(value)) return true;

  const before = text[index - 1];
  const after = text[index + value.length];
  return (
    (!before || !IDENTIFIER_CHARACTER.test(before)) && (!after || !IDENTIFIER_CHARACTER.test(after))
  );
}

function findAnnotatedMatches(
  text: string,
  annotations: readonly InlineAnnotation[],
): TechnicalMatch[] {
  return annotations.flatMap((annotation) => {
    const matches: TechnicalMatch[] = [];
    let index = text.indexOf(annotation.value);

    while (index !== -1) {
      if (isWholeIdentifier(text, index, annotation.value)) {
        matches.push({ index, value: annotation.value, annotation });
      }
      index = text.indexOf(annotation.value, index + annotation.value.length);
    }

    return matches;
  });
}

export function TechnicalText({
  text,
  language,
  annotations = [],
}: {
  text: string;
  language?: CodeLanguage;
  annotations?: readonly InlineAnnotation[];
}) {
  const matches = findAnnotatedMatches(text, annotations);

  if (matches.length === 0) return text;

  matches.sort(
    (first, second) => first.index - second.index || second.value.length - first.value.length,
  );

  const content: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    const index = match.index;
    const value = match.value;
    const annotationLanguage = match.annotation.language ?? language;

    if (index < cursor) continue;

    if (index > cursor) content.push(text.slice(cursor, index));
    if (match.annotation.kind === 'code' && annotationLanguage) {
      content.push(
        <code
          className={`inline-code syntax-code language-${annotationLanguage}`}
          data-language={annotationLanguage}
          key={`${index}-${value}`}
        >
          {value}
        </code>,
      );
    } else {
      content.push(
        <code className="inline-code technical-highlight" key={`${index}-${value}`}>
          {value}
        </code>,
      );
    }
    cursor = index + value.length;
  }

  if (cursor < text.length) content.push(text.slice(cursor));

  return content;
}
