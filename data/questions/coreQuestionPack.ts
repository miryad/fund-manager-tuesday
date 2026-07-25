import type { QuestionPack } from '../../src/game/types';
import { CONTENT_AUTHOR, PRODUCTION_PACK_ID } from './questionFactory';
import { alternativeInvestmentsQuestions } from './topics/alternativeInvestments';
import { corporateIssuersQuestions } from './topics/corporateIssuers';
import { derivativesQuestions } from './topics/derivatives';
import { economicsQuestions } from './topics/economics';
import { equityInvestmentsQuestions } from './topics/equityInvestments';
import { ethicsQuestions } from './topics/ethics';
import { financialStatementAnalysisQuestions } from './topics/financialStatementAnalysis';
import { fixedIncomeQuestions } from './topics/fixedIncome';
import { portfolioManagementQuestions } from './topics/portfolioManagement';
import { quantitativeMethodsQuestions } from './topics/quantitativeMethods';

export const ProductionQuestionPack = {
  id: PRODUCTION_PACK_ID,
  name: 'Fund Manager Tuesday Core 100',
  version: '1.0.0',
  schemaVersion: 1,
  description:
    'One hundred original investment-management scenarios spanning the core finance competency families.',
  author: CONTENT_AUTHOR,
  questions: [
    ...ethicsQuestions,
    ...quantitativeMethodsQuestions,
    ...economicsQuestions,
    ...financialStatementAnalysisQuestions,
    ...corporateIssuersQuestions,
    ...equityInvestmentsQuestions,
    ...fixedIncomeQuestions,
    ...derivativesQuestions,
    ...alternativeInvestmentsQuestions,
    ...portfolioManagementQuestions,
  ],
} as const satisfies QuestionPack;
