import { describe, expect, it } from 'vitest';
import type { GameConfig } from '../src/game/config';
import { gameConfig } from '../src/game/config';
import { createQuestionOrder } from '../src/game/questions';
import { fakePack, fakeQuestion } from './fixtures/questionPacks';

const questions = [
  fakeQuestion('easy-1', 'easy'),
  fakeQuestion('easy-2', 'easy'),
  fakeQuestion('medium-1', 'medium'),
  fakeQuestion('medium-2', 'medium'),
  fakeQuestion('hard-1', 'hard'),
  fakeQuestion('hard-2', 'hard'),
];

describe('question ordering', () => {
  it('is deterministic, complete, and duplicate-free', () => {
    const first = createQuestionOrder('repeatable', [fakePack(questions)], gameConfig);
    const second = createQuestionOrder(
      'repeatable',
      [fakePack([...questions].reverse())],
      gameConfig,
    );

    expect(first.selections).toEqual(second.selections);
    expect(new Set(first.selections.map((selection) => selection.questionId)).size).toBe(
      questions.length,
    );
  });

  it('uses configured difficulty buckets by turn', () => {
    const stagedConfig: GameConfig = {
      ...gameConfig,
      difficultyStages: [
        { fromTurn: 1, weights: { easy: 1, medium: 0, hard: 0 } },
        { fromTurn: 3, weights: { easy: 0, medium: 1, hard: 0 } },
        { fromTurn: 5, weights: { easy: 0, medium: 0, hard: 1 } },
      ],
    };
    const order = createQuestionOrder('staged', [fakePack(questions)], stagedConfig);
    const difficulties = order.selections.map(
      (selection) => order.questionsById[selection.questionId]!.metadata.difficulty,
    );

    expect(difficulties).toEqual(['easy', 'easy', 'medium', 'medium', 'hard', 'hard']);
  });

  it('rejects globally duplicated stable question IDs', () => {
    const duplicate = fakeQuestion('duplicate', 'easy');
    const secondPack = {
      ...fakePack([duplicate]),
      id: 'second-pack',
      questions: [{ ...duplicate, metadata: { ...duplicate.metadata, packId: 'second-pack' } }],
    };

    expect(() =>
      createQuestionOrder('seed', [fakePack([duplicate]), secondPack], gameConfig),
    ).toThrow('Duplicate question ID');
  });

  it('rejects duplicated pack IDs', () => {
    const first = fakePack([fakeQuestion('first', 'easy')]);
    const second = fakePack([fakeQuestion('second', 'easy')]);

    expect(() => createQuestionOrder('seed', [first, second], gameConfig)).toThrow(
      'Duplicate question pack ID',
    );
  });
});
