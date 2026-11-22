# 012 — Roadmap

Date: 2026-11-23 · Phase 0 · Prompt: [`../prompts/012-roadmap.md`](../prompts/012-roadmap.md)

## 1. Files created or changed

- **New:** `docs/ROADMAP.md` (draft for review) — overview, definition of done, five phases
  (goal, scope, out of scope, ADRs, dependencies, task table with tests, acceptance
  criteria), "Later", Phase 0 end check. 43 tasks: Phase 1 13, Phase 2 7, Phase 3 9,
  Phase 4 8, Phase 5 6.
- `docs/OPEN_QUESTIONS.md` — #12 (phase order) closed by the user's decision.
- `docs/CURRENT_STATE.md` — product row "Phase order"; Roadmap progress.
- `docs/README.md` — ROADMAP.md added; the now-empty "Planned Phase 0 documents" table
  replaced by one line.

## 2. What was done, and what was NOT done or verified

- Based on the user's phase order, Accepted ADRs and the design documents. No new
  OPEN_QUESTIONS were needed.
- Task sizes ("one Claude Code round") are Claude's estimate; some (P3-01, P4-05) may need
  a second round (`-v2`).
- Mermaid diagram not rendered. Nothing was committed (CLAUDE.md).

## 3. Phase 0 end check

- All planned Phase 0 documents exist.
- **Nothing in OPEN_QUESTIONS blocks Phase 1.** #41 (Node.js) is the first Phase 1 task,
  as decided.
- Needed later: #13, #14, #15, #27 before Phase 3; #1, #9 in Phase 5.
- Remaining: the user's approval of the roadmap (WORKFLOW.md).

## 4. Contradictions, ambiguities and interpretations

- **Rewards before Phase 4:** coins start in Phase 4, but sessions exist from Phase 1.
  ROADMAP assumes nobody uses the app before it goes live in Phase 5, so no backfill is
  needed (local data is reset). If the app is used earlier, a backfill decision is needed.
- **Settings:** the phase list does not name the Settings screen. ROADMAP puts display
  name, language and timezone in Phase 1 (P1-13) and goals in Phase 2 (P2-03).
- **Display name at sign-up:** `profiles.display_name` is required, but the full
  first-login flow is in Phase 5; ROADMAP asks for the name on the sign-up screen in
  Phase 1 (P1-05) and adds the rest of the flow in P5-01.
- **Notifications in Phase 5, Pomodoro in Phase 1:** until P5-02, phase changes are shown
  only in the page (the same as the decided fallback, #69).
- **Karamel in the menu from Phase 1:** a static image until dressing exists (Phase 4).
- **"Going live" (Phase 5)** is read as deployment for the friend group, not a public
  release (CURRENT_STATE "Release"); 🚀 items are under "Later".
- **Art fixes before P4-01:** the assets README Known issues (pink-visor, strawberry-bonnet,
  yellow-bucket-hat) should be fixed before images are measured.

## 5. Suggestions (out of scope)

- When the roadmap is approved, mark Phase 0 as done in CURRENT_STATE and WORKFLOW, and
  start Phase 1 with P1-01.
