import { IconArrowNarrowRightDashed } from '@tabler/icons-react';

import { useQuiz } from '../../../context/QuizContext';

import './buttons.css';

export const Buttons = () => {
  const { currentQuestion, shuffleQuestions, selectedOption, handleNext } = useQuiz();

  return (
    <div className="buttons">
      <button
        className={`${selectedOption === null ? 'disabled' : ''}`}
        disabled={selectedOption === null}
        onClick={handleNext}
      >
        <IconArrowNarrowRightDashed aria-hidden="true" stroke={2} />
        {currentQuestion === shuffleQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
      </button>
    </div>
  );
};
