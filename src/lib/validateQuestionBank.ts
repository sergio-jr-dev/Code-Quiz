import {
  CODE_LANGUAGES,
  LEVELS,
  SUBJECTS,
  type BankQuestion,
  type ContentBlock,
  type FairnessRule,
} from '../types/questionBank';

export type ValidationSeverity = 'error' | 'warning';

export type ValidationCode =
  | 'duplicate-question-id'
  | 'invalid-question-id'
  | 'invalid-subject'
  | 'invalid-level'
  | 'invalid-topic'
  | 'invalid-content'
  | 'insufficient-options'
  | 'duplicate-option-id'
  | 'missing-correct-answer'
  | 'invalid-fairness-exception'
  | 'answer-length-bias'
  | 'answer-structure-bias';

export interface ValidationIssue {
  readonly severity: ValidationSeverity;
  readonly code: ValidationCode;
  readonly questionId?: string;
  readonly message: string;
}

export interface QuestionBankValidation {
  readonly valid: boolean;
  readonly issues: readonly ValidationIssue[];
}

const SUBJECT_SET = new Set<string>(SUBJECTS);
const LEVEL_SET = new Set<string>(LEVELS);
const LANGUAGE_SET = new Set<string>(CODE_LANGUAGES);
const QUESTION_ID_PATTERN = /^(html|css|javascript)-[a-z0-9]+(?:-[a-z0-9]+)*-\d{3}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isContent(value: unknown): boolean {
  if (!Array.isArray(value) || value.length === 0) return false;

  return value.every((block) => {
    if (!isRecord(block)) return false;
    if (block.type === 'text') {
      if (!isNonEmptyString(block.text)) return false;
      if (block.inlineCode === undefined) return true;
      if (!Array.isArray(block.inlineCode) || block.inlineCode.length === 0) return false;

      return block.inlineCode.every(
        (term) => isNonEmptyString(term) && String(block.text).includes(term),
      );
    }
    return (
      block.type === 'code' &&
      LANGUAGE_SET.has(String(block.language)) &&
      isNonEmptyString(block.code)
    );
  });
}

function hasTextHeading(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    isRecord(value[0]) &&
    value[0].type === 'text' &&
    isNonEmptyString(value[0].text)
  );
}

function visibleLength(content: readonly ContentBlock[]): number {
  return content
    .map((block) => (block.type === 'text' ? block.text : block.code))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim().length;
}

function structureOf(content: readonly ContentBlock[]): string {
  return content.map((block) => block.type).join('+');
}

function hasException(question: BankQuestion, rule: FairnessRule): boolean {
  return (
    question.fairnessExceptions?.some(
      (exception) => exception.rule === rule && exception.reason.trim() !== '',
    ) ?? false
  );
}

function addIssue(issues: ValidationIssue[], issue: ValidationIssue): void {
  issues.push(issue);
}

