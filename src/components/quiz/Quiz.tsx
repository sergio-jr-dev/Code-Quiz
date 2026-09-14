import { useEffect, useRef } from 'react';

import { useQuizStore } from '../../stores/quizStore';
import { QuestionContent } from '../content/QuestionContent';
import { Answers } from './answers/Answers';
import { Buttons } from './buttons/Buttons';
import { Info } from './info/Info';

import './quiz.css';

export const Quiz = () => {
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);

  const totalQuestions = useQuizStore((state) => state.round.length);

  const question = useQuizStore((state) => state.round[state.currentQuestionIndex]);

  const selectedOption = useQuizStore((state) => {
    const currentQuestion = state.round[state.currentQuestionIndex];

    return (
      state.answers.find((answer) => answer.questionId === currentQuestion?.id)?.selectedOptionId ??
      null
    );
  });

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [question?.id]);

  if (!question) {
    throw new Error('No question found for the current index');
  }

  return (
    <article className="quiz">
      <span
        className="badge"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Pregunta ${currentQuestionIndex + 1} de ${totalQuestions}`}
      >
        {currentQuestionIndex + 1} / {totalQuestions}
      </span>

      <QuestionContent
        content={question.prompt}
        headingId="question-title"
        ref={headingRef}
        tabIndex={-1}
      />

      <Answers />

      <p role="status" className={selectedOption === null ? 'sr-only' : undefined}>
        {selectedOption !== null &&
          (selectedOption === question.correctAnswer
            ? 'Respuesta correcta.'
            : 'Respuesta incorrecta. Consulta la opción marcada como correcta.')}
      </p>

      {selectedOption !== null && <Info />}

      <Buttons />
    </article>
  );
};
