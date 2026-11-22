# 007 — Database design (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/007-database-design-v2.md`](../prompts/007-database-design-v2.md)

## 1. Files created or changed

- `docs/decisions/0024-gamification-catalog-in-database.md` — header line "Supersedes the
  streak/reward part of ADR-0002" (user instruction; the decision text is unchanged).
- `docs/decisions/0002-frontend-layering.md` — status "Partially superseded by ADR-0024"
  (user instruction; the decision text is unchanged).
- `docs/decisions/README.md`, `docs/CURRENT_STATE.md` — ADR-0002 status.
- `docs/DATABASE.md` — #49–#58 written in as decisions (Proposed markers removed):
  courses/tasks owner-only; Pomodoro breaks as pauses; `edit_session` clips pauses;
  `delete_session` defined (correction to 0, ledger `session_id` without FK); room name
  and text limits (also as a constraint row); whole chat history, no editing or deleting;
  gamification data owner-only; timezone/language from the browser, current timezone for
  past days; `ended_at` ≤ `now()`; `room_memberships` in Realtime. The two interpretations
  are marked as accepted. §8: account deletion is left to a later phase; the Supabase admin
  API question is to be verified in Phase 1.
- `docs/OPEN_QUESTIONS.md` — #49–#58 closed with a resolved note; #12 (phase order) notes
  that account deletion goes to a later phase.
- `docs/CURRENT_STATE.md` — new product rows (Courses and tasks, Pomodoro, Session editing,
  Room chat, Gamification visibility, Timezone and language); Account deletion marked
  "Later phase"; database design progress.

## 2. What was done, and what was NOT done or verified

- `git log`: ADR-0002 and ADR-0024 are committed; both were changed only in their header
  lines, as the user instructed.
- `ROADMAP.md` does not exist yet, so the "later phase" note for account deletion is in
  DATABASE.md §8, CURRENT_STATE and OPEN_QUESTIONS #12; it should be carried into
  ROADMAP.md when that is written.
- The Supabase admin API requirement was not checked (Phase 1, as instructed).
- Nothing was committed (CLAUDE.md).

## 3. Contradictions or ambiguities

- None found.

## 4. Suggestions (out of scope)

- None.
