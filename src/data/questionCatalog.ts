import { htmlQuestions } from './bank/html';
import { cssQuestions } from './bank/css';
import { javascriptQuestions } from './bank/javascript';
import type { BankQuestion } from '../types/questionBank';

// Spec 003 will select rounds from this complete catalog.
// questions.ts retains the first-release round in the meantime.
export const questionCatalog: readonly BankQuestion[] = [
  ...htmlQuestions,
  ...cssQuestions,
  ...javascriptQuestions,
];
