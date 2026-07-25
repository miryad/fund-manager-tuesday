import { describe, expect, it } from 'vitest';
import { gameConfig, getDefaultResourceValues } from '../src/game/config';
import {
  applyResourceChanges,
  createResourceSnapshot,
  diffResources,
  getFailedResources,
  hasLiquidationFailure,
} from '../src/game/resources';

describe('resource system', () => {
  it('applies positive and negative changes without mutating the input', () => {
    const original = { ...getDefaultResourceValues(), capital: 50 };
    const update = applyResourceChanges(
      original,
      [
        { resource: 'capital', amount: 20, reason: 'gain' },
        { resource: 'lpTrust', amount: -10, reason: 'loss' },
      ],
      gameConfig,
    );

    expect(original).toEqual({ ...getDefaultResourceValues(), capital: 50 });
    expect(update.values.capital).toBe(70);
    expect(update.values.lpTrust).toBe(90);
  });

  it('clamps values and reports the actual applied change', () => {
    const update = applyResourceChanges(
      getDefaultResourceValues(),
      [{ resource: 'capital', amount: 25, reason: 'above maximum' }],
      gameConfig,
    );

    expect(update.values.capital).toBe(100);
    expect(update.changes).toEqual([]);
  });

  it('creates diffs, snapshots, and detects failure thresholds', () => {
    const before = getDefaultResourceValues();
    const after = { ...before, liquidity: 0, reputation: 75 };

    expect(diffResources(before, after)).toEqual([
      { resource: 'reputation', amount: -25, reason: 'Resource state changed.' },
      { resource: 'liquidity', amount: -100, reason: 'Resource state changed.' },
    ]);
    expect(createResourceSnapshot(2, after)).toEqual({ turn: 2, values: after });
    expect(getFailedResources(after, gameConfig)).toEqual(['liquidity']);
    expect(hasLiquidationFailure(after, gameConfig)).toBe(true);
  });
});
