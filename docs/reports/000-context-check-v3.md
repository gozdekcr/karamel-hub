# 000 — Context check (v3)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/000-context-check-v3.md`](../prompts/000-context-check-v3.md)

## 1. What was done

**Created**

- `docs/prompts/000-context-check-v3.md` — this task's prompt (English translation).
- `docs/reports/000-context-check-v3.md` — this report.

**Changed**

- `docs/decisions/0013-room-model-multiple-owners.md` — owner leaving clarified, as
  confirmed by the user: if other owners remain, an owner can leave without transferring;
  only a sole owner must first make another member an owner. Alternatives updated. The
  "any owner can make a member an owner" rule was confirmed and is unchanged.
- `CLAUDE.md` — the prompt rule now says: save the full prompt in English (translated if
  needed); Claude Code assigns `NNN` sequentially; new rounds keep the number and add
  `-v2`, `-v3`. The Language section says the repo is English only, saved prompts included.
- `docs/WORKFLOW.md` — task loop step 1 says prompts are saved in English; new line:
  Claude Code assigns `NNN` sequentially.
- `docs/prompts/README.md` — same rules (English, sequential `NNN`).
- `docs/prompts/000-context-check-v2.md` — the Turkish original removed; only the English
  translation remains.
- `docs/reports/000-context-check-v2.md` — a note at the top pointing to the v3 changes.

## 2. What was verified, and how

- Searched the repo for Turkish characters. Only two hits, both intentional: the author's
  name in `LICENSE` and the example name "Ayşe" in ADR-0005.
- Nothing was committed.

## 3. What was NOT done or verified

- `CURRENT_STATE.md` was not changed: its "Room owners" row does not describe the
  leaving rule, so it stays correct.

## 4. Known issues, ambiguities and interpretations

- Resolved this round: owner leaving, who can grant the owner role, repo language, who
  assigns `NNN`.
- Interpretation: this prompt is a new round of the same task, so it is `000-...-v3`. The
  next new task gets `001`.
- Still open: OPEN_QUESTIONS #17 (can an owner remove or demote another owner) and #18
  (extra protection for the creator).

## 5. Suggestions (out of scope)

- Decide what happens when the sole owner is also the only member and leaves (delete the
  room, or keep it without members).
- Add ADR-0011 and the ADR-0013 role rules to the "Architecture invariants" list in
  `CLAUDE.md`.
