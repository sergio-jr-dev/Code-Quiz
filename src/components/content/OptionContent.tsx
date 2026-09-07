import type { QuestionContent } from '../../types/questionBank';
import { ContentBlocks } from './ContentBlocks';

import './optionContent.css';

export function OptionContent({ content }: { content: QuestionContent }) {
  return (
    <div className="content-blocks option-content">
      <ContentBlocks content={content} />
    </div>
  );
}
