import { AppShell } from '../components/AppShell';
import { useGameController } from '../hooks/useGameController';
import { GameScreen, LiquidationScreen, ResolutionScreen, SplashScreen } from './screens';

export function App() {
  const controller = useGameController();

  let screen;
  if (!controller.state) {
    screen = <SplashScreen onStart={controller.startRun} />;
  } else if (
    controller.state.phase === 'decision' &&
    controller.state.run &&
    controller.state.currentQuestion &&
    controller.state.timer
  ) {
    screen = (
      <GameScreen
        run={controller.state.run}
        question={controller.state.currentQuestion}
        timer={controller.state.timer}
        onAnswer={controller.submitAnswer}
      />
    );
  } else if (
    controller.state.phase === 'resolution' &&
    controller.state.run &&
    controller.state.currentQuestion &&
    controller.state.lastResult
  ) {
    screen = (
      <ResolutionScreen
        run={controller.state.run}
        question={controller.state.currentQuestion}
        result={controller.state.lastResult}
        onContinue={controller.continueRun}
      />
    );
  } else {
    screen = <LiquidationScreen summary={controller.summary} onRestart={controller.startRun} />;
  }

  return <AppShell phase={controller.state?.phase ?? 'splash'}>{screen}</AppShell>;
}
