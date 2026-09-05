import { useQuiz } from '../../../context/QuizContext';

import type { Option } from '../../../types/quiz';

import './answer.css';

export const Answer = ({ option }: { option: Option }) => {
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
      <span className="answer-content">
        {option.content}
        {correctAnswer && <small>Respuesta correcta</small>}
        {incorrectAnswer && <small>Tu respuesta · Incorrecta</small>}
      </span>
    </label>
  );
};
