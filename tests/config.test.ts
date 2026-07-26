import { describe, expect, it } from 'vitest';
import { gameConfig, getDefaultResourceValues } from '../src/game/config';
import { CITIES, RESOURCE_IDS } from '../src/game/types';

describe('central game configuration', () => {
  it('loads settled timer, timeout, and city decisions', () => {
    expect(gameConfig.timerDurationMilliseconds).toBe(20_000);
    expect(gameConfig.timeoutChanges).toEqual({ lpTrust: -8, reputation: -4 });
    expect(gameConfig.cities).toEqual(CITIES);
    expect(gameConfig.cities).toHaveLength(15);
  });

  it('uses release-calibrated deterministic prestige thresholds', () => {
    expect(gameConfig.rankThresholds).toEqual([
      { rank: 'Junior Associate', minimumScore: 0 },
      { rank: 'Associate', minimumScore: 1_500 },
      { rank: 'Senior Associate', minimumScore: 3_000 },
      { rank: 'Principal', minimumScore: 4_500 },
      { rank: 'Partner', minimumScore: 6_000 },
      { rank: 'Managing Partner', minimumScore: 7_500 },
    ]);
  });

  it('defines a complete valid rule for every persistent resource', () => {
    expect(Object.keys(gameConfig.resources).sort()).toEqual([...RESOURCE_IDS].sort());

    for (const resource of RESOURCE_IDS) {
      const rule = gameConfig.resources[resource];
      expect(rule.minimum).toBeLessThanOrEqual(rule.defaultValue);
      expect(rule.defaultValue).toBeLessThanOrEqual(rule.maximum);
      expect(rule.failureThreshold).toBeGreaterThanOrEqual(rule.minimum);
      expect(rule.failureThreshold).toBeLessThanOrEqual(rule.maximum);
    }

    expect(getDefaultResourceValues()).toEqual({
      capital: 100,
      lpTrust: 100,
      reputation: 100,
      liquidity: 100,
      riskBuffer: 100,
    });
  });
});
