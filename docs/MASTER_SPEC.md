# Fund Manager Tuesday — Master Specification

## 1. Product definition

**Fund Manager Tuesday** is an open-source, mobile-first browser game inspired by investment management and CFA Level I concepts.

It is not a CFA exam simulator, mock exam, flashcard application, conventional quiz app, or official CFA Institute product. The player manages an investment fund and tries to survive for as long as possible by making finance-related decisions under time pressure.

Finance knowledge is embedded in realistic investment and business scenarios rather than presented as academic questions. The game should be enjoyable even for a player who has never studied for the CFA exam. Learning is a consequence of gameplay, not a goal explicitly presented to the player.

Project documentation must use this positioning:

> An open-source investment management game inspired by CFA Level I concepts.

The opening splash screen must not mention CFA.

## 2. Product principles

### Gameplay first

The product must feel like a game, not educational software. When educational completeness conflicts with a clear and enjoyable interaction, prefer gameplay unless that would make the underlying finance concept materially incorrect.

### Simplicity over simulation

The game intentionally compresses investment management into a small number of readable systems. The MVP excludes financial modelling, spreadsheet-style interfaces, portfolio construction screens, trading simulation, accounting workflows, and complex asset inventories.

### Immediate consequences

Every decision affects the current game state immediately. There are no delayed consequences in the MVP. After each turn, the player should immediately understand:

- which answer was correct and why;
- which resources changed and why.

### Respect the player

Avoid excessive tutorials, childish praise, celebratory confetti, manipulative streak mechanics, verbose explanations, and obvious instructional text.

### Skill-based progression

Players improve through financial knowledge, pattern recognition, faster reasoning, and better risk judgement. The MVP has no permanent upgrades, stat bonuses, inventory, unlock trees, or grinding systems.

## 3. Core gameplay loop

A run is an open-ended sequence of scenario-based questions:

1. A scenario appears.
2. Four possible decisions appear.
3. A 15-second timer starts.
4. The player chooses an answer, or the timer expires.
5. The correct answer is revealed.
6. A concise explanation appears.
7. Resource changes are applied and displayed.
8. The player continues to the next scenario.
9. The run ends when a critical resource reaches its failure threshold.

The run continues for as long as the player keeps the fund alive. A typical run should last approximately 10–30 minutes.

The interaction rhythm may take inspiration from _Luck Be a Landlord_; _Balatro_'s fast decision rhythm, not its card mechanics; and _Papers, Please_'s light pressure and restrained presentation. Do not copy their mechanics, assets, writing, or visual identities.

## 4. Scenario design

Questions must be plausible professional situations, never formal CFA-style exam questions.

Avoid:

> Which statement regarding duration is most accurate?

Prefer:

> Your pension fund mostly owns 20-year government bonds. Interest rates are expected to rise sharply. What is the most immediate portfolio concern?

Every scenario must:

- describe a concrete investment, company, market, client, regulatory, or fund-management situation;
- require one meaningful decision;
- contain four plausible answers with exactly one best answer;
- test a recognisable finance competency;
- be answerable in approximately 15 seconds;
- avoid unnecessary calculations;
- use clear international English;
- avoid jurisdiction-specific details unless essential;
- avoid tricks based only on obscure wording;
- avoid phrases such as “according to CFA Level I.”

Explanations should normally be one or two sentences and explain the underlying principle rather than restating the correct answer.

All questions must be original. Never copy, closely paraphrase, reconstruct, or imitate proprietary CFA Institute exam questions. CFA Learning Outcomes may inform topic coverage, but game content must be independently written.

## 5. Question content model

Questions are content data, not gameplay code. Contributors must be able to add a question pack without editing the game engine.

Every question must support at least:

- a stable unique ID;
- scenario text;
- four answer options;
- a correct-answer index or stable answer ID;
- a concise explanation;
- competency;
- topic;
- difficulty;
- resource impact;
- tags;
- selection weight;
- pack or source identifier;
- optional author or contributor metadata;
- content schema version.

Exact TypeScript types and validation will be defined during the architecture stage. The model must support future question packs while remaining approachable to non-engine contributors.

## 6. Content scale and coverage

The MVP target is 100 original questions. Future milestones are 300, 700–1,000, and approximately 1,500 questions. The engine must not hard-code assumptions tied to exactly 100 questions.

Coverage should broadly reflect CFA Level I–inspired competencies expressed through practical investment scenarios. Topic families include:

- ethics and professional standards;
- quantitative methods;
- economics;
- financial statement analysis;
- corporate issuers;
- equity investments;
- fixed income;
- derivatives;
- alternative investments;
- portfolio management.

