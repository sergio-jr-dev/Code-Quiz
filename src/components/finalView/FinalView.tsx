import { useQuiz } from '../../context/QuizContext';
import { Results } from './results/Results';
import { Dots } from './dots/Dots';
import { Score } from './score/Score';

import './finalView.css';

export const FinalView = () => {
  const { showResults } = useQuiz();

  return (
    <>
      <section className="quiz final-view">
        <Score />
      </section>
      {showResults && (
        <>
          <Results />
          <Dots />
        </>
      )}
    </>
  );
};
