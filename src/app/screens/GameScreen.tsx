import { ResourcePanel } from '../../components/ResourcePanel';
import { RunHeader } from '../../components/RunHeader';
import type { Question, Run, TimerState } from '../../game/types';

interface GameScreenProps {
  readonly run: Run;
  readonly question: Question;
  readonly timer: TimerState;
  readonly onAnswer: (answerId: string) => void;
}

export function GameScreen({ run, question, timer, onAnswer }: GameScreenProps) {
  const seconds = Math.ceil(timer.remainingMilliseconds / 1_000);
  const timerPercentage = (timer.remainingMilliseconds / timer.durationMilliseconds) * 100;

  return (
    <section className="game-layout" aria-labelledby="scenario-title">
      <RunHeader run={run} />
      <ResourcePanel resources={run.resources} />

      <div className="decision">
        <div className="decision__meta">
          <span className="eyebrow">Decision {String(run.turn).padStart(2, '0')}</span>
          <div
            className="timer"
            role="timer"
            aria-label={`${seconds} seconds remaining`}
            aria-live="off"
          >
            <span className="timer__number" aria-hidden="true">
              {String(seconds).padStart(2, '0')}
            </span>
            <span className="data-label">seconds</span>
          </div>
        </div>
        <div
          className="timer-track"
          role="progressbar"
          aria-label="Decision time remaining"
          aria-valuemin={0}
          aria-valuemax={timer.durationMilliseconds}
          aria-valuenow={Math.round(timer.remainingMilliseconds)}
          aria-valuetext={`${seconds} seconds remaining`}
        >
          <span style={{ width: `${timerPercentage}%` }} />
        </div>

        <h1 id="scenario-title" className="scenario">
          {question.scenario}
        </h1>

        <div className="answer-list" aria-label="Available decisions">
          {question.answers.map((answer, index) => (
            <button
              className="answer"
              type="button"
              aria-keyshortcuts={String(index + 1)}
              onClick={() => onAnswer(answer.id)}
              key={answer.id}
            >
              <kbd>{index + 1}</kbd>
              <span>{answer.text}</span>
            </button>
          ))}
        </div>
        <p className="keyboard-hint">Keyboard: press 1–4 to decide</p>
      </div>
    </section>
  );
}
