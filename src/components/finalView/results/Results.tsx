import { IconCheck, IconX } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';

import { useQuizStore } from '../../../stores/quizStore';
import { ContentBlocks } from '../../content/ContentBlocks';
import { ExplanationContent } from '../../content/ExplanationContent';
import { OptionContent } from '../../content/OptionContent';
import { InfoIcon } from '../../icons/InfoIcon';

import './results.css';

export const Results = () => {
  const round = useQuizStore((state) => state.round);
  const answers = useQuizStore((state) => state.answers);

  const firstQuestionCardRef = useRef<HTMLElement>(null);
  const firstQuestionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    firstQuestionRef.current?.focus({ preventScroll: true });
    firstQuestionCardRef.current?.scrollIntoView?.({ block: 'start' });
  }, []);

  return (
    <section className="results">
      {round.map((question, i) => {
        const selectedOptionId = answers.find(
          (answer) => answer.questionId === question.id,
        )?.selectedOptionId;
        const questionIsCorrect = selectedOptionId === question.correctAnswer;

        return (
          <article
            className="quiz"
            key={question.id}
            id={`question-${i + 1}`}
            ref={i === 0 ? firstQuestionCardRef : null}
            tabIndex={-1}
            aria-labelledby={`review-title-${question.id}`}
          >
            <header className="review-heading">
              <h3
                id={`review-title-${question.id}`}
                ref={i === 0 ? firstQuestionRef : null}
                tabIndex={-1}
              >
                Pregunta {i + 1}
              </h3>
              <span className={questionIsCorrect ? 'correct' : 'incorrect'}>
                {questionIsCorrect ? (
                  <IconCheck aria-hidden="true" />
                ) : (
                  <IconX aria-hidden="true" />
                )}
                {questionIsCorrect ? 'Correcta' : 'Para revisar'}
              </span>
            </header>
            <ContentBlocks content={question.prompt} inlineLanguage={question.subject} />
            <div className="answers">
              {question.options.map((option, optionIndex) => {
                const isCorrect = option.id === question.correctAnswer;
                const isSelected = option.id === selectedOptionId;
                const answerState = isCorrect
                  ? isSelected
                    ? 'Tu respuesta · Correcta'
                    : 'Respuesta correcta'
                  : isSelected
                    ? 'Tu respuesta · Incorrecta'
                    : null;

                return (
                  <div
                    key={option.id}
                    className={`answer
                ${isCorrect ? 'correct' : ''}
                ${isSelected && !isCorrect ? 'incorrect' : ''}
              `}
                  >
                    <span className="answer-marker" aria-hidden="true">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <OptionContent content={option.content} language={question.subject} />
                    {answerState && <small>{answerState}</small>}
                  </div>
                );
              })}
            </div>
            <div className="info">
              <h4>
                <InfoIcon />
                Explicación
              </h4>
              <ExplanationContent content={question.explanation} language={question.subject} />
            </div>
          </article>
        );
      })}
    </section>
  );
};
