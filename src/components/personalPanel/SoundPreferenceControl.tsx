import { IconVolume2, IconVolumeOff } from '@tabler/icons-react';

import { unlockQuizSounds } from '../../lib/quizSounds';
import { usePreferencesStore } from '../../stores/preferencesStore';

export const SoundPreferenceControl = () => {
  const enabled = usePreferencesStore((state) => state.soundEnabled);
  const setSoundEnabled = usePreferencesStore((state) => state.setSoundEnabled);

  const handleChange = (checked: boolean) => {
    if (checked) unlockQuizSounds();
    setSoundEnabled(checked);
  };

  return (
    <div className="sound-preference-control">
      <label>
        <input
          type="checkbox"
          aria-label="Efectos sonoros"
          checked={enabled}
          onChange={(event) => handleChange(event.currentTarget.checked)}
        />
        <span className="sound-preference-title">Efectos sonoros</span>
        <span className="sound-preference-body">
          <span className="sound-preference-icon" aria-hidden="true">
            {enabled ? <IconVolume2 stroke={2} /> : <IconVolumeOff stroke={2} />}
          </span>
          <span className="sound-preference-copy">
            <strong>{enabled ? 'Activados' : 'Desactivados'}</strong>
            <span>Las respuestas y los resultados siempre se muestran en pantalla.</span>
          </span>
        </span>
      </label>
    </div>
  );
};
