export const SUBJECTS = ['html', 'css', 'javascript'] as const;
export type Subject = (typeof SUBJECTS)[number];

export const LEVELS = ['basic', 'intermediate', 'advanced'] as const;
export type Level = (typeof LEVELS)[number];

export const CODE_LANGUAGES = ['html', 'css', 'javascript'] as const;
export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

export interface TextContentBlock {
  readonly type: 'text';
  readonly text: string;
  readonly inlineCode?: readonly string[];
}

export interface CodeContentBlock {
  readonly type: 'code';
  readonly language: CodeLanguage;
  readonly code: string;
}

export type ContentBlock = TextContentBlock | CodeContentBlock;
export type QuestionContent = readonly [ContentBlock, ...ContentBlock[]];
export type QuestionPrompt = readonly [TextContentBlock, ...ContentBlock[]];

// TypeScript cannot reliably split hyphenated topics in a template literal.
// The runtime validator enforces the complete <subject>-<topic>-<sequence> pattern.
export type QuestionId = `${Subject}-${string}`;
export type OptionId = string;

export type FairnessRule = 'length' | 'structure';

export interface FairnessException {
  readonly rule: FairnessRule;
  readonly reason: string;
}

export interface QuestionOption {
  readonly id: OptionId;
  readonly content: QuestionContent;
}

export interface BankQuestion {
  readonly id: QuestionId;
  readonly subject: Subject;
  readonly level: Level;
  readonly topic: string;
  readonly prompt: QuestionPrompt;
  readonly options: readonly QuestionOption[];
  readonly correctAnswer: OptionId;
  readonly explanation: QuestionContent;
  readonly fairnessExceptions?: readonly FairnessException[];
}
