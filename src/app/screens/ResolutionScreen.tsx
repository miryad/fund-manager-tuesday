import { ResourcePanel } from '../../components/ResourcePanel';
import { RunHeader } from '../../components/RunHeader';
import { gameConfig } from '../../game/config';
import type { Question, QuestionResult, Run } from '../../game/types';

interface ResolutionScreenProps {
  readonly run: Run;
  readonly question: Question;
  readonly result: QuestionResult;
  readonly onContinue: () => void;
}

export function ResolutionScreen({ run, question, result, onContinue }: ResolutionScreenProps) {
  const selectedAnswer = question.answers.find((answer) => answer.id === result.selectedAnswerId);
  const correctAnswer = question.answers.find((answer) => answer.id === result.correctAnswerId);
  const changedResources = new Set(result.resourceChanges.map((change) => change.resource));
  const outcomeLabel =
    result.outcome === 'timedOut'
      ? 'No decision made'
      : result.outcome === 'correct'
        ? 'Decision accepted'
        : 'Decision missed';

  return (
    <section className="game-layout" aria-labelledby="resolution-title">
      <RunHeader run={run} />
      <ResourcePanel resources={run.resources} changedResources={changedResources} />

      <article className="resolution">
        <p className="eyebrow">Decision resolved</p>
        <h1 id="resolution-title">{outcomeLabel}</h1>
        {result.outcome === 'timedOut' && (
          <p className="resolution__timeout">
            In investing, not making a decision is often a decision.
          </p>
        )}

        <dl className="answer-review">
          <div>
            <dt>Your decision</dt>
            <dd>{selectedAnswer?.text ?? 'No answer submitted'}</dd>
          </div>
          <div>
            <dt>Correct decision</dt>
            <dd>{correctAnswer?.text}</dd>
          </div>
        </dl>

        <div className="explanation">
          <span className="data-label">Desk note</span>
          <p>{question.explanation}</p>
        </div>

        <div className="change-list" aria-label="Resource changes">
          <span className="data-label">Immediate impact</span>
          {result.resourceChanges.length === 0 ? (
            <p>No resource change.</p>
          ) : (
            <ul>
              {result.resourceChanges.map((change, index) => (
                <li key={`${change.resource}-${index}`}>
                  <strong>
                    {change.amount > 0 ? '+' : ''}
                    {change.amount}
                  </strong>
                  <span>{gameConfig.resources[change.resource].label}</span>
                  <small>{change.reason}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="button button--primary" type="button" onClick={onContinue} autoFocus>
          Continue <span aria-hidden="true">→</span>
        </button>
      </article>
    </section>
  );
}
