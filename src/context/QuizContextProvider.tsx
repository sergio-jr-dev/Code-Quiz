import confetti from 'canvas-confetti';
import { type ReactNode } from 'react';

import { calculateScore } from '../lib/quizTransitions';
import { useQuizStore } from '../stores/quizStore';
import type { OptionId } from '../types/questionBank';
import type { QuizAnswer } from '../types/quizStore';
import { QuizContext } from './QuizContext';

export const QuizContextProvider = ({ children }: { children: ReactNode }) => {
  const round = useQuizStore((state) => state.round);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const answers = useQuizStore((state) => state.answers);
  const view = useQuizStore((state) => state.view);
  const score = useQuizStore(calculateScore);
  const goToNextQuestion = useQuizStore((state) => state.goToNextQuestion);
  const restartRound = useQuizStore((state) => state.restartRound);
  const selectOption = useQuizStore((state) => state.selectOption);
  const showReview = useQuizStore((state) => state.showReview);

  const question = round[currentQuestionIndex];
  if (!question) {
    throw new Error('The question bank must contain a current question');
  }

  const selectedOption =
    answers.find((answer: QuizAnswer) => answer.questionId === question.id)?.selectedOptionId ??
    null;
  const completed = view !== 'playing';
  const showResults = view === 'review';
  const userAnswers = answers.map(({ selectedOptionId }) => selectedOptionId);

  const onSelectOption = (id: OptionId) => {
    if (
      completed ||
      selectedOption !== null ||
      !question.options.some((option) => option.id === id)
    )
      return;

    selectOption(id);

    if (id === question.correctAnswer) {
      void confetti({
        startVelocity: 50,
        particleCount: 10,
        gravity: 10,
        disableForReducedMotion: true,
      });
    }
  };

  const onNext = () => {
    if (completed || selectedOption === null) return;

    const isLastQuestion = currentQuestionIndex === round.length - 1;
    goToNextQuestion();

    if (isLastQuestion) {
      void confetti({
        particleCount: 150,
        spread: 360,
        origin: { y: 0.3, x: 0.5 },
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <QuizContext
      value={{
        currentQuestion: currentQuestionIndex,
        question,
        selectedOption,
        score,
        completed,
        userAnswers,
        showResults,
        shuffleQuestions: round,
        selectOption: onSelectOption,
        handleNext: onNext,
        handleRestart: restartRound,
        showReview,
      }}
    >
      {children}
    </QuizContext>
  );
};
