import { useState, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { QuizContext } from './QuizContext';
import { questions } from '../data/questions';
import { buildRound } from '../lib/buildRound';
import type { OptionId } from '../types/questionBank';

export const QuizContextProvider = ({ children }: { children: ReactNode }) => {
  const [shuffleQuestions, setShuffleQuestions] = useState(() => buildRound(questions, questions.length));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionId | null>(null);
  const [completed, setCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<OptionId[]>([]);
  const [showResults, setShowResults] = useState(false);
  const question = shuffleQuestions[currentQuestion];
  if (!question) throw new Error('The question bank must contain a current question');

  const score = userAnswers.reduce(
    (total, answer, index) => total + Number(answer === shuffleQuestions[index]?.correctAnswer),
    0,
  );

  const selectOption = (id: OptionId) => {
    if (completed || selectedOption !== null || !question.options.some(option => option.id === id)) return;
    setUserAnswers(previous => [...previous, id]);
    setSelectedOption(id);
    if (id === question.correctAnswer) {
      void confetti({ startVelocity: 50, particleCount: 10, gravity: 10, disableForReducedMotion: true });
    }
  };

  const handleNext = () => {
    if (completed || selectedOption === null) return;
    if (currentQuestion < shuffleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
      void confetti({ particleCount: 150, spread: 360, origin: { y: 0.3, x: 0.5 }, disableForReducedMotion: true });
    }
    setSelectedOption(null);
  };

  const handleRestart = () => {
    setShuffleQuestions(buildRound(questions, questions.length));
    setCurrentQuestion(0);
    setSelectedOption(null);
    setCompleted(false);
    setUserAnswers([]);
    setShowResults(false);
  };

  return (
    <QuizContext value={{ currentQuestion, question, selectedOption, score, completed,
      userAnswers, showResults, shuffleQuestions, selectOption, handleNext,
      handleRestart, showReview: () => setShowResults(true) }}>
      {children}
    </QuizContext>
  );
};
