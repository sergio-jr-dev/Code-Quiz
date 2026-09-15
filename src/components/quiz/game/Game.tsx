import { useRef } from 'react';

import { useSyntaxHighlighting } from '../../../hooks/useSyntaxHighlighting';
import { useQuizStore } from '../../../stores/quizStore';
import { Container } from '../../container/Container';
import { FinalView } from '../../finalView/FinalView';
import { Menu } from '../../menu/Menu';
import { Quiz } from '../Quiz';

export const Game = () => {
  const view = useQuizStore((state) => state.view);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const answerCount = useQuizStore((state) => state.answers.length);

  const containerRef = useRef<HTMLDivElement>(null);
  const syntaxRefreshKey = `${view}:${currentQuestionIndex}:${answerCount}`;

  useSyntaxHighlighting(containerRef, syntaxRefreshKey);

  const content = view === 'menu' ? <Menu /> : view === 'playing' ? <Quiz /> : <FinalView />;

  return (
    <main>
      <Container
        className="game-container"
        data-syntax-theme="github"
        data-view={view}
        ref={containerRef}
      >
        {content}
      </Container>
    </main>
  );
};
