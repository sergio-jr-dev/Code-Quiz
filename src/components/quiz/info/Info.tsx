import { useQuizStore } from '../../../stores/quizStore';
import { ExplanationContent } from '../../content/ExplanationContent';
import { InfoIcon } from '../../icons/InfoIcon';

import './info.css';

export const Info = () => {
  const question = useQuizStore((state) => state.round[state.currentQuestionIndex]);

  if (!question) {
    throw new Error('The question bank must contain a current question');
  }

  return (
    <div className="info">
      <h3>
        <InfoIcon />
        Información adicional
      </h3>
      <ExplanationContent content={question.explanation} language={question.subject} />
    </div>
  );
};
