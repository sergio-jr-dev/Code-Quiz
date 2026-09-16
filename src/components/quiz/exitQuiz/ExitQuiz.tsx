import { IconDoorExit } from '@tabler/icons-react';
import { useRef } from 'react';

import { useQuizStore } from '../../../stores/quizStore';
import { Button } from '../../button/Button';

import './exitQuiz.css';

export const ExitQuiz = () => {
  const abandonRound = useQuizStore((state) => state.abandonRound);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleConfirm = () => {
    dialogRef.current?.close();
    abandonRound();
  };

  return (
    <div className="exit-quiz">
      <Button className="exit-trigger" onClick={openDialog} ref={triggerRef} type="button">
        <IconDoorExit aria-hidden="true" stroke={2} />
        Salir de la partida
      </Button>

      <dialog
        aria-describedby="exit-quiz-description"
        aria-labelledby="exit-quiz-title"
        className="exit-dialog"
        onClose={() => triggerRef.current?.focus()}
        ref={dialogRef}
      >
        <div className="exit-dialog-content">
          <div className="exit-dialog-copy">
            <h2 id="exit-quiz-title">¿Salir de la partida?</h2>
            <p id="exit-quiz-description">
              Perderás el progreso de esta partida. Tus mejores resultados y la configuración se
              conservarán.
            </p>
          </div>

          <div className="exit-dialog-actions">
            <Button autoFocus className="continue-action" onClick={closeDialog} type="button">
              Continuar partida
            </Button>
            <Button className="confirm-exit-action" onClick={handleConfirm} type="button">
              Salir de la partida
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
