import confetti from 'canvas-confetti';

import { prefersReducedMotion } from '../../../lib/motionPreference';
import { useQuizStore } from '../../../stores/quizStore';
import type { QuestionOption } from '../../../types/questionBank';
import { OptionContent } from '../../content/OptionContent';

import './answer.css';

export const Answer = ({ option, position }: { option: QuestionOption; position: number }) => {
  const question = useQuizStore((state) => state.round[state.currentQuestionIndex]);

  const answer = useQuizStore((state) =>
    state.answers.find((candidate) => candidate.questionId === question?.id),
  );

  const selectOption = useQuizStore((state) => state.selectOption);

  if (!question) {
    throw new Error('No question found for the current index');
  }

  const hasAnswered = answer !== undefined;
  const selectedOptionId = answer?.selectedOptionId ?? null;
  const correctAnswer = hasAnswered && option.id === question.correctAnswer;
  const incorrectAnswer = selectedOptionId === option.id && option.id !== question.correctAnswer;
  const marker = String.fromCharCode(65 + position);

  const handleSelectOption = () => {
    if (hasAnswered) return;

    selectOption(option.id);

    const recordedAnswer = useQuizStore
      .getState()
      .answers.find((candidate) => candidate.questionId === question.id);
    if (
      recordedAnswer?.selectedOptionId === option.id &&
      option.id === question.correctAnswer &&
      !prefersReducedMotion()
    ) {
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
        ${hasAnswered ? '' : 'cursor'}
      `}
    >
      <input
        className="answer-input"
        type="radio"
        name="option"
        checked={selectedOptionId === option.id}
        onChange={handleSelectOption}
        disabled={hasAnswered && selectedOptionId !== option.id}
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
