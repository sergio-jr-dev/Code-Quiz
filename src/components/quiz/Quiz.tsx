import { useEffect, useRef } from 'react';

import { useQuiz } from '../../context/QuizContext';
import { QuestionContent } from '../content/QuestionContent';
import { Answers } from './answers/Answers';
import { Buttons } from './buttons/Buttons';
import { Info } from './info/Info';

import './quiz.css';

export const Quiz = () => {
  const { currentQuestion, shuffleQuestions, question, selectedOption } = useQuiz();

  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  return (
    <article className="quiz">
      <span
        className="badge"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Pregunta ${currentQuestion + 1} de ${shuffleQuestions.length}`}
      >
        {currentQuestion + 1} / {shuffleQuestions.length}
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
