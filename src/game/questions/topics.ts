import type { Competency } from '../types';

export const TOPIC_COMPETENCIES = {
  ethics: 'ethicsAndProfessionalStandards',
  'quantitative-methods': 'quantitativeMethods',
  economics: 'economics',
  'financial-statement-analysis': 'financialStatementAnalysis',
  'corporate-issuers': 'corporateIssuers',
  'equity-investments': 'equityInvestments',
  'fixed-income': 'fixedIncome',
  derivatives: 'derivatives',
  'alternative-investments': 'alternativeInvestments',
  'portfolio-management': 'portfolioManagement',
} as const satisfies Readonly<Record<string, Competency>>;

export type QuestionTopic = keyof typeof TOPIC_COMPETENCIES;

export const QUESTION_TOPICS = Object.keys(TOPIC_COMPETENCIES) as readonly QuestionTopic[];