export function validateQuestionBank(bank: readonly unknown[]): QuestionBankValidation {
  const issues: ValidationIssue[] = [];
  const seenQuestionIds = new Set<string>();

  for (const candidate of bank) {
    if (!isRecord(candidate)) {
      addIssue(issues, {
        severity: 'error',
        code: 'invalid-content',
        message: 'La pregunta debe ser un objeto.',
      });
      continue;
    }

    const questionId = typeof candidate.id === 'string' ? candidate.id : undefined;
    if (!questionId || !QUESTION_ID_PATTERN.test(questionId)) {
      addIssue(issues, {
        severity: 'error',
        code: 'invalid-question-id',
        questionId,
        message: 'El ID no sigue <subject>-<topic>-<sequence>.',
      });
    } else if (seenQuestionIds.has(questionId)) {
      addIssue(issues, {
        severity: 'error',
        code: 'duplicate-question-id',
        questionId,
        message: `El ID ${questionId} está duplicado.`,
      });
    } else {
      seenQuestionIds.add(questionId);
    }

    if (!SUBJECT_SET.has(String(candidate.subject))) {
      addIssue(issues, {
        severity: 'error',
        code: 'invalid-subject',
        questionId,
        message: 'La materia no es válida.',
      });
    } else if (questionId && !questionId.startsWith(`${String(candidate.subject)}-`)) {
      addIssue(issues, {
        severity: 'error',
        code: 'invalid-question-id',
        questionId,
        message: 'El prefijo del ID no coincide con la materia.',
      });
    }
    if (!LEVEL_SET.has(String(candidate.level))) {
      addIssue(issues, {
        severity: 'error',
        code: 'invalid-level',
        questionId,
        message: 'El nivel no es válido.',
      });
    }
    if (!isNonEmptyString(candidate.topic)) {
      addIssue(issues, {
        severity: 'error',
        code: 'invalid-topic',
        questionId,
        message: 'El tema es obligatorio.',
      });
    }
    if (
      !isContent(candidate.prompt) ||
      !hasTextHeading(candidate.prompt) ||
      !isContent(candidate.explanation)
    ) {
      addIssue(issues, {
        severity: 'error',
        code: 'invalid-content',
        questionId,
        message: 'Pregunta y explicación requieren bloques seguros no vacíos.',
      });
    }

    if (!Array.isArray(candidate.options) || candidate.options.length < 2) {
      addIssue(issues, {
        severity: 'error',
        code: 'insufficient-options',
        questionId,
        message: 'La pregunta necesita al menos dos opciones.',
      });
      continue;
    }

    const optionIds = new Set<string>();
    let optionsAreValid = true;
    for (const option of candidate.options) {
      if (!isRecord(option) || !isNonEmptyString(option.id) || !isContent(option.content)) {
        optionsAreValid = false;
        addIssue(issues, {
          severity: 'error',
          code: 'invalid-content',
          questionId,
          message: 'Cada opción requiere ID y bloques seguros no vacíos.',
        });
        continue;
      }
      if (optionIds.has(option.id)) {
        addIssue(issues, {
          severity: 'error',
          code: 'duplicate-option-id',
          questionId,
          message: `El ID de opción ${option.id} está duplicado.`,
        });
      }
      optionIds.add(option.id);
    }

    if (!isNonEmptyString(candidate.correctAnswer) || !optionIds.has(candidate.correctAnswer)) {
      addIssue(issues, {
        severity: 'error',
        code: 'missing-correct-answer',
        questionId,
        message: 'La respuesta correcta no apunta a una opción existente.',
      });
    }

    const exceptions = candidate.fairnessExceptions;
    if (
      exceptions !== undefined &&
      (!Array.isArray(exceptions) ||
        exceptions.some(
          (exception) =>
            !isRecord(exception) ||
            (exception.rule !== 'length' && exception.rule !== 'structure') ||
            !isNonEmptyString(exception.reason),
        ))
    ) {
      addIssue(issues, {
        severity: 'error',
        code: 'invalid-fairness-exception',
        questionId,
        message: 'Cada excepción debe indicar una regla y un motivo no vacío.',
      });
    }

    if (!optionsAreValid || !optionIds.has(String(candidate.correctAnswer))) continue;
    const question = candidate as unknown as BankQuestion;
    const correct = question.options.find((option) => option.id === question.correctAnswer)!;
    const distractors = question.options.filter((option) => option.id !== question.correctAnswer);
    const longestDistractor = Math.max(
      ...distractors.map((option) => visibleLength(option.content)),
    );
    const correctLength = visibleLength(correct.content);
    if (
      correctLength >= longestDistractor * 1.75 &&
      correctLength - longestDistractor >= 20 &&
      !hasException(question, 'length')
    ) {
      addIssue(issues, {
        severity: 'warning',
        code: 'answer-length-bias',
        questionId,
        message: 'La respuesta correcta es desproporcionadamente más larga que los distractores.',
      });
    }

    const correctStructure = structureOf(correct.content);
    const matchingStructures = question.options.filter(
      (option) => structureOf(option.content) === correctStructure,
    ).length;
    if (matchingStructures === 1 && !hasException(question, 'structure')) {
      addIssue(issues, {
        severity: 'warning',
        code: 'answer-structure-bias',
        questionId,
        message: 'La respuesta correcta tiene una estructura de bloques única.',
      });
    }
  }

  return { valid: issues.every((issue) => issue.severity !== 'error'), issues };
}
