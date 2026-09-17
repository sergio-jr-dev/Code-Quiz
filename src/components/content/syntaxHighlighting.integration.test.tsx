import { render } from '@testing-library/react';
import { highlightAll } from 'microlighter';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ContentBlock } from './ContentBlock';
import { TechnicalText } from './TechnicalText';

const htmlSnippets = [
  '<script type="text/css" src="styles.css">',
  '<style src="styles.css">',
  '<input type="text">',
  '<select>',
  '<output>',
  '<textarea>',
] as const;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('MicroLighter integration', () => {
  it('parses complete and opening-only HTML elements authored as code', async () => {
    const highlights = new Map<string, Set<Range>>();
    vi.stubGlobal('CSS', { highlights });
    vi.stubGlobal('Highlight', class Highlight extends Set<Range> {});

    const { container } = render(
      <div>
        {htmlSnippets.map((code) => (
          <ContentBlock block={{ type: 'code', language: 'html', code }} key={code} />
        ))}
      </div>,
    );

    const highlighted = await highlightAll({ root: container, selector: '.syntax-code' });
    const registeredRanges = [...highlights.values()].flatMap((ranges) => [...ranges]);

    expect(highlighted).toHaveLength(htmlSnippets.length);
    expect(container.querySelectorAll('code.syntax-code')).toHaveLength(htmlSnippets.length);
    expect(
      [...container.querySelectorAll('code.syntax-code')].every((element) =>
        registeredRanges.some((range) => range.startContainer === element.firstChild),
      ),
    ).toBe(true);
  });

  it('parses explicitly annotated inline code and skips CSS-only highlights', async () => {
    const highlights = new Map<string, Set<Range>>();
    vi.stubGlobal('CSS', { highlights });
    vi.stubGlobal('Highlight', class Highlight extends Set<Range> {});

    const { container } = render(
      <p>
        <TechnicalText
          language="javascript"
          text="Promise.all usa flex y no depende de flex-direction"
          annotations={[
            { kind: 'code', value: 'Promise.all' },
            { kind: 'highlight', value: 'flex' },
            { kind: 'highlight', value: 'flex-direction' },
          ]}
        />
      </p>,
    );

    const highlighted = await highlightAll({ root: container, selector: '.syntax-code' });
    const registeredRanges = [...highlights.values()].flatMap((ranges) => [...ranges]);

    expect(highlighted).toHaveLength(1);
    expect(
      [...container.querySelectorAll('code.syntax-code')].every((element) =>
        registeredRanges.some((range) => range.startContainer === element.firstChild),
      ),
    ).toBe(true);
    expect(container.querySelectorAll('.technical-highlight')).toHaveLength(2);
    expect(
      [...container.querySelectorAll('.technical-highlight')].every(
        (element) => !element.classList.contains('syntax-code'),
      ),
    ).toBe(true);
  });
});
