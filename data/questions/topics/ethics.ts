import { createQuestion } from '../questionFactory';

export const ethicsQuestions = [
  createQuestion('ethics', {
    id: 'eth-001-founder-side-letter',
    scenario:
      'A founder offers your venture fund early access to the next round if you keep a serious customer complaint from the other investors. What do you do?',
    answers: [
      'Accept because early access benefits the fund',
      'Ask the founder for a larger allocation in exchange',
      'Wait until the next round closes, then mention it',
      'Refuse and disclose the complaint through the agreed investor process',
    ],
    correctIndex: 3,
    explanation:
      'Preferential access cannot justify concealing material information. Transparent, consistent disclosure protects investors and the integrity of the process.',
    difficulty: 'easy',
    tags: ['venture-capital', 'disclosure', 'conflicts'],
  }),
  createQuestion('ethics', {
    id: 'eth-002-personal-founder-investment',
    scenario:
      'You are reviewing a startup for your fund and want to invest personally before the investment committee meets. What is the cleanest response?',
    answers: [
      'Invest quietly because the cheque is small',
      'Invest after the founder signs a non-disclosure agreement',
      'Disclose the conflict and follow the fund’s personal-dealing policy',
      'Ask a relative to make the investment',
    ],
    correctIndex: 2,
    explanation:
      'A personal position can conflict with the fund’s opportunity and your objectivity. Disclosure and the established dealing policy should govern the decision.',
    difficulty: 'easy',
    tags: ['venture-capital', 'personal-dealing', 'conflicts'],
  }),
  createQuestion('ethics', {
    id: 'eth-003-mistaken-performance-chart',
    scenario:
      'An LP presentation overstates last year’s return because a benchmark column was copied incorrectly. The meeting starts in ten minutes. What do you do?',
    answers: [
      'Correct the slide and explain the revision before discussing performance',
      'Use the slide because the underlying portfolio return is unchanged',
      'Present it, then email a correction only if someone notices',
      'Remove all benchmark comparisons without explanation',
    ],
    correctIndex: 0,
    explanation:
      'Performance communication must be accurate and not misleading. Correcting the error promptly is more important than avoiding an awkward explanation.',
    difficulty: 'easy',
    tags: ['lp-reporting', 'performance', 'accuracy'],
  }),
  createQuestion('ethics', {
    id: 'eth-004-gift-from-broker',
    scenario:
      'A broker competing for your trading business offers an expensive weekend trip. Your firm has no pre-approval on file. What should you do?',
    answers: [
      'Accept if you promise not to discuss trading',
      'Accept and split the value across the team',
      'Pay only for the hotel and accept the rest',
      'Decline or seek formal approval before accepting anything',
    ],
    correctIndex: 3,
    explanation:
      'A valuable gift from a potential service provider can impair or appear to impair independence. Prior approval or refusal protects objective decision making.',
    difficulty: 'easy',
    tags: ['gifts', 'broker-selection', 'independence'],
  }),
  createQuestion('ethics', {
    id: 'eth-005-research-before-client-trade',
    scenario:
      'Your team is about to issue a strong buy recommendation. A colleague suggests buying the shares for the staff account first. What is your response?',
    answers: [
      'Allow it if the position is held for a year',
      'Allow it after the research draft is complete',
      'Block the staff trade until clients have a fair opportunity to act',
      'Permit only senior staff to participate',
    ],
    correctIndex: 2,
    explanation:
      'Trading ahead of a client recommendation disadvantages clients. Personal transactions must not precede the fair dissemination of investment advice.',
    difficulty: 'medium',
    tags: ['client-priority', 'personal-dealing', 'research'],
  }),
  createQuestion('ethics', {
    id: 'eth-006-selective-loss-disclosure',
    scenario:
      'A large LP asks for a private update on a portfolio loss before the scheduled report reaches smaller LPs. The agreements grant equal information rights. What do you do?',
    answers: [
      'Tell the large LP because it supplies more capital',
      'Share the material update through the same process for all entitled LPs',
      'Provide numbers verbally so there is no written record',
      'Delay every report until the loss has recovered',
    ],
    correctIndex: 1,
    explanation:
      'When investors have equal information rights, material updates should be distributed fairly. Investor size does not justify selective disclosure.',
    difficulty: 'medium',
    tags: ['lp-reporting', 'fair-dealing', 'material-information'],
  }),
  createQuestion('ethics', {
    id: 'eth-007-model-risk-omission',
    scenario:
      'A risk model looks impressive in a client pitch, but you know it excludes the strategy’s worst historical month. How should the model be presented?',
    answers: [
      'Keep the omission because the month was unusual',
      'Show only the final risk score',
      'Replace the model with the best competitor result',
      'Include the month and explain the model’s assumptions and limitations',
    ],
    correctIndex: 3,
    explanation:
      'A model becomes misleading when material observations or limitations are hidden. Clients need a fair description of both method and weaknesses.',
    difficulty: 'medium',
    tags: ['model-risk', 'client-communication', 'misrepresentation'],
  }),
  createQuestion('ethics', {
    id: 'eth-008-proxy-vote-conflict',
    scenario:
      'Your fund must vote on a merger involving a company whose chief executive is also a major client of your firm. What is the best process?',
    answers: [
      'Disclose the conflict and apply the documented proxy-voting policy',
      'Vote for the merger to protect the client relationship',
      'Abstain automatically without reviewing client interests',
      'Let the chief executive choose the vote',
    ],
    correctIndex: 0,
    explanation:
      'A documented conflict process keeps the vote focused on beneficiary interests. Automatic support or delegation would sacrifice independent judgement.',
    difficulty: 'medium',
    tags: ['proxy-voting', 'conflicts', 'fiduciary-duty'],
  }),
  createQuestion('ethics', {
    id: 'eth-009-mosaic-research',
    scenario:
      'You combine public shipping data, a supplier interview, and an immaterial comment from an executive to forecast sales. No source alone is material non-public information. Can the research be used?',
    answers: [
      'No, any executive comment prohibits trading',
      'Yes, if the conclusion comes from legitimate analysis of permitted inputs',
      'Only after the company confirms your forecast',
      'Only if every source is named in the published note',
    ],
    correctIndex: 1,
    explanation:
      'Analysts may reach a material conclusion by combining public and immaterial non-public information. The key is that no input was itself material and improperly obtained.',
    difficulty: 'hard',
    tags: ['mosaic-theory', 'research', 'material-information'],
  }),
  createQuestion('ethics', {
    id: 'eth-010-cross-fund-allocation',
    scenario:
      'Two funds you manage both qualify for a scarce bond allocation. One pays a higher fee, while the other has the stronger mandate fit. How should you allocate?',
    answers: [
      'Give everything to the higher-fee fund',
      'Split it equally regardless of portfolio needs',
      'Apply the pre-disclosed allocation policy based on mandate and suitability',
      'Allocate to whichever fund performed worse last quarter',
    ],
    correctIndex: 2,
    explanation:
      'Scarce opportunities require a consistent, fair allocation process. Fees should not override mandate fit and the documented treatment of clients.',
    difficulty: 'hard',
    tags: ['allocation', 'fair-dealing', 'client-priority'],
  }),
] as const;
