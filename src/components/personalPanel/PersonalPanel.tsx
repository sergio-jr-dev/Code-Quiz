import { IconSettings, IconUserCircle, IconX } from '@tabler/icons-react';
import { useRef, type KeyboardEvent } from 'react';

import { useQuizStore } from '../../stores/quizStore';
import { Button } from '../button/Button';
import { PersonalPanelBestResults } from './PersonalPanelBestResults';

import './personalPanel.css';

export const PersonalPanel = () => {
  const view = useQuizStore((state) => state.view);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const openPanel = () => {
    dialogRef.current?.showModal();
    closeRef.current?.focus();
  };

  const keepFocusInside = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;

    const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!controls?.length) return;

    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  if (view === 'playing') return null;

  return (
    <div className="personal-panel">
      <Button
        className="personal-panel-trigger"
        type="button"
        ref={triggerRef}
        aria-label="Mi Code Quiz"
        aria-haspopup="dialog"
        aria-controls="personal-panel-dialog"
        onClick={openPanel}
      >
        <IconUserCircle aria-hidden="true" stroke={2} />
        <span className="personal-panel-trigger-label">Mi Code Quiz</span>
      </Button>

      <dialog
        id="personal-panel-dialog"
        className="personal-panel-dialog"
        ref={dialogRef}
        aria-labelledby="personal-panel-title"
        onClose={() => triggerRef.current?.focus({ preventScroll: true })}
        onKeyDown={keepFocusInside}
      >
        <div className="personal-panel-content">
          <div className="personal-panel-heading">
            <h2 id="personal-panel-title">Mi Code Quiz</h2>
            <Button
              className="personal-panel-close"
              type="button"
              ref={closeRef}
              aria-label="Cerrar Mi Code Quiz"
              onClick={() => dialogRef.current?.close()}
            >
              <IconX aria-hidden="true" stroke={2} />
            </Button>
          </div>

          <section
            className="personal-panel-preferences"
            aria-labelledby="personal-panel-preferences-title"
          >
            <h3 id="personal-panel-preferences-title">
              <IconSettings aria-hidden="true" stroke={2} />
              Preferencias
            </h3>
            <p>Los controles de tema y sonido estarán disponibles próximamente.</p>
          </section>

          <PersonalPanelBestResults />
        </div>
      </dialog>
    </div>
  );
};
