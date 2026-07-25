import type { GameConfig, RankThreshold } from '../config';
import type { QuestionResult, Rank } from '../types';

export function calculateScore(results: readonly QuestionResult[], config: GameConfig): number {
  return results.reduce((score, result) => {
    if (result.outcome === 'correct') {
      return score + config.scoring.correctAnswerPoints;
    }
    if (result.outcome === 'incorrect') {
      return score + config.scoring.incorrectAnswerPoints;
    }
    return score + config.scoring.timeoutPoints;
  }, 0);
}

export function calculateRank(score: number, thresholds: readonly RankThreshold[]): Rank {
  if (thresholds.length === 0) {
    throw new Error('At least one rank threshold is required.');
  }

  const ordered = [...thresholds].sort((left, right) => left.minimumScore - right.minimumScore);
  let rank = ordered[0]!.rank;

  for (const threshold of ordered) {
    if (score < threshold.minimumScore) {
      break;
    }
    rank = threshold.rank;
  }

  return rank;
}
