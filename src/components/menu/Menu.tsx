import { IconArrowLeft, IconArrowRight, IconPlayerPlayFilled } from '@tabler/icons-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';

import { questionCatalog } from '../../data/questionCatalog';
import { isConfigurationPlayable } from '../../lib/quizRound';
import { useQuizStore } from '../../stores/quizStore';
import type { Level } from '../../types/questionBank';
import type { QuizMode, QuizSubject } from '../../types/quizStore';
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

const timeLimitLabels: Readonly<Record<Level, string>> = {
  basic: '60 segundos',
  intermediate: '45 segundos',
  advanced: '30 segundos',
};

const modeChoices: readonly { value: QuizMode; label: string; icon: string }[] = [
  { value: 'normal', label: 'Normal', icon: 'normal.png' },
  { value: 'timed', label: 'Cronómetro', icon: 'timed.png' },
];

type MenuStep = 1 | 2;

export const Menu = () => {
  const [step, setStep] = useState<MenuStep>(1);
  const subject = useQuizStore((state) => state.configuration.subject);
  const level = useQuizStore((state) => state.configuration.level);
  const mode = useQuizStore((state) => state.mode);
  const selectMode = useQuizStore((state) => state.selectMode);
  const selectSubject = useQuizStore((state) => state.selectSubject);
  const selectLevel = useQuizStore((state) => state.selectLevel);
  const startRound = useQuizStore((state) => state.startRound);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusHeadingRef = useRef(false);

  useEffect(() => {
    if (!shouldFocusHeadingRef.current) return;

    shouldFocusHeadingRef.current = false;
    headingRef.current?.focus();
  }, [step]);

  const moveToStep = (nextStep: MenuStep) => {
    shouldFocusHeadingRef.current = true;
    setStep(nextStep);
  };

  const configuration = { subject, level };
  const canStart = isConfigurationPlayable(questionCatalog, configuration);
  const selectedSubject = subjectChoices.find((choice) => choice.value === subject)!;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startRound();
  };

  return (
    <section className="quiz-menu" aria-labelledby="menu-title">
      <header className="menu-intro">
        <p className="eyebrow">Configura tu partida</p>
        <ol className={`menu-steps step-${step}`} aria-label="Progreso de la configuración">
          <li
            className={step === 1 ? 'active' : 'complete'}
            aria-current={step === 1 ? 'step' : undefined}
          >
            <span className="step-number" aria-hidden="true">
              1
            </span>
            <span>Materia</span>
          </li>
          <li
            className={step === 2 ? 'active' : 'upcoming'}
            aria-current={step === 2 ? 'step' : undefined}
          >
            <span className="step-number" aria-hidden="true">
              2
            </span>
            <span>Partida</span>
          </li>
        </ol>
        <h2 id="menu-title" ref={headingRef} tabIndex={-1}>
          {step === 1 ? '¿Qué quieres practicar hoy?' : 'Completa tu partida'}
        </h2>
        <p>
          {step === 1
            ? 'Elige la materia que quieres practicar.'
            : `Has elegido ${selectedSubject.label}. Ahora selecciona el nivel y la modalidad.`}
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="menu-step-content" key={step}>
          {step === 1 ? (
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
          ) : (
            <div className="round-options">
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

              <fieldset>
                <legend>Modalidad</legend>
                <div className="mode-options">
                  {modeChoices.map((choice) => {
                    const description =
                      choice.value === 'normal'
                        ? 'Sin límite de tiempo, con el mismo contenido.'
                        : `${timeLimitLabels[level]} por pregunta, sin bonificaciones.`;

                    return (
                      <label className="mode-option" key={choice.value}>
                        <input
                          type="radio"
                          name="mode"
                          value={choice.value}
                          checked={mode === choice.value}
                          onChange={() => selectMode(choice.value)}
                        />
                        <span className="mode-icon" aria-hidden="true">
                          <img
                            src={`${import.meta.env.BASE_URL}images/modes/${choice.icon}`}
                            alt=""
                            width="256"
                            height="256"
                          />
                        </span>
                        <span className="option-copy">
                          <strong>{choice.label}</strong>
                          <small>{description}</small>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}
        </div>

        <div className="menu-action">
          <p aria-live="polite">
            {step === 1
              ? `${selectedSubject.label} será la materia de esta partida.`
              : canStart
                ? 'La partida tendrá 10 preguntas.'
                : 'Esta combinación todavía no está disponible.'}
          </p>
          <div className="menu-buttons">
            {step === 1 ? (
              <Button type="button" onClick={() => moveToStep(2)}>
                Continuar
                <IconArrowRight aria-hidden="true" stroke={2} />
              </Button>
            ) : (
              <>
                <Button className="secondary-action" type="button" onClick={() => moveToStep(1)}>
                  <IconArrowLeft aria-hidden="true" stroke={2} />
                  Cambiar materia
                </Button>
                <Button type="submit" disabled={!canStart}>
                  <IconPlayerPlayFilled aria-hidden="true" stroke={2} />
                  Comenzar partida
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};
