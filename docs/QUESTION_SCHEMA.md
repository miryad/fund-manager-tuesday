# Question Pack Schema

Questions are content data. They do not contain engine behavior.

The canonical TypeScript contracts are in `src/game/types/domain.ts`; validation lives in `src/game/questions/validation.ts`.

## Question pack

| Field           | Type             | Purpose                  |
| --------------- | ---------------- | ------------------------ |
| `id`            | string           | Stable pack identifier   |
| `name`          | string           | Human-readable pack name |
| `version`       | string           | Content version          |
| `schemaVersion` | positive integer | Schema compatibility     |
| `description`   | string, optional | Pack summary             |
| `author`        | string, optional | Pack attribution         |
| `questions`     | Question[]       | One or more questions    |

Pack IDs must be unique when multiple packs are loaded.

## Question

| Field             | Type                  | Rule                                     |
| ----------------- | --------------------- | ---------------------------------------- |
| `id`              | string                | Stable and unique across loaded packs    |
| `scenario`        | string                | Original, concise professional situation |
| `answers`         | tuple of four answers | Exactly four unique answer IDs           |
| `correctAnswerId` | string                | Matches exactly one answer               |
| `explanation`     | string                | Normally one or two sentences            |
| `metadata`        | QuestionMetadata      | Fully populated                          |
| `schemaVersion`   | positive integer      | Currently `1`                            |

## Answer

| Field             | Type             | Rule                            |
| ----------------- | ---------------- | ------------------------------- |
| `id`              | string           | Unique inside the question      |
| `text`            | string           | Plausible professional decision |
| `resourceChanges` | ResourceChange[] | Immediate consequence           |

A resource change contains:

- `resource`: `capital`, `lpTrust`, `reputation`, `liquidity`, or `riskBuffer`;
- `amount`: finite positive or negative number;
- `reason`: concise explanation for the consequence.

## Metadata

Required fields:

- `competency`
- `topic`
- `difficulty`: `easy`, `medium`, or `hard`
- `tags`
- `selectionWeight`
- `packId`

The core pack also populates `author` and `contributorUrl`.

Canonical topic and competency pairs:

| Topic                          | Competency                       |
| ------------------------------ | -------------------------------- |
| `ethics`                       | `ethicsAndProfessionalStandards` |
| `quantitative-methods`         | `quantitativeMethods`            |
| `economics`                    | `economics`                      |
| `financial-statement-analysis` | `financialStatementAnalysis`     |
| `corporate-issuers`            | `corporateIssuers`               |
| `equity-investments`           | `equityInvestments`              |
| `fixed-income`                 | `fixedIncome`                    |
| `derivatives`                  | `derivatives`                    |
| `alternative-investments`      | `alternativeInvestments`         |
| `portfolio-management`         | `portfolioManagement`            |

## Validation

Run:

```sh
npm run validate:content
```

Validation rejects malformed packs, duplicate IDs, duplicate scenarios, ambiguous answer IDs, missing explanations or metadata, invalid resource changes, non-positive selection weights, and mismatched topic/competency pairs.
