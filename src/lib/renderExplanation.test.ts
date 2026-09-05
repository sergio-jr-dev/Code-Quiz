import { describe, expect, it } from 'vitest';
import { renderExplanation } from './renderExplanation';

describe('explanation rendering', () => {
  it('preserves formatting and escaped code', () => {
    const container = document.createElement('div');
    container.innerHTML = renderExplanation('**HTML**\n\n- Texto\n\n`<script>alert(1)</script>`');
    expect(container.querySelector('strong')).toHaveTextContent('HTML');
    expect(container.querySelector('li')).toHaveTextContent('Texto');
    expect(container.querySelector('code')?.textContent).toBe('<script>alert(1)</script>');
    expect(container.querySelector('script')).toBeNull();
  });

  it.each([
    '<img src=x onerror=alert(1)><script>alert(1)</script>',
    '<svg onload=alert(1)><a href="javascript:alert(1)">link</a></svg>',
    '<p style="color:red" onclick="alert(1)" data-secret="x">Text</p>',
    '[link](javascript:alert%281%29) <iframe srcdoc="<script>alert(1)</script>"></iframe>',
  ])('removes active markup and attributes: %s', payload => {
    const container = document.createElement('div');
    container.innerHTML = renderExplanation(payload);
    expect(container.querySelector('script, img, svg, iframe, a, style')).toBeNull();
    expect([...container.querySelectorAll('*')].every(element => element.attributes.length === 0)).toBe(true);
  });
});