These guide coverage but must not become a syllabus menu or test-preparation dashboard.

## 7. Persistent resources

The player manages five resources:

- **Capital**
- **LP Trust**
- **Reputation**
- **Liquidity**
- **Risk Buffer**

Fund size is displayed separately.

An answer may affect one or more resources, positively or negatively. Competencies should pressure resources naturally: ethics and disclosure may affect LP Trust and Reputation; leverage or duration may affect Risk Buffer and Capital; cash management may affect Liquidity; poor investment judgement may affect Capital; and governance failures may affect Reputation and LP Trust.

Changes occur immediately after each answer. Resource values and failure thresholds must be centrally configurable, not scattered through UI code. Final balancing values will be implemented and tested later; this specification does not pre-optimise them.

## 8. Timer expiry

The decision timer is **15 seconds**. On expiry, do not label the outcome simply “Wrong.” Use:

> No decision made.
>
> In investing, not making a decision is often a decision.

The deterministic MVP timeout consequence is:

- LP Trust: −8
- Reputation: −4

A timed-out turn still reveals the correct answer, explanation, and resource consequence. Timeout behaviour must be deterministic and testable.

## 9. Difficulty

Difficulty follows a fixed, non-adaptive progression using scenario difficulty metadata and the current turn or run stage:

- early turns primarily use easier questions;
- medium questions become more common as the run advances;
- hard questions appear later.

The exact selection formula belongs to engine implementation. The seed must fully determine selection order, and the same seed with compatible content must reproduce the same run.

## 10. Seeded runs

Every run uses a seed that determines:

- the financial centre;
- displayed timestamps or calendar flavour;
- question selection and order;
- all gameplay randomness.

Given the same seed, game version, compatible question data, and configuration, the resulting sequence must be identical.

The MVP lets the player start another randomly seeded run. The architecture must not prevent future daily seeds or shareable seed links, but neither is required for the first playable MVP unless a later prompt adds it.

## 11. Financial centres

Each run receives one seeded financial centre from:

- New York
- London
- Paris
- Singapore
- Hong Kong
- Tokyo
- Zurich
- Frankfurt
- Amsterdam
- Boston
- Chicago
- Toronto
- Sydney
- Dubai
- Geneva

Cities provide atmosphere only. In the MVP they do not affect difficulty, resources, rules, or question availability.

## 12. Game states and screens

### Opening screen

Its purpose is to introduce the title, establish the terminal-inspired atmosphere, and begin a run. It includes:

- `FUND MANAGER TUESDAY`;
- a concise, non-CFA tagline;
- a primary start action;
- restrained seed or run information where useful.

Do not mention CFA on this screen.

### Active decision screen

Show:

- current scenario and four answers;
- countdown timer;
- current resources and fund size;
- financial centre;
- turn or temporal context;
- seed or run identifier in a subtle location.

### Resolution state

After an answer or timeout, show:

- selected answer;
- correct answer;
- whether the decision was correct, incorrect, or timed out;
- concise explanation;
- resource changes;
- an action to continue.

Do not replace the question before the player has had an opportunity to read the explanation.

### Liquidation screen

Do not use “Game Over.” Use restrained liquidation framing such as:

> Tuesday Complete
>
> The fund has been liquidated.

Display:

- questions answered;
- correct answers;
- accuracy;
- timeout count;
- final resource values;
- financial centre;
- seed or run number;
- competency percentages;
- final prestige rank.

The primary replay action is:

> Try Another Tuesday

Exact wording may be refined during UI implementation while preserving this tone and meaning.

## 13. Prestige ranks

Ranks appear only on the liquidation screen and provide no mechanical advantage. There is no visible rank progression during active gameplay.

In ascending order:

1. Junior Associate
2. Associate
3. Senior Associate
4. Principal
5. Partner
6. Managing Partner

Ranks are deterministic prestige labels derived from final performance. Scoring thresholds must be centrally configurable.

## 14. Competency reporting

End-of-run competency or topic results are percentages, never stars. Do not show meaningless percentages for untested competencies; omit them or use a clear empty or “not assessed” state.

Competency reporting is a post-run reflection tool, not an in-game study dashboard.

## 15. Visual direction

The identity combines pixel minimalism, Bloomberg Terminal influence, IBM and ThinkPad-era computing, restrained financial software, and an old trading-terminal atmosphere.

Core palette:

- dark grey;
- charcoal;
- off-white;
- muted turquoise accent.

The design must be mobile-first and desktop-responsive, with monospace typography, square or near-square controls, hard edges, minimal decoration, high information clarity, strong contrast, accessible tap targets, and visible keyboard focus states.

