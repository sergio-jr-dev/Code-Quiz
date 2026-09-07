import type { ContentBlock as ContentBlockValue } from '../../types/questionBank';

import './contentBlock.css';

export function ContentBlock({ block }: { block: ContentBlockValue }) {
  if (block.type === 'code') {
    return (
      <pre className="content-code">
        <code className={`language-${block.language}`} data-language={block.language}>
          {block.code}
        </code>
      </pre>
    );
  }

  return <p className="content-text">{block.text}</p>;
}
