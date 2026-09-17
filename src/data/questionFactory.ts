import type {
  BankQuestion,
  CodeLanguage,
  InlineAnnotation,
  Level,
  QuestionContent,
  QuestionId,
  QuestionPrompt,
  Subject,
} from '../types/questionBank';

const optionIds = ['a', 'b', 'c', 'd'] as const;

export const inlineCode = (value: string, language?: CodeLanguage): InlineAnnotation => ({
  kind: 'code',
  value,
  ...(language ? { language } : {}),
});

export const highlight = (value: string): InlineAnnotation => ({ kind: 'highlight', value });

export const text = (
  value: string,
  annotations: readonly InlineAnnotation[] = [],
): QuestionPrompt => [
  {
    type: 'text',
    text: value,
    ...(annotations.length > 0 ? { annotations } : {}),
  },
];

export const code = (language: CodeLanguage, value: string): QuestionContent => [
  { type: 'code', language, code: value },
];

export function question(
  id: QuestionId,
  subject: Subject,
  level: Level,
  topic: string,
  prompt: string | QuestionPrompt,
  options: readonly [QuestionContent, QuestionContent, QuestionContent, QuestionContent],
  correctAnswer: (typeof optionIds)[number],
  explanation: QuestionContent,
): BankQuestion {
  return {
    id,
    subject,
    level,
    topic,
    prompt: typeof prompt === 'string' ? text(prompt) : prompt,
    options: options.map((content, index) => ({ id: optionIds[index]!, content })),
    correctAnswer,
    explanation,
  };
}
