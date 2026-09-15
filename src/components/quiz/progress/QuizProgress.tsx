import { useQuizStore } from '../../../stores/quizStore';

import './quizProgress.css';

export function QuizProgress() {
  const currentQuestion = useQuizStore((state) => state.currentQuestionIndex + 1);
  const totalQuestions = useQuizStore((state) => state.round.length);
  const label = `Pregunta ${currentQuestion} de ${totalQuestions}`;

  return (
    <div className="quiz-progress">
      <progress id="quiz-progress" value={currentQuestion} max={totalQuestions}>
        {label}
      </progress>
      <label htmlFor="quiz-progress">{label}</label>
    </div>
  );
}
