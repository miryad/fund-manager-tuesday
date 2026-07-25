import { gameConfig, getDefaultResourceValues } from '../config';
import type { GameConfig } from '../config';
import { createQuestionOrder } from '../questions';
import { createSeededRandom, randomInteger } from '../random';
import { applyResourceChanges, createResourceSnapshot, hasLiquidationFailure } from '../resources';
import { calculateRank, calculateScore } from '../scoring';
import { COMPETENCIES } from '../types';
import type {
  Competency,
  CompetencySummary,
  GameState,
  Question,
  QuestionOutcome,
  QuestionPack,
  QuestionResult,
  ResourceChange,
  Run,
  RunSummary,
} from '../types';
import { EngineError } from './errors';
import { createTimer, elapseTimer } from './timer';

export interface CreateRunOptions {
  readonly seed: string;
  readonly questionPacks: readonly QuestionPack[];
  readonly gameVersion?: string;
  readonly config?: GameConfig;
}

export interface GameEngine {
  readonly createRun: (seed: string) => GameState;
  readonly getCurrentQuestion: typeof getCurrentQuestion;
  readonly updateTimer: typeof updateTimer;
  readonly submitAnswer: (state: GameState, answerId: string) => GameState;
  readonly resolveTimeout: (state: GameState) => GameState;
  readonly advance: (state: GameState) => GameState;
  readonly isFinished: typeof isFinished;
  readonly getCompetencySummary: typeof getCompetencySummary;
  readonly getSummary: (state: GameState) => RunSummary;
}

function requireDecisionState(state: GameState): asserts state is GameState & {
  run: Run;
  currentQuestion: Question;
  timer: NonNullable<GameState['timer']>;
} {
  if (state.phase !== 'decision' || !state.run || !state.currentQuestion || !state.timer) {
    throw new EngineError('This operation requires an active decision.');
  }
}

function requireResolutionState(state: GameState): asserts state is GameState & {
  run: Run;
  lastResult: QuestionResult;
} {
  if (state.phase !== 'resolution' || !state.run || !state.lastResult) {
    throw new EngineError('This operation requires a resolved decision.');
  }
}

function timeoutChanges(config: GameConfig): readonly ResourceChange[] {
  return Object.entries(config.timeoutChanges).flatMap(([resource, amount]) =>
    amount === undefined
      ? []
      : [
          {
            resource: resource as ResourceChange['resource'],
            amount,
            reason: 'No decision made. In investing, not making a decision is often a decision.',
          },
        ],
  );
}

function resolve(
  state: GameState,
  selectedAnswerId: string | null,
  outcome: QuestionOutcome,
  requestedChanges: readonly ResourceChange[],
  elapsedMilliseconds: number,
  config: GameConfig,
): GameState {
  requireDecisionState(state);
  const update = applyResourceChanges(state.run.resources, requestedChanges, config);
  const result: QuestionResult = {
    questionId: state.currentQuestion.id,
    competency: state.currentQuestion.metadata.competency,
    selectedAnswerId,
    correctAnswerId: state.currentQuestion.correctAnswerId,
    outcome,
    resourceChanges: update.changes,
    elapsedMilliseconds,
    resourcesBefore: { ...state.run.resources },
    resourcesAfter: { ...update.values },
  };
  const turn = state.run.turn;
  const nextRun: Run = {
    ...state.run,
    resources: update.values,
    results: [...state.run.results, result],
    resourceHistory: [...state.run.resourceHistory, createResourceSnapshot(turn, update.values)],
  };

  return {
    phase: 'resolution',
    run: nextRun,
    currentQuestion: state.currentQuestion,
    timer: null,
    lastResult: result,
    endReason: null,
  };
}

export function createRun(options: CreateRunOptions): GameState {
  const seed = options.seed.trim();
  if (!seed) {
    throw new EngineError('A non-empty seed is required.');
  }

  const config = options.config ?? gameConfig;
  const order = createQuestionOrder(seed, options.questionPacks, config);
  const random = createSeededRandom(`${seed}:run`);
  const city = config.cities[randomInteger(random, config.cities.length)]!;
  const resources = getDefaultResourceValues(config);
  const firstSelection = order.selections[0]!;
  const firstQuestion = order.questionsById[firstSelection.questionId];
  if (!firstQuestion) {
    throw new EngineError('The first selected question was not found.');
  }

  const run: Run = {
    id: `run-${seed}`,
    seed,
    gameVersion: options.gameVersion ?? '0.0.0',
    contentVersion: order.contentVersion,
    city,
    turn: 1,
    fundSize: config.defaultFundSize,
    resources,
    resourceHistory: [createResourceSnapshot(0, resources)],
    results: [],
    questionOrder: order.selections,
  };

  return {
    phase: 'decision',
    run,
    currentQuestion: firstQuestion,
    timer: createTimer(config.timerDurationMilliseconds),
    lastResult: null,
    endReason: null,
  };
}

export function getCurrentQuestion(state: GameState): Question | null {
  return state.currentQuestion;
}

export function updateTimer(state: GameState, elapsedMilliseconds: number): GameState {
  requireDecisionState(state);
  return { ...state, timer: elapseTimer(state.timer, elapsedMilliseconds) };
}

