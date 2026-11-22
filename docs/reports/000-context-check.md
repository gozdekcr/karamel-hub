# 000 — Context check

Date: 2026-11-22 · Phase 0 · Task: read `CLAUDE.md` and the repository, understand the
project, and summarize the project and the rules without changing any file.

> This report records the state of the repository **at the time of the check**. Items
> listed under "Known issues" and "Suggestions" were handled afterwards (README wording,
> ADR-0011, ADR-0012, new open questions). See `CURRENT_STATE.md` for the current state.

## 1. What was done

All files in the repository were read: `CLAUDE.md`, `AGENTS.md`, `README.md`,
`.gitignore`, and everything under `docs/` (including ADR-0001 … ADR-0010).

### Project summary

**Karamel-hub** is a multi-user study & productivity web app for desktop browsers. It
started as a private app for two people and was widened so that anyone can use it.

- **Solo use:** Pomodoro or free timer, course and task management, daily/weekly goals,
  streaks, weekly/monthly statistics and charts.
- **Study rooms (optional):** persistent; a user can be in several rooms; anyone with the
  invite link can join after logging in. Members see each other's study status and time in
  realtime. Room chat only; no direct messages, no friends system.
- **Gamification:** studying earns coins; cat species unlock; cats can be dressed with
  hats, glasses and other items. Cats and items are permanent — breaking a streak never
  removes them.
- **Languages:** Turkish and English.
- **Cheating:** not a design goal. Coins are for fun; sessions can be edited freely.

**Status:** Phase 0 (research, architecture, planning). No application code. Ten core
architecture decisions are Accepted. The next documents are product research, technical
research, gamification, database, security, UI/UX, architecture overview and roadmap; none
of them exist yet.

### Core architecture decisions (Accepted ADRs)

- **Backend:** Supabase (Auth, PostgreSQL, Realtime). No custom API server; logic lives in
  the database (RLS, views, RPC functions, constraints). All security depends on RLS.
- **Frontend layers:** `domain/` is pure TypeScript (no React, no Supabase); `data/`
  handles Supabase access and Zod validation; `features/` holds feature-based UI.
- **Session model:** a user has at most one active session; sessions have no `room_id`,
  and one session counts in every room the user belongs to. Elapsed time =
  server now − `started_at` − pauses. Ticks are never counted.
- **Room statistics:** never stored as counters; derived from sessions and membership
  intervals. Total time = sum of members' time; shared time = time during which at least
  two members were studying (sweep-line). A sum across rooms is never shown.
- **Privacy:** room members see only time data, never courses or tasks; enforced in the
  database. Online status uses Presence, studying status comes from the active session
  row, messages are stored in the database.
- **Forgotten timer:** the timer never stops automatically. After a large heartbeat gap the
  app only *suggests* ending the session. Sessions can be edited in both directions and
  added manually.
- **Coins:** a ledger, not a balance column. Rewards are granted by database functions
  (consistency and idempotency, not anti-cheat).
- **Other:** TanStack Query for server state; key-based i18n with feature namespaces
  (TR + EN); "day" is calculated in the user's timezone.

**Open questions at the time of the check:** heartbeat interval, whether sessions may
overlap (proposed: no), rewards after session edits, room member limit, streak
definition, email verification, i18n library, hosting, the whole gamification design and
cat art, phase order.

### Rules (in my own words)

- The user's instructions override every document. On conflicts, `CURRENT_STATE.md` and
  the code win; the archive never overrides anything.
- No code, scaffolding or package installation until a prompt explicitly starts Phase 1.
- Decisions are not finalized by Claude Code. New ideas are written as `Proposed` and wait
  for the user's approval.
- An Accepted ADR's decision is never edited; a change is a new ADR that supersedes it.
  `CURRENT_STATE.md` is updated in the same change.
- No claims about tests, verification or research that were not done. Sourced facts and
  assumptions are kept separate and labeled.
- No commit, push or external resources without explicit permission. Conventional Commits.
- No scope expansion; extra ideas go under "Suggestions". Ambiguity or contradictions →
  stop and ask.
- Talk to the user in Turkish; documents, code and commits in English; UI text always via
  TR + EN i18n keys.
- Task loop: the user saves the prompt in `docs/prompts/`, larger tasks get a report in
  `docs/reports/` with the same number, the user reviews, then a commit after approval.

## 2. What was verified, and how

- Every file in the repository was listed and read (`find`, `cat`).
- `git status`, `git diff README.md` and `git log` were checked: `README.md` had
  uncommitted changes; `docs/`, `CLAUDE.md`, `AGENTS.md` and `.gitignore` were
  untracked. This was the state before the check; nothing was changed by it.

## 3. What was NOT done or verified

- No file was changed during the check.
- No external research was done; no tests exist or were run (Phase 0, no code).

## 4. Known issues and contradictions (at the time of the check)

- `README.md` said rooms are joined "with friends", but there is no friends system; rooms
  are joined through an invite link.
- ADR-0006 said "the member/room limits keep this small", but the room member limit was an
  open question (#4) and a per-user room limit was not listed anywhere.
- ADR-0007's heartbeat needs a server-side write, but where it is stored was not defined.
- `docs/prompts/` was empty: there was no saved prompt for this task.

## 5. Suggestions (out of scope)

- Add the two missing questions to `OPEN_QUESTIONS.md`: a per-user room limit and where
  the heartbeat is stored.
