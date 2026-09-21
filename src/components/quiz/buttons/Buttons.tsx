import { IconArrowNarrowRightDashed } from '@tabler/icons-react';
import confetti from 'canvas-confetti';

import { prefersReducedMotion } from '../../../lib/motionPreference';
import { useQuizStore } from '../../../stores/quizStore';
import { Button } from '../../button/Button';
import { ExitQuiz } from '../exitQuiz/ExitQuiz';

import './buttons.css';

export const Buttons = () => {
  const hasAnswered = useQuizStore((state) => {
    const question = state.round[state.currentQuestionIndex];
    return state.answers.some((answer) => answer.questionId === question?.id);
  });

  const isLastQuestion = useQuizStore(
    (state) => state.currentQuestionIndex === state.round.length - 1,
  );

  const goToNextQuestion = useQuizStore((state) => state.goToNextQuestion);

  const handleNext = () => {
    if (!hasAnswered) return;

    goToNextQuestion();

    if (isLastQuestion && !prefersReducedMotion()) {
      void confetti({
        particleCount: 150,
        spread: 360,
        origin: { y: 0.3, x: 0.5 },
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <div className="buttons">
      <Button
        className={`${hasAnswered ? '' : 'disabled'}`}
        disabled={!hasAnswered}
        onClick={handleNext}
      >
        <IconArrowNarrowRightDashed aria-hidden="true" stroke={2} />
        {isLastQuestion ? 'Finalizar' : 'Siguiente'}
      </Button>
      <ExitQuiz />
    </div>
  );
};
