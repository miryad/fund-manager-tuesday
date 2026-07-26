import type { PropsWithChildren } from 'react';
import type { GamePhase } from '../game/types';

interface AppShellProps extends PropsWithChildren {
  readonly phase: GamePhase;
}

export function AppShell({ children, phase }: AppShellProps) {
  return (
    <div className="app-shell">
      <header
        className="app-shell__header"
        aria-label="Application status"
        aria-hidden={phase === 'splash' || undefined}
      >
        <span>{phase === 'splash' ? '\u00A0' : 'FMT / TUESDAY OS'}</span>
        <span>{phase === 'splash' ? '\u00A0' : phase}</span>
      </header>
      <main className="app-shell__main">{children}</main>
      <footer className="app-shell__footer">
        <span>LOCAL SESSION</span>
        <span>
          {phase === 'splash' ? (
            <>
              NOT INVESTMENT ADVICE.
              <br />
              PRESS RESPONSIBLY.
            </>
          ) : (
            'DETERMINISTIC ENGINE'
          )}
        </span>
      </footer>
    </div>
  );
}
