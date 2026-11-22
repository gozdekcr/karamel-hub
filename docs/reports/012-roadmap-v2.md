# 012 — Roadmap (v2)

Date: 2026-11-23 · Phase 0 → complete · Prompt: [`../prompts/012-roadmap-v2.md`](../prompts/012-roadmap-v2.md)

## 1. Files created or changed

- `docs/ROADMAP.md` — status "approved"; the earlier "no backfill" assumption replaced by
  "the user uses the app from Phase 1" (real data, migrations keep data, no resets); new
  task **P4-06 One-time backfill** (session coins, Karamel for every user, reward check for
  every user, idempotent; later Phase 4 tasks renumbered to P4-07 … P4-09; Phase 4 now has
  9 tasks); new acceptance criterion; #78 added to Phase 1 dependencies and the end check;
  Phase 0 marked complete.
- `docs/OPEN_QUESTIONS.md` — new **Proposed** #78 (where the app runs in Phases 1–4 with
  real data).
- `docs/CURRENT_STATE.md` — header "Phase 0 complete · Next: Phase 1"; "Phase 0 progress
  (complete)"; Roadmap "Approved"; Phase order row mentions use from Phase 1 and the
  backfill.
- `docs/WORKFLOW.md` — Phase 0 "Done (2026-11-23)"; Phases 1–5 defined in ROADMAP.md
  (approved); "Phase 0 order (completed)".

## 2. What was done, and what was NOT done or verified

- The accepted interpretations (Settings split, display name at sign-up, in-page Pomodoro
  until P5-02, static Karamel until Phase 4, "going live" = friend group, art fixes before
  P4-01) were already written in ROADMAP.md; no change needed.
- Nothing was committed (CLAUDE.md).

## 3. Contradictions, ambiguities and interpretations

- **Using the app from Phase 1 vs hosting in Phase 5.** ROADMAP puts hosting (#9) and the
  hosted project in P5-05, but rooms (Phase 3) need friends on other computers, and real
  data from Phase 1 needs a database that is never reset. Where the app runs until then is
  not decided: **#78 (Proposed)** — local stack for Phases 1–2, hosting decided before
  Phase 3. If accepted, P5-05 moves earlier (before Phase 3).
- **Backfill and the local stack:** if the real data lives on the local stack, the
  "never reset" rule also applies there; ADR-0018 mentions seed data, which is for test
  databases only.
- **`CLAUDE.md` still says "Current phase: Phase 0"** and forbids scaffolding until a
  prompt explicitly starts Phase 1. That rule remains correct until the user starts
  Phase 1; it was not changed (not requested).

## 4. Suggestions (out of scope)

- When starting Phase 1, update the "Current phase" section of `CLAUDE.md` in the same
  task.
