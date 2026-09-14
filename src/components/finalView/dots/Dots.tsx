import { useQuizStore } from '../../../stores/quizStore';

import './dots.css';

export const Dots = () => {
  const round = useQuizStore((state) => state.round);
  const answers = useQuizStore((state) => state.answers);

  return (
    <nav className="dots" aria-label="Revisión de preguntas">
      {round.map(({ id, correctAnswer }, i) => {
        const selectedOptionId = answers.find(
          (answer) => answer.questionId === id,
        )?.selectedOptionId;

        const isCorrect = correctAnswer === selectedOptionId;

        return (
          <a
            key={id}
            href={`#question-${i + 1}`}
            aria-label={`Pregunta ${i + 1}: ${isCorrect ? 'correcta' : 'incorrecta'}`}
            className={`dot ${isCorrect ? 'correct' : 'incorrect'}`}
          >
            {i + 1}
          </a>
        );
      })}
    </nav>
  );
};
