import type { BankQuestion } from '../types/questionBank';
import { cssQuestions } from './bank/css';
import { htmlQuestions } from './bank/html';
import { javascriptQuestions } from './bank/javascript';

// The configured flow selects ten-question rounds from this complete catalog.
// Subject modules are the only source of production questions.
export const questionCatalog: readonly BankQuestion[] = [
  ...htmlQuestions,
  ...cssQuestions,
  ...javascriptQuestions,
];
