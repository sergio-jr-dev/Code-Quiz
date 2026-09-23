import { describe, expect, it } from 'vitest';
import type { StateStorage } from 'zustand/middleware';

import {
  createPreferencesPersistStorage,
  defaultPreferences,
  mergePersistedPreferences,
  PREFERENCES_STORAGE_KEY,
  PREFERENCES_STORAGE_VERSION,
} from './preferencesPersistence';

const createStorage = (initial?: string) => {
  const values = new Map<string, string>();
  if (initial) values.set(PREFERENCES_STORAGE_KEY, initial);
  const storage: StateStorage = {
    getItem: (name) => values.get(name) ?? null,
    setItem: (name, value) => values.set(name, value),
    removeItem: (name) => values.delete(name),
  };
  return { values, adapter: createPreferencesPersistStorage(() => storage) };
};

describe('preferences persistence', () => {
  it('reads and writes only the strict versioned preference contract', async () => {
    const { values, adapter } = createStorage();
    const entry = {
      state: { theme: 'dark' as const, soundEnabled: true },
      version: PREFERENCES_STORAGE_VERSION,
    };

    await adapter.setItem(PREFERENCES_STORAGE_KEY, entry);
    expect(await adapter.getItem(PREFERENCES_STORAGE_KEY)).toEqual(entry);
    expect(JSON.parse(values.get(PREFERENCES_STORAGE_KEY)!)).toEqual(entry);
  });

  it.each([
    '{',
    JSON.stringify({ state: { theme: 'light', soundEnabled: false }, version: 2 }),
    JSON.stringify({ state: { theme: 'light', soundEnabled: false, extra: true }, version: 1 }),
    JSON.stringify({ state: { theme: 'light' }, version: 1 }),
    JSON.stringify({ state: { theme: 'sepia', soundEnabled: false }, version: 1 }),
    JSON.stringify({ state: { theme: 'auto', soundEnabled: 'yes' }, version: 1 }),
    JSON.stringify({ state: { theme: 'dark', soundEnabled: true }, version: 1, extra: true }),
  ])('rejects corrupt or incompatible persisted data', async (serialized) => {
    const { adapter } = createStorage(serialized);
    expect(await adapter.getItem(PREFERENCES_STORAGE_KEY)).toBeNull();
  });

  it('keeps defaults when storage is unavailable', async () => {
    const adapter = createPreferencesPersistStorage(() => {
      throw new Error('blocked');
    });
    expect(await adapter.getItem(PREFERENCES_STORAGE_KEY)).toBeNull();
    expect(
      await adapter.setItem(PREFERENCES_STORAGE_KEY, {
        state: defaultPreferences,
        version: 1,
      }),
    ).toBeUndefined();
  });

  it('merges validated preferences without replacing store actions', () => {
    const actions = { setTheme: () => undefined, setSoundEnabled: () => undefined };
    const current = { ...defaultPreferences, ...actions };
    expect(mergePersistedPreferences({ theme: 'light', soundEnabled: true }, current)).toEqual({
      ...current,
      theme: 'light',
      soundEnabled: true,
    });
    expect(
      mergePersistedPreferences({ theme: 'light', soundEnabled: true, extra: 1 }, current),
    ).toBe(current);
  });
});
