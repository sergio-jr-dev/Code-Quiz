import { useQuiz } from '../../../context/QuizContext';

import './dots.css';

export const Dots = () => {
  const { shuffleQuestions, userAnswers } = useQuiz();

  return (
    <nav className="dots" aria-label="Revisión de preguntas">
      {shuffleQuestions.map(({ id, correctAnswer }, i) => (
        <a
          key={id}
          href={`#question-${i + 1}`}
          aria-label={`Pregunta ${i + 1}: ${correctAnswer === userAnswers[i] ? 'correcta' : 'incorrecta'}`}
          className={`dot ${correctAnswer === userAnswers[i] ? 'correct' : 'incorrect'}`}
        >
          {i + 1}
        </a>
      ))}
    </nav>
  );
};
