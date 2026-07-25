import { createQuestion } from '../questionFactory';

export const fixedIncomeQuestions = [
  createQuestion('fixed-income', {
    id: 'fixed-001-rates-and-price',
    scenario:
      'You own a fixed-rate bond. Market yields rise immediately after purchase, while credit quality is unchanged. What happens to the bond’s price?',
    answers: [
      'It rises to match the higher yield',
      'It stays fixed until maturity',
      'It falls because its existing cash flows are less attractive',
      'It becomes equal to its coupon payment',
    ],
    correctIndex: 2,
    explanation:
      'Bond prices and market yields move inversely. The fixed cash flows must trade at a lower price to offer the new higher yield.',
    difficulty: 'easy',
    tags: ['interest-rates', 'bond-pricing', 'yield'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-002-credit-spread',
    scenario:
      'A company’s prospects deteriorate, but government yields are unchanged. What is most likely to happen to its bond spread?',
    answers: [
      'It widens to compensate investors for greater credit risk',
      'It narrows because the bond is now cheaper',
      'It disappears because government yields did not move',
      'It becomes the same as the coupon rate',
    ],
    correctIndex: 0,
    explanation:
      'Worsening credit quality increases the extra yield investors demand over a safer benchmark, causing the credit spread to widen.',
    difficulty: 'easy',
    tags: ['credit-spread', 'default-risk', 'corporate-bonds'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-003-callable-bond',
    scenario:
      'Interest rates fall sharply. You own a high-coupon bond that the issuer can redeem early. What limits your upside?',
    answers: [
      'The issuer must increase the coupon',
      'The bond’s maturity automatically extends',
      'The bond loses all credit risk',
      'The issuer may call the bond and refinance more cheaply',
    ],
    correctIndex: 3,
    explanation:
      'The call option benefits the issuer when rates fall. Investors may lose the attractive coupon and have to reinvest at lower yields.',
    difficulty: 'easy',
    tags: ['callable-bond', 'reinvestment-risk', 'embedded-options'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-004-duration-choice',
    scenario:
      'Two government bonds have similar yields. One matures in two years and the other in twenty years. If rates rise, which is generally more exposed?',
    answers: [
      'The two-year bond because it returns principal sooner',
      'The twenty-year bond because its distant cash flows have greater duration',
      'Both must move by exactly the same amount',
      'Neither, because governments issue them',
    ],
    correctIndex: 1,
    explanation:
      'Longer-dated cash flows are generally more sensitive to discount-rate changes. The twenty-year bond therefore carries greater interest-rate risk.',
    difficulty: 'easy',
    tags: ['duration', 'interest-rate-risk', 'government-bonds'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-005-startup-convertible-note',
    scenario:
      'A startup raises a convertible note that becomes equity in a later funding round. Why might an investor accept a lower cash coupon?',
    answers: [
      'The conversion feature offers potential equity upside',
      'Convertible notes cannot default',
      'The note has no maturity or repayment claim',
      'Conversion guarantees a profitable exit',
    ],
    correctIndex: 0,
    explanation:
      'The conversion option can compensate investors through potential ownership upside. It does not remove credit, maturity, or valuation risk.',
    difficulty: 'medium',
    tags: ['venture-capital', 'convertible-note', 'embedded-options'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-006-reinvestment-risk',
    scenario:
      'A pension fund relies on coupon income to meet future payments. Market rates decline. What risk becomes more important?',
    answers: [
      'Past coupons will be cancelled',
      'Bond principal will immediately double',
      'Coupons may be reinvested at lower yields',
      'The pension liability will disappear',
    ],
    correctIndex: 2,
    explanation:
      'Falling rates reduce the return available when coupons or principal are reinvested. This can weaken the fund’s ability to compound toward its target.',
    difficulty: 'medium',
    tags: ['reinvestment-risk', 'pension-fund', 'cash-flows'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-007-covenant-protection',
    scenario:
      'A leveraged borrower wants to issue more debt secured by the same assets. Which existing bond term would provide the clearest protection?',
    answers: [
      'A higher share price target',
      'A covenant limiting additional secured borrowing',
      'A longer annual report',
      'A floating accounting depreciation rate',
    ],
    correctIndex: 1,
    explanation:
      'A covenant restricting additional secured debt can protect existing creditors from dilution of their claim on collateral.',
    difficulty: 'medium',
    tags: ['covenants', 'secured-debt', 'credit-analysis'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-008-mortgage-prepayment',
    scenario:
      'Mortgage rates fall, and homeowners refinance faster than expected. What happens to an investor in mortgage-backed bonds?',
    answers: [
      'Principal is returned later at the old high yield',
      'Credit risk vanishes permanently',
      'Coupons rise with house prices',
      'Principal returns sooner and must be reinvested at lower rates',
    ],
    correctIndex: 3,
    explanation:
      'Falling rates encourage prepayment, shortening the investment just when reinvestment opportunities are less attractive.',
    difficulty: 'medium',
    tags: ['mortgage-backed', 'prepayment', 'reinvestment-risk'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-009-curve-steepener',
    scenario:
      'You expect short-term rates to stay anchored while long-term yields rise. Which unhedged bond position is most vulnerable?',
    answers: [
      'A long-duration bond concentrated at the long end',
      'A floating-rate note resetting next week',
      'A treasury bill maturing tomorrow',
      'Cash held overnight',
    ],
    correctIndex: 0,
    explanation:
      'A steepening driven by higher long yields hurts long-duration bonds most because their cash flows are discounted at the rising end of the curve.',
    difficulty: 'hard',
    tags: ['yield-curve', 'steepening', 'duration'],
  }),
  createQuestion('fixed-income', {
    id: 'fixed-010-credit-loss',
    scenario:
      'Two bonds have the same probability of default. Bond A is senior secured; Bond B is deeply subordinated. What should distinguish their expected credit losses?',
    answers: [
      'Only their coupon payment dates',
      'Their expected recovery if default occurs',
      'Their remaining maturity regardless of collateral',
      'Nothing, because equal default probability implies equal loss',
    ],
    correctIndex: 1,
    explanation:
      'Expected loss combines default probability with loss severity. Senior secured debt generally has better recovery prospects than subordinated debt.',
    difficulty: 'hard',
    tags: ['expected-loss', 'recovery', 'seniority'],
  }),
] as const;
