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

**Phase 0 — research, architecture and planning. No application code.**
Do not scaffold the project, create `package.json`, install packages or write app code
unless the user's prompt explicitly starts Phase 1.

## Rules

- The user's direct instructions take priority over these documents.
- Do not finalize decisions on your own. New ideas are written as `Proposed` (in an ADR or
  in `OPEN_QUESTIONS.md`) and wait for the user's approval.
- Do not edit the decision of an `Accepted` ADR. If it changes, write a new ADR that
  supersedes it and set the old one to `Superseded by ADR-XXXX`.
- When a decision changes, update `docs/CURRENT_STATE.md` in the same change.
- Never claim tests, verification, research or features that were not actually done.
  Separate sourced facts from your own assumptions and label them.
- Do not commit, push, create repositories or external resources (Supabase projects,
  deployments) without the user's explicit permission.
- Commits use Conventional Commits: `docs: …`, `feat: …`, `fix: …`, `test: …`, `chore: …`.
- Keep changes small and focused on the task in the prompt. Do not expand scope; list
  extra ideas under "Suggestions" in your final report instead.
- If something is ambiguous or contradicts the docs, stop and ask.

## Language

- Talk to the user in Turkish.
- Write documentation, code, comments, commit messages and identifiers in English.
- UI text is never hardcoded; it uses i18n keys (TR + EN). See ADR-0010.

## Architecture invariants (from Accepted ADRs)

- `domain/` is pure TypeScript and never imports React or Supabase. (ADR-0002)
- A user has at most one active session. Sessions are personal and have no `room_id`;
  one session counts in every room the user belongs to. (ADR-0003)
- Elapsed time = server now − `started_at` − pauses. Never count ticks. (ADR-0003)
- Room statistics are derived from sessions and membership history, never stored as
  counters. Never show a sum across rooms. (ADR-0005)
- Room members see only time data, never courses or tasks. Enforced in the database. (ADR-0006)
- Coins are a ledger; rewards are granted by database functions. (ADR-0008)

## Final report format

At the end of each task, report:
1. Files created or changed
2. What was done (and what was NOT done or verified)
3. Contradictions or ambiguities found
4. Suggestions (out of scope ideas), if any

Then stop and wait for the user's review.
