import type { Answer, Difficulty, Question, Resource } from '../../src/game/types';
import { TOPIC_COMPETENCIES, type QuestionTopic } from '../../src/game/questions';

export const PRODUCTION_PACK_ID = 'fund-manager-tuesday-core-100';
export const CONTENT_AUTHOR = 'Fund Manager Tuesday contributors';
export const CONTENT_SOURCE = 'https://github.com/fund-manager-tuesday';

const TOPIC_RESOURCES: Readonly<Record<QuestionTopic, readonly [Resource, Resource]>> = {
  ethics: ['lpTrust', 'reputation'],
  'quantitative-methods': ['riskBuffer', 'capital'],
  economics: ['capital', 'riskBuffer'],
  'financial-statement-analysis': ['capital', 'reputation'],
  'corporate-issuers': ['capital', 'lpTrust'],
  'equity-investments': ['capital', 'riskBuffer'],
  'fixed-income': ['riskBuffer', 'capital'],
  derivatives: ['riskBuffer', 'capital'],
  'alternative-investments': ['capital', 'liquidity'],
  'portfolio-management': ['riskBuffer', 'liquidity'],
};

const TOPIC_IMPACT_REASONS: Readonly<Record<QuestionTopic, readonly [string, string]>> = {
  ethics: ['Stakeholder confidence strengthened.', 'Trust and reputation were exposed.'],
  'quantitative-methods': [
    'Disciplined analysis improved decision quality.',
    'Weak measurement increased model risk.',
  ],
  economics: [
    'Sound macro reasoning protected fund capital.',
    'A weak macro response increased portfolio risk.',
  ],
  'financial-statement-analysis': [
    'Careful financial analysis protected capital.',
    'A reporting misread weakened investment credibility.',
  ],
  'corporate-issuers': [
    'Sound corporate finance judgement supported value.',
    'The decision weakened capital discipline and owner trust.',
  ],
  'equity-investments': [
    'Valuation discipline protected capital.',
    'Weak equity judgement increased downside exposure.',
  ],
  'fixed-income': [
    'Credit and rate risk were managed carefully.',
    'The bond decision exposed capital to avoidable risk.',
  ],
  derivatives: [
    'The derivative exposure was controlled.',
    'The position introduced avoidable leverage or basis risk.',
  ],
  'alternative-investments': [
    'Illiquid investment risk was handled carefully.',
    'The decision strained capital or liquidity.',
  ],
  'portfolio-management': [
    'Portfolio risk was allocated deliberately.',
    'The decision weakened diversification or liquidity.',
  ],
};

export interface QuestionSeed {
  readonly id: string;
  readonly scenario: string;
  readonly answers: readonly [string, string, string, string];
  readonly correctIndex: 0 | 1 | 2 | 3;
  readonly explanation: string;
  readonly difficulty: Difficulty;
  readonly tags: readonly string[];
}

export function createQuestion(topic: QuestionTopic, seed: QuestionSeed): Question {
  const resources = TOPIC_RESOURCES[topic];
  const impactReasons = TOPIC_IMPACT_REASONS[topic];
  const answers = seed.answers.map((text, index): Answer => {
    const correct = index === seed.correctIndex;
    return {
      id: `${seed.id}-${String.fromCharCode(97 + index)}`,
      text,
      resourceChanges: [
        {
          resource: correct ? resources[0] : resources[index % resources.length]!,
          amount: correct ? 3 : -4,
          reason: correct ? impactReasons[0] : impactReasons[1],
        },
      ],
    };
  }) as unknown as readonly [Answer, Answer, Answer, Answer];

  return {
    id: seed.id,
    scenario: seed.scenario,
    answers,
    correctAnswerId: answers[seed.correctIndex].id,
    explanation: seed.explanation,
    metadata: {
      competency: TOPIC_COMPETENCIES[topic],
      topic,
      difficulty: seed.difficulty,
      tags: seed.tags,
      selectionWeight: 1,
      packId: PRODUCTION_PACK_ID,
      author: CONTENT_AUTHOR,
      contributorUrl: CONTENT_SOURCE,
    },
    schemaVersion: 1,
  };
}
