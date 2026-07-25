export interface DeterministicRandom {
  readonly next: () => number;
}

function hashSeed(seed: string): number {
  let hash = 2_166_136_261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16_777_619);
  }

  return hash >>> 0;
}

export function createSeededRandom(seed: string): DeterministicRandom {
  let state = hashSeed(seed);

  return {
    next: () => {
      state += 0x6d2b79f5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
    },
  };
}

export function randomInteger(random: DeterministicRandom, maximumExclusive: number): number {
  if (!Number.isInteger(maximumExclusive) || maximumExclusive <= 0) {
    throw new RangeError('maximumExclusive must be a positive integer.');
  }

  return Math.floor(random.next() * maximumExclusive);
}
