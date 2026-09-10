import type { ContentBlock as ContentBlockValue } from '../../types/questionBank';
import { ContentBlock } from './ContentBlock';

import './contentBlocks.css';

export function ContentBlocks({ content }: { content: readonly ContentBlockValue[] }) {
  return content.map((block, index) => (
    <ContentBlock key={`${block.type}-${index}`} block={block} />
  ));
}
