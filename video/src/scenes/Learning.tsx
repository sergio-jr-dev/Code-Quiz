import { useCurrentFrame } from 'remotion';

import { QuizCard } from '../components/QuizCard';
import { SceneFrame } from '../components/SceneFrame';

export const Learning = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame chapter="APRENDE JUGANDO">
      <h1 className="headline">
        Cada respuesta
        <br />
        <span>te enseña algo.</span>
      </h1>
      <div className="learning-card">
        <QuizCard state={frame >= 42 ? 'correct' : 'unanswered'} />
      </div>
    </SceneFrame>
  );
};
