// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/app/App';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function startRun(): void {
  fireEvent.click(screen.getByRole('button', { name: /start run/i }));
}

describe('playable React vertical slice', () => {
  it('starts on the non-CFA splash and creates a run through the engine', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /fund manager tuesday/i })).toBeTruthy();
    expect(document.body.textContent).not.toContain('CFA');

    startRun();

    expect(screen.getByText(/Decision 01/i)).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.getByLabelText('Fund resources')).toBeTruthy();
  });

  it('supports keyboard answers and keeps resolution visible until continued', () => {
    render(<App />);
    startRun();

    fireEvent.keyDown(window, { key: '1' });

    expect(screen.getByText(/Decision (accepted|missed)/i)).toBeTruthy();
    expect(screen.getByText('Your decision')).toBeTruthy();
    expect(screen.getByText('Correct decision')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText(/Decision 02/i)).toBeTruthy();
  });

  it('delegates timer expiry to the engine timeout transition', () => {
    vi.useFakeTimers();
    render(<App />);
    startRun();

    act(() => {
      vi.advanceTimersByTime(15_100);
    });

    expect(screen.getByRole('heading', { name: 'No decision made' })).toBeTruthy();
    expect(
      screen.getByText('In investing, not making a decision is often a decision.'),
    ).toBeTruthy();
    expect(screen.getByText('No answer submitted')).toBeTruthy();
  });

  it('plays decisions until the engine reaches the liquidation summary', () => {
    render(<App />);
    startRun();

    for (
      let turn = 1;
      turn <= 100 && !screen.queryByRole('heading', { name: 'Tuesday Complete' });
      turn += 1
    ) {
      const answers = screen.getAllByRole('button');
      fireEvent.click(answers[0]!);
      expect(screen.getByText('Correct decision')).toBeTruthy();
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    }

    expect(screen.getByRole('heading', { name: 'Tuesday Complete' })).toBeTruthy();
    expect(screen.getByText('Final prestige rank')).toBeTruthy();
    expect(screen.getByRole('button', { name: /try another tuesday/i })).toBeTruthy();
  });
});
