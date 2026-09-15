import { summarizeRoundBySubject } from '../../../lib/quizSummary';
import { useQuizStore } from '../../../stores/quizStore';
import type { Subject } from '../../../types/questionBank';

import './resultsSummary.css';

const subjectLabels: Readonly<Record<Subject, string>> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
};

const subjectIcons: Readonly<Record<Subject, string>> = {
  html: 'html-logo-3d.png',
  css: 'css-logo-3d.png',
  javascript: 'javascript-logo-3d.png',
};

export function ResultsSummary() {
  const round = useQuizStore((state) => state.round);
  const answers = useQuizStore((state) => state.answers);
  const summary = summarizeRoundBySubject(round, answers);

  return (
    <section className="results-summary" aria-labelledby="results-summary-title">
      <div className="summary-heading">
        <h3 id="results-summary-title">Rendimiento por materia</h3>
        <span>{summary.length === 1 ? 'Tu categoría' : 'Quiz mixto'}</span>
      </div>
      <ul>
        {summary.map(({ subject, correct, total }) => {
          const label = subjectLabels[subject];

          return (
            <li key={subject}>
              <div className="summary-label">
                <span className="summary-subject">
                  <img
                    src={`${import.meta.env.BASE_URL}images/subjects/${subjectIcons[subject]}`}
                    alt=""
                    aria-hidden="true"
                    width="256"
                    height="256"
                  />
                  <strong>{label}</strong>
                </span>
                <span>
                  {correct} de {total}
                </span>
              </div>
              <progress
                aria-label={`${label}: ${correct} de ${total} respuestas correctas`}
                value={correct}
                max={total}
              >
                {correct} de {total}
              </progress>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
