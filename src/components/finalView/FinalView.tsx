import { useQuizStore } from '../../stores/quizStore';
import { Dots } from './dots/Dots';
import { Results } from './results/Results';
import { Score } from './score/Score';

import './finalView.css';

export const FinalView = () => {
  const showResults = useQuizStore((state) => state.view === 'review');

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
