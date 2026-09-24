import type { CodeLanguage, ContentBlock as ContentBlockValue } from '../../types/questionBank';
import { isCompleteCodeBlock } from './codePresentation';
import { TechnicalText } from './TechnicalText';

import './contentBlock.css';

export function ContentBlock({
  block,
  inlineLanguage,
  wrapCode = false,
}: {
  block: ContentBlockValue;
  inlineLanguage?: CodeLanguage;
  wrapCode?: boolean;
}) {
  if (block.type === 'code') {
    if (!isCompleteCodeBlock(block)) {
      return (
        <code
          className={`code-snippet syntax-code language-${block.language}`}
          data-language={block.language}
        >
          {block.code}
        </code>
      );
    }

    return (
      <pre className={`content-code code-block ${wrapCode ? 'wrappable' : ''}`}>
        <code className={`syntax-code language-${block.language}`} data-language={block.language}>
          {block.code}
        </code>
      </pre>
    );
  }

  return (
    <p className="content-text">
      {inlineLanguage ? (
        <TechnicalText
          text={block.text}
          language={inlineLanguage}
          annotations={block.annotations}
        />
      ) : (
        block.text
      )}
    </p>
  );
}
