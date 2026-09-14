import { useQuizStore } from '../../../stores/quizStore';
import { FinalView } from '../../finalView/FinalView';
import { Quiz } from '../Quiz';

export const Game = () => {
  const completed = useQuizStore((state) => state.view !== 'playing');

  return (
    <main>
      <div className="container">{completed ? <FinalView /> : <Quiz />}</div>
    </main>
  );
};
