import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import {
  createPreferencesPersistStorage,
  defaultPreferences,
  mergePersistedPreferences,
  partializePreferences,
  PREFERENCES_STORAGE_KEY,
  PREFERENCES_STORAGE_VERSION,
} from '../lib/preferencesPersistence';
import { applyTheme } from '../lib/theme';
import type { PreferencesStore } from '../types/preferences';

export const usePreferencesStore = create<PreferencesStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultPreferences,
        setTheme: (theme) => {
          set({ theme });
          applyTheme(theme, true);
        },
        setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      }),
      {
        name: PREFERENCES_STORAGE_KEY,
        version: PREFERENCES_STORAGE_VERSION,
        storage: createPreferencesPersistStorage(),
        partialize: partializePreferences,
        merge: mergePersistedPreferences,
        onRehydrateStorage: () => (state) => applyTheme(state?.theme ?? 'auto'),
      },
    ),
    { name: 'preferences-store' },
  ),
);
