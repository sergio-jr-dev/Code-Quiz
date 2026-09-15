import { IconPlayerPlayFilled } from '@tabler/icons-react';
import type { FormEvent } from 'react';

import { questionCatalog } from '../../data/questionCatalog';
import { isConfigurationPlayable } from '../../lib/quizRound';
import { useQuizStore } from '../../stores/quizStore';
import type { Level } from '../../types/questionBank';
import type { QuizSubject } from '../../types/quizStore';
import { Button } from '../button/Button';

import './menu.css';

const subjectChoices: readonly {
  value: QuizSubject;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: 'html',
    label: 'HTML',
    description: 'Semántica, formularios y estructura web',
    icon: 'html-logo-3d.png',
  },
  {
    value: 'css',
    label: 'CSS',
    description: 'Selectores, cascada y composición visual',
    icon: 'css-logo-3d.png',
  },
  {
    value: 'javascript',
    label: 'JavaScript',
    description: 'Lenguaje, DOM y comportamiento',
    icon: 'javascript-logo-3d.png',
  },
  {
    value: 'mixed',
    label: 'Quiz mixto',
    description: 'Una partida equilibrada con las tres materias',
    icon: 'mixed-logo-3d.png',
  },
];

const levelChoices: readonly { value: Level; label: string; description: string; icon: string }[] =
  [
    { value: 'basic', label: 'Básico', description: 'Afianza los fundamentos', icon: 'basic.png' },
    {
      value: 'intermediate',
      label: 'Intermedio',
      description: 'Conecta conceptos y casos reales',
      icon: 'intermediate.png',
    },
    {
      value: 'advanced',
      label: 'Avanzado',
      description: 'Resuelve matices y casos límite',
      icon: 'advanced.png',
    },
  ];

export const Menu = () => {
  const subject = useQuizStore((state) => state.configuration.subject);
  const level = useQuizStore((state) => state.configuration.level);
  const selectSubject = useQuizStore((state) => state.selectSubject);
  const selectLevel = useQuizStore((state) => state.selectLevel);
  const startRound = useQuizStore((state) => state.startRound);

  const configuration = { subject, level };
  const canStart = isConfigurationPlayable(questionCatalog, configuration);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startRound();
  };

  return (
    <section className="quiz-menu" aria-labelledby="menu-title">
      <header className="menu-intro">
        <p className="eyebrow">Configura tu partida</p>
        <h2 id="menu-title">¿Qué quieres practicar hoy?</h2>
        <p>Elige una materia y un nivel para empezar.</p>
      </header>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Materia</legend>
          <div className="subject-options">
            {subjectChoices.map((choice) => {
              const available = isConfigurationPlayable(questionCatalog, {
                subject: choice.value,
                level,
              });

              return (
                <label className="subject-option" key={choice.value}>
                  <input
                    type="radio"
                    name="subject"
                    value={choice.value}
                    checked={subject === choice.value}
                    disabled={!available}
                    onChange={() => selectSubject(choice.value)}
                  />
                  <span className="subject-icon" aria-hidden="true">
                    <img
                      src={`${import.meta.env.BASE_URL}images/subjects/${choice.icon}`}
                      alt=""
                      width="256"
                      height="256"
                    />
                  </span>
                  <span className="option-copy">
                    <strong>{choice.label}</strong>
                    <small>{available ? choice.description : 'Próximamente'}</small>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Nivel</legend>
          <div className="level-options">
            {levelChoices.map((choice) => {
              const available = isConfigurationPlayable(questionCatalog, {
                subject,
                level: choice.value,
              });

              return (
                <label className="level-option" key={choice.value}>
                  <input
                    type="radio"
                    name="level"
                    value={choice.value}
                    checked={level === choice.value}
                    disabled={!available}
                    onChange={() => selectLevel(choice.value)}
                  />
                  <span className="level-icon" aria-hidden="true">
                    <img
                      src={`${import.meta.env.BASE_URL}images/levels/${choice.icon}`}
                      alt=""
                      width="228"
                      height="256"
                    />
                  </span>
                  <span className="option-copy">
                    <strong>{choice.label}</strong>
                    <small>{available ? choice.description : 'Próximamente'}</small>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="menu-action">
          <p aria-live="polite">
            {canStart
              ? 'La partida tendrá 10 preguntas.'
              : 'Esta combinación todavía no está disponible.'}
          </p>
          <Button type="submit" disabled={!canStart}>
            <IconPlayerPlayFilled aria-hidden="true" stroke={2} />
            Comenzar partida
          </Button>
        </div>
      </form>
    </section>
  );
};
