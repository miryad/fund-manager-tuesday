import { createQuestion } from '../questionFactory';

export const derivativesQuestions = [
  createQuestion('derivatives', {
    id: 'deriv-001-airline-fuel-hedge',
    scenario:
      'An airline worries that fuel prices will rise before the busy season. Which hedge most directly addresses the exposure?',
    answers: [
      'Sell fuel futures',
      'Buy fuel futures or an equivalent long hedge',
      'Buy airline shares',
      'Borrow in a foreign currency',
    ],
    correctIndex: 1,
    explanation:
      'The airline is harmed by rising input prices, so a long futures position can gain as fuel prices rise and offset higher operating cost.',
    difficulty: 'easy',
    tags: ['futures', 'commodity-hedge', 'airlines'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-002-put-protection',
    scenario:
      'A portfolio manager wants to keep equity upside but limit losses below a chosen price for the next three months. What fits best?',
    answers: [
      'Sell a put option',
      'Sell the shares and buy a bond',
      'Buy a put option on the equity exposure',
      'Buy an uncovered call option',
    ],
    correctIndex: 2,
    explanation:
      'A purchased put establishes downside protection while retaining gains if the underlying equity rises, in exchange for the option premium.',
    difficulty: 'easy',
    tags: ['options', 'protective-put', 'downside-risk'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-003-forward-obligation',
    scenario:
      'Your fund agrees today to buy foreign currency in three months at a fixed forward rate. At maturity, the market rate is less attractive. What must the fund do?',
    answers: [
      'Demand the original spot rate',
      'Walk away without cost because forwards are optional',
      'Convert the forward into equity',
      'Settle the forward obligation unless the contract permits otherwise',
    ],
    correctIndex: 3,
    explanation:
      'A forward is a binding agreement for both parties, unlike an option. An unfavourable market move does not remove the settlement obligation.',
    difficulty: 'easy',
    tags: ['forwards', 'currency', 'obligation'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-004-basis-risk',
    scenario:
      'A food producer hedges a specialised grain with futures on a similar but not identical grain. What risk remains?',
    answers: [
      'Both grains belong to the same broad commodity cycle',
      'The cash and futures prices may not move together closely enough',
      'Daily margin removes all uncertainty from the hedge',
      'Using a listed contract guarantees an exact offset',
    ],
    correctIndex: 1,
    explanation:
      'Using an imperfectly matched contract creates basis risk. The hedge may not offset the underlying exposure one-for-one.',
    difficulty: 'medium',
    tags: ['basis-risk', 'cross-hedge', 'futures'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-005-margin-call',
    scenario:
      'A futures hedge is economically sound at maturity, but it moves sharply against the fund today. What operational issue can still force action?',
    answers: [
      'The hedge must be closed whenever it shows a loss',
      'The eventual offset makes interim funding unnecessary',
      'The fund may need cash immediately to meet variation margin',
      'The hedge becomes an option',
    ],
    correctIndex: 2,
    explanation:
      'Futures are settled daily. A position can require substantial cash margin before gains on the underlying exposure are realised.',
    difficulty: 'medium',
    tags: ['futures', 'margin', 'liquidity'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-006-covered-call',
    scenario: 'A fund owns shares and sells call options against them. What trade-off has it made?',
    answers: [
      'It collects premium but gives up some upside above the strike',
      'It removes all downside risk',
      'It gains unlimited upside and no obligation',
      'It converts the shares into risk-free debt',
    ],
    correctIndex: 0,
    explanation:
      'A covered call earns option premium, but the shares may be called away if they rise above the strike, capping upside.',
    difficulty: 'medium',
    tags: ['options', 'covered-call', 'income'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-007-startup-fx-forward',
    scenario:
      'A startup will receive a fixed US-dollar payment in six months but pays salaries in euros. It wants certainty over the euro amount. What is the direct hedge?',
    answers: [
      'Buy more US-dollar assets',
      'Wait and use whatever spot rate appears',
      'Borrow euros and leave the dollar exposure open',
      'Sell US dollars forward for euros',
    ],
    correctIndex: 3,
    explanation:
      'Selling the future dollar receipt forward locks the euro conversion rate and aligns the hedge with the known foreign-currency inflow.',
    difficulty: 'medium',
    tags: ['venture-capital', 'currency-forward', 'cash-flow-hedge'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-008-swap-duration',
    scenario:
      'A pension fund receives fixed and pays floating in an interest-rate swap. If rates fall, how does the swap generally behave?',
    answers: [
      'The fixed receipts become less valuable',
      'The swap has no rate sensitivity',
      'The fixed receipts become more valuable relative to floating payments',
      'Both legs immediately terminate',
    ],
    correctIndex: 2,
    explanation:
      'Receiving fixed resembles owning fixed-rate exposure. When rates fall, the contracted fixed receipts become more valuable relative to new floating rates.',
    difficulty: 'hard',
    tags: ['interest-rate-swap', 'duration', 'pension-fund'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-009-option-volatility',
    scenario:
      'Two otherwise identical options differ only in expected volatility of the underlying asset. Which option should generally be more valuable?',
    answers: [
      'The option on the more volatile asset',
      'The option on the less volatile asset',
      'They must have the same value',
      'Volatility affects bonds but not options',
    ],
    correctIndex: 0,
    explanation:
      'Greater volatility increases the chance of a favourable extreme payoff while the buyer’s loss remains limited to the premium.',
    difficulty: 'hard',
    tags: ['options', 'volatility', 'option-value'],
  }),
  createQuestion('derivatives', {
    id: 'deriv-010-counterparty-swap',
    scenario:
      'An over-the-counter swap has a large positive value to your fund. The dealer’s credit quality suddenly deteriorates. What exposure has increased?',
    answers: [
      'The fund’s voting dilution',
      'The risk that the dealer cannot pay what the swap is worth',
      'The underlying asset’s physical storage cost',
      'The option premium already paid',
    ],
    correctIndex: 1,
    explanation:
      'A positive derivative value is a claim on the counterparty. Deteriorating dealer credit raises the risk that the claim will not be honoured.',
    difficulty: 'hard',
    tags: ['counterparty-risk', 'otc', 'swaps'],
  }),
] as const;
