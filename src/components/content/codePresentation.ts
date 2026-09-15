import type { CodeContentBlock } from '../../types/questionBank';

const htmlVoidElement =
  /^<(?:area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)\b[^>]*\/?>$/i;
const htmlPairedElement = /^<([a-z][\w:-]*)\b[^>]*>[\s\S]*<\/\1\s*>$/i;

export function isCompleteCodeBlock({ language, code }: CodeContentBlock): boolean {
  const value = code.trim();

  if (language === 'html') {
    return (
      /^<!--[\s\S]*-->$/.test(value) ||
      htmlVoidElement.test(value) ||
      htmlPairedElement.test(value) ||
      (value.includes('\n') && value.startsWith('<') && value.endsWith('>'))
    );
  }

  if (language === 'css') {
    return value.includes('{') && value.includes('}');
  }

  return value.includes('\n') || /[;{}]\s*$/.test(value);
}
