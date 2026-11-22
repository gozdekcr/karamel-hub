# 006 — Decisions before the database design (v3)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/006-pre-database-decisions-v3.md`](../prompts/006-pre-database-decisions-v3.md)

## 1. Files created or changed

- `docs/decisions/0026-account-deletion.md` (uncommitted) — "oldest" = earliest `joined_at`
  of the current membership, now part of the decision; interpretation marker removed; Open
  points: none.
- `docs/decisions/0024-gamification-catalog-in-database.md` (uncommitted) — exceptions
  list: `minutes ÷ 2` for the live coin display and room shared time (shown in TS,
  calculated in SQL for "Better together"); same test cases in Vitest and pgTAP.
- `docs/CURRENT_STATE.md` — ADR-0024 row mentions the two exceptions.
- `CLAUDE.md` — ADR-0024 invariant mentions the exceptions; the ADR-0025 (`user_settings`)
  invariant is kept unchanged.

## 2. What was done, and what was NOT done or verified

- Nothing was committed (CLAUDE.md).

## 3. Contradictions or ambiguities

- None.

## 4. Suggestions (out of scope)

- None.
