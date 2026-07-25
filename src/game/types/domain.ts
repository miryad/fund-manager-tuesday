export const RESOURCE_IDS = [
  'capital',
  'lpTrust',
  'reputation',
  'liquidity',
  'riskBuffer',
] as const;

export type Resource = (typeof RESOURCE_IDS)[number];

export type ResourceValues = Readonly<Record<Resource, number>>;

export interface ResourceChange {
  readonly resource: Resource;
  readonly amount: number;
  readonly reason: string;
}

export interface ResourceSnapshot {
  readonly turn: number;
  readonly values: ResourceValues;
}

export const COMPETENCIES = [
  'ethicsAndProfessionalStandards',
  'quantitativeMethods',
  'economics',
  'financialStatementAnalysis',
  'corporateIssuers',
  'equityInvestments',
  'fixedIncome',
  'derivatives',
  'alternativeInvestments',
  'portfolioManagement',
] as const;

export type Competency = (typeof COMPETENCIES)[number];

export type Difficulty = 'easy' | 'medium' | 'hard';

export const RANKS = [
  'Junior Associate',
  'Associate',
  'Senior Associate',
  'Principal',
  'Partner',
  'Managing Partner',
] as const;

export type Rank = (typeof RANKS)[number];

export const CITIES = [
  'New York',
  'London',
  'Paris',
  'Singapore',
  'Hong Kong',
  'Tokyo',
  'Zurich',
  'Frankfurt',
  'Amsterdam',
  'Boston',
  'Chicago',
  'Toronto',
  'Sydney',
  'Dubai',
  'Geneva',
] as const;

export type City = (typeof CITIES)[number];

export interface Answer {
  readonly id: string;
  readonly text: string;
  readonly resourceChanges: readonly ResourceChange[];
}

export interface QuestionMetadata {
  readonly competency: Competency;
  readonly topic: string;
  readonly difficulty: Difficulty;
  readonly tags: readonly string[];
  readonly selectionWeight: number;
  readonly packId: string;
  readonly author?: string;
  readonly contributorUrl?: string;
}

export interface Question {
  readonly id: string;
  readonly scenario: string;
  readonly answers: readonly [Answer, Answer, Answer, Answer];
  readonly correctAnswerId: string;
  readonly explanation: string;
  readonly metadata: QuestionMetadata;
  readonly schemaVersion: number;
}

export interface QuestionPack {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly schemaVersion: number;
  readonly description?: string;
  readonly author?: string;
  readonly questions: readonly Question[];
}

export type QuestionOutcome = 'correct' | 'incorrect' | 'timedOut';

export interface QuestionResult {
  readonly questionId: string;
  readonly competency: Competency;
  readonly selectedAnswerId: string | null;
  readonly correctAnswerId: string;
  readonly outcome: QuestionOutcome;
  readonly resourceChanges: readonly ResourceChange[];
  readonly elapsedMilliseconds: number;
  readonly resourcesBefore: ResourceValues;
  readonly resourcesAfter: ResourceValues;
}

export interface TimerState {
  readonly durationMilliseconds: number;
  readonly remainingMilliseconds: number;
  readonly elapsedMilliseconds: number;
  readonly status: 'running' | 'expired';
}

export interface SelectionResult {
  readonly questionId: string;
  readonly sourcePackId: string;
  readonly selectionIndex: number;
}

export interface Run {
  readonly id: string;
  readonly seed: string;
  readonly gameVersion: string;
  readonly contentVersion: string;
  readonly city: City;
  readonly turn: number;
  readonly fundSize: number;
  readonly resources: ResourceValues;
  readonly resourceHistory: readonly ResourceSnapshot[];
  readonly results: readonly QuestionResult[];
  readonly questionOrder: readonly SelectionResult[];
}

export type GamePhase = 'splash' | 'decision' | 'resolution' | 'liquidation';

export type RunEndReason = 'resourceFailure' | 'questionsExhausted';

export interface GameState {
  readonly phase: GamePhase;
  readonly run: Run | null;
  readonly currentQuestion: Question | null;
  readonly timer: TimerState | null;
  readonly lastResult: QuestionResult | null;
  readonly endReason: RunEndReason | null;
}

export interface CompetencySummary {
  readonly competency: Competency;
  readonly attempted: number;
  readonly correct: number;
  readonly incorrect: number;
  readonly timeouts: number;
  readonly percentage: number | null;
}

export interface RunSummary {
  readonly runId: string;
  readonly seed: string;
  readonly city: City;
  readonly questionsAnswered: number;
  readonly correctAnswers: number;
  readonly incorrectAnswers: number;
  readonly accuracyPercentage: number;
  readonly timeoutCount: number;
  readonly finalResources: ResourceValues;
  readonly resourceHistory: readonly ResourceSnapshot[];
  readonly competencies: readonly CompetencySummary[];
  readonly rank: Rank;
  readonly score: number;
  readonly runDurationMilliseconds: number;
  readonly endReason: RunEndReason;
}
