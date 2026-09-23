import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { PREFERENCES_STORAGE_KEY, defaultPreferences } from '../../lib/preferencesPersistence';
import { usePreferencesStore } from '../../stores/preferencesStore';
import { useQuizStore } from '../../stores/quizStore';
import { PersonalPanel } from './PersonalPanel';

describe('PersonalPanel', () => {
  beforeEach(() => {
    useQuizStore.setState({ view: 'menu' });
    usePreferencesStore.setState(defaultPreferences);
    localStorage.removeItem(PREFERENCES_STORAGE_KEY);
    delete document.documentElement.dataset.theme;
  });

  it.each(['menu', 'score', 'review'] as const)(
    'opens from %s with focus on close and restores focus to its trigger',
    async (view) => {
      const user = userEvent.setup();
      useQuizStore.setState({ view });
      render(<PersonalPanel />);

      const trigger = screen.getByRole('button', { name: 'Mi Code Quiz' });
      trigger.focus();
      await user.keyboard('{Enter}');

      const dialog = screen.getByRole('dialog', { name: 'Mi Code Quiz' });
      expect(dialog).toBeVisible();
      expect(within(dialog).getByRole('heading', { name: 'Mejores marcas' })).toBeVisible();
      expect(within(dialog).getByRole('heading', { name: 'Preferencias' })).toBeVisible();
      expect(
        within(dialog)
          .getByRole('heading', { name: 'Preferencias' })
          .compareDocumentPosition(
            within(dialog).getByRole('heading', { name: 'Mejores marcas' }),
          ) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      expect(within(dialog).getByRole('button', { name: 'Cerrar Mi Code Quiz' })).toHaveFocus();

      await user.tab();
      expect(within(dialog).getByRole('radio', { name: 'Automático' })).toHaveFocus();
      await user.tab({ shift: true });
      expect(within(dialog).getByRole('button', { name: 'Cerrar Mi Code Quiz' })).toHaveFocus();
      await user.tab({ shift: true });
      expect(within(dialog).getByRole('radio', { name: 'Automático' })).toHaveFocus();
      within(dialog).getByRole('button', { name: 'Cerrar Mi Code Quiz' }).focus();
      expect(within(dialog).getByRole('button', { name: 'Cerrar Mi Code Quiz' })).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    },
  );

  it('hides access while a question is active', () => {
    useQuizStore.setState({ view: 'playing' });
    render(<PersonalPanel />);

    expect(screen.queryByRole('button', { name: 'Mi Code Quiz' })).not.toBeInTheDocument();
  });

  it('changes the theme through native radios and persists the selected value', async () => {
    const user = userEvent.setup();
    render(<PersonalPanel />);
    await user.click(screen.getByRole('button', { name: 'Mi Code Quiz' }));

    const dialog = screen.getByRole('dialog', { name: 'Mi Code Quiz' });
    expect(within(dialog).getByRole('radio', { name: 'Automático' })).toBeChecked();

    await user.click(within(dialog).getByRole('radio', { name: 'Claro' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(within(dialog).getByRole('radio', { name: 'Claro' })).toBeChecked();
    expect(JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY)!)).toEqual({
      state: { theme: 'light', soundEnabled: false },
      version: 1,
    });

    await user.click(within(dialog).getByRole('radio', { name: 'Automático' }));
    expect(document.documentElement).not.toHaveAttribute('data-theme');
  });

  it('shows separate records for every mode, subject and level, including missing marks', async () => {
    const user = userEvent.setup();
    useQuizStore.setState({
      bestResults: {
        'html:basic': 0,
        'html:basic:timed': 8,
        'mixed:advanced': 10,
      },
    });
    render(<PersonalPanel />);
    await user.click(screen.getByRole('button', { name: 'Mi Code Quiz' }));

    const dialog = screen.getByRole('dialog', { name: 'Mi Code Quiz' });
    const normal = within(dialog).getByRole('heading', { name: 'Normal' }).parentElement!;
    const timed = within(dialog).getByRole('heading', { name: 'Cronómetro' }).parentElement!;

    expect(within(normal).getAllByRole('term')).toHaveLength(12);
    expect(within(timed).getAllByRole('term')).toHaveLength(12);
    expect(
      within(normal).getByRole('heading', { name: 'HTML' }).nextElementSibling,
    ).toHaveTextContent('Básico0 de 10');
    expect(
      within(timed).getByRole('heading', { name: 'HTML' }).nextElementSibling,
    ).toHaveTextContent('Básico8 de 10');
    expect(
      within(normal).getByRole('heading', { name: 'Quiz mixto' }).nextElementSibling,
    ).toHaveTextContent('Avanzado10 de 10');
    expect(
      within(timed).getByRole('heading', { name: 'Quiz mixto' }).nextElementSibling,
    ).toHaveTextContent('AvanzadoSin marca');
    expect(dialog.querySelectorAll('img:not([alt=""])')).toHaveLength(0);
  });
});
