import { describe, expect, it } from 'vitest';
import { calculateRank } from '../src/game/scoring';

describe('rank calculation', () => {
  it('uses supplied thresholds rather than engine constants', () => {
    const thresholds = [
      { rank: 'Junior Associate' as const, minimumScore: 0 },
      { rank: 'Partner' as const, minimumScore: 42 },
    ];

    expect(calculateRank(41, thresholds)).toBe('Junior Associate');
    expect(calculateRank(42, thresholds)).toBe('Partner');
  });
});
