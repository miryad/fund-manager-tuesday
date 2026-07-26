import { CITIES, RANKS, RESOURCE_IDS } from '../types';
import type { Difficulty, Rank, Resource, ResourceValues } from '../types';

export interface ResourceRule {
  readonly label: string;
  readonly defaultValue: number;
  readonly minimum: number;
  readonly maximum: number;
  readonly failureThreshold: number;
}

export interface DifficultyStage {
  readonly fromTurn: number;
  readonly weights: Readonly<Record<Difficulty, number>>;
}

export interface RankThreshold {
  readonly rank: Rank;
  readonly minimumScore: number;
}

export interface ScoringConfig {
  readonly correctAnswerPoints: number;
  readonly incorrectAnswerPoints: number;
  readonly timeoutPoints: number;
}

export interface GameConfig {
  readonly timerDurationMilliseconds: number;
  readonly resources: Readonly<Record<Resource, ResourceRule>>;
  readonly timeoutChanges: Readonly<Partial<ResourceValues>>;
  readonly cities: typeof CITIES;
  readonly difficultyStages: readonly DifficultyStage[];
  readonly rankThresholds: readonly RankThreshold[];
  readonly scoring: ScoringConfig;
  readonly defaultQuestionWeight: number;
  readonly defaultFundSize: number;
}

export const gameConfig: GameConfig = {
  timerDurationMilliseconds: 20_000,
  resources: {
    capital: {
      label: 'Capital',
      defaultValue: 100,
      minimum: 0,
      maximum: 100,
      failureThreshold: 0,
    },
    lpTrust: {
      label: 'LP Trust',
      defaultValue: 100,
      minimum: 0,
      maximum: 100,
      failureThreshold: 0,
    },
    reputation: {
      label: 'Reputation',
      defaultValue: 100,
      minimum: 0,
      maximum: 100,
      failureThreshold: 0,
    },
    liquidity: {
      label: 'Liquidity',
      defaultValue: 100,
      minimum: 0,
      maximum: 100,
      failureThreshold: 0,
    },
    riskBuffer: {
      label: 'Risk Buffer',
      defaultValue: 100,
      minimum: 0,
      maximum: 100,
      failureThreshold: 0,
    },
  },
  timeoutChanges: {
    lpTrust: -8,
    reputation: -4,
  },
  cities: CITIES,
  difficultyStages: [
    { fromTurn: 1, weights: { easy: 8, medium: 2, hard: 0 } },
    { fromTurn: 11, weights: { easy: 4, medium: 5, hard: 1 } },
    { fromTurn: 26, weights: { easy: 2, medium: 5, hard: 3 } },
  ],
  rankThresholds: [
    { rank: RANKS[0], minimumScore: 0 },
    { rank: RANKS[1], minimumScore: 1_500 },
    { rank: RANKS[2], minimumScore: 3_000 },
    { rank: RANKS[3], minimumScore: 4_500 },
    { rank: RANKS[4], minimumScore: 6_000 },
    { rank: RANKS[5], minimumScore: 7_500 },
  ],
  scoring: {
    correctAnswerPoints: 100,
    incorrectAnswerPoints: 0,
    timeoutPoints: 0,
  },
  defaultQuestionWeight: 1,
  defaultFundSize: 100_000_000,
};

export function getDefaultResourceValues(config: GameConfig = gameConfig): ResourceValues {
  return Object.fromEntries(
    RESOURCE_IDS.map((resource) => [resource, config.resources[resource].defaultValue]),
  ) as unknown as ResourceValues;
}
