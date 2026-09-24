import type { CodeLanguage, QuestionContent } from '../../types/questionBank';
import { ContentBlocks } from './ContentBlocks';

export function ExplanationContent({
  content,
  language,
}: {
  content: QuestionContent;
  language?: CodeLanguage;
}) {
  return (
    <div className="content-blocks explanation-content">
      <ContentBlocks content={content} inlineLanguage={language} />
    </div>
  );
}
