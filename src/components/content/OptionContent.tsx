import type { CodeLanguage, QuestionContent } from '../../types/questionBank';
import { ContentBlocks } from './ContentBlocks';

import './optionContent.css';

export function OptionContent({
  content,
  language,
}: {
  content: QuestionContent;
  language?: CodeLanguage;
}) {
  return (
    <div className="content-blocks option-content">
      <ContentBlocks content={content} inlineLanguage={language} wrapCode />
    </div>
  );
}
