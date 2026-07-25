interface SplashScreenProps {
  readonly onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <section className="splash screen" aria-labelledby="splash-title">
      <div className="splash__status" aria-hidden="true">
        <span>MARKET WINDOW / OPEN</span>
        <span>RISK LINK / STANDBY</span>
      </div>
      <p className="eyebrow">One fund. Five signals. Fifteen seconds.</p>
      <h1 id="splash-title">
        Fund Manager <span>Tuesday</span>
      </h1>
      <p className="screen__copy">
        Keep the fund alive through a sequence of decisions under pressure.
      </p>
      <button className="button button--primary" type="button" onClick={onStart}>
        Start Run <span aria-hidden="true">→</span>
      </button>
      <p className="splash__note">No account. No market connection. Every run is seeded.</p>
    </section>
  );
}
