import { createQuestion } from '../questionFactory';

export const economicsQuestions = [
  createQuestion('economics', {
    id: 'econ-001-inflation-bond-pressure',
    scenario:
      'Inflation surprises sharply higher and investors expect the central bank to tighten policy. What is the most immediate concern for your long-term government bonds?',
    answers: [
      'Their coupons will automatically rise',
      'Their prices may fall as market yields rise',
      'Their credit rating must improve',
      'Their maturity dates will shorten',
    ],
    correctIndex: 1,
    explanation:
      'Higher expected policy rates usually push market yields upward. Existing long-duration bonds then lose value because their fixed cash flows are less attractive.',
    difficulty: 'easy',
    tags: ['inflation', 'interest-rates', 'duration'],
  }),
  createQuestion('economics', {
    id: 'econ-002-currency-revenue',
    scenario:
      'A domestic company earns most revenue abroad. Its home currency strengthens materially while foreign sales volumes stay unchanged. What pressure should you expect?',
    answers: [
      'Translation has no effect on reported revenue',
      'Foreign revenue automatically earns a higher margin',
      'The company’s foreign prices fall in local markets',
      'Foreign revenue translates into fewer home-currency units',
    ],
    correctIndex: 3,
    explanation:
      'A stronger reporting currency reduces the home-currency value of unchanged foreign-currency revenue, creating a translation headwind.',
    difficulty: 'easy',
    tags: ['currency', 'translation', 'corporate-earnings'],
  }),
  createQuestion('economics', {
    id: 'econ-003-price-cap-shortage',
    scenario:
      'A government caps apartment rents below the market-clearing level while demand remains strong. What is the likely result?',
    answers: [
      'A permanent surplus of available apartments',
      'Higher construction incentives',
      'A stronger market-clearing signal',
      'A shortage because quantity demanded exceeds quantity supplied',
    ],
    correctIndex: 3,
    explanation:
      'A binding price ceiling encourages demand while discouraging supply. The gap appears as shortages or non-price rationing.',
    difficulty: 'easy',
    tags: ['price-controls', 'supply-demand', 'housing'],
  }),
  createQuestion('economics', {
    id: 'econ-004-startup-demand-elasticity',
    scenario:
      'A subscription startup raises price by 5% and customer cancellations jump sharply. What does this suggest about demand?',
    answers: [
      'Demand is perfectly inelastic',
      'Supply has become fixed',
      'Customers are relatively price-sensitive',
      'Marginal cost must be zero',
    ],
    correctIndex: 2,
    explanation:
      'A large quantity response to a small price change indicates relatively elastic demand. Customers may have good substitutes or low switching costs.',
    difficulty: 'easy',
    tags: ['venture-capital', 'elasticity', 'pricing'],
  }),
  createQuestion('economics', {
    id: 'econ-005-yield-curve-inversion',
    scenario:
      'Short-term government yields rise above long-term yields as markets expect tight policy to slow growth. How should you read the curve?',
    answers: [
      'As proof that inflation has ended',
      'As a signal of restrictive conditions and weaker future growth expectations',
      'As evidence that long bonds have no interest-rate risk',
      'As a guarantee of recession next quarter',
    ],
    correctIndex: 1,
    explanation:
      'An inverted curve often reflects tight current policy and expectations of slower growth or future rate cuts. It is informative, not a guaranteed timetable.',
    difficulty: 'medium',
    tags: ['yield-curve', 'monetary-policy', 'growth'],
  }),
  createQuestion('economics', {
    id: 'econ-006-fiscal-crowding-out',
    scenario:
      'The economy is near capacity when the government launches a large debt-funded spending programme. What risk should a bond investor consider?',
    answers: [
      'Higher borrowing demand may push interest rates upward',
      'Government spending must reduce nominal output',
      'Private investment must rise one-for-one',
      'Bond supply will necessarily fall',
    ],
    correctIndex: 0,
    explanation:
      'When resources are already stretched, additional government borrowing can raise rates and compete with private borrowers for capital.',
    difficulty: 'medium',
    tags: ['fiscal-policy', 'crowding-out', 'interest-rates'],
  }),
  createQuestion('economics', {
    id: 'econ-007-network-effects-entry',
    scenario:
      'A messaging startup becomes more useful as each new user joins. A competitor has similar technology but few users. What protects the incumbent most?',
    answers: [
      'A lower accounting depreciation charge',
      'A perfectly elastic supply curve',
      'A weaker currency',
      'Network effects that raise the challenger’s adoption hurdle',
    ],
    correctIndex: 3,
    explanation:
      'Network effects increase product value with participation, creating an adoption barrier even when a competitor can reproduce the technology.',
    difficulty: 'medium',
    tags: ['venture-capital', 'network-effects', 'competition'],
  }),
  createQuestion('economics', {
    id: 'econ-008-oil-importer-shock',
    scenario:
      'Oil prices surge for a country that imports nearly all its energy. Which near-term combination is most plausible?',
    answers: [
      'Lower inflation and stronger trade balance',
      'Higher productivity and lower import costs',
      'Higher inflation pressure and a weaker trade balance',
      'No macro effect because oil is priced globally',
    ],
    correctIndex: 2,
    explanation:
      'More expensive imported energy raises domestic costs and the import bill. That can lift inflation while worsening the trade balance.',
    difficulty: 'medium',
    tags: ['commodity-shock', 'inflation', 'trade-balance'],
  }),
  createQuestion('economics', {
    id: 'econ-009-real-rate-policy',
    scenario:
      'A central bank holds its policy rate at 4% while expected inflation falls from 5% to 2%. Without changing the nominal rate, what happens to policy conditions?',
    answers: [
      'Real rates rise, making policy more restrictive',
      'Real rates fall, making policy more expansionary',
      'Real rates are unchanged because the nominal rate is fixed',
      'Real rates become impossible to estimate',
    ],
    correctIndex: 0,
    explanation:
      'The expected real rate is approximately the nominal rate minus expected inflation. Falling inflation expectations therefore tighten real financial conditions.',
    difficulty: 'hard',
    tags: ['real-rates', 'monetary-policy', 'inflation-expectations'],
  }),
  createQuestion('economics', {
    id: 'econ-010-currency-carry-reversal',
    scenario:
      'A portfolio borrows in a low-rate currency to buy high-yielding foreign assets. Global risk appetite suddenly collapses. What hidden exposure is most dangerous?',
    answers: [
      'The high-yield currency must appreciate',
      'Both currencies will remain fixed',
      'The funding currency may strengthen as the carry trade unwinds',
      'Interest differentials eliminate currency risk',
    ],
    correctIndex: 2,
    explanation:
      'Carry returns can reverse when investors flee risk and repay funding currencies. Currency losses can overwhelm the yield advantage.',
    difficulty: 'hard',
    tags: ['currency', 'carry-trade', 'risk-off'],
  }),
] as const;
