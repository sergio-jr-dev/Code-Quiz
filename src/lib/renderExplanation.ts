import DOMPurify from 'dompurify';
import { marked } from 'marked';

export function renderExplanation(markdown: string): string {
  return DOMPurify.sanitize(marked.parse(markdown, { async: false }), {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'pre', 'code', 'br', 'blockquote'],
    ALLOWED_ATTR: [],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
  });
}
