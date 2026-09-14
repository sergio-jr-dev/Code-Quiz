import type { BankQuestion } from '../types/questionBank';
import { cssQuestions } from './bank/css';
import { htmlQuestions } from './bank/html';
import { javascriptQuestions } from './bank/javascript';

// The configured flow selects ten-question rounds from this complete catalog.
// questions.ts retains the original first-release bank as a compatibility fixture.
export const questionCatalog: readonly BankQuestion[] = [
  ...htmlQuestions,
  ...cssQuestions,
  ...javascriptQuestions,
];
