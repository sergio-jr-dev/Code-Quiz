import { createContext, useContext } from 'react';
import type { QuizContextValue } from '../types/quiz';

export const QuizContext = createContext<QuizContextValue | null>(null);

export function useQuiz(): QuizContextValue {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuiz requires QuizContextProvider');
  return context;
}
