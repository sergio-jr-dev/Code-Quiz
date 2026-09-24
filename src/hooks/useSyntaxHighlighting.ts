import { useEffect } from 'react';
import type { RefObject } from 'react';

let highlightQueue = Promise.resolve();

function supportsSyntaxHighlighting() {
  return typeof CSS !== 'undefined' && 'highlights' in CSS && typeof Highlight !== 'undefined';
}

export function useSyntaxHighlighting(rootRef: RefObject<ParentNode | null>, refreshKey: string) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !supportsSyntaxHighlighting()) return;

    highlightQueue = highlightQueue
      .catch(() => undefined)
      .then(async () => {
        const { highlightAll } = await import('microlighter');
        await highlightAll({ root, selector: '.syntax-code' });
      })
      .catch(() => undefined);
  }, [refreshKey, rootRef]);
}
