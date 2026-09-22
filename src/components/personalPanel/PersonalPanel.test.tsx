import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useQuizStore } from '../../stores/quizStore';
import { PersonalPanel } from './PersonalPanel';

describe('PersonalPanel', () => {
  beforeEach(() => {
    useQuizStore.setState({ view: 'menu' });
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
      expect(within(dialog).getByRole('button', { name: 'Cerrar Mi Code Quiz' })).toHaveFocus();

      await user.tab();
      expect(within(dialog).getByRole('button', { name: 'Cerrar Mi Code Quiz' })).toHaveFocus();
      await user.tab({ shift: true });
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
});
