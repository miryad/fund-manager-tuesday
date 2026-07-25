# Contributing to Fund Manager Tuesday

Thank you for helping improve the project.

Before changing anything, read [docs/MASTER_SPEC.md](docs/MASTER_SPEC.md). It is the single source of truth. Settled product decisions must not be silently redesigned.

All participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

## Before opening a pull request

1. Search existing issues and discussions.
2. Keep the change focused on one problem.
3. Avoid unrelated formatting or refactors.
4. Add or update tests for changed behavior.
5. Run `npm run check`.

## Code ownership

- `src/game/engine/`: immutable, framework-independent run orchestration.
- `src/game/resources/`: resource calculation and liquidation checks.
- `src/game/scoring/`: score and rank derivation.
- `src/game/random/`: deterministic random utilities.
- `src/game/questions/`: content validation and deterministic selection.
- `src/game/types/`: shared domain contracts.
- `src/game/config/`: central balancing values and product constants.
- `src/app/`, `src/components/`, `src/hooks/`: React rendering and browser input only.
- `data/questions/`: independently expandable content.

Business rules must not move into React. React may collect user input, drive visual timer ticks, and render engine output.

## Coding principles

- Preserve deterministic behavior: the same seed, version, content, and configuration must reproduce the same run.
- Prefer explicit, immutable TypeScript.
- Centralize balancing values.
- Keep modules shallow and ownership clear.
- Avoid new dependencies unless they materially reduce complexity.
- Preserve touch, mouse, keyboard, screen-reader, and reduced-motion support.
- Do not add tracking, accounts, networking, audio, or excluded gameplay systems.

## Question contributions

Read the [Question Authoring Guide](docs/QUESTION_AUTHORING.md) and [Question Schema](docs/QUESTION_SCHEMA.md).

Core questions are grouped by topic under `data/questions/topics/` and assembled by `data/questions/coreQuestionPack.ts`. New core questions should:

- be entirely original;
- describe a practical professional situation;
- contain four plausible answers and exactly one best answer;
- include a one- or two-sentence explanation;
- use a stable, topic-prefixed ID;
- populate every metadata field;
- use resource impacts that follow naturally from the competency.

Do not copy, reconstruct, or closely paraphrase proprietary exam material.

Validate content with:

```sh
npm run validate:content
```

Adding questions never requires editing the engine.

## Pull requests

Explain:

- the problem being solved;
- why the change fits the master specification;
- how it was tested;
- any accessibility or deterministic-behavior impact.

All pull requests must pass type checking, linting, tests, formatting, content validation, and the production build.

## Reporting problems

- Use the bug template for reproducible defects.
- Use the question-content template for inaccurate or unclear scenarios.
- Use GitHub Discussions for broad design or contributor questions.
- Follow [SECURITY.md](SECURITY.md) for vulnerabilities; do not disclose them in a public issue.
