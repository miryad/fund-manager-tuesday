import { createQuestion } from '../questionFactory';

export const corporateIssuersQuestions = [
  createQuestion('corporate-issuers', {
    id: 'corp-001-positive-npv-project',
    scenario:
      'A manufacturer can fund a project whose expected cash inflows comfortably exceed its cost after discounting at the project’s risk-adjusted rate. What should the board prefer?',
    answers: [
      'Reject it because all new projects increase risk',
      'Reject it unless it is financed entirely with debt',
      'Accept only if accounting profit is positive in year one',
      'Accept it because it is expected to add value',
    ],
    correctIndex: 3,
    explanation:
      'A positive net present value indicates expected value creation after considering timing and risk. Near-term accounting profit is not the deciding measure.',
    difficulty: 'easy',
    tags: ['capital-budgeting', 'npv', 'board'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-002-working-capital-growth',
    scenario:
      'A fast-growing wholesaler must pay suppliers in 30 days but collects from customers in 90 days. What financing pressure grows with sales?',
    answers: [
      'A reduction in the cash tied up by growth',
      'A permanent improvement in gross margin',
      'Automatic financing from longer customer terms',
      'The need to fund the working-capital gap',
    ],
    correctIndex: 3,
    explanation:
      'Growth consumes cash when supplier payments precede customer collections. The company must finance that operating-cycle gap.',
    difficulty: 'easy',
    tags: ['working-capital', 'cash-conversion', 'growth'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-003-founder-dilution',
    scenario:
      'A startup issues new shares to fund expansion. The founder does not participate. What happens to the founder’s ownership percentage?',
    answers: [
      'It rises because the company has more cash',
      'It stays fixed unless the share price falls',
      'It falls because the total share count increases',
      'It becomes equal to the investor’s percentage',
    ],
    correctIndex: 2,
    explanation:
      'Issuing shares increases the denominator of ownership. A holder who does not buy proportionately is diluted.',
    difficulty: 'easy',
    tags: ['venture-capital', 'dilution', 'equity-financing'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-004-buyback-when-cheap',
    scenario:
      'A mature company has surplus cash, no attractive projects, and shares trading well below the board’s conservative estimate of value. Which use of cash is most defensible?',
    answers: [
      'Acquire a competitor at a large strategic premium',
      'Pay all surplus cash as an immediate special dividend',
      'Keep the cash indefinitely despite having no identified use',
      'Repurchase shares while preserving necessary liquidity',
    ],
    correctIndex: 3,
    explanation:
      'A buyback can create value when shares are genuinely undervalued and the company retains enough liquidity for operations and good projects.',
    difficulty: 'easy',
    tags: ['buybacks', 'capital-allocation', 'liquidity'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-005-founder-bridge-round',
    scenario:
      'A startup needs a bridge round after missing milestones. Existing investors propose funding only if the plan clearly extends runway to a measurable target. What should the board examine first?',
    answers: [
      'Whether the new capital reaches the target under realistic burn assumptions',
      'Whether the headline valuation matches the prior round',
      'Whether the financing avoids every change in ownership',
      'Whether investor demand makes the round look oversubscribed',
    ],
    correctIndex: 0,
    explanation:
      'Bridge financing should connect the company to a credible milestone. Runway and execution assumptions matter more than presentation or headline valuation.',
    difficulty: 'medium',
    tags: ['venture-capital', 'bridge-round', 'runway'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-006-debt-tax-shield',
    scenario:
      'A profitable company considers replacing some equity with debt. What is a genuine benefit, before considering distress risk?',
    answers: [
      'Debt removes all business risk',
      'Debt guarantees a higher credit rating',
      'Interest may reduce taxable income',
      'Debt makes cash flows permanent',
    ],
    correctIndex: 2,
    explanation:
      'Interest deductibility can create a tax shield. That benefit must be weighed against financial distress, covenants, and reduced flexibility.',
    difficulty: 'medium',
    tags: ['capital-structure', 'tax-shield', 'leverage'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-007-acquisition-synergy',
    scenario:
      'A buyer justifies a high acquisition premium with “synergies.” What evidence should the investment committee demand?',
    answers: [
      'A higher combined revenue figure before integration costs',
      'A timed, costed plan showing who delivers specific cash-flow benefits',
      'Management’s estimate of the addressable market',
      'The buyer’s historical acquisition volume',
    ],
    correctIndex: 1,
    explanation:
      'Synergies create value only when identifiable benefits exceed integration costs and are realistically executable. Vague strategic language is insufficient.',
    difficulty: 'medium',
    tags: ['mergers-acquisitions', 'synergies', 'execution'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-008-startup-liquidation-preference',
    scenario:
      'A founder focuses only on the headline valuation of a new venture round. Investors also request a strong liquidation preference. What should the founder compare?',
    answers: [
      'Only the amount of new cash raised',
      'Only the investor ownership percentage at closing',
      'Only the pre-money valuation',
      'The full payout economics across realistic exit values',
    ],
    correctIndex: 3,
    explanation:
      'Headline valuation does not capture how exit proceeds are divided. Preference terms can materially change founder and investor outcomes.',
    difficulty: 'medium',
    tags: ['venture-capital', 'liquidation-preference', 'term-sheet'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-009-venture-debt-covenant',
    scenario:
      'A loss-making startup considers venture debt to delay an equity round. The loan has a minimum-cash covenant. What risk deserves the most attention?',
    answers: [
      'The covenant may trigger precisely when cash is scarce, reducing flexibility',
      'Debt is cheaper than equity, so covenant risk is secondary',
      'The loan will eliminate dilution with no trade-off',
      'The interest tax shield will offset every cash payment',
    ],
    correctIndex: 0,
    explanation:
      'Debt can extend runway but adds fixed claims and covenants. A minimum-cash trigger can accelerate pressure during an operating setback.',
    difficulty: 'hard',
    tags: ['venture-capital', 'venture-debt', 'covenants'],
  }),
  createQuestion('corporate-issuers', {
    id: 'corp-010-real-options-pilot',
    scenario:
      'A company can make a small initial investment to test uncertain technology, then expand only if results are strong. Why might this beat committing the full budget today?',
    answers: [
      'The pilot guarantees commercial success',
      'The staged plan preserves the option to expand or stop after learning',
      'Small projects require no discount rate',
      'Future investment becomes free',
    ],
    correctIndex: 1,
    explanation:
      'Staging creates flexibility under uncertainty. Management pays for information before committing the larger amount, limiting downside while retaining upside.',
    difficulty: 'hard',
    tags: ['venture-capital', 'real-options', 'staged-investment'],
  }),
] as const;
