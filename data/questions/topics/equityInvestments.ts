import { createQuestion } from '../questionFactory';

export const equityInvestmentsQuestions = [
  createQuestion('equity-investments', {
    id: 'equity-001-high-pe-growth',
    scenario:
      'A company trades at a much higher price-to-earnings multiple than its peers. What belief is the market most likely expressing?',
    answers: [
      'The company has no business risk',
      'Its shares cannot fall',
      'It has less cash than every peer',
      'Its future growth or quality will justify paying more today',
    ],
    correctIndex: 3,
    explanation:
      'A premium multiple often reflects expectations of stronger growth, durability, or lower risk. Those expectations still need to be tested.',
    difficulty: 'easy',
    tags: ['valuation-multiples', 'growth', 'market-expectations'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-002-dividend-cut',
    scenario:
      'A cyclical company cuts its dividend to preserve cash during a downturn. What should you investigate before treating the cut as purely negative?',
    answers: [
      'Whether retaining cash protects the business and valuable investments',
      'Whether its dividend yield remains above the sector average',
      'Whether the cut makes the shares look cheaper on trailing earnings',
      'Whether the company can borrow to maintain the old payout',
    ],
    correctIndex: 0,
    explanation:
      'A dividend cut can signal stress, but preserving liquidity may also protect long-term value. The use and need for retained cash matter.',
    difficulty: 'easy',
    tags: ['dividends', 'cyclicals', 'capital-allocation'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-003-moat-customer-switching',
    scenario:
      'A software provider can raise prices modestly without losing customers because switching would disrupt critical workflows. What supports its economics?',
    answers: [
      'Rapid market growth',
      'A large addressable market',
      'Low customer acquisition cost',
      'Customer switching costs',
    ],
    correctIndex: 3,
    explanation:
      'High switching costs make customers less price-sensitive and can support durable pricing power, retention, and margins.',
    difficulty: 'easy',
    tags: ['competitive-advantage', 'switching-costs', 'pricing-power'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-004-startup-tam',
    scenario:
      'A founder claims a huge market by multiplying the world’s population by the product’s premium price. What is the better valuation input?',
    answers: [
      'The largest market estimate available online',
      'The population of the founder’s home city',
      'A reachable customer segment with realistic adoption and pricing',
      'Total industry revenue regardless of product fit',
    ],
    correctIndex: 2,
    explanation:
      'A credible market estimate starts with customers the company can actually serve and win. A theoretical maximum is not an investable revenue forecast.',
    difficulty: 'medium',
    tags: ['venture-capital', 'market-sizing', 'valuation'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-005-value-trap',
    scenario:
      'A retailer looks cheap on last year’s earnings, but store traffic and margins are declining structurally. What is the key risk?',
    answers: [
      'The low multiple may reflect earnings that are not sustainable',
      'Low multiples always guarantee high returns',
      'Historical earnings cannot be measured',
      'The company must have excess cash',
    ],
    correctIndex: 0,
    explanation:
      'A stock can appear cheap because the earnings denominator is about to shrink. Valuation must use sustainable future economics, not stale profits.',
    difficulty: 'medium',
    tags: ['value-trap', 'earnings', 'retail'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-006-minority-shareholder',
    scenario:
      'A controlling shareholder proposes selling a private asset to the listed company at a generous price. What should concern minority investors?',
    answers: [
      'The purchase may increase the company’s reported assets',
      'The controller may transfer value through a related-party transaction',
      'The acquisition may diversify the company’s operations',
      'The controller’s ownership may align all shareholder interests',
    ],
    correctIndex: 1,
    explanation:
      'Related-party deals can benefit the controller at the company’s expense. Independent review and fair pricing are essential protections.',
    difficulty: 'medium',
    tags: ['governance', 'related-party', 'minority-shareholders'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-007-ddm-rate-sensitivity',
    scenario:
      'Your dividend valuation assumes stable cash flows far into the future. Market discount rates rise while the dividend outlook is unchanged. What happens to value?',
    answers: [
      'Value rises because future dividends are larger',
      'Value is unchanged because dividends did not change',
      'Value becomes equal to book value',
      'Value falls because future dividends are discounted more heavily',
    ],
    correctIndex: 3,
    explanation:
      'A higher required return reduces the present value of the same future dividends. Long-duration equity valuations can be particularly rate-sensitive.',
    difficulty: 'medium',
    tags: ['dividend-discount', 'discount-rate', 'valuation'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-008-unit-economics-growth',
    scenario:
      'A consumer startup doubles revenue by buying customers whose expected gross profit never covers acquisition cost. How should you view the growth?',
    answers: [
      'As automatically valuable because revenue doubled',
      'As proof that scale will remove all costs',
      'As value-destructive unless unit economics improve',
      'As irrelevant because private companies need no margins',
    ],
    correctIndex: 2,
    explanation:
      'Growth creates value only when customer economics can eventually support acquisition and operating costs. Scaling negative contribution can deepen losses.',
    difficulty: 'hard',
    tags: ['venture-capital', 'unit-economics', 'growth-quality'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-009-residual-income',
    scenario:
      'A bank’s accounting earnings are positive, but its return on equity remains below shareholders’ required return. What does this imply?',
    answers: [
      'It may be destroying economic value despite reporting profit',
      'Any positive profit creates economic value',
      'Growth in book value must compensate shareholders fully',
      'The cost of equity matters only when accounting earnings are negative',
    ],
    correctIndex: 0,
    explanation:
      'Economic profit requires returns above the cost of equity. Positive accounting income can still be insufficient compensation for shareholder capital.',
    difficulty: 'hard',
    tags: ['residual-income', 'cost-of-equity', 'banks'],
  }),
  createQuestion('equity-investments', {
    id: 'equity-010-sum-of-parts',
    scenario:
      'A conglomerate owns a stable utility and a fast-growing online marketplace. One blended earnings multiple hides their different economics. What approach is more informative?',
    answers: [
      'Value both divisions using the utility multiple',
      'Value each business separately with appropriate assumptions, then combine them',
      'Use revenue growth from only the marketplace',
      'Ignore the utility because it grows slowly',
    ],
    correctIndex: 1,
    explanation:
      'A sum-of-the-parts valuation respects different growth, risk, and cash-flow profiles. A single multiple can obscure material differences.',
    difficulty: 'hard',
    tags: ['sum-of-parts', 'conglomerate', 'valuation'],
  }),
] as const;
