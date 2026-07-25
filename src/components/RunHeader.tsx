import { memo } from 'react';
import type { Run } from '../game/types';

interface RunHeaderProps {
  readonly run: Run;
}

export const RunHeader = memo(function RunHeader({ run }: RunHeaderProps) {
  return (
    <div className="run-header" aria-label="Run information">
      <div>
        <span className="data-label">Desk</span>
        <strong>{run.city}</strong>
      </div>
      <div>
        <span className="data-label">Turn</span>
        <strong>{String(run.turn).padStart(2, '0')}</strong>
      </div>
      <div>
        <span className="data-label">Fund size</span>
        <strong>${(run.fundSize / 1_000_000).toFixed(0)}M</strong>
      </div>
      <div>
        <span className="data-label">Seed</span>
        <strong className="run-header__seed">{run.seed}</strong>
      </div>
    </div>
  );
});
