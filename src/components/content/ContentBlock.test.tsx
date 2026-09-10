import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ContentBlock } from './ContentBlock';

describe('ContentBlock', () => {
  it('preserves whitespace and renders dangerous-looking code literally', () => {
    const dangerous =
      '<img src="x" onerror="window.__executed = true">\n  <script>alert(1)</script>';
    const { container } = render(
      <ContentBlock
        block={{
          type: 'code',
          language: 'html',
          code: dangerous,
        }}
      />,
    );

    const code = container.querySelector('pre > code');
    expect(code).toHaveTextContent(dangerous, { normalizeWhitespace: false });
    expect(code?.textContent).toBe(dangerous);
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('script')).not.toBeInTheDocument();
  });
});
