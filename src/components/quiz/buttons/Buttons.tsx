import { IconArrowNarrowRightDashed } from '@tabler/icons-react';
import confetti from 'canvas-confetti';

import { useQuizStore } from '../../../stores/quizStore';

import './buttons.css';

export const Buttons = () => {
  const selectedOption = useQuizStore((state) => {
    const question = state.round[state.currentQuestionIndex];
    return (
      state.answers.find((answer) => answer.questionId === question?.id)?.selectedOptionId ?? null
    );
  });

  const isLastQuestion = useQuizStore(
    (state) => state.currentQuestionIndex === state.round.length - 1,
  );

  const goToNextQuestion = useQuizStore((state) => state.goToNextQuestion);

  const handleNext = () => {
    if (selectedOption === null) return;

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
    <div className="buttons">
      <button
        className={`${selectedOption === null ? 'disabled' : ''}`}
        disabled={selectedOption === null}
        onClick={handleNext}
      >
        <IconArrowNarrowRightDashed aria-hidden="true" stroke={2} />
        {isLastQuestion ? 'Finalizar' : 'Siguiente'}
      </button>
    </div>
  );
};
