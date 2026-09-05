import { useQuiz } from '../../../context/QuizContext';
import { FinalView } from '../../finalView/FinalView';
import { Quiz } from '../Quiz';

export const Game = () => {
  const { completed } = useQuiz();

  return (
    <main>
      <div className="container">{completed ? <FinalView /> : <Quiz />}</div>
    </main>
  );
};
