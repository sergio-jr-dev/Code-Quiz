import type { Ref } from 'react';

import type { QuestionPrompt } from '../../types/questionBank';
import { ContentBlocks } from './ContentBlocks';

export function QuestionContent({
  content,
  headingId,
  ref,
  tabIndex,
}: {
  content: QuestionPrompt;
  headingId: string;
  ref?: Ref<HTMLHeadingElement>;
  tabIndex?: number;
}) {
  const [heading, ...details] = content;

  return (
    <div className="content-blocks question-content">
      <h2 className="question-title" id={headingId} ref={ref} tabIndex={tabIndex}>
        {heading.text}
      </h2>
      <ContentBlocks content={details} />
    </div>
  );
}
