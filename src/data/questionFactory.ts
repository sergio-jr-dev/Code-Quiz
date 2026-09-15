import type {
  BankQuestion,
  CodeLanguage,
  Level,
  QuestionContent,
  QuestionId,
  QuestionPrompt,
  Subject,
} from '../types/questionBank';

const optionIds = ['a', 'b', 'c', 'd'] as const;
export const text = (value: string, inlineCode: readonly string[] = []): QuestionContent => [
  {
    type: 'text',
    text: value,
    ...(inlineCode.length > 0 ? { inlineCode } : {}),
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
    prompt: typeof prompt === 'string' ? [{ type: 'text', text: prompt }] : prompt,
    options: options.map((content, index) => ({ id: optionIds[index]!, content })),
    correctAnswer,
    explanation,
  };
}
