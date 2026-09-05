import { useQuiz } from '../../../context/QuizContext';
import { Answer } from '../answer/Answer';

import './answers.css';

export const Answers = () => {
  const { question } = useQuiz();

  return (
    <div className="answers" role="radiogroup" aria-labelledby="question-title">
      {question.options.map((option) => (
        <Answer key={option.id} option={option} />
      ))}
    </div>
  );
};
