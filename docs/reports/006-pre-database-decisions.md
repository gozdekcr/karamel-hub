# 006 — Decisions before the database design

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/006-pre-database-decisions.md`](../prompts/006-pre-database-decisions.md)

## 1. Files created or changed

- **New ADRs (Accepted, user decisions):**
  - `0023-invite-link-visible-to-members.md` — all members see and share the link; owners
    regenerate it. Extends ADR-0014 (committed, not edited).
  - `0024-gamification-catalog-in-database.md` — catalog tables loaded by migrations; TS
    reads them. Resolves #42.
  - `0025-study-goals.md` — daily and weekly goal minutes in `profiles`; no history.
  - `0026-account-deletion.md` — sessions deleted; room statistics shrink.
- `docs/CURRENT_STATE.md` — Age row removed; Rooms row (link visibility); new rows Goals,
  Account deletion, Release; ADR rows 0023–0026.
- `docs/OPEN_QUESTIONS.md` — #31 dropped, #42 resolved; #32 now includes the age policy;
  #30 resolved note updated; new #45, #46, #47.
- `docs/decisions/0008`, `0021` (committed) — only Open points updated (#42 → ADR-0024).
- `docs/decisions/README.md` — index rows 0023–0026.
- `docs/GAMIFICATION.md` — note that catalog values live in the database (ADR-0024); #42
  removed from "Still open".
- `docs/PRODUCT_RESEARCH.md`, `docs/TECH_RESEARCH.md` — 18+ mentions marked as removed.

## 2. What was done, and what was NOT done or verified

- `git status` before editing: clean (task 004/005 committed by the user as `e310dd5`).
  ADR-0014 is committed, so link visibility went into a new ADR instead of its table.
- Nothing was committed (CLAUDE.md).

## 3. Contradictions, ambiguities and interpretations

- **Goals in `profiles` vs. time-only visibility (#45):** if room members can read
  `profiles` (likely, for display names), they can also read the goal fields — RLS filters
  rows, not columns (ADR-0016). Whether goals may be visible to room members is not decided.
- **Goal defaults / empty goals (#46)** not decided.
- **Account deletion details (#47):** the creator role in rooms with other members, chat
  messages, membership history. Assumption labeled in ADR-0026: coins, cats, items, goals
  and heartbeat rows are deleted with the account.
- **Weekly goal week:** assumed to be the calendar week of ADR-0022; labeled in ADR-0025 as
  not confirmed.
- **#42 scope:** ADR-0024 makes the catalog values single-source. Rule logic (the
  `floor(minutes ÷ 2)` formula, streak derivation) is code, not catalog data; if the UI
  also computes it for display, that logic still exists in TS and SQL.
- ADR-0024 assumption: catalog tables read-only, readable by every signed-in user.
- Alternatives in ADRs 0023–0026 were written by Claude, not discussed with the user.
- Invite link: since every member sees the new link after a rotation, rotation alone does
  not keep a removed user out; ADR-0014's "ban record or link rotation" choice matters more
  now (database design).

## 4. Suggestions (out of scope)

- Add a short invariant to `CLAUDE.md`: "Gamification catalog values live only in database
  tables loaded by migrations. (ADR-0024)".
