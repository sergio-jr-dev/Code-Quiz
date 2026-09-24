import { IconTrophy } from '@tabler/icons-react';

import { selectBestResultForConfiguration } from '../../lib/quizRecords';
import { useQuizStore } from '../../stores/quizStore';
import { LEVELS, SUBJECTS } from '../../types/questionBank';
import type { Level } from '../../types/questionBank';
import type { QuizMode, QuizSubject } from '../../types/quizStore';

const modes: readonly { value: QuizMode; label: string; icon: string }[] = [
  { value: 'normal', label: 'Normal', icon: 'normal.png' },
  { value: 'timed', label: 'Cronómetro', icon: 'timed.png' },
];

const subjects: readonly { value: QuizSubject; label: string; icon: string }[] = [
  ...SUBJECTS.map((subject) => ({
    value: subject,
    label: subject === 'javascript' ? 'JavaScript' : subject.toUpperCase(),
    icon: `${subject}-logo-3d.png`,
  })),
  { value: 'mixed', label: 'Quiz mixto', icon: 'mixed-logo-3d.png' },
];

const levels: Readonly<Record<Level, { label: string; icon: string }>> = {
  basic: { label: 'Básico', icon: 'basic.png' },
  intermediate: { label: 'Intermedio', icon: 'intermediate.png' },
  advanced: { label: 'Avanzado', icon: 'advanced.png' },
};

export const PersonalPanelBestResults = () => {
  const bestResults = useQuizStore((state) => state.bestResults);

  return (
    <section className="personal-panel-records" aria-labelledby="personal-panel-records-title">
      <h3 id="personal-panel-records-title">
        <IconTrophy aria-hidden="true" stroke={2} />
        Mejores marcas
      </h3>
      <p>Tu mejor resultado en cada partida de 10 preguntas.</p>

      {modes.map((mode) => (
        <div className="personal-panel-record-mode" key={mode.value}>
          <h4>
            <img src={`${import.meta.env.BASE_URL}images/modes/${mode.icon}`} alt="" />
            {mode.label}
          </h4>
          {subjects.map((subject) => (
            <div className="personal-panel-record-subject" key={subject.value}>
              <h5>
                <img src={`${import.meta.env.BASE_URL}images/subjects/${subject.icon}`} alt="" />
                {subject.label}
              </h5>
              <dl>
                {LEVELS.map((level) => {
                  const best = selectBestResultForConfiguration(
                    bestResults,
                    { subject: subject.value, level },
                    mode.value,
                  );

                  return (
                    <div key={level}>
                      <dt>
                        <img
                          src={`${import.meta.env.BASE_URL}images/levels/${levels[level].icon}`}
                          alt=""
                        />
                        {levels[level].label}
                      </dt>
                      <dd>{best === undefined ? 'Sin marca' : <strong>{best} de 10</strong>}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};
