import { createQuestion } from '../questionFactory';

export const alternativeInvestmentsQuestions = [
  createQuestion('alternative-investments', {
    id: 'alt-001-property-vacancy',
    scenario:
      'An office building offers an attractive headline yield, but its largest tenant leaves next month. What should your valuation reflect immediately?',
    answers: [
      'Only the rent paid last year',
      'A guaranteed replacement tenant',
      'The building’s original construction cost',
      'Lower expected occupancy and leasing costs',
    ],
    correctIndex: 3,
    answerSeverities: ['serious', 'severe', 'serious', 'routine'],
    explanation:
      'Property value depends on expected future cash flow. Vacancy, incentives, and reletting costs can materially reduce near-term income.',
    difficulty: 'easy',
    tags: ['real-estate', 'vacancy', 'cash-flow'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-002-private-equity-illiquidity',
    scenario:
      'A pension committee compares a private equity fund with a daily traded equity fund. What additional constraint matters most?',
    answers: [
      'Private investments can always be sold at quoted value',
      'Private equity has no valuation uncertainty',
      'Capital may be locked up for years with uncertain exit timing',
      'Daily trading guarantees higher returns',
    ],
    correctIndex: 2,
    answerSeverities: ['severe', 'severe', 'routine', 'serious'],
    explanation:
      'Private equity commitments are illiquid and distributions are controlled by exits. The investor must be able to tolerate uncertain, long holding periods.',
    difficulty: 'easy',
    tags: ['private-equity', 'illiquidity', 'pension-fund'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-003-vc-power-law',
    scenario:
      'Most startups in a venture portfolio return little, while one company drives most gains. What portfolio feature does this illustrate?',
    answers: [
      'Losses cannot occur after diversification',
      'Every startup should receive equal follow-on capital',
      'Venture returns are normally distributed',
      'Outcomes can be highly skewed, with a few winners dominating returns',
    ],
    correctIndex: 3,
    explanation:
      'Venture outcomes are often strongly skewed. A small number of exceptional companies can account for much of a fund’s total return.',
    difficulty: 'easy',
    tags: ['venture-capital', 'power-law', 'portfolio-returns'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-004-commodity-roll',
    scenario:
      'Oil spot prices are unchanged, but a strategy repeatedly sells expiring futures cheaply and buys later contracts at higher prices. What is hurting returns?',
    answers: [
      'A positive dividend yield',
      'Lower storage capacity at the fund',
      'Equity dilution',
      'Negative roll yield from an upward-sloping futures curve',
    ],
    correctIndex: 3,
    explanation:
      'When later futures are more expensive than expiring contracts, rolling the position can create a loss even if the spot price is stable.',
    difficulty: 'easy',
    tags: ['commodities', 'roll-yield', 'contango'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-005-gp-carry',
    scenario:
      'A private equity manager receives a share of investment profits after investors recover agreed amounts. What incentive issue should LPs monitor?',
    answers: [
      'The manager may prefer excessive risk because upside participation exceeds downside',
      'The manager can no longer earn management fees',
      'Carried interest guarantees good exits',
      'Profit sharing removes every conflict',
    ],
    correctIndex: 0,
    explanation:
      'Performance participation aligns some interests but can also encourage risk taking. Fund terms and governance should balance upside incentives with downside discipline.',
    difficulty: 'medium',
    tags: ['private-equity', 'carried-interest', 'incentives'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-006-vc-reserves',
    scenario:
      'A venture fund invests its entire committed capital in first cheques, leaving nothing for follow-on rounds. What strategic risk has it created?',
    answers: [
      'It has eliminated dilution',
      'It may be unable to support or maintain ownership in its strongest companies',
      'It has guaranteed faster exits',
      'It no longer needs portfolio monitoring',
    ],
    correctIndex: 1,
    explanation:
      'Follow-on reserves give a fund flexibility to back winners and manage dilution. Using all capital initially removes that option.',
    difficulty: 'medium',
    tags: ['venture-capital', 'reserves', 'follow-on'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-007-appraisal-smoothing',
    scenario:
      'A property fund reports very stable quarterly returns based on periodic appraisals, even during volatile markets. What should you suspect?',
    answers: [
      'The buildings have become risk-free',
      'Appraised values may adjust slowly and smooth observed volatility',
      'Property prices must move opposite to markets',
      'Stable reports guarantee daily liquidity',
    ],
    correctIndex: 1,
    explanation:
      'Infrequent appraisals can lag market conditions, making reported returns appear smoother and less volatile than the underlying economics.',
    difficulty: 'medium',
    tags: ['real-estate', 'appraisal', 'stale-pricing'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-008-secondary-vc-sale',
    scenario:
      'An LP needs liquidity and considers selling a venture fund interest on the secondary market. The best bid is below reported net asset value. Why?',
    answers: [
      'Secondary buyers cannot own fund interests',
      'Reported value is a guaranteed cash price',
      'The fund must distribute cash before any transfer',
      'Buyers demand compensation for illiquidity, uncertainty, and unfunded commitments',
    ],
    correctIndex: 3,
    explanation:
      'Private fund net asset value is an estimate, not a live bid. Secondary prices reflect uncertainty, transfer constraints, and future capital obligations.',
    difficulty: 'medium',
    tags: ['venture-capital', 'secondaries', 'liquidity'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-009-vc-tvpi-dpi',
    scenario:
      'A mature venture fund reports a high total-value multiple but has returned little cash to LPs. What distinction matters?',
    answers: [
      'Much of the reported value remains unrealised rather than distributed',
      'The fund has no remaining companies',
      'Unrealised value is always more reliable than cash',
      'A high total-value multiple guarantees the final outcome',
    ],
    correctIndex: 0,
    explanation:
      'Total value includes estimated unrealised holdings, while distributions measure cash actually returned. A mature fund with little cash realisation still carries exit risk.',
    difficulty: 'hard',
    tags: ['venture-capital', 'fund-performance', 'realisation'],
  }),
  createQuestion('alternative-investments', {
    id: 'alt-010-leveraged-buyout-returns',
    scenario:
      'A buyout model shows excellent equity returns mainly because debt is very high, while operating assumptions are ordinary. What should the committee stress-test?',
    answers: [
      'Whether base-case revenue exceeds last year’s revenue',
      'Whether debt service and exit value remain viable under weaker performance',
      'Whether more leverage always raises enterprise value',
      'Whether interest expense can be ignored',
    ],
    correctIndex: 1,
    explanation:
      'Leverage magnifies equity outcomes in both directions. Downside cases must test debt service, covenant headroom, and exit sensitivity.',
    difficulty: 'hard',
    tags: ['private-equity', 'leverage', 'stress-test'],
  }),
] as const;
