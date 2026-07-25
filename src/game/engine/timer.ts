import type { TimerState } from '../types';
import { EngineError } from './errors';

export function createTimer(durationMilliseconds: number): TimerState {
  if (!Number.isFinite(durationMilliseconds) || durationMilliseconds <= 0) {
    throw new RangeError('Timer duration must be a positive finite number.');
  }

  return {
    durationMilliseconds,
    remainingMilliseconds: durationMilliseconds,
    elapsedMilliseconds: 0,
    status: 'running',
  };
}

export function elapseTimer(timer: TimerState, milliseconds: number): TimerState {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    throw new RangeError('Elapsed timer duration must be a non-negative finite number.');
  }
  if (timer.status === 'expired') {
    throw new EngineError('Cannot advance an expired timer.');
  }

  const elapsedMilliseconds = Math.min(
    timer.durationMilliseconds,
    timer.elapsedMilliseconds + milliseconds,
  );
  const remainingMilliseconds = timer.durationMilliseconds - elapsedMilliseconds;

  return {
    ...timer,
    elapsedMilliseconds,
    remainingMilliseconds,
    status: remainingMilliseconds === 0 ? 'expired' : 'running',
  };
}
