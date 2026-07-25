import type { DifficultyStage, GameConfig } from '../config';
import { createSeededRandom } from '../random';
import type { Difficulty, Question, QuestionPack, SelectionResult } from '../types';
import { validateQuestionPack } from './validation';

interface QuestionCandidate {
  readonly question: Question;
  readonly packId: string;
}

export interface QuestionOrder {
  readonly selections: readonly SelectionResult[];
  readonly questionsById: Readonly<Record<string, Question>>;
  readonly contentVersion: string;
}

function getDifficultyStage(turn: number, stages: readonly DifficultyStage[]): DifficultyStage {
  const ordered = [...stages].sort((left, right) => left.fromTurn - right.fromTurn);
  const stage = ordered.filter((candidate) => candidate.fromTurn <= turn).at(-1);

  if (!stage) {
    throw new Error(`No difficulty stage covers turn ${turn}.`);
  }

  return stage;
}

function chooseWeightedIndex(weights: readonly number[], randomValue: number): number {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let target = randomValue * total;

  for (let index = 0; index < weights.length; index += 1) {
    target -= weights[index]!;
    if (target < 0) {
      return index;
    }
  }

  return weights.length - 1;
}

function questionWeight(
  question: Question,
  difficultyWeights: Readonly<Record<Difficulty, number>>,
  defaultWeight: number,
): number {
  const selectionWeight = question.metadata.selectionWeight || defaultWeight;
  return Math.max(0, difficultyWeights[question.metadata.difficulty] * selectionWeight);
}

function collectCandidates(packs: readonly QuestionPack[]): readonly QuestionCandidate[] {
  const seenIds = new Set<string>();
  const seenPackIds = new Set<string>();
  const candidates = packs
    .flatMap((pack) => {
      if (seenPackIds.has(pack.id)) {
        throw new Error(`Duplicate question pack ID: ${pack.id}`);
      }
      seenPackIds.add(pack.id);

      const validation = validateQuestionPack(pack);
      if (!validation.valid) {
        const detail = validation.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join('; ');
        throw new Error(`Invalid question pack "${pack.id}": ${detail}`);
      }
      return pack.questions.map((question) => ({ question, packId: pack.id }));
    })
    .sort((left, right) => {
      const packComparison = left.packId.localeCompare(right.packId);
      return packComparison || left.question.id.localeCompare(right.question.id);
    });

  for (const candidate of candidates) {
    if (seenIds.has(candidate.question.id)) {
      throw new Error(`Duplicate question ID across packs: ${candidate.question.id}`);
    }
    seenIds.add(candidate.question.id);
  }

  return candidates;
}

export function createQuestionOrder(
  seed: string,
  packs: readonly QuestionPack[],
  config: GameConfig,
): QuestionOrder {
  const candidates = [...collectCandidates(packs)];
  if (candidates.length === 0) {
    throw new Error('At least one valid question is required to create a run.');
  }

  const random = createSeededRandom(`${seed}:questions`);
  const selections: SelectionResult[] = [];
  const questionsById: Record<string, Question> = {};

  for (let turn = 1; candidates.length > 0; turn += 1) {
    const stage = getDifficultyStage(turn, config.difficultyStages);
    let weights = candidates.map((candidate) =>
      questionWeight(candidate.question, stage.weights, config.defaultQuestionWeight),
    );

    if (weights.every((weight) => weight <= 0)) {
      weights = candidates.map(
        (candidate) => candidate.question.metadata.selectionWeight || config.defaultQuestionWeight,
      );
    }

    const selectedIndex = chooseWeightedIndex(weights, random.next());
    const [selected] = candidates.splice(selectedIndex, 1);
    if (!selected) {
      throw new Error('Question selection produced an invalid index.');
    }

    const selectionIndex = selections.length;
    selections.push({
      questionId: selected.question.id,
      sourcePackId: selected.packId,
      selectionIndex,
    });
    questionsById[selected.question.id] = selected.question;
  }

  const contentVersion = packs
    .map((pack) => `${pack.id}@${pack.version}:schema-${pack.schemaVersion}`)
    .sort()
    .join('|');

  return { selections, questionsById, contentVersion };
}
