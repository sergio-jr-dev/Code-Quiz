import { useQuizStore } from '../../../stores/quizStore';
import { FinalView } from '../../finalView/FinalView';
import { Menu } from '../../menu/Menu';
import { Quiz } from '../Quiz';

export const Game = () => {
  const view = useQuizStore((state) => state.view);

  const content = view === 'menu' ? <Menu /> : view === 'playing' ? <Quiz /> : <FinalView />;

  return (
    <main>
      <div className="container">{content}</div>
    </main>
  );
};
