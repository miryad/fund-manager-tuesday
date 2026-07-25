import { RESOURCE_IDS } from '../types';
import type { GameConfig } from '../config';
import type { Resource, ResourceChange, ResourceSnapshot, ResourceValues } from '../types';

export interface ResourceUpdate {
  readonly values: ResourceValues;
  readonly changes: readonly ResourceChange[];
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function applyResourceChanges(
  current: ResourceValues,
  requestedChanges: readonly ResourceChange[],
  config: GameConfig,
): ResourceUpdate {
  const next: Record<Resource, number> = { ...current };
  const appliedChanges: ResourceChange[] = [];

  for (const requested of requestedChanges) {
    if (!Number.isFinite(requested.amount)) {
      throw new TypeError(`Resource change for ${requested.resource} must be finite.`);
    }

    const rule = config.resources[requested.resource];
    const before = next[requested.resource];
    const after = clamp(before + requested.amount, rule.minimum, rule.maximum);
    const appliedAmount = after - before;
    next[requested.resource] = after;

    if (appliedAmount !== 0) {
      appliedChanges.push({ ...requested, amount: appliedAmount });
    }
  }

  return { values: next, changes: appliedChanges };
}

export function diffResources(
  before: ResourceValues,
  after: ResourceValues,
  reason = 'Resource state changed.',
): readonly ResourceChange[] {
  return RESOURCE_IDS.flatMap((resource) => {
    const amount = after[resource] - before[resource];
    return amount === 0 ? [] : [{ resource, amount, reason }];
  });
}

export function createResourceSnapshot(turn: number, values: ResourceValues): ResourceSnapshot {
  return { turn, values: { ...values } };
}

export function getFailedResources(
  values: ResourceValues,
  config: GameConfig,
): readonly Resource[] {
  return RESOURCE_IDS.filter(
    (resource) => values[resource] <= config.resources[resource].failureThreshold,
  );
}

export function hasLiquidationFailure(values: ResourceValues, config: GameConfig): boolean {
  return getFailedResources(values, config).length > 0;
}
