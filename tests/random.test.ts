import { describe, expect, it } from 'vitest';
import { createSeededRandom } from '../src/game/random';

function sequence(seed: string): number[] {
  const random = createSeededRandom(seed);
  return Array.from({ length: 8 }, () => random.next());
}

describe('deterministic random helper', () => {
  it('returns the same sequence for the same seed', () => {
    expect(sequence('same-tuesday')).toEqual(sequence('same-tuesday'));
  });

  it('returns a different sequence for a different seed', () => {
    expect(sequence('tuesday-one')).not.toEqual(sequence('tuesday-two'));
  });

  it('keeps generated values in the half-open unit interval', () => {
    for (const value of sequence('bounded')) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
