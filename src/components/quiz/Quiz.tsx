import { useEffect, useRef } from 'react';

import { useQuizStore } from '../../stores/quizStore';
import { QuestionContent } from '../content/QuestionContent';
import { Answers } from './answers/Answers';
import { Buttons } from './buttons/Buttons';
import { Feedback } from './feedback/Feedback';
import { Info } from './info/Info';
import { QuizProgress } from './progress/QuizProgress';

import './quiz.css';

export const Quiz = () => {
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
      <QuizProgress />

      <QuestionContent
        content={question.prompt}
        headingId="question-title"
        ref={headingRef}
        tabIndex={-1}
        language={question.subject}
      />

      <Answers />

      {selectedOption !== null && <Feedback />}

      {selectedOption !== null && <Info />}

      <Buttons />
    </article>
  );
};
