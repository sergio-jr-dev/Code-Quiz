import type { BankQuestion } from '../types/questionBank';
import { cssQuestions } from './bank/css';
import { htmlQuestions } from './bank/html';
import { javascriptQuestions } from './bank/javascript';

// Spec 003 will select rounds from this complete catalog.
// questions.ts retains the first-release round in the meantime.
export const questionCatalog: readonly BankQuestion[] = [
  ...htmlQuestions,
  ...cssQuestions,
  ...javascriptQuestions,
];
