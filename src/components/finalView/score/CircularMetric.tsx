import type { ReactNode } from 'react';

type MetricTone = 'correct' | 'incorrect' | 'progress';

export function CircularMetric({
  label,
  displayValue,
  value,
  max,
  children,
  tone,
}: {
  label: string;
  displayValue: string;
  value: number;
  max: number;
  tone: MetricTone;
  children: ReactNode;
}) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div className="circular-metric" data-tone={tone}>
      <div className="metric-visual" aria-hidden="true">
        <svg className="metric-ring" viewBox="0 0 100 100" focusable="false">
          <circle className="metric-track" cx="50" cy="50" r="44" />
          <circle
            className="metric-value"
            cx="50"
            cy="50"
            r="44"
            pathLength="100"
            style={{ strokeDashoffset: 100 - percentage }}
          />
        </svg>
        {children}
      </div>
      <strong>{displayValue}</strong>
      <span>{label}</span>
    </div>
  );
}
