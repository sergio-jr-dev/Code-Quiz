import { z } from 'zod';
import type { PersistStorage, StateStorage, StorageValue } from 'zustand/middleware';

import type { PreferencesState, PreferencesStore } from '../types/preferences';

export const PREFERENCES_STORAGE_KEY = 'code-quiz:preferences';
export const PREFERENCES_STORAGE_VERSION = 1;

const persistedPreferencesSchema = z.strictObject({
  theme: z.enum(['auto', 'light', 'dark']),
  soundEnabled: z.boolean(),
});

const preferencesStorageValueSchema = z.strictObject({
  state: persistedPreferencesSchema,
  version: z.literal(PREFERENCES_STORAGE_VERSION),
});

export type PersistedPreferencesV1 = z.infer<typeof persistedPreferencesSchema>;

export const defaultPreferences: PreferencesState = {
  theme: 'auto',
  soundEnabled: false,
};

export const partializePreferences = (state: PreferencesStore): PersistedPreferencesV1 => ({
  theme: state.theme,
  soundEnabled: state.soundEnabled,
});

export const mergePersistedPreferences = (
  persistedState: unknown,
  currentState: PreferencesStore,
): PreferencesStore => {
  const parsed = persistedPreferencesSchema.safeParse(persistedState);
  return parsed.success ? { ...currentState, ...parsed.data } : currentState;
};

const unavailableStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const createPreferencesPersistStorage = (
  getStorage: () => StateStorage = () => window.localStorage,
): PersistStorage<PersistedPreferencesV1> => {
  let storage: StateStorage;
  try {
    storage = getStorage();
  } catch {
    storage = unavailableStorage;
  }

  return {
    getItem: (name) => {
      try {
        const serialized = storage.getItem(name);
        if (serialized === null) return null;
        if (serialized instanceof Promise) {
          return serialized
            .then((value) => {
              const parsed = preferencesStorageValueSchema.safeParse(JSON.parse(value ?? 'null'));
              return parsed.success ? (parsed.data as StorageValue<PersistedPreferencesV1>) : null;
            })
            .catch(() => null);
        }
        const parsed = preferencesStorageValueSchema.safeParse(JSON.parse(serialized));
        return parsed.success ? (parsed.data as StorageValue<PersistedPreferencesV1>) : null;
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      const parsed = preferencesStorageValueSchema.safeParse(value);
      if (!parsed.success) return undefined;
      try {
        const result = storage.setItem(name, JSON.stringify(parsed.data));
        return result instanceof Promise ? result.catch(() => undefined) : result;
      } catch {
        return undefined;
      }
    },
    removeItem: (name) => {
      try {
        const result = storage.removeItem(name);
        return result instanceof Promise ? result.catch(() => undefined) : result;
      } catch {
        return undefined;
      }
    },
  };
};
