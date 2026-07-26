import { createQuestion } from '../questionFactory';

export const portfolioManagementQuestions = [
  createQuestion('portfolio-management', {
    id: 'pm-001-client-liquidity',
    scenario:
      'A foundation must fund a major grant in six months. The portfolio team wants to place the money in volatile small-cap shares. What should take priority?',
    answers: [
      'The shares’ long-term average return',
      'The portfolio manager’s market forecast',
      'Preserving liquidity and capital for the known payment',
      'Matching the equity index exactly',
    ],
    correctIndex: 2,
    answerSeverities: ['serious', 'serious', 'routine', 'severe'],
    explanation:
      'A near-term, known liability requires liquid, low-volatility assets. Return seeking should not endanger the foundation’s ability to make the payment.',
    difficulty: 'easy',
    tags: ['liquidity', 'client-objectives', 'foundation'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-002-concentrated-stock',
    scenario:
      'A client’s wealth is dominated by shares in their employer. What is the central portfolio concern?',
    answers: [
      'Employment income and investment wealth depend on the same company',
      'The employer shares may have attractive upside',
      'Selling the shares may create a tax liability',
      'The client knows the company better than other investments',
    ],
    correctIndex: 0,
    answerSeverities: ['routine', 'serious', 'serious', 'severe'],
    explanation:
      'The client has concentrated exposure because both human capital and financial capital depend on one employer. Diversification can reduce that linked risk.',
    difficulty: 'easy',
    tags: ['concentration', 'human-capital', 'client-portfolio'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-003-rebalance',
    scenario:
      'After a strong rally, equities rise far above their strategic portfolio weight. The client’s objectives are unchanged. What does disciplined rebalancing suggest?',
    answers: [
      'Buy more equities because they recently performed well',
      'Restore the target weights by trimming equities and adding underweight assets',
      'Abandon the strategic allocation permanently',
      'Wait until every asset has the same return',
    ],
    correctIndex: 1,
    explanation:
      'Rebalancing restores the risk profile chosen for the client and prevents market moves from silently changing the portfolio’s intended exposure.',
    difficulty: 'easy',
    tags: ['rebalancing', 'asset-allocation', 'discipline'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-004-vc-overcommitment',
    scenario:
      'An endowment commits heavily to venture funds while distributions from older funds slow. What risk should it model?',
    answers: [
      'Capital calls may arrive before private-fund distributions provide cash',
      'Every venture fund will call capital on the same date by law',
      'Commitments eliminate liquidity needs',
      'Private assets can always be sold overnight at net asset value',
    ],
    correctIndex: 0,
    explanation:
      'Private fund commitments create uncertain future cash demands. Slower distributions can leave an investor overcommitted and short of liquid assets.',
    difficulty: 'medium',
    tags: ['venture-capital', 'commitments', 'liquidity'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-005-tracking-error',
    scenario:
      'An active equity fund stays close to its benchmark holdings but charges active fees. What portfolio measure would reveal how little it differs?',
    answers: ['Dividend payout ratio', 'Inventory turnover', 'Tracking error', 'Bond convexity'],
    correctIndex: 2,
    explanation:
      'Tracking error measures variability of returns relative to the benchmark. Very low tracking error can reveal limited active positioning.',
    difficulty: 'medium',
    tags: ['tracking-error', 'active-management', 'benchmark'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-006-risk-capacity',
    scenario:
      'Two clients both say they tolerate volatility. One has stable surplus wealth; the other needs most assets for next year’s living costs. Who has greater risk capacity?',
    answers: [
      'The client with near-term spending needs',
      'The client with stable surplus wealth',
      'Both, because stated tolerance is identical',
      'Neither, because capacity cannot be assessed',
    ],
    correctIndex: 1,
    explanation:
      'Risk capacity reflects financial ability to absorb losses, which differs from willingness. Near-term essential spending reduces capacity.',
    difficulty: 'medium',
    tags: ['risk-capacity', 'client-objectives', 'suitability'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-007-risk-contribution',
    scenario:
      'A portfolio holds 60% in low-volatility bonds and 40% in volatile equities. Equities generate most portfolio volatility. What does this show?',
    answers: [
      'Capital weight and risk contribution are not the same',
      'Bonds must have zero risk',
      'Equities have a negative expected return',
      'Portfolio volatility equals the largest asset weight',
    ],
    correctIndex: 0,
    explanation:
      'An asset with a smaller capital weight can dominate total risk when its volatility and covariance contributions are high.',
    difficulty: 'medium',
    tags: ['risk-contribution', 'asset-allocation', 'volatility'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-008-vc-vintage-diversification',
    scenario:
      'A family office plans to commit its entire private-markets budget to venture funds raised in one year. What diversification problem remains?',
    answers: [
      'Every manager will own the same companies',
      'Results may depend heavily on one entry-price and exit environment',
      'One vintage always produces the highest return',
      'Venture funds have no economic-cycle exposure',
    ],
    correctIndex: 1,
    explanation:
      'Spreading commitments across vintages reduces dependence on one fundraising, valuation, and exit cycle.',
    difficulty: 'hard',
    tags: ['venture-capital', 'vintage-year', 'diversification'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-009-liability-duration',
    scenario:
      'A pension plan’s liabilities become more sensitive to interest rates than its assets. Rates then fall sharply. What is the likely funding effect?',
    answers: [
      'Assets must rise more than liabilities',
      'Liabilities may rise more than assets, worsening funded status',
      'Both sides become insensitive to rates',
      'The plan’s benefit payments disappear',
    ],
    correctIndex: 1,
    explanation:
      'When liability duration exceeds asset duration, falling rates increase the present value of liabilities more, potentially weakening funded status.',
    difficulty: 'hard',
    tags: ['liability-driven', 'duration-gap', 'pension-fund'],
  }),
  createQuestion('portfolio-management', {
    id: 'pm-010-factor-crowding',
    scenario:
      'Several strategies appear diversified by name but all lose when cheap, leveraged companies underperform. What should the risk team conclude?',
    answers: [
      'Different strategy names guarantee diversification',
      'The losses prove markets are inefficient',
      'The portfolio contains a shared hidden factor exposure',
      'Leverage always reduces correlation',
    ],
    correctIndex: 2,
    explanation:
      'Holdings and labels can differ while economic drivers overlap. Factor-level analysis can reveal concentration hidden by strategy categories.',
    difficulty: 'hard',
    tags: ['factor-risk', 'crowding', 'diversification'],
  }),
] as const;
