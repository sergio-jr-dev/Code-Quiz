import { useEffect, useRef } from 'react';
import { useQuiz } from '../../../context/QuizContext';
import { ContentBlocks } from '../../content/ContentBlocks';
import { ExplanationContent } from '../../content/ExplanationContent';
import { OptionContent } from '../../content/OptionContent';

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
          <ContentBlocks content={question.prompt} />
          <div className="answers">
            {question.options.map((option) => (
              <div
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
                <OptionContent content={option.content} />
                {option.id === question.correctAnswer && <small>Respuesta correcta</small>}
                {option.id === userAnswers[i] && <small>Tu respuesta</small>}
              </div>
            ))}
          </div>
          <div className="info">
            <ExplanationContent content={question.explanation} />
          </div>
        </article>
      ))}
    </section>
  );
};
