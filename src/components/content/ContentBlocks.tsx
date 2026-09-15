import type { CodeLanguage, ContentBlock as ContentBlockValue } from '../../types/questionBank';
import { ContentBlock } from './ContentBlock';

import './contentBlocks.css';

export function ContentBlocks({
  content,
  inlineLanguage,
  wrapCode,
}: {
  content: readonly ContentBlockValue[];
  inlineLanguage?: CodeLanguage;
  wrapCode?: boolean;
}) {
  return content.map((block, index) => (
    <ContentBlock
      key={`${block.type}-${index}`}
      block={block}
      inlineLanguage={inlineLanguage}
      wrapCode={wrapCode}
    />
  ));
}
