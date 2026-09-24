import { IconArrowNarrowRightDashed } from '@tabler/icons-react';

import { celebrateRound } from '../../../lib/celebrateRound';
import { calculateScore } from '../../../lib/quizTransitions';
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
    const before = useQuizStore.getState();
    if (!hasAnswered || before.view !== 'playing') return;

    goToNextQuestion();
    const after = useQuizStore.getState();
    if (after.view === 'score') {
      celebrateRound(calculateScore(after), after.round.length);
    }
  };

  return (
    <div className="buttons">
      <ExitQuiz />
      <Button disabled={!hasAnswered} onClick={handleNext}>
        <IconArrowNarrowRightDashed aria-hidden="true" stroke={2} />
        {isLastQuestion ? 'Finalizar' : 'Siguiente'}
      </Button>
    </div>
  );
};
