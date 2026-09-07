import type { QuestionContent } from '../../types/questionBank';
import { ContentBlocks } from './ContentBlocks';

export function ExplanationContent({ content }: { content: QuestionContent }) {
  return (
    <div className="content-blocks explanation-content">
      <ContentBlocks content={content} />
    </div>
  );
}
