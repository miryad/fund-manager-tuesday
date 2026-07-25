import type {
  Answer,
  Competency,
  Difficulty,
  Question,
  QuestionPack,
  ResourceChange,
} from '../../src/game/types';
import type { QuestionTopic } from '../../src/game/questions';

const COMPETENCY_TOPICS: Readonly<Record<Competency, QuestionTopic>> = {
  ethicsAndProfessionalStandards: 'ethics',
  quantitativeMethods: 'quantitative-methods',
  economics: 'economics',
  financialStatementAnalysis: 'financial-statement-analysis',
  corporateIssuers: 'corporate-issuers',
  equityInvestments: 'equity-investments',
  fixedIncome: 'fixed-income',
  derivatives: 'derivatives',
  alternativeInvestments: 'alternative-investments',
  portfolioManagement: 'portfolio-management',
};

function answer(
  questionId: string,
  suffix: string,
  resourceChanges: readonly ResourceChange[] = [],
): Answer {
  return {
    id: `${questionId}-${suffix}`,
    text: `[TEST ONLY] ${suffix}`,
    resourceChanges,
  };
}

export function fakeQuestion(
  id: string,
  difficulty: Difficulty,
  competency: Competency = 'portfolioManagement',
  correctChanges: readonly ResourceChange[] = [],
): Question {
  return {
    id,
    scenario: `[TEST ONLY] Fake scenario ${id}`,
    answers: [answer(id, 'a', correctChanges), answer(id, 'b'), answer(id, 'c'), answer(id, 'd')],
    correctAnswerId: `${id}-a`,
    explanation: '[TEST ONLY] Fake explanation.',
    metadata: {
      competency,
      topic: COMPETENCY_TOPICS[competency],
      difficulty,
      tags: ['test-only'],
      selectionWeight: 1,
      packId: 'test-pack',
    },
    schemaVersion: 1,
  };
}

export function fakePack(questions: readonly Question[]): QuestionPack {
  return {
    id: 'test-pack',
    name: 'Test-only pack',
    version: '1.0.0-test',
    schemaVersion: 1,
    questions,
  };
}
