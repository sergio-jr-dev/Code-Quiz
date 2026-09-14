import { useQuizStore } from '../../../stores/quizStore';
import { Answer } from '../answer/Answer';

import './answers.css';

export const Answers = () => {
  const question = useQuizStore((state) => state.round[state.currentQuestionIndex]);

  if (!question) {
    throw new Error('No question found for the current index');
  }

  return (
    <div className="answers" role="radiogroup" aria-labelledby="question-title">
      {question.options.map((option) => (
        <Answer key={option.id} option={option} />
      ))}
    </div>
  );
};
