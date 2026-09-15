import {
  IconHome,
  IconReload,
  IconReportAnalytics,
  IconRotateClockwise,
} from '@tabler/icons-react';

import { calculateScore } from '../../../lib/quizTransitions';
import { useQuizStore } from '../../../stores/quizStore';
import { Button } from '../../button/Button';

import './postQuizActions.css';

export const PostQuizActions = () => {
  const hasIncorrectAnswers = useQuizStore((state) => calculateScore(state) < state.round.length);
  const showReviewAction = useQuizStore((state) => state.view === 'score');
  const restartRound = useQuizStore((state) => state.restartRound);
  const retryIncorrectAnswers = useQuizStore((state) => state.retryIncorrectAnswers);
  const returnToMenu = useQuizStore((state) => state.returnToMenu);
  const showReview = useQuizStore((state) => state.showReview);

  return (
    <nav className="post-quiz-actions" aria-label="Siguiente paso">
      {showReviewAction && (
        <Button onClick={showReview}>
          <IconReportAnalytics aria-hidden="true" stroke={2} />
          Revisar respuestas
        </Button>
      )}
      {hasIncorrectAnswers && (
        <Button onClick={retryIncorrectAnswers}>
          <IconRotateClockwise aria-hidden="true" stroke={2} />
          Repetir fallos
        </Button>
      )}
      <Button onClick={restartRound}>
        <IconReload aria-hidden="true" stroke={2} />
        Repetir configuración
      </Button>
      <Button className="menu-action" onClick={returnToMenu}>
        <IconHome aria-hidden="true" stroke={2} />
        Volver al menú
      </Button>
    </nav>
  );
};
