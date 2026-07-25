import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProductionQuestionPack } from '../../data/questions';
import { createGameEngine } from '../game/engine';
import type { GameState, RunSummary } from '../game/types';

const TIMER_REFRESH_MILLISECONDS = 250;

function createSeed(): string {
  const values = new Uint32Array(2);
  globalThis.crypto.getRandomValues(values);
  return `TUE-${Array.from(values, (value) => value.toString(36).toUpperCase())
    .join('')
    .slice(0, 10)}`;
}

export interface GameController {
  readonly state: GameState | null;
  readonly summary: RunSummary | null;
  readonly startRun: () => void;
  readonly submitAnswer: (answerId: string) => void;
  readonly continueRun: () => void;
}

export function useGameController(): GameController {
  const engine = useMemo(
    () =>
      createGameEngine({
        questionPacks: [ProductionQuestionPack],
        gameVersion: '0.1.0',
      }),
    [],
  );
  const [state, setState] = useState<GameState | null>(null);
  const lastTick = useRef(0);

  const startRun = useCallback(() => {
    setState(engine.createRun(createSeed()));
  }, [engine]);

  const submitAnswer = useCallback(
    (answerId: string) => {
      setState((current) => {
        if (!current || current.phase !== 'decision') {
          return current;
        }
        return engine.submitAnswer(current, answerId);
      });
    },
    [engine],
  );

  const continueRun = useCallback(() => {
    setState((current) => {
      if (!current || current.phase !== 'resolution') {
        return current;
      }
      return engine.advance(current);
    });
  }, [engine]);

  useEffect(() => {
    if (state?.phase !== 'decision') {
      return;
    }

    lastTick.current = performance.now();
    const interval = window.setInterval(() => {
      const now = performance.now();
      const elapsed = now - lastTick.current;
      lastTick.current = now;

      setState((current) => {
        if (!current || current.phase !== 'decision' || !current.timer) {
          return current;
        }

        const timed = engine.updateTimer(
          current,
          Math.min(elapsed, current.timer.remainingMilliseconds),
        );
        return timed.timer?.status === 'expired' ? engine.resolveTimeout(timed) : timed;
      });
    }, TIMER_REFRESH_MILLISECONDS);

    return () => window.clearInterval(interval);
  }, [engine, state?.phase, state?.run?.turn]);

  useEffect(() => {
    if (state?.phase !== 'decision' || !state.currentQuestion) {
      return;
    }

    const answerIds = state.currentQuestion.answers.map((answer) => answer.id);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      const answerIndex = Number(event.key) - 1;
      const answerId = answerIds[answerIndex];
      if (answerId) {
        event.preventDefault();
        submitAnswer(answerId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state?.phase, state?.currentQuestion, submitAnswer]);

  const summary = state?.phase === 'liquidation' ? engine.getSummary(state) : null;

  return { state, summary, startRun, submitAnswer, continueRun };
}
