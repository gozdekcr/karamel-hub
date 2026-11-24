# Karamel-hub — agent context

Karamel-hub is a multi-user study & productivity web app (desktop browser only for now).
People can use it alone, or join persistent study rooms through an invite link and see
each other's study time in realtime. A cat-collection system rewards studying.

## Read in this order

1. `docs/CURRENT_STATE.md` — single source of truth. If documents conflict, this file and
   the code win.
2. `docs/decisions/` — Architecture Decision Records (ADRs). Only `Accepted` ADRs are binding.
3. `docs/OPEN_QUESTIONS.md` — what is NOT decided yet. Never treat these as decided.
4. `docs/WORKFLOW.md` — how we work, phases and the definition of done.
5. `docs/PRODUCT_BRIEF.md` — the user's original idea. User context; do not rewrite it.

`docs/archive/` is history. It never overrides current documents.

## Current phase

**Phase 1 — Core** (started 2026-11-24). Tasks and their order are in `docs/ROADMAP.md`.
Code, project setup and package installs are allowed, within the scope of the task in the
user's prompt.

## Rules

- The user's direct instructions take priority over these documents.
- At the start of every task, save the user's prompt as `docs/prompts/NNN-short-name.md`:
  the full content, translated to English if written in another language (the repo is
  English only). Assign `NNN` yourself, sequentially (next free number); a new round of
  the same task keeps its number and adds `-v2`, `-v3` (see `docs/WORKFLOW.md`).
- Do not finalize decisions on your own. New ideas are written as `Proposed` (in an ADR or
  in `OPEN_QUESTIONS.md`) and wait for the user's approval.
- Do not edit the decision of a committed `Accepted` ADR. If it changes, write a new ADR
  that supersedes it and set the old one to `Superseded by ADR-XXXX`. An ADR that has not
  been committed yet may be edited directly.
- When a decision changes, update `docs/CURRENT_STATE.md` in the same change.
- Never claim tests, verification, research or features that were not actually done.
  Separate sourced facts from your own assumptions and label them.
- **Never commit or push, even if the user asks.** The user always makes commits
  themselves. You may only suggest a commit message.
- Do not create repositories or external resources (Supabase projects, deployments)
  without the user's explicit permission.
- Commit messages use Conventional Commits: `docs: …`, `feat: …`, `fix: …`, `test: …`,
  `chore: …`.
- Keep changes small and focused on the task in the prompt. Do not expand scope; list
  extra ideas under "Suggestions" in your final report instead.
- If something is ambiguous or contradicts the docs, stop and ask.

## Language

- Talk to the user in Turkish.
- Write documentation, code, comments, commit messages and identifiers in English.
  Everything in the repo is English only (saved prompts included).
- UI text is never hardcoded; it uses i18n keys (TR + EN). See ADR-0010.

## Architecture invariants (from Accepted ADRs)

- `domain/` is pure TypeScript and never imports React or Supabase. (ADR-0002)
- A user has at most one active session. Sessions are personal and have no `room_id`;
  one session counts in every room the user belongs to. (ADR-0003)
- A user's sessions never overlap, edited and manually added sessions included. Enforced
  by a database exclusion constraint. (ADR-0011)
- Rooms can have several owners. Any owner can make members owners and remove or demote
  other owners, except the creator-role holder. Exactly one member holds the creator role;
  only they can delete the room, and they can hand the role over at any time (and must
  when leaving). A room with no members is deleted automatically. Role rules are enforced
  in the database. (ADR-0014)
- Elapsed time = server now − `started_at` − pauses. Never count ticks. (ADR-0003)
- Room statistics are derived from sessions and membership history, never stored as
  counters. Never show a sum across rooms. (ADR-0005)
- Room members see only time data, never courses or tasks. Enforced in the database. (ADR-0006)
- Tables that room members can read hold only user and time data; course, task and other
  private links live in separate owner-only tables. Views use `security_invoker = true`. (ADR-0016)
- Heartbeats are stored in a separate per-user table that is not in the Realtime publication. (ADR-0016)
- Room Presence uses private Realtime channels, authorized by RLS on `realtime.messages`. (ADR-0017)
- Coins are a ledger; rewards are granted by database functions. (ADR-0008)
- Cats are unlocked by studying, never bought, never removed. (ADR-0020)
- A session's ledger entries always sum to `floor(minutes ÷ 2)`; edits add a correction entry. (ADR-0021)
- Streaks are derived from sessions, never stored as counters. (ADR-0022)
- Gamification catalog values live only in database tables loaded by migrations; reward
  calculations run only in SQL. Exceptions (`minutes ÷ 2`, room shared time) also exist in
  TS and share test cases in Vitest and pgTAP. (ADR-0024)
- `profiles` holds only the display name; private settings live in owner-only `user_settings`. (ADR-0025)
- The hosted database is never reset; its data is dumped before each `db push`. (ADR-0030)

## Final report format

At the end of each task, report:
1. Files created or changed
2. What was done (and what was NOT done or verified)
3. Contradictions or ambiguities found
4. Suggestions (out of scope ideas), if any

Then stop and wait for the user's review.
