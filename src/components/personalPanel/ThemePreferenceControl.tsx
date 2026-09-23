import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';

import { usePreferencesStore } from '../../stores/preferencesStore';
import type { ThemePreference } from '../../types/preferences';

const choices: readonly {
  value: ThemePreference;
  label: string;
  Icon: typeof IconSun;
}[] = [
  { value: 'light', label: 'Claro', Icon: IconSun },
  { value: 'dark', label: 'Oscuro', Icon: IconMoon },
  { value: 'auto', label: 'Automático', Icon: IconDeviceDesktop },
];

export const ThemePreferenceControl = () => {
  const theme = usePreferencesStore((state) => state.theme);
  const setTheme = usePreferencesStore((state) => state.setTheme);

  return (
    <fieldset className="theme-preference-control">
      <legend>Tema</legend>
      <div className="theme-preference-choices">
        {choices.map(({ value, label, Icon }) => (
          <label key={value} title={label}>
            <input
              type="radio"
              name="theme-preference"
              value={value}
              checked={theme === value}
              onChange={() => setTheme(value)}
            />
            <Icon aria-hidden="true" stroke={2} />
            <span className="visually-hidden">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
