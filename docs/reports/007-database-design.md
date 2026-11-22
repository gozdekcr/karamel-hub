# 007 — Database design

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/007-database-design.md`](../prompts/007-database-design.md)

## 1. Files created or changed

- **New:** `docs/DATABASE.md` (draft for review) — 8 sections: tables (19 own tables plus
  `auth.users` and `realtime.messages`), Mermaid ER diagram, constraints with the rule
  each protects, access table, database functions (timer, edits, reward check, shop,
  rooms and roles, account deletion), Realtime, computed values, design notes.
- `docs/OPEN_QUESTIONS.md` — new **Proposed** items #49–#58 (courses/tasks, Pomodoro breaks,
  pauses on edit, deleting a session, room name and text limits, chat history and editing,
  gamification visibility to roommates, timezone/language initial values and changes,
  future times in edits, membership changes over Realtime).
- `docs/CURRENT_STATE.md` — Database design: "Draft for review".
- `docs/README.md` — DATABASE.md added; removed from "planned documents".

## 2. What was done, and what was NOT done or verified

- Based on the Accepted ADRs (0001–0003, 0005–0012, 0014, 0016–0018, 0020–0026) and
  CURRENT_STATE. No SQL or migrations were written.
- `git status` before starting: clean (task 006 committed by the user as `d4fcbec`).
- **Not verified:**
  - The Mermaid diagram was not rendered; syntax checked by reading only.
  - Whether `tstzrange(started_at, ended_at)` with a `NULL` end is accepted in an
    exclusion constraint (immutability) — marked [not verified]; the NULL-bound behavior
    itself is sourced in TECH_RESEARCH §5.
  - Whether a database function can delete the `auth.users` row, or Supabase's admin API
    is needed — marked [not verified].
- Security analysis was left to `SECURITY.md`, as asked; DATABASE.md only points to it
  where a topic belongs there (helper functions, `search_path`, partial-overlap visibility).
- Nothing was committed (CLAUDE.md).

## 3. Contradictions, ambiguities and interpretations

- **ADR-0002 vs ADR-0024 (contradiction between Accepted ADRs):** ADR-0002's layer table
  lists "streaks" and "reward rules" in `domain/` (TypeScript). ADR-0024 says reward-
  affecting calculations, including the streak, exist only in SQL. DATABASE.md follows
  ADR-0024 (newer and more specific). ADR-0002 is committed; a superseding ADR or an
  explicit "ADR-0024 narrows ADR-0002" note is the user's decision.
- **Interpretations** (labeled in DATABASE.md §8):
  - `mode` (Pomodoro/free) is kept in the private `session_details`, not in the
    room-readable `sessions`, because ADR-0016 allows only user and time data there.
  - "Better together" counts finished sessions only; roommates are re-checked at every
    session end and edit, so both users get it when the second one ends.
- **Roommate visibility of sessions:** RLS shows whole rows, so a session that partly
  overlaps a membership interval is visible in full; noted for `SECURITY.md`.
- **Member removal (#48):** deferred as decided; no table. Until it is decided, a removed
  member can rejoin with a link that another member re-shares.
- **#13, #14** (limit upper bound, lowering below the count) remain open; `set_member_limit`
  refers to them.
- Small design choices made without an ADR, not added to OPEN_QUESTIONS because they carry
  no product rule: `text` + `CHECK` instead of enum types; `is_manual` flag on sessions;
  `user_id` copied into `session_pauses` and `session_details`; catalog key names
  (`hours_10`, `ribbon`…); `member_limit > 0`; `cat_equipment` as direct writes. They are
  open to review with the rest of the draft.

## 4. Suggestions (out of scope)

- Resolve the ADR-0002 / ADR-0024 wording (see §3) before Phase 1, so `domain/` does not
  get a streak implementation.
- After the #49–#58 answers, record the database design itself in an ADR (or mark
  DATABASE.md as Reviewed), like the research documents.
