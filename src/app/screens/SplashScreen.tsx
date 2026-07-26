interface SplashScreenProps {
  readonly onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <section className="splash screen" aria-labelledby="splash-title">
      <div className="splash__status" aria-hidden="true">
        <span>MARKET WINDOW / OPEN</span>
      </div>
      <p className="eyebrow">One fund. Five priorities. Twenty seconds.</p>
      <h1 id="splash-title">
        Fund Manager <span>// Tuesday</span>
      </h1>
      <p className="screen__copy">
        Keep the fund alive through a sequence of decisions under pressure.
      </p>
      <button className="button button--primary" type="button" onClick={onStart}>
        Enter Market <span aria-hidden="true">→</span>
      </button>
      <p className="splash__note" aria-hidden="true">
        ────────────────────────────
      </p>
    </section>
  );
}
