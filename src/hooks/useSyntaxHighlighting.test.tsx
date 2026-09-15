import { render, waitFor } from '@testing-library/react';
import { highlightAll } from 'microlighter';
import { useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSyntaxHighlighting } from './useSyntaxHighlighting';

vi.mock('microlighter', () => ({ highlightAll: vi.fn().mockResolvedValue([]) }));

function SyntaxFixture({ refreshKey }: { refreshKey: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useSyntaxHighlighting(rootRef, refreshKey);

  return (
    <div ref={rootRef}>
      <pre className="content-code code-block">
        <code className="language-javascript">const answer = 42;</code>
      </pre>
    </div>
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useSyntaxHighlighting', () => {
  it('keeps the plain-text fallback when the CSS Custom Highlight API is unavailable', () => {
    render(<SyntaxFixture refreshKey="playing:0:0" />);

    expect(highlightAll).not.toHaveBeenCalled();
  });

  it('highlights the current content again when its refresh key changes', async () => {
    vi.stubGlobal('CSS', { highlights: new Map() });
    vi.stubGlobal('Highlight', class Highlight {});

    const { rerender } = render(<SyntaxFixture refreshKey="playing:0:0" />);

    await waitFor(() => {
      expect(highlightAll).toHaveBeenCalledWith(
        expect.objectContaining({ selector: '.code-block > code' }),
      );
    });

    rerender(<SyntaxFixture refreshKey="playing:0:1" />);

    await waitFor(() => {
      expect(highlightAll).toHaveBeenCalledTimes(2);
    });
  });
});
