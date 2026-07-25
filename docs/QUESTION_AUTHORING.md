# Question Authoring Guide

## Write a decision, not an exam item

Good:

> A pension fund must make a large payment in six months. The team proposes moving that cash into volatile small-cap shares. What should take priority?

Bad:

> Which statement regarding liquidity is most accurate?

The good version gives the player a role, constraint, and meaningful choice.

## Required qualities

Every scenario must:

- be written from scratch;
- describe a concrete investment, company, client, market, regulatory, or fund situation;
- be answerable in about 15 seconds;
- contain exactly four plausible answers;
- have exactly one best answer;
- test a recognizable finance competency;
- avoid unnecessary calculation and obscure wording;
- use clear international English.

Never copy, reconstruct, or closely paraphrase proprietary exam questions or examples.

## Answers

Incorrect answers should represent credible mistakes:

- focusing on the wrong time horizon;
- confusing profit with cash;
- ignoring liquidity or covariance;
- treating correlation as causation;
- using stale valuation inputs;
- overlooking conflicts or incentives.

Do not use jokes, obviously absurd choices, or several answers that are equally defensible.

Vary the position of the correct answer. The core pack balances positions evenly.

## Explanations

Use one or two sentences to explain the principle:

Good:

> A near-term known liability requires liquid, low-volatility assets. Return seeking should not endanger the ability to make the payment.

Bad:

> C is correct because liquidity matters.

## Difficulty

- **Easy:** one direct principle with limited ambiguity.
- **Medium:** relevant details must be prioritized or a common misconception avoided.
- **Hard:** interacting risks, less visible exposures, or second-order effects must be recognized quickly.

Difficulty should come from finance reasoning, not tricky language.

## Resource effects

Effects must follow the scenario:

- ethics and disclosure → LP Trust and Reputation;
- cash management → Liquidity and Capital;
- leverage, duration, or hedging → Risk Buffer and Capital;
- governance → Reputation and LP Trust;
- investment judgement → Capital.

Consequences are immediate. Do not encode delayed effects.

## IDs and tags

Use a stable topic prefix and a descriptive slug, for example:

```text
fixed-011-refinancing-wall
eth-014-allocation-conflict
pm-018-liability-liquidity
```

Tags should identify concrete concepts such as `duration`, `working-capital`, `venture-capital`, or `fair-dealing`.

## Contribution workflow

1. Add the question to the appropriate file in `data/questions/topics/`.
2. Use the shared `createQuestion` factory.
3. Keep the topic’s difficulty and concept coverage balanced.
4. Run `npm run validate:content`.
5. Run `npm run check`.
6. Request review from someone who can assess both finance accuracy and writing clarity.

No engine change is required.
