import { describe, expect, it } from 'vitest';
import { ProductionQuestionPack } from '../data/questions';
import { QUESTION_TOPICS, validateQuestionPack } from '../src/game/questions';
import { COMPETENCIES } from '../src/game/types';

function countBy<T>(values: readonly T[], key: (value: T) => string): Record<string, number> {
  return values.reduce<Record<string, number>>((counts, value) => {
    const group = key(value);
    counts[group] = (counts[group] ?? 0) + 1;
    return counts;
  }, {});
}

function mutablePack(): {
  questions: Array<{
    id: string;
    scenario: string;
    explanation: string;
    correctAnswerId: string;
    answers: Array<{ id: string }>;
    metadata: {
      topic: string;
      competency: string;
      author?: string;
      contributorUrl?: string;
    };
  }>;
} {
  return structuredClone(ProductionQuestionPack) as unknown as ReturnType<typeof mutablePack>;
}

describe('production question pack', () => {
  it('contains exactly 100 valid, uniquely identified scenarios', () => {
    expect(validateQuestionPack(ProductionQuestionPack)).toEqual({
      valid: true,
      issues: [],
    });
    expect(ProductionQuestionPack.questions).toHaveLength(100);
    expect(new Set(ProductionQuestionPack.questions.map((question) => question.id)).size).toBe(100);
    expect(
      new Set(
        ProductionQuestionPack.questions.map((question) => question.scenario.toLocaleLowerCase()),
      ).size,
    ).toBe(100);
  });

  it('matches the target difficulty and balanced competency distributions', () => {
    const difficulties = countBy(
      ProductionQuestionPack.questions,
      (question) => question.metadata.difficulty,
    );
    expect(difficulties).toEqual({ easy: 35, medium: 40, hard: 25 });

    const topics = countBy(ProductionQuestionPack.questions, (question) => question.metadata.topic);
    expect(Object.keys(topics).sort()).toEqual([...QUESTION_TOPICS].sort());
    expect(topics).toEqual(Object.fromEntries(QUESTION_TOPICS.map((topic) => [topic, 10])));

    const competencies = countBy(
      ProductionQuestionPack.questions,
      (question) => question.metadata.competency,
    );
    expect(Object.keys(competencies).sort()).toEqual([...COMPETENCIES].sort());
    expect(Object.values(competencies).every((count) => count === 10)).toBe(true);
  });

  it('fully populates metadata and keeps venture capital present but not dominant', () => {
    for (const question of ProductionQuestionPack.questions) {
      expect(question.metadata.tags.length).toBeGreaterThan(0);
      expect(question.metadata.author).toBeTruthy();
      expect(question.metadata.contributorUrl).toBeTruthy();
      expect(question.explanation.trim()).not.toBe('');
      expect(question.answers).toHaveLength(4);
      expect(
        question.answers.filter((answer) => answer.id === question.correctAnswerId),
      ).toHaveLength(1);
    }

    const ventureScenarios = ProductionQuestionPack.questions.filter((question) =>
      question.metadata.tags.includes('venture-capital'),
    );
    expect(ventureScenarios.length).toBeGreaterThanOrEqual(20);
    expect(ventureScenarios.length).toBeLessThanOrEqual(30);
  });

  it('avoids prohibited exam framing and placeholder content', () => {
    const allText = ProductionQuestionPack.questions
      .flatMap((question) => [
        question.scenario,
        question.explanation,
        ...question.answers.map((answer) => answer.text),
      ])
      .join(' ');

    expect(allText).not.toMatch(/which statement is most accurate/i);
    expect(allText).not.toMatch(/according to/i);
    expect(allText).not.toMatch(/\bCFA\b/i);
    expect(allText).not.toMatch(/\[(?:fake|placeholder)/i);
  });
});

describe('question pack validation failures', () => {
  it('rejects packs without exactly four answers', () => {
    const invalid = mutablePack();
    invalid.questions[0]!.answers.pop();

    expect(validateQuestionPack(invalid).issues).toContainEqual({
      path: 'pack.questions[0].answers',
      message: 'Must contain exactly four answers.',
    });
  });

  it('rejects missing correct answers and duplicate answer IDs', () => {
    const missing = mutablePack();
    missing.questions[0]!.correctAnswerId = 'missing-answer';
    expect(
      validateQuestionPack(missing).issues.some((issue) => issue.path.endsWith('correctAnswerId')),
    ).toBe(true);

    const ambiguous = mutablePack();
    ambiguous.questions[0]!.answers[1]!.id = ambiguous.questions[0]!.answers[0]!.id;
    expect(
      validateQuestionPack(ambiguous).issues.some(
        (issue) => issue.message === 'Answer IDs must be unique.',
      ),
    ).toBe(true);
  });

  it('rejects duplicate IDs and scenarios', () => {
    const invalid = mutablePack();
    invalid.questions[1]!.id = invalid.questions[0]!.id;
    invalid.questions[1]!.scenario = invalid.questions[0]!.scenario;
    const result = validateQuestionPack(invalid);

    expect(
      result.issues.some((issue) => issue.message === 'Question IDs must be unique within a pack.'),
    ).toBe(true);
    expect(
      result.issues.some(
        (issue) => issue.message === 'Question scenarios must be unique within a pack.',
      ),
    ).toBe(true);
  });

  it('rejects empty explanations, missing metadata, and invalid topic assignments', () => {
    const emptyExplanation = mutablePack();
    emptyExplanation.questions[0]!.explanation = ' ';
    expect(
      validateQuestionPack(emptyExplanation).issues.some((issue) =>
        issue.path.endsWith('explanation'),
      ),
    ).toBe(true);

    const missingMetadata = structuredClone(ProductionQuestionPack) as unknown as {
      questions: Array<{ metadata?: unknown }>;
    };
    delete missingMetadata.questions[0]!.metadata;
    expect(
      validateQuestionPack(missingMetadata).issues.some(
        (issue) => issue.message === 'Metadata must be an object.',
      ),
    ).toBe(true);

    const invalidTopic = mutablePack();
    invalidTopic.questions[0]!.metadata.topic = 'exam-preparation';
    expect(
      validateQuestionPack(invalidTopic).issues.some(
        (issue) => issue.message === 'Must be a recognised question topic.',
      ),
    ).toBe(true);

    const mismatchedTopic = mutablePack();
    mismatchedTopic.questions[0]!.metadata.topic = 'fixed-income';
    expect(
      validateQuestionPack(mismatchedTopic).issues.some(
        (issue) => issue.message === 'Topic must match the assigned competency.',
      ),
    ).toBe(true);
  });
});
