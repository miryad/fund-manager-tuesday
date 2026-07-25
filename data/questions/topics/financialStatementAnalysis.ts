import { createQuestion } from '../questionFactory';

export const financialStatementAnalysisQuestions = [
  createQuestion('financial-statement-analysis', {
    id: 'fsa-001-receivables-growth',
    scenario:
      'A company reports strong revenue growth, but receivables are rising much faster than sales. What should concern you first?',
    answers: [
      'Customers may be paying more slowly or revenue quality may be weakening',
      'The company is collecting cash faster',
      'Inventory turnover must have improved',
      'Debt has automatically declined',
    ],
    correctIndex: 0,
    explanation:
      'Receivables growing faster than sales can signal looser credit terms, collection problems, or aggressive revenue recognition.',
    difficulty: 'easy',
    tags: ['receivables', 'revenue-quality', 'working-capital'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-002-capitalised-costs',
    scenario:
      'A software company begins capitalising development spending that it previously expensed. What is the immediate effect, all else equal?',
    answers: [
      'Current profit falls and assets fall',
      'Cash flow from operations must fall by the full amount',
      'Current profit and reported assets rise',
      'Total cash flow increases',
    ],
    correctIndex: 2,
    explanation:
      'Capitalisation delays expense recognition and records an asset, raising current profit. It changes classification and timing, not total cash generated.',
    difficulty: 'easy',
    tags: ['capitalisation', 'software', 'earnings-quality'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-003-inventory-write-down',
    scenario:
      'A retailer discovers that old inventory can only be sold below its recorded cost. What is the prudent accounting response?',
    answers: [
      'Keep the carrying value until the goods are sold',
      'Increase revenue to offset the expected loss',
      'Move the inventory into receivables',
      'Write inventory down and recognise the loss',
    ],
    correctIndex: 3,
    explanation:
      'Inventory should not remain recorded above the amount expected to be recovered. A write-down recognises the economic loss promptly.',
    difficulty: 'easy',
    tags: ['inventory', 'write-down', 'conservatism'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-004-startup-runway',
    scenario:
      'A startup shows twelve months of runway by dividing cash by last month’s net burn. Hiring is accelerating. What adjustment matters most?',
    answers: [
      'Use gross revenue instead of cash',
      'Forecast future burn rather than assuming last month stays constant',
      'Exclude payroll because it is recurring',
      'Add committed but unsigned customer contracts to cash',
    ],
    correctIndex: 1,
    explanation:
      'Runway depends on future cash use. A rising cost base makes a flat historical burn assumption too optimistic.',
    difficulty: 'medium',
    tags: ['venture-capital', 'cash-burn', 'forecasting'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-005-operating-cash-gap',
    scenario:
      'Net income rises, but operating cash flow falls because inventory and receivables absorb cash. How should you interpret the result?',
    answers: [
      'Earnings are converting poorly into cash',
      'The company has no working-capital risk',
      'Depreciation must equal capital expenditure',
      'The cash flow statement is irrelevant when profit rises',
    ],
    correctIndex: 0,
    explanation:
      'Working-capital investment can make reported earnings outpace cash generation. Persistent divergence deserves investigation.',
    difficulty: 'medium',
    tags: ['cash-flow', 'working-capital', 'earnings-quality'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-006-deferred-revenue',
    scenario:
      'Customers pay a subscription company one year in advance. At payment, what best describes the accounting effect?',
    answers: [
      'All cash is immediately recognised as profit',
      'Revenue and receivables both fall',
      'Cash rises with a liability for service still owed',
      'Cash rises and debt disappears',
    ],
    correctIndex: 2,
    explanation:
      'Advance payment creates cash but also an obligation to provide future service. Revenue is recognised as that obligation is satisfied.',
    difficulty: 'medium',
    tags: ['deferred-revenue', 'subscriptions', 'revenue-recognition'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-007-debt-covenant-ebitda',
    scenario:
      'A borrower adds unusual “one-time” costs back to EBITDA every quarter to stay within a leverage covenant. What should you examine?',
    answers: [
      'Whether the company can rename debt as equity',
      'Whether revenue uses whole numbers',
      'Whether depreciation is a cash receipt',
      'Whether the supposedly unusual costs are actually recurring',
    ],
    correctIndex: 3,
    explanation:
      'Repeated adjustments may overstate sustainable earnings and understate leverage. Recurring costs should not be treated as exceptional indefinitely.',
    difficulty: 'medium',
    tags: ['ebitda', 'covenants', 'adjustments'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-008-startup-cohort-margin',
    scenario:
      'A startup reports improving gross margin, but it recently moved customer-support payroll below gross profit. What is your first analytical response?',
    answers: [
      'Accept the trend because total payroll is unchanged',
      'Recast prior and current periods using a consistent classification',
      'Ignore gross margin and use website traffic',
      'Capitalise all support salaries',
    ],
    correctIndex: 1,
    explanation:
      'Changing cost classification can create artificial margin improvement. Comparable periods require a consistent definition of cost of revenue.',
    difficulty: 'hard',
    tags: ['venture-capital', 'gross-margin', 'comparability'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-009-pension-assumption',
    scenario:
      'A company raises the discount rate used for a long-dated defined-benefit obligation while benefits are unchanged. What happens initially?',
    answers: [
      'The present value of the obligation generally falls',
      'The obligation rises because discounting increases',
      'Cash contributions immediately stop',
      'The workforce becomes younger',
    ],
    correctIndex: 0,
    explanation:
      'A higher discount rate reduces the present value of distant promised payments. It changes the estimate, not the underlying benefit promise.',
    difficulty: 'hard',
    tags: ['pensions', 'discount-rate', 'liabilities'],
  }),
  createQuestion('financial-statement-analysis', {
    id: 'fsa-010-acquisition-cash-flow',
    scenario:
      'Two acquisitive companies report similar operating cash flow. One classifies frequent customer-list purchases as investing cash outflows. What comparison issue arises?',
    answers: [
      'Investing cash flow is always part of revenue',
      'Acquisitions eliminate the need for working capital',
      'Operating cash flow may look stronger even though purchased growth is economically recurring',
      'Customer lists cannot be assets',
    ],
    correctIndex: 2,
    explanation:
      'Cash-flow classification can flatter operating performance when recurring growth investment is acquired rather than developed internally. Analysts should consider total economics.',
    difficulty: 'hard',
    tags: ['cash-flow-classification', 'acquisitions', 'comparability'],
  }),
] as const;