export function submitAnswer(
  state: GameState,
  answerId: string,
  config: GameConfig = gameConfig,
): GameState {
  requireDecisionState(state);
  if (state.timer.status === 'expired') {
    throw new EngineError('The timer has expired; resolve the turn as a timeout.');
  }

  const answer = state.currentQuestion.answers.find((candidate) => candidate.id === answerId);
  if (!answer) {
    throw new EngineError(`Answer "${answerId}" does not belong to the active question.`);
  }

  const outcome: QuestionOutcome =
    answer.id === state.currentQuestion.correctAnswerId ? 'correct' : 'incorrect';
  return resolve(
    state,
    answer.id,
    outcome,
    answer.resourceChanges,
    state.timer.elapsedMilliseconds,
    config,
  );
}

export function resolveTimeout(state: GameState, config: GameConfig = gameConfig): GameState {
  requireDecisionState(state);

  return resolve(
    state,
    null,
    'timedOut',
    timeoutChanges(config),
    state.timer.durationMilliseconds,
    config,
  );
}

export function createGameEngine(options: Omit<CreateRunOptions, 'seed'>): GameEngine {
  const config = options.config ?? gameConfig;
  const questionPacks = options.questionPacks;

  return {
    createRun: (seed) => createRun({ ...options, seed }),
    getCurrentQuestion,
    updateTimer,
    submitAnswer: (state, answerId) => submitAnswer(state, answerId, config),
    resolveTimeout: (state) => resolveTimeout(state, config),
    advance: (state) => advance(state, questionPacks, config),
    isFinished,
    getCompetencySummary,
    getSummary: (state) => getSummary(state, config),
  };
}

export function advance(
  state: GameState,
  questionPacks: readonly QuestionPack[],
  config: GameConfig = gameConfig,
): GameState {
  requireResolutionState(state);

  if (hasLiquidationFailure(state.run.resources, config)) {
    return {
      ...state,
      phase: 'liquidation',
      currentQuestion: null,
      endReason: 'resourceFailure',
    };
  }

  const nextSelection = state.run.questionOrder[state.run.turn];
  if (!nextSelection) {
    return {
      ...state,
      phase: 'liquidation',
      currentQuestion: null,
      endReason: 'questionsExhausted',
    };
  }

  const question = questionPacks
    .flatMap((pack) => pack.questions)
    .find((candidate) => candidate.id === nextSelection.questionId);
  if (!question) {
    throw new EngineError(`Selected question "${nextSelection.questionId}" is unavailable.`);
  }

  return {
    phase: 'decision',
    run: { ...state.run, turn: state.run.turn + 1 },
    currentQuestion: question,
    timer: createTimer(config.timerDurationMilliseconds),
    lastResult: null,
    endReason: null,
  };
}

export function isFinished(state: GameState): boolean {
  return state.phase === 'liquidation';
}

function summarizeCompetencies(results: readonly QuestionResult[]): readonly CompetencySummary[] {
  return COMPETENCIES.flatMap((competency): readonly CompetencySummary[] => {
    const relevant = results.filter((result) => result.competency === competency);
    if (relevant.length === 0) {
      return [];
    }

    const correct = relevant.filter((result) => result.outcome === 'correct').length;
    const incorrect = relevant.filter((result) => result.outcome === 'incorrect').length;
    const timeouts = relevant.filter((result) => result.outcome === 'timedOut').length;
    return [
      {
        competency,
        attempted: relevant.length,
        correct,
        incorrect,
        timeouts,
        percentage: (correct / relevant.length) * 100,
      },
    ];
  });
}

export function getCompetencySummary(
  state: GameState,
  competency: Competency,
): CompetencySummary | null {
  if (!state.run) {
    return null;
  }
  return (
    summarizeCompetencies(state.run.results).find((summary) => summary.competency === competency) ??
    null
  );
}

export function getSummary(state: GameState, config: GameConfig = gameConfig): RunSummary {
  if (state.phase !== 'liquidation' || !state.run || !state.endReason) {
    throw new EngineError('A run summary is only available after the run has finished.');
  }

  const results = state.run.results;
  const correctAnswers = results.filter((result) => result.outcome === 'correct').length;
  const incorrectAnswers = results.filter((result) => result.outcome === 'incorrect').length;
  const timeoutCount = results.filter((result) => result.outcome === 'timedOut').length;
  const score = calculateScore(results, config);

  return {
    runId: state.run.id,
    seed: state.run.seed,
    city: state.run.city,
    questionsAnswered: results.length,
    correctAnswers,
    incorrectAnswers,
    accuracyPercentage: results.length === 0 ? 0 : (correctAnswers / results.length) * 100,
    timeoutCount,
    finalResources: { ...state.run.resources },
    resourceHistory: state.run.resourceHistory.map((snapshot) => ({
      turn: snapshot.turn,
      values: { ...snapshot.values },
    })),
    competencies: summarizeCompetencies(results),
    rank: calculateRank(score, config.rankThresholds),
    score,
    runDurationMilliseconds: results.reduce(
      (duration, result) => duration + result.elapsedMilliseconds,
      0,
    ),
    endReason: state.endReason,
  };
}
