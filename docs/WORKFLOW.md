# Workflow

## Roles

- **User** — owns every decision, writes the prompts for Claude Code, reviews all changes.
- **Claude (chat)** — discusses options and trade-offs with the user before decisions.
- **Claude Code** — writes documents and, from Phase 1, code, only within the prompt's scope.

## The decision loop

1. Discuss a topic (options, trade-offs) → the user decides.
2. Record it: a new or updated ADR in `docs/decisions/`, and a line in `CURRENT_STATE.md`.
3. Anything still undecided goes to `OPEN_QUESTIONS.md`.
4. Only `Accepted` decisions are built.

## Task loop (every Claude Code task)

1. The user writes the prompt. At the start of the task, Claude Code saves it as
   `docs/prompts/NNN-short-name.md` — full content, in English (translated if needed).
2. Claude Code reads `CLAUDE.md`, does the task, and ends with the report format in `CLAUDE.md`.
3. Larger tasks (a phase or a feature) get a report in `docs/reports/NNN-short-name.md`:
   what was done, what was verified and how, known issues.
4. The user reviews. Fixes and any other new round of the same task go into a new prompt
   with the next version suffix (see below).
5. When approved: the user commits (Claude Code never commits or pushes; it only suggests a
   Conventional Commit message). `CURRENT_STATE.md` is updated in the same change.

### File naming for prompts and reports

- Prompts and reports are named `NNN-short-name.md` (e.g. `003-product-research.md`).
- Claude Code assigns `NNN` sequentially: a new task takes the next free number.
- Every new round of the same task, fixes included, gets the next version suffix:
  `NNN-short-name-v2.md`, `NNN-short-name-v3.md`, … There is no `-fix` suffix.
- A prompt and its report carry the same name (`003-product-research-v2.md` ↔
  `003-product-research-v2.md`).

## Phases

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Research, architecture, database, security, gamification, UI/UX, roadmap (docs only) | **Done** (2026-11-23) |
| 1–5 | Defined in [`ROADMAP.md`](ROADMAP.md) (approved) | Phase 1 in progress (started 2026-11-24) |

### Phase 0 order (completed)

1. Core architecture decisions — done (ADR-0001 … 0014; later ADRs come from the steps below)
2. Product research → `PRODUCT_RESEARCH.md`
3. Technical research → `TECH_RESEARCH.md` (closes open library questions)
4. Gamification design → `GAMIFICATION.md`
5. Database design → `DATABASE.md`
6. Security → `SECURITY.md`
7. UI/UX → `UI_UX.md`
8. Architecture overview → `ARCHITECTURE.md`
9. Roadmap → `ROADMAP.md`

Phase 0 ends when every document above exists, `OPEN_QUESTIONS.md` contains nothing that
blocks Phase 1, and the user approves the roadmap.

## Definition of done (from Phase 1)

- Domain logic has unit tests (Vitest); critical flows have end-to-end tests (Playwright).
- Typecheck and tests pass, and the report says how this was checked.
- No hardcoded UI text; TR and EN keys exist.
- RLS policies exist for every new table.
- `CURRENT_STATE.md` and related ADRs are updated.

## Conventions

- Conventional Commits.
- Files and folders are split by feature, not numbered (`events2.ts`, `more3_tr.ts` style
  growth is avoided).
- Superseded documents move to `docs/archive/` with a note at the top saying what replaced them.
- Private notes live in `notes/` (git-ignored).
