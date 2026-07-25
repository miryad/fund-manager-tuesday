import { describe, expect, it } from 'vitest';
import type { GameConfig } from '../src/game/config';
import { gameConfig } from '../src/game/config';
import { createGameEngine, EngineError } from '../src/game/engine';
import { fakePack, fakeQuestion } from './fixtures/questionPacks';

const pack = fakePack([
  fakeQuestion('ethics-easy', 'easy', 'ethicsAndProfessionalStandards', [
    { resource: 'reputation', amount: -5, reason: 'Test consequence.' },
  ]),
  fakeQuestion('equity-medium', 'medium', 'equityInvestments'),
  fakeQuestion('fixed-hard', 'hard', 'fixedIncome'),
]);

describe('run engine', () => {
  it('creates identical runs and question orders for the same seed', () => {
    const engine = createGameEngine({ questionPacks: [pack], gameVersion: 'test' });
    const first = engine.createRun('same-seed');
    const second = engine.createRun('same-seed');

    expect(first.run?.city).toBe(second.run?.city);
    expect(first.run?.questionOrder).toEqual(second.run?.questionOrder);
    expect(first.currentQuestion?.id).toBe(second.currentQuestion?.id);
  });

  it('resolves correct, incorrect, and timeout turns and produces a summary', () => {
    const engine = createGameEngine({ questionPacks: [pack], gameVersion: 'test' });
    let state = engine.createRun('full-run');

    state = engine.updateTimer(state, 2_000);
    state = engine.submitAnswer(state, state.currentQuestion!.correctAnswerId);
    expect(state.phase).toBe('resolution');
    expect(state.lastResult?.outcome).toBe('correct');
    state = engine.advance(state);

    state = engine.updateTimer(state, 3_000);
    state = engine.submitAnswer(state, state.currentQuestion!.answers[1].id);
    expect(state.lastResult?.outcome).toBe('incorrect');
    state = engine.advance(state);

    state = engine.resolveTimeout(state);
    expect(state.lastResult).toMatchObject({
      outcome: 'timedOut',
      selectedAnswerId: null,
      elapsedMilliseconds: 15_000,
    });
    expect(state.lastResult?.resourceChanges).toEqual([
      expect.objectContaining({ resource: 'lpTrust', amount: -8 }),
      expect.objectContaining({ resource: 'reputation', amount: -4 }),
    ]);

    state = engine.advance(state);
    expect(engine.isFinished(state)).toBe(true);
    expect(state.endReason).toBe('questionsExhausted');

    const summary = engine.getSummary(state);
    expect(summary).toMatchObject({
      seed: 'full-run',
      questionsAnswered: 3,
      correctAnswers: 1,
      incorrectAnswers: 1,
      timeoutCount: 1,
      runDurationMilliseconds: 20_000,
    });
    expect(summary.accuracyPercentage).toBeCloseTo(100 / 3);
    expect(summary.resourceHistory).toHaveLength(4);
    expect(summary.competencies).toHaveLength(3);
    expect(summary.competencies.flatMap((item) => item.timeouts)).toContain(1);
  });

  it('exposes resolution before detecting liquidation on advance', () => {
    const liquidationConfig: GameConfig = {
      ...gameConfig,
      resources: {
        ...gameConfig.resources,
        lpTrust: { ...gameConfig.resources.lpTrust, failureThreshold: 92 },
      },
    };
    const engine = createGameEngine({ questionPacks: [pack], config: liquidationConfig });
    let state = engine.createRun('liquidate');

    state = engine.resolveTimeout(state);
    expect(state.phase).toBe('resolution');
    expect(state.run?.resources.lpTrust).toBe(92);

    state = engine.advance(state);
    expect(state.phase).toBe('liquidation');
    expect(state.endReason).toBe('resourceFailure');
  });

  it('rejects invalid transitions and answer IDs', () => {
    const engine = createGameEngine({ questionPacks: [pack] });
    const state = engine.createRun('invalid-actions');

    expect(() => engine.submitAnswer(state, 'not-an-answer')).toThrow(EngineError);
    expect(() => engine.advance(state)).toThrow(EngineError);
    expect(() => engine.getSummary(state)).toThrow(EngineError);
  });

  it('returns no competency report for an unassessed competency', () => {
    const oneQuestionEngine = createGameEngine({
      questionPacks: [fakePack([fakeQuestion('only', 'easy', 'economics')])],
    });
    let state = oneQuestionEngine.createRun('competency');
    state = oneQuestionEngine.submitAnswer(state, state.currentQuestion!.correctAnswerId);

    expect(oneQuestionEngine.getCurrentQuestion(state)?.explanation).toBeTruthy();
    expect(oneQuestionEngine.getCompetencySummary(state, 'economics')).toMatchObject({
      attempted: 1,
      correct: 1,
      incorrect: 0,
      timeouts: 0,
      percentage: 100,
    });
    expect(oneQuestionEngine.getCompetencySummary(state, 'derivatives')).toBeNull();
  });
});
