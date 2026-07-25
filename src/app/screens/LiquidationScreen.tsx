import { gameConfig } from '../../game/config';
import { RESOURCE_IDS } from '../../game/types';
import type { RunSummary } from '../../game/types';

interface LiquidationScreenProps {
  readonly summary: RunSummary | null;
  readonly onRestart: () => void;
}

function formatCompetency(value: string): string {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

export function LiquidationScreen({ summary, onRestart }: LiquidationScreenProps) {
  if (!summary) {
    return (
      <section className="screen" aria-labelledby="summary-unavailable-title">
        <h1 id="summary-unavailable-title">Summary unavailable</h1>
        <p className="screen__copy">The run closed without a readable summary.</p>
        <button className="button button--primary" type="button" onClick={onRestart}>
          Try Another Tuesday
        </button>
      </section>
    );
  }

  const closingMessage =
    summary.endReason === 'resourceFailure'
      ? 'The fund has been liquidated.'
      : 'The fund survived every available scenario.';

  return (
    <section className="liquidation screen" aria-labelledby="liquidation-title">
      <p className="eyebrow">Run closed / {summary.city}</p>
      <h1 id="liquidation-title">Tuesday Complete</h1>
      <p className="screen__copy">{closingMessage}</p>

      <div className="rank-panel">
        <span className="data-label">Final prestige rank</span>
        <strong>{summary.rank}</strong>
      </div>

      <div className="summary-grid" aria-label="Run statistics">
        <div>
          <span className="data-label">Questions</span>
          <strong>{summary.questionsAnswered}</strong>
        </div>
        <div>
          <span className="data-label">Accuracy</span>
          <strong>{summary.accuracyPercentage.toFixed(0)}%</strong>
        </div>
        <div>
          <span className="data-label">Timeouts</span>
          <strong>{summary.timeoutCount}</strong>
        </div>
        <div>
          <span className="data-label">Decision time</span>
          <strong>{Math.round(summary.runDurationMilliseconds / 1_000)}s</strong>
        </div>
      </div>

      <section className="summary-section" aria-labelledby="resource-summary-title">
        <h2 id="resource-summary-title">Closing resources</h2>
        <dl className="closing-resources">
          {RESOURCE_IDS.map((resource) => (
            <div key={resource}>
              <dt>{gameConfig.resources[resource].label}</dt>
              <dd>{summary.finalResources[resource]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="summary-section" aria-labelledby="competency-title">
        <h2 id="competency-title">Competency report</h2>
        <div className="competency-list">
          {summary.competencies.map((competency) => (
            <div key={competency.competency}>
              <span>{formatCompetency(competency.competency)}</span>
              <strong>
                {competency.percentage === null
                  ? 'Not assessed'
                  : `${competency.percentage.toFixed(0)}%`}
              </strong>
              <small>
                {competency.correct}/{competency.attempted} correct · {competency.timeouts} timeout
                {competency.timeouts === 1 ? '' : 's'}
              </small>
            </div>
          ))}
        </div>
      </section>

      <p className="seed-line">
        <span>Seed</span> {summary.seed}
      </p>
      <button className="button button--primary" type="button" onClick={onRestart}>
        Try Another Tuesday <span aria-hidden="true">↻</span>
      </button>
    </section>
  );
}