Do not use rounded startup-style cards, excessive border radii, gradients, glassmorphism, neumorphism, glossy effects, cartoon illustrations, stock imagery, decorative 3D assets, unnecessary icons, confetti, playful badges, or visual clutter.

Animations, if any, must be brief and communicate state changes.

## 16. Audio

The game is intentionally silent. Do not add music, sound effects, alert sounds, audio settings, or audio dependencies.

## 17. Technical direction

Intended stack:

- React;
- TypeScript;
- Vite;
- Vitest;
- plain CSS or a similarly lightweight styling approach.

Avoid unnecessary dependencies. The application must be client-side, static-hostable, deployable to GitHub Pages, usable without authentication or a backend, playable without external APIs, deterministic under a seed, and maintainable by contributors.

The architecture must separate:

- domain types;
- deterministic random utilities;
- game engine;
- question selection;
- resource calculations;
- scoring and rank logic;
- content validation;
- UI components;
- question data;
- configuration.

Core logic should remain framework-independent where practical and be testable without rendering React components. Redux, a database, a server, an API layer, and heavy state-management frameworks are not default requirements.

## 18. Repository and open-source structure

The repository must support public contribution from the start. Expected high-level areas include `src/`, `docs/`, a clearly defined question-content directory such as `data/`, `README.md`, `CONTRIBUTING.md`, and `LICENSE`; exact structure is deferred to the architecture stage.

The engine must remain stable while question packs expand independently. Contribution documentation should eventually let someone add a valid pack without understanding the React application. Content validation and automated tests must prevent malformed contributions from breaking the game.

## 19. Accessibility and input

Support touch, mouse, and keyboard navigation. Answer choices should eventually support accessible shortcuts where practical, such as number keys 1–4.

The timer must not make the interface unusable for screen-reader or keyboard users. Respect reduced-motion preferences. Never rely on colour alone for correctness, failure, or resource changes.

No accessibility mode changes the rules fundamentally in the MVP, but the architecture must leave room for future timer accessibility options.

## 20. Analytics and privacy

The MVP requires no analytics. Do not add tracking, cookies, advertising, accounts, or personal-data collection.

Local storage may later hold non-sensitive preferences or run statistics, but is not required unless a later prompt specifies it.

## 21. MVP non-goals

Explicitly excluded:

- multiplayer and leaderboards;
- accounts, cloud saves, and backend services;
- live market data;
- random macro or world events;
- delayed consequences;
- adaptive difficulty;
- permanent upgrades;
- card decks and collectible systems;
- inventory and achievements;
- daily streaks and social feeds;
- in-application user-generated questions or question-editing UI;
- localisation and native mobile applications;
- audio;
- elaborate tutorials;
- official exam-preparation claims;
- copied CFA Institute material.

Random macro or world events are specifically rejected. MVP gameplay is entirely question-driven.

## 22. MVP definition of done

The first playable MVP is complete when:

- a player can start a seeded run;
- a seeded financial centre is assigned;
- scenarios are selected deterministically;
- every scenario presents four answers;
- the 15-second timer works;
- answers and timeouts resolve correctly;
- explanations are shown;
- resources update immediately;
- the run ends when liquidation conditions are met;
- the liquidation screen reports statistics, competency percentages, seed, city, and prestige rank;
- the player can start another run;
- the interface works on a mobile screen;
- core deterministic logic has automated tests;
- the application builds successfully for static deployment;
- question content is separate from the engine;
- no prohibited MVP features have been added.

The target bank is 100 original questions, but architecture and engine implementation must precede bulk question generation.

## 23. Development sequence

Implementation proceeds through separate sequential prompts:

1. Master specification.
2. Project setup and architecture.
3. Core game engine.
4. UI implementation.
5. Initial question bank.
6. Testing, balancing, polish, and deployment.
7. README, licensing, contribution workflow, and open-source preparation.

Do not implement later stages prematurely. Every implementation stage must inspect the repository and this specification before making changes.

## 24. Decision control

Every requirement in this document is a settled product decision. Future implementation may choose details where this specification deliberately leaves them open, but must not silently change:

- the game name;
- resources;
- timer duration;
- timeout consequences;
- fixed difficulty progression;
- seeded determinism;
- financial centre list;
- prestige rank list;
- percentage-based competency reporting;
- absence of random world events and delayed consequences;
- the no-audio rule;
- mobile-first terminal visual direction;
- question-driven gameplay;
- open-source content architecture;
- CFA-inspired, non-exam positioning.

If an implementation constraint exposes a genuine conflict, document it rather than redesigning the product without approval.
