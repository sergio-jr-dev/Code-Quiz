import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Footer } from './Footer';

describe('Footer', () => {
  it('exposes project, social and support destinations as external links', () => {
    render(<Footer />);

    const projectLinks = within(screen.getByRole('navigation', { name: 'Enlaces del proyecto' }));

    expect(projectLinks.getByRole('link', { name: 'Código fuente' })).toHaveAttribute(
      'href',
      'https://github.com/sergio-jr-dev/Code-Quiz',
    );
    expect(projectLinks.getByRole('link', { name: 'Portfolio' })).toHaveAttribute(
      'href',
      'https://sergiojimenez.vercel.app/',
    );
    expect(projectLinks.getByRole('link', { name: 'BaselineLab' })).toHaveAttribute(
      'href',
      'https://baselinelab.dev/',
    );

    const socialLinks = within(screen.getByRole('navigation', { name: 'Redes sociales' }));
    expect(
      socialLinks.getByRole('link', { name: 'LinkedIn de Sergio Jiménez Rubio' }),
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/sergio-jim%C3%A9nez-rubio/');
    expect(socialLinks.getByRole('link', { name: 'X de Sergio Jiménez Rubio' })).toHaveAttribute(
      'href',
      'https://x.com/sergiojr_dev',
    );
    expect(screen.getByRole('link', { name: 'Apoyar el proyecto' })).toHaveAttribute(
      'href',
      'https://buymeacoffee.com/sjr.dev',
    );

    expect(screen.getAllByRole('link')).toSatisfy((links: HTMLElement[]) =>
      links.every(
        (link) =>
          link.getAttribute('target') === '_blank' &&
          link.getAttribute('rel') === 'noopener noreferrer',
      ),
    );
  });
});
