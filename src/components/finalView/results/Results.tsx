import { useEffect, useRef } from 'react';
import { renderExplanation } from '../../../lib/renderExplanation';
import { useQuiz } from '../../../context/QuizContext';

import './results.css';

export const Results = () => {
  const { shuffleQuestions, userAnswers } = useQuiz();
  const firstQuestionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (firstQuestionRef.current) {
      firstQuestionRef.current.focus();
    }
  }, []);

  return (
    <section className="results">
      {shuffleQuestions.map((question, i) => (
        <article
          className="quiz"
          key={question.id}
          id={`question-${i + 1}`}
          tabIndex={-1}
          aria-labelledby={`review-title-${question.id}`}
        >
          <h3 id={`review-title-${question.id}`} ref={i === 0 ? firstQuestionRef : null} tabIndex={-1}>Pregunta {i + 1}</h3>
          <p>{question.question}</p>
          <div className="answers">
            {question.options.map((option) => (
              <p
                key={option.id}
                className={`answer
                ${option.id === question.correctAnswer ? 'correct' : ''}
                ${
                  option.id === userAnswers[i] &&
                  option.id !== question.correctAnswer
                    ? 'incorrect'
                    : ''
                }
              `}
              >
                <span>{option.content}</span>
                {option.id === question.correctAnswer && <small>Respuesta correcta</small>}
                {option.id === userAnswers[i] && <small>Tu respuesta</small>}
              </p>
            ))}
          </div>
          <div
            className="info"
            dangerouslySetInnerHTML={{
              __html: renderExplanation(question.additionalInfo),
            }}
          />
        </article>
      ))}
    </section>
  );
};
