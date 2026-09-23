export type ThemePreference = 'auto' | 'light' | 'dark';

export interface PreferencesState {
  theme: ThemePreference;
  soundEnabled: boolean;
}

export interface PreferencesActions {
  setTheme: (theme: ThemePreference) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export type PreferencesStore = PreferencesState & PreferencesActions;
