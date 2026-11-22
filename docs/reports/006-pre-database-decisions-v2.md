# 006 — Decisions before the database design (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/006-pre-database-decisions-v2.md`](../prompts/006-pre-database-decisions-v2.md)

## 1. Files created or changed

All ADRs below are uncommitted (`git status`: untracked), so they were edited directly.

- `docs/decisions/0024-…` — title now "Gamification catalog and reward calculations in the
  database"; reward-affecting calculations only in SQL; display-only calculations in TS;
  live coin display may repeat `minutes ÷ 2` in TS with shared Vitest/pgTAP test cases;
  "Assumption" marker removed (catalog read-only, readable by signed-in users).
- `docs/decisions/0025-…` — rewritten as "Profiles, user settings and study goals":
  `profiles` = display name only (room-readable); `user_settings` = goals, timezone,
  language (owner-only); goals private, optional, no default; weekly goal week from
  ADR-0022 (marker removed).
- `docs/decisions/0026-…` — messages and membership history deleted; personal data deleted
  (marker removed); creator role to the oldest owner, else the oldest member (becomes an
  owner); empty room deleted.
- `docs/decisions/0023-…` — removal mechanism deferred (#48).
- `docs/OPEN_QUESTIONS.md` — #45, #46, #47 resolved; new #48 (deferred; no table in
  DATABASE.md); #42 resolved note updated.
- `docs/CURRENT_STATE.md` — Goals, Profiles, Account deletion rows; ADR rows 0024–0026.
- `docs/decisions/README.md` — titles of 0024, 0025.
- `CLAUDE.md` — invariants for ADR-0024 and ADR-0025.

## 2. What was done, and what was NOT done or verified

- Nothing was committed (CLAUDE.md).

## 3. Contradictions, ambiguities and interpretations

- **"Oldest" owner/member** is interpreted as the earliest `joined_at` of the current
  membership (labeled in ADR-0026). Alternative: the earliest time the person became an
  owner.
- **Room shared time in two places:** shared time is display-only in TS, but the "Better
  together" achievement (ADR-0021) uses shared time to grant coins, so it must also be
  calculated in SQL. The same logic will exist in TS and SQL; shared test cases (as for
  `minutes ÷ 2`) could cover it.
- The CLAUDE.md invariant for ADR-0025 was added in addition to the suggested ADR-0024 one,
  because #45 is a database visibility rule like ADR-0016.
- The "block deletion until hand-over" alternative in ADR-0026 was written by Claude.

## 4. Suggestions (out of scope)

- None.
