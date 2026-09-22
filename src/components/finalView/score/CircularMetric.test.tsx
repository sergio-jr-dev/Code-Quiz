import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CircularMetric } from './CircularMetric';

describe('CircularMetric', () => {
  it('keeps the numeric result as text and renders a proportional decorative ring', () => {
    const { container } = render(
      <CircularMetric label="Aciertos" displayValue="7" value={7} max={10} tone="correct">
        <img src="/correct.png" alt="" />
      </CircularMetric>,
    );

    expect(screen.getByText('7')).toBeVisible();
    expect(screen.getByText('Aciertos')).toBeVisible();
    expect(container.querySelector('.metric-value')).toHaveStyle({ strokeDashoffset: 30 });
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
});
