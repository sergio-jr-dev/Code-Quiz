import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

import { describe, expect, it } from 'vitest';

const bootstrap = readFileSync('public/theme-bootstrap.js', 'utf8');
const html = readFileSync('index.html', 'utf8');

const runBootstrap = (serialized) => {
  delete document.documentElement.dataset.theme;
  runInNewContext(bootstrap, {
    document,
    localStorage: { getItem: () => serialized },
  });
  return document.documentElement.dataset.theme;
};

describe('theme bootstrap', () => {
  it('loads before the app module so a persisted theme can apply before first paint', () => {
    expect(html.indexOf('theme-bootstrap.js')).toBeLessThan(html.indexOf('/src/main.tsx'));
    expect(html).toContain('<meta name="color-scheme" content="light dark" />');
  });

  it('applies a valid explicit theme and leaves automatic unset', () => {
    expect(runBootstrap('{"state":{"theme":"light","soundEnabled":false},"version":1}')).toBe(
      'light',
    );
    expect(runBootstrap('{"state":{"theme":"dark","soundEnabled":true},"version":1}')).toBe('dark');
    expect(
      runBootstrap('{"state":{"theme":"auto","soundEnabled":false},"version":1}'),
    ).toBeUndefined();
  });

  it('ignores invalid data and blocked storage', () => {
    expect(
      runBootstrap('{"state":{"theme":"light","soundEnabled":"yes"},"version":1}'),
    ).toBeUndefined();
    expect(
      runBootstrap('{"state":{"theme":"light","soundEnabled":false},"version":2}'),
    ).toBeUndefined();
    runInNewContext(bootstrap, {
      document,
      localStorage: {
        getItem: () => {
          throw new Error('blocked');
        },
      },
    });
    expect(document.documentElement).not.toHaveAttribute('data-theme');
  });
});
