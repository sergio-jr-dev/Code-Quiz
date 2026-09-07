import type { QuestionPrompt } from '../../types/questionBank';
import { ContentBlocks } from './ContentBlocks';

export function QuestionContent({ content, headingId }: {
  content: QuestionPrompt;
  headingId: string;
}) {
  const [heading, ...details] = content;

  return (
    <div className="content-blocks question-content">
      <h2 className="question-title" id={headingId}>{heading.text}</h2>
      <ContentBlocks content={details} />
    </div>
  );
}
