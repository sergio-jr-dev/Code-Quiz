import { useQuiz } from '../../../context/QuizContext';
import { OptionContent } from '../../content/OptionContent';
import type { QuestionOption } from '../../../types/questionBank';

import './answer.css';

export const Answer = ({ option }: { option: QuestionOption }) => {
  const { selectedOption, question, selectOption } =
    useQuiz();

  const correctAnswer =
    selectedOption !== null &&
    option.id === question.correctAnswer;
  const incorrectAnswer =
    selectedOption === option.id &&
    option.id !== question.correctAnswer;

  return (
    <label
      className={`
        answer 
        ${correctAnswer ? 'correct' : ''}
        ${incorrectAnswer ? 'incorrect' : ''}
        ${selectedOption === null ? 'cursor' : ''}
      `}
    >
      <input
        type="radio"
        name="option"
        checked={selectedOption === option.id}
        onChange={() => selectOption(option.id)}
        disabled={selectedOption !== null && selectedOption !== option.id}
      />
      <div className="answer-content">
        <OptionContent content={option.content} />
        {correctAnswer && <small>Respuesta correcta</small>}
        {incorrectAnswer && <small>Tu respuesta · Incorrecta</small>}
      </div>
    </label>
  );
};
