import { createQuestion } from '../questionFactory';

export const quantitativeMethodsQuestions = [
  createQuestion('quantitative-methods', {
    id: 'quant-001-average-return',
    scenario:
      'A fund gains 50% in year one and loses 50% in year two. An LP asks whether the fund is back where it started. What do you say?',
    answers: [
      'Yes, because the two returns average to zero',
      'Yes, before management fees',
      'No, the fund is 25% below its starting value',
      'No, the fund is 50% below its starting value',
    ],
    correctIndex: 2,
    explanation:
      'Returns compound on changing capital: 1.50 multiplied by 0.50 equals 0.75. Equal percentage gains and losses do not cancel.',
    difficulty: 'easy',
    tags: ['compounding', 'returns', 'lp-reporting'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-002-outlier-startup-metric',
    scenario:
      'Nine portfolio startups have similar monthly growth, while one acquired company reports a one-off 400% jump. Which summary best represents the typical company?',
    answers: [
      'The median growth rate',
      'The arithmetic mean including the jump',
      'The maximum growth rate',
      'The range divided by ten',
    ],
    correctIndex: 0,
    explanation:
      'The median is less sensitive to an extreme observation and better represents a typical company when the distribution contains a large outlier.',
    difficulty: 'easy',
    tags: ['venture-capital', 'central-tendency', 'outliers'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-003-correlation-diversification',
    scenario:
      'You can add one of two assets with the same expected return and volatility. One is highly correlated with the portfolio; the other has low correlation. Which is more useful?',
    answers: [
      'The highly correlated asset because its behaviour is familiar',
      'Either asset because standalone volatility is identical',
      'The asset with the higher recent return',
      'The low-correlation asset because it offers more diversification',
    ],
    correctIndex: 3,
    explanation:
      'Portfolio risk depends on how assets move together, not only on standalone volatility. Lower correlation generally improves diversification.',
    difficulty: 'easy',
    tags: ['correlation', 'diversification', 'portfolio-risk'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-004-small-startup-sample',
    scenario:
      'A venture partner claims a hiring programme guarantees success because four of five participating startups raised another round. What is the main concern?',
    answers: [
      'Fundraising is never measurable',
      'The sample is small and may be selected rather than representative',
      'Five observations are enough if returns are high',
      'The success rate should be converted to a currency amount',
    ],
    correctIndex: 1,
    explanation:
      'A tiny, potentially selected sample provides weak evidence of causation. The result may reflect which startups joined rather than the programme itself.',
    difficulty: 'medium',
    tags: ['venture-capital', 'sampling', 'selection-bias'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-005-confidence-interval',
    scenario:
      'A return estimate has a very wide confidence interval. The committee wants a single precise forecast. What should you emphasise?',
    answers: [
      'The midpoint is certain because it is the best estimate',
      'A wider interval means the strategy has higher fees',
      'The data support substantial uncertainty around the estimate',
      'The interval can be narrowed by rounding the return',
    ],
    correctIndex: 2,
    explanation:
      'A wide confidence interval signals limited precision. Reporting only the midpoint would hide the uncertainty supported by the data.',
    difficulty: 'medium',
    tags: ['confidence-interval', 'estimation', 'uncertainty'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-006-regression-causation',
    scenario:
      'Your regression finds that companies with larger offices also have higher revenue. A colleague concludes that renting more space will cause sales to rise. How do you respond?',
    answers: [
      'Correlation alone does not establish that office size causes revenue',
      'The conclusion is valid whenever the coefficient is positive',
      'Revenue must cause office size, so the model should be inverted',
      'The relationship is causal if both variables use the same currency',
    ],
    correctIndex: 0,
    explanation:
      'A regression association may reflect scale, omitted variables, or reverse causality. Statistical relationship alone does not prove a causal mechanism.',
    difficulty: 'medium',
    tags: ['regression', 'causation', 'omitted-variables'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-007-base-rate-pitch',
    scenario:
      'A founder highlights a 90% accurate fraud detector. Fraud occurs in only 1% of transactions. What should you ask before trusting an alert?',
    answers: [
      'Whether the model uses more than one decimal place',
      'Whether accuracy rose last month',
      'Whether the founder personally reviewed the code',
      'How often non-fraud transactions are falsely flagged',
    ],
    correctIndex: 3,
    explanation:
      'With a low base rate, even a seemingly accurate model can produce many false positives. The false-positive rate is essential for interpreting an alert.',
    difficulty: 'medium',
    tags: ['venture-capital', 'conditional-probability', 'base-rate'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-008-geometric-forecast',
    scenario:
      'A strategy’s annual returns were +30%, −20%, and +10%. You need its realised annual growth rate for a performance review. Which method fits?',
    answers: [
      'Use the largest annual return',
      'Use the geometric mean of the three growth factors',
      'Use the arithmetic mean because years are independent',
      'Subtract the worst year from the best year',
    ],
    correctIndex: 1,
    explanation:
      'Realised multi-period growth is captured by compounding the annual growth factors and taking their geometric mean.',
    difficulty: 'hard',
    tags: ['geometric-mean', 'performance', 'compounding'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-009-multicollinearity',
    scenario:
      'A valuation model includes revenue, units sold, and units sold multiplied by nearly constant pricing. Coefficients swing wildly when one variable is removed. What is likely happening?',
    answers: [
      'Heteroskedasticity guarantees biased returns',
      'The dependent variable has no variance',
      'The predictors overlap so heavily that individual coefficients are unstable',
      'The sample mean must equal zero',
    ],
    correctIndex: 2,
    explanation:
      'Highly related predictors create multicollinearity. The model may still fit overall, but separating each variable’s effect becomes unstable.',
    difficulty: 'hard',
    tags: ['regression', 'multicollinearity', 'model-risk'],
  }),
  createQuestion('quantitative-methods', {
    id: 'quant-010-backtest-overfit',
    scenario:
      'A trading rule was adjusted repeatedly until it produced excellent results on one historical dataset. What is the best next step?',
    answers: [
      'Test the final rule on untouched out-of-sample data',
      'Add more parameters to improve the historical fit',
      'Assume the backtest is reliable because it spans ten years',
      'Remove every losing month from the dataset',
    ],
    correctIndex: 0,
    explanation:
      'Repeated tuning can fit noise rather than a durable relationship. Untouched data provide a cleaner test of whether the rule generalises.',
    difficulty: 'hard',
    tags: ['backtesting', 'overfitting', 'out-of-sample'],
  }),
] as const;
