import confetti from 'canvas-confetti';

import { prefersReducedMotion } from '../../../lib/motionPreference';
import { useQuizStore } from '../../../stores/quizStore';
import type { QuestionOption } from '../../../types/questionBank';
import { OptionContent } from '../../content/OptionContent';

import './answer.css';

export const Answer = ({ option, position }: { option: QuestionOption; position: number }) => {
  const question = useQuizStore((state) => state.round[state.currentQuestionIndex]);

  const selectedOption = useQuizStore(
    (state) =>
      state.answers.find((answer) => answer.questionId === question?.id)?.selectedOptionId ?? null,
  );

  const selectOption = useQuizStore((state) => state.selectOption);

  if (!question) {
    throw new Error('No question found for the current index');
  }

  const correctAnswer = selectedOption !== null && option.id === question.correctAnswer;
  const incorrectAnswer = selectedOption === option.id && option.id !== question.correctAnswer;
  const marker = String.fromCharCode(65 + position);

  const handleSelectOption = () => {
    if (selectedOption !== null) return;

    selectOption(option.id);

    if (option.id === question.correctAnswer && !prefersReducedMotion()) {
      void confetti({
        startVelocity: 50,
        particleCount: 10,
        gravity: 10,
        disableForReducedMotion: true,
      });
    }
  };

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
        className="answer-input"
        type="radio"
        name="option"
        checked={selectedOption === option.id}
        onChange={handleSelectOption}
        disabled={selectedOption !== null && selectedOption !== option.id}
      />
      <span className="answer-marker" aria-hidden="true">
        {marker}
      </span>
      <div className="answer-content">
        <OptionContent content={option.content} language={question.subject} />
      </div>
    </label>
  );
};
