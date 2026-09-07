import { useQuiz } from '../../../context/QuizContext';
import { InfoIcon } from '../../icons/InfoIcon';
import { ExplanationContent } from '../../content/ExplanationContent';

import './info.css';

export const Info = () => {
  const { question } = useQuiz();

  return (
    <div className="info">
      <h3>
        <InfoIcon />
        Información adicional
      </h3>
      <ExplanationContent content={question.explanation} />
    </div>
  );
};
