import type { HtmlTagDescriptor, Plugin } from 'vite';

export function getSiteMetadata(siteUrl?: string): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = [];
  if (siteUrl) {
    const url = new URL(siteUrl);
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
      throw new Error('SITE_URL must be an HTTPS origin without credentials, path, query or hash');
    }
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: url.href }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:url', content: url.href }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:image', content: new URL('/images/og-image.png', url).href }, injectTo: 'head' },
    );
  } else {
    tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' });
  }
  return tags;
}

export function siteMetadata(siteUrl?: string): Plugin {
  const tags = getSiteMetadata(siteUrl);
  return { name: 'code-quiz-site-metadata', transformIndexHtml: () => tags };
}
