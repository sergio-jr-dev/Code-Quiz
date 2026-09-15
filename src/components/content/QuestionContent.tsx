import type { Ref } from 'react';

import type { CodeLanguage, QuestionPrompt } from '../../types/questionBank';
import { ContentBlocks } from './ContentBlocks';
import { TechnicalText } from './TechnicalText';

export function QuestionContent({
  content,
  headingId,
  ref,
  tabIndex,
  language,
}: {
  content: QuestionPrompt;
  headingId: string;
  ref?: Ref<HTMLHeadingElement>;
  tabIndex?: number;
  language: CodeLanguage;
}) {
  const [heading, ...details] = content;

  return (
    <div className="content-blocks question-content">
      <h2 className="question-title" id={headingId} ref={ref} tabIndex={tabIndex}>
        <TechnicalText text={heading.text} language={language} explicitTerms={heading.inlineCode} />
      </h2>
      {details.length > 0 && (
        <div className="question-details">
          <ContentBlocks content={details} inlineLanguage={language} />
        </div>
      )}
    </div>
  );
}
