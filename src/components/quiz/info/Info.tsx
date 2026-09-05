import { useQuiz } from '../../../context/QuizContext';
import { InfoIcon } from '../../icons/InfoIcon';
import { renderExplanation } from '../../../lib/renderExplanation';

import './info.css';

export const Info = () => {
  const { question } = useQuiz();

  return (
    <div className="info">
      <h3>
        <InfoIcon />
        Información adicional
      </h3>
      <div
        dangerouslySetInnerHTML={{
          __html: renderExplanation(question.additionalInfo),
        }}
      />
    </div>
  );
};
