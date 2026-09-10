import { describe, expect, it } from 'vitest';

import { getSiteMetadata } from './siteMetadata';

describe('public site metadata', () => {
  it('keeps builds without a production URL unindexed and without invented URLs', () => {
    expect(getSiteMetadata()).toEqual([
      { tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' },
    ]);
  });

  it.each([
    'http://example.com',
    'https://user:pass@example.com',
    'https://example.com/quiz/',
    'https://example.com/?a=b',
    'https://example.com/#quiz',
    'not-a-url',
  ])('rejects invalid origin %s', (url) => {
    expect(() => getSiteMetadata(url)).toThrow();
  });

  it('accepts an HTTPS origin with or without the final slash', () => {
    expect(() => getSiteMetadata('https://example.com')).not.toThrow();
    expect(getSiteMetadata('https://example.com/')).toEqual([
      { tag: 'link', attrs: { rel: 'canonical', href: 'https://example.com/' }, injectTo: 'head' },
      {
        tag: 'meta',
        attrs: { property: 'og:url', content: 'https://example.com/' },
        injectTo: 'head',
      },
      {
        tag: 'meta',
        attrs: { property: 'og:image', content: 'https://example.com/images/og-image.png' },
        injectTo: 'head',
      },
    ]);
  });
});
