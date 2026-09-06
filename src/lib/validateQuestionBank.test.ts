import { describe, expect, it } from 'vitest';
import { questionExamples } from '../data/questionExamples';
import type { BankQuestion } from '../types/questionBank';
import { validateQuestionBank } from './validateQuestionBank';

function cloneQuestion(question: BankQuestion): BankQuestion {
  return structuredClone(question);
}

describe('validateQuestionBank', () => {
  it('accepts the documented HTML, CSS and JavaScript examples', () => {
    expect(validateQuestionBank(questionExamples)).toEqual({ valid: true, issues: [] });
  });

  it('rejects duplicate question IDs and a missing correct answer', () => {
    const first = cloneQuestion(questionExamples[0]);
    const invalid = { ...cloneQuestion(questionExamples[1]), id: first.id, correctAnswer: 'missing' };
    const result = validateQuestionBank([first, invalid]);

    expect(result.valid).toBe(false);
    expect(result.issues.map(issue => issue.code)).toEqual(expect.arrayContaining([
      'duplicate-question-id',
      'invalid-question-id',
      'missing-correct-answer',
    ]));
  });

  it('rejects invalid metadata, unsafe blocks, duplicate option IDs and empty exceptions', () => {
    const base = cloneQuestion(questionExamples[0]);
    const invalid = {
      ...base,
      subject: 'typescript',
      level: 'expert',
      topic: ' ',
      prompt: [{ type: 'html', html: '<img src=x onerror=alert(1)>' }],
      options: [base.options[0], base.options[0]],
      fairnessExceptions: [{ rule: 'length', reason: ' ' }],
    };
    const result = validateQuestionBank([invalid]);

    expect(result.valid).toBe(false);
    expect(result.issues.map(issue => issue.code)).toEqual(expect.arrayContaining([
      'invalid-subject',
      'invalid-level',
      'invalid-topic',
      'invalid-content',
      'duplicate-option-id',
      'invalid-fairness-exception',
    ]));
  });

  it('warns when the correct answer reveals itself by length or block structure', () => {
    const base = cloneQuestion(questionExamples[0]);
    const biased: BankQuestion = {
      ...base,
      options: [
        { id: 'a', content: [
          { type: 'text', text: 'Esta respuesta correcta es mucho más extensa y detallada que cualquiera de las demás.' },
          { type: 'code', language: 'html', code: '<main>Contenido</main>' },
        ] },
        { id: 'b', content: [{ type: 'text', text: 'Distractor breve' }] },
        { id: 'c', content: [{ type: 'text', text: 'Otra alternativa' }] },
        { id: 'd', content: [{ type: 'text', text: 'Opción incorrecta' }] },
      ],
    };

    const result = validateQuestionBank([biased]);
    expect(result.valid).toBe(true);
    expect(result.issues.map(issue => issue.code)).toEqual([
      'answer-length-bias',
      'answer-structure-bias',
    ]);
  });

  it('accepts explicitly justified fairness exceptions', () => {
    const base = cloneQuestion(questionExamples[0]);
    const justified: BankQuestion = {
      ...base,
      options: [
        { id: 'a', content: [
          { type: 'text', text: 'Esta respuesta correcta es mucho más extensa y detallada que cualquiera de las demás.' },
          { type: 'code', language: 'html', code: '<main>Contenido</main>' },
        ] },
        { id: 'b', content: [{ type: 'text', text: 'Distractor breve' }] },
        { id: 'c', content: [{ type: 'text', text: 'Otra alternativa' }] },
        { id: 'd', content: [{ type: 'text', text: 'Opción incorrecta' }] },
      ],
      fairnessExceptions: [
        { rule: 'length', reason: 'La API correcta exige mostrar el fragmento completo.' },
        { rule: 'structure', reason: 'Solo la solución válida combina explicación y código.' },
      ],
    };

    expect(validateQuestionBank([justified])).toEqual({ valid: true, issues: [] });
  });
});
