import { describe, expect, it } from 'vitest';
import { createTimer, elapseTimer } from '../src/game/engine';

describe('timer model', () => {
  it('tracks elapsed time and expires deterministically', () => {
    const started = createTimer(15_000);
    const halfway = elapseTimer(started, 7_500);
    const expired = elapseTimer(halfway, 7_500);

    expect(started.remainingMilliseconds).toBe(15_000);
    expect(halfway).toMatchObject({
      elapsedMilliseconds: 7_500,
      remainingMilliseconds: 7_500,
      status: 'running',
    });
    expect(expired).toMatchObject({
      elapsedMilliseconds: 15_000,
      remainingMilliseconds: 0,
      status: 'expired',
    });
  });

  it('rejects invalid elapsed durations and updates after expiry', () => {
    expect(() => elapseTimer(createTimer(15_000), -1)).toThrow();
    expect(() => elapseTimer(elapseTimer(createTimer(1), 1), 1)).toThrow();
  });
});
