import { COMPETENCIES, RESOURCE_IDS } from '../types';
import type { Question, QuestionPack } from '../types';
import { QUESTION_TOPICS, TOPIC_COMPETENCIES, type QuestionTopic } from './topics';

export interface ValidationIssue {
  readonly path: string;
  readonly message: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly issues: readonly ValidationIssue[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

function validateQuestion(value: unknown, path: string): ValidationIssue[] {
  if (!isRecord(value)) {
    return [{ path, message: 'Question must be an object.' }];
  }

  const issues: ValidationIssue[] = [];
  const requiredStrings = ['id', 'scenario', 'correctAnswerId', 'explanation'] as const;

  for (const field of requiredStrings) {
    if (!isNonEmptyString(value[field])) {
      issues.push({ path: `${path}.${field}`, message: 'Must be a non-empty string.' });
    }
  }

  if (!Number.isInteger(value.schemaVersion) || Number(value.schemaVersion) < 1) {
    issues.push({ path: `${path}.schemaVersion`, message: 'Must be a positive integer.' });
  }

  if (!Array.isArray(value.answers) || value.answers.length !== 4) {
    issues.push({ path: `${path}.answers`, message: 'Must contain exactly four answers.' });
  } else {
    const answerIds = new Set<string>();
    value.answers.forEach((answer, answerIndex) => {
      const answerPath = `${path}.answers[${answerIndex}]`;
      if (!isRecord(answer)) {
        issues.push({ path: answerPath, message: 'Answer must be an object.' });
        return;
      }
      if (!isNonEmptyString(answer.id)) {
        issues.push({ path: `${answerPath}.id`, message: 'Must be a non-empty string.' });
      } else if (answerIds.has(answer.id)) {
        issues.push({ path: `${answerPath}.id`, message: 'Answer IDs must be unique.' });
      } else {
        answerIds.add(answer.id);
      }
      if (!isNonEmptyString(answer.text)) {
        issues.push({ path: `${answerPath}.text`, message: 'Must be a non-empty string.' });
      }
      if (!Array.isArray(answer.resourceChanges)) {
        issues.push({
          path: `${answerPath}.resourceChanges`,
          message: 'Must be an array.',
        });
      } else {
        answer.resourceChanges.forEach((change, changeIndex) => {
          if (
            !isRecord(change) ||
            !RESOURCE_IDS.includes(change.resource as (typeof RESOURCE_IDS)[number]) ||
            typeof change.amount !== 'number' ||
            !Number.isFinite(change.amount) ||
            !isNonEmptyString(change.reason)
          ) {
            issues.push({
              path: `${answerPath}.resourceChanges[${changeIndex}]`,
              message: 'Must be a valid resource change.',
            });
          }
        });
      }
    });

    if (isNonEmptyString(value.correctAnswerId) && !answerIds.has(value.correctAnswerId)) {
      issues.push({
        path: `${path}.correctAnswerId`,
        message: 'Must match one of the four answer IDs.',
      });
    }
  }

  if (!isRecord(value.metadata)) {
    issues.push({ path: `${path}.metadata`, message: 'Metadata must be an object.' });
  } else {
    if (!COMPETENCIES.includes(value.metadata.competency as (typeof COMPETENCIES)[number])) {
      issues.push({
        path: `${path}.metadata.competency`,
        message: 'Must be a recognised competency.',
      });
    }
    if (!['easy', 'medium', 'hard'].includes(String(value.metadata.difficulty))) {
      issues.push({
        path: `${path}.metadata.difficulty`,
        message: 'Must be easy, medium, or hard.',
      });
    }
    if (
      !isNonEmptyString(value.metadata.topic) ||
      !QUESTION_TOPICS.includes(value.metadata.topic as QuestionTopic)
    ) {
      issues.push({
        path: `${path}.metadata.topic`,
        message: 'Must be a recognised question topic.',
      });
    } else if (
      TOPIC_COMPETENCIES[value.metadata.topic as QuestionTopic] !== value.metadata.competency
    ) {
      issues.push({
        path: `${path}.metadata.topic`,
        message: 'Topic must match the assigned competency.',
      });
    }
    if (!isNonEmptyString(value.metadata.packId)) {
      issues.push({ path: `${path}.metadata.packId`, message: 'Must be a non-empty string.' });
    }
    if (
      !Array.isArray(value.metadata.tags) ||
      value.metadata.tags.length === 0 ||
      value.metadata.tags.some((tag) => !isNonEmptyString(tag))
    ) {
      issues.push({
        path: `${path}.metadata.tags`,
        message: 'Must contain at least one non-empty tag.',
      });
    }
    if (
      typeof value.metadata.selectionWeight !== 'number' ||
      !Number.isFinite(value.metadata.selectionWeight) ||
      value.metadata.selectionWeight <= 0
    ) {
      issues.push({
        path: `${path}.metadata.selectionWeight`,
        message: 'Must be a positive number.',
      });
    }
  }

  return issues;
}

export function validateQuestionPack(value: unknown): ValidationResult {
  if (!isRecord(value)) {
    return {
      valid: false,
      issues: [{ path: 'pack', message: 'Question pack must be an object.' }],
    };
  }

  const issues: ValidationIssue[] = [];
  for (const field of ['id', 'name', 'version'] as const) {
    if (!isNonEmptyString(value[field])) {
      issues.push({ path: `pack.${field}`, message: 'Must be a non-empty string.' });
    }
  }
  if (!Number.isInteger(value.schemaVersion) || Number(value.schemaVersion) < 1) {
    issues.push({ path: 'pack.schemaVersion', message: 'Must be a positive integer.' });
  }
  if (!Array.isArray(value.questions) || value.questions.length === 0) {
    issues.push({ path: 'pack.questions', message: 'Must contain at least one question.' });
  } else {
    const questionIds = new Set<string>();
    const scenarios = new Set<string>();
    value.questions.forEach((question, index) => {
      issues.push(...validateQuestion(question, `pack.questions[${index}]`));
      if (isRecord(question) && isNonEmptyString(question.id)) {
        if (questionIds.has(question.id)) {
          issues.push({
            path: `pack.questions[${index}].id`,
            message: 'Question IDs must be unique within a pack.',
          });
        }
        questionIds.add(question.id);
      }
      if (isRecord(question) && isNonEmptyString(question.scenario)) {
        const normalisedScenario = question.scenario.trim().toLocaleLowerCase();
        if (scenarios.has(normalisedScenario)) {
          issues.push({
            path: `pack.questions[${index}].scenario`,
            message: 'Question scenarios must be unique within a pack.',
          });
        }
        scenarios.add(normalisedScenario);
      }
      if (
        isRecord(question) &&
        isRecord(question.metadata) &&
        question.metadata.packId !== value.id
      ) {
        issues.push({
          path: `pack.questions[${index}].metadata.packId`,
          message: 'Must match the containing pack ID.',
        });
      }
    });
  }

  return { valid: issues.length === 0, issues };
}

export function isQuestionPack(value: unknown): value is QuestionPack {
  return validateQuestionPack(value).valid;
}

export type { Question };
