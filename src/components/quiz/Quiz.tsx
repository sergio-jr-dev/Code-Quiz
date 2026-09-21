import { useEffect, useRef } from 'react';

import { useQuizTimer } from '../../hooks/useQuizTimer';
import { useQuizStore } from '../../stores/quizStore';
import { QuestionContent } from '../content/QuestionContent';
import { Answers } from './answers/Answers';
import { Buttons } from './buttons/Buttons';
import { Feedback } from './feedback/Feedback';
import { Info } from './info/Info';
import { QuizProgress } from './progress/QuizProgress';
import { QuizTimer } from './timer/QuizTimer';

import './quiz.css';

export const Quiz = () => {
  useQuizTimer();

  const mode = useQuizStore((state) => state.mode);
  const question = useQuizStore((state) => state.round[state.currentQuestionIndex]);

  const hasAnswered = useQuizStore((state) => {
    const currentQuestion = state.round[state.currentQuestionIndex];
    return state.answers.some((answer) => answer.questionId === currentQuestion?.id);
  });

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [question?.id]);

  if (!question) {
    throw new Error('No question found for the current index');
  }

  return (
    <article className="quiz" data-mode={mode}>
      <div className="quiz-status">
        <QuizProgress />
        <QuizTimer />
      </div>

      <QuestionContent
        content={question.prompt}
        headingId="question-title"
        ref={headingRef}
        tabIndex={-1}
        language={question.subject}
      />

      <Answers />

      {hasAnswered ? <Feedback /> : null}

      {hasAnswered ? <Info /> : null}

      <Buttons />
    </article>
  );
};
