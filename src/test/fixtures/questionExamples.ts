import type { BankQuestion } from '../../types/questionBank';

export const questionExamples = [
  {
    id: 'html-semantics-001',
    subject: 'html',
    level: 'basic',
    topic: 'semantics',
    prompt: [
      {
        type: 'text',
        text: '¿Qué elemento identifica el contenido principal de la página?',
      },
    ],
    options: [
      {
        id: 'a',
        content: [{ type: 'code', language: 'html', code: '<main>' }],
      },
      {
        id: 'b',
        content: [{ type: 'code', language: 'html', code: '<header>' }],
      },
      {
        id: 'c',
        content: [{ type: 'code', language: 'html', code: '<aside>' }],
      },
      {
        id: 'd',
        content: [{ type: 'code', language: 'html', code: '<footer>' }],
      },
    ],
    correctAnswer: 'a',
    explanation: [
      {
        type: 'text',
        text: 'El elemento main representa el contenido dominante y único del documento.',
      },
    ],
  },
  {
    id: 'css-cascade-001',
    subject: 'css',
    level: 'intermediate',
    topic: 'cascade',
    prompt: [
      {
        type: 'text',
        text: '¿Qué declaración establece el color del texto mediante una custom property?',
      },
    ],
    options: [
      {
        id: 'a',
        content: [{ type: 'code', language: 'css', code: 'color: --accent;' }],
      },
      {
        id: 'b',
        content: [{ type: 'code', language: 'css', code: 'color: var(--accent);' }],
      },
      {
        id: 'c',
        content: [{ type: 'code', language: 'css', code: 'color: custom(--accent);' }],
      },
      {
        id: 'd',
        content: [{ type: 'code', language: 'css', code: 'color: value(--accent);' }],
      },
    ],
    correctAnswer: 'b',
    explanation: [
      {
        type: 'text',
        text: 'La función var() lee el valor calculado de una custom property.',
      },
      {
        type: 'code',
        language: 'css',
        code: ':root { --accent: rebeccapurple; }\np { color: var(--accent); }',
      },
    ],
  },
  {
    id: 'javascript-arrays-001',
    subject: 'javascript',
    level: 'advanced',
    topic: 'arrays',
    prompt: [
      {
        type: 'text',
        text: '¿Qué devuelve este fragmento sin modificar numbers?',
      },
      {
        type: 'code',
        language: 'javascript',
        code: 'const numbers = [3, 1, 2];\nconst result = numbers.toSorted();',
      },
    ],
    options: [
      {
        id: 'a',
        content: [{ type: 'text', text: 'Un array nuevo con [1, 2, 3]' }],
      },
      {
        id: 'b',
        content: [{ type: 'text', text: 'El mismo array con [1, 2, 3]' }],
      },
      {
        id: 'c',
        content: [{ type: 'text', text: 'Un array nuevo con [3, 1, 2]' }],
      },
      { id: 'd', content: [{ type: 'text', text: 'El valor numérico 123' }] },
    ],
    correctAnswer: 'a',
    explanation: [
      {
        type: 'text',
        text: 'toSorted() devuelve una copia ordenada; a diferencia de sort(), no muta el array original.',
      },
    ],
  },
  {
    id: 'html-links-001',
    subject: 'html',
    level: 'basic',
    topic: 'links',
    prompt: [{ type: 'text', text: '¿Qué elemento crea un enlace?' }],
    options: [
      { id: 'a', content: [{ type: 'code', language: 'html', code: '<a>' }] },
      { id: 'b', content: [{ type: 'code', language: 'html', code: '<link>' }] },
      { id: 'c', content: [{ type: 'code', language: 'html', code: '<nav>' }] },
      { id: 'd', content: [{ type: 'code', language: 'html', code: '<button>' }] },
    ],
    correctAnswer: 'a',
    explanation: [{ type: 'text', text: 'El elemento a representa un hipervínculo.' }],
  },
] as const satisfies readonly BankQuestion[];
