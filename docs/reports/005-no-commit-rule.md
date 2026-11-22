# 005 — No-commit rule

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/005-no-commit-rule.md`](../prompts/005-no-commit-rule.md)

## 1. Files created or changed

- `CLAUDE.md` — new rule: never commit or push, even if the user asks; the user always
  commits; Claude only suggests a commit message. The rule about repositories and external
  resources (Supabase projects, deployments) is kept as a separate bullet.
- `docs/WORKFLOW.md` — step 5 of the decision loop: the user commits; Claude only suggests
  the message.
- `docs/reports/004-gamification-design-v2.md` — the line "Committed as requested" was no
  longer true (the user undid commit `faf88c5` with a soft reset); corrected.

## 2. What was done, and what was NOT done or verified

- `git reflog` shows `reset: moving to HEAD~` after `faf88c5`; the task 004 changes are
  staged, not committed.
- Nothing was committed or staged by Claude in this task.

## 3. Contradictions or ambiguities

- None.

## 4. Suggestions (out of scope)

- None.
