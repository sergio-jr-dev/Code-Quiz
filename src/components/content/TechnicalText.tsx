import type { ReactNode } from 'react';

import type { CodeLanguage } from '../../types/questionBank';

interface TechnicalMatch {
  readonly index: number;
  readonly value: string;
}

const technicalPatterns: Readonly<Record<CodeLanguage, RegExp>> = {
  html: /<\/?[a-z][^>]*>|\b(?:alt|article|aside|audio|body|button|canvas|charset|details|dialog|div|footer|form|h[1-6]|head|header|href|html|id|iframe|img|input|label|lang|li|link|main|meta|nav|ol|option|script|section|select|slot|span|src|style|summary|table|tbody|td|template|textarea|tfoot|th|thead|title|tr|ul|video)\b/gi,
  css: /--[\w-]+|@[a-z-]+|::?[\w-]+|#[\w-]+|\.[a-z][\w-]*|\b[a-z-]+:\s*(?:-?\d*\.?\d+(?:[a-z%]+)?|#[\da-f]+|[a-z-]+\([^)]*\)|[a-z-]+)(?:\s*!important)?;?|\b(?:article|auto|border-box|color|contain|cover|display|flex|grid|img|inherit|initial|margin|none|padding|width)\b|[a-z-]+\([^)]*\)/gi,
  javascript:
    /\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+\b|\b(?:Array|Map|NaN|Promise|SameValue|SameValueZero|Set|async|await|catch|const|eval|false|filter|finally|find|findIndex|function|let|map|new|null|pop|push|reduce|return|shift|slice|sort|splice|this|throw|true|try|typeof|undefined|var|yield)\b|===|!==|==|!=|=>|\?\?|[A-Za-z_$][\w$]*\([^)]*\)/g,
};

function findExplicitMatches(text: string, terms: readonly string[]): TechnicalMatch[] {
  return terms.flatMap((term) => {
    const matches: TechnicalMatch[] = [];
    let index = text.indexOf(term);

    while (index !== -1) {
      matches.push({ index, value: term });
      index = text.indexOf(term, index + term.length);
    }

    return matches;
  });
}

export function TechnicalText({
  text,
  language,
  explicitTerms = [],
}: {
  text: string;
  language: CodeLanguage;
  explicitTerms?: readonly string[];
}) {
  const pattern = new RegExp(technicalPatterns[language]);
  const matches: TechnicalMatch[] = findExplicitMatches(text, explicitTerms);
  let match = pattern.exec(text);

  while (match) {
    matches.push({ index: match.index, value: match[0] });
    match = pattern.exec(text);
  }

  if (matches.length === 0) return text;

  matches.sort(
    (first, second) => first.index - second.index || second.value.length - first.value.length,
  );

  const content: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    const index = match.index;
    const value = match.value;

    if (index < cursor) continue;

    if (index > cursor) content.push(text.slice(cursor, index));
    content.push(
      <code
        className={`inline-code language-${language}`}
        data-language={language}
        key={`${index}-${value}`}
      >
        {value}
      </code>,
    );
    cursor = index + value.length;
  }

  if (cursor < text.length) content.push(text.slice(cursor));

  return content;
}
