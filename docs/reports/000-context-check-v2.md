# 000 — Context check (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/000-context-check-v2.md`](../prompts/000-context-check-v2.md)

> Later changed in v3: the prompt file now contains only the English translation (the
> repo is English only), and the owner-leaving rule was confirmed and clarified in
> ADR-0013. See `000-context-check-v3.md`.

Note: the previous round (README wording, ADR-0011, ADR-0012, open questions) had no
saved prompt or report file; its results are part of the current uncommitted changes.

## 1. What was done

**Created**

- `docs/prompts/000-context-check-v2.md` — this task's prompt: the original Turkish text
  verbatim, followed by an English translation.
- `docs/decisions/0013-room-model-multiple-owners.md` (Accepted) — supersedes ADR-0004.
  Restates the whole room model and changes the roles: the creator is the first owner, a
  room can have several owners, any owner can make a member an owner (WhatsApp admin
  model), an owner can hand over their role, and the last owner cannot leave without first
  making someone else an owner.
- `docs/reports/000-context-check-v2.md` — this report.

**Changed**

- `CLAUDE.md` — new rule: save the user's prompt as-is as `docs/prompts/NNN-short-name.md`
  at the start of every task.
- `docs/WORKFLOW.md` — the `-fix` rule is removed. Every new round of the same task
  (fixes included) gets `-v2`, `-v3`; a prompt and its report carry the same name. Task
  loop step 1 now says Claude Code saves the prompt. ADR range updated to 0001 … 0013.
- `docs/prompts/README.md` — same naming rule; `-fix` removed.
- `docs/decisions/0004-room-model.md` — status set to `Superseded by ADR-0013`. Nothing
  else changed.
- `docs/decisions/0012-room-member-limit.md` — the limit is changed by the room's
  current owners (several are possible), and the database check is now part of the
  decision (the user accepted it). References point to ADR-0013.
- `docs/OPEN_QUESTIONS.md` — #13–#15 reworded for multiple owners / ADR-0013; added #17
  (can an owner remove or demote another owner?) and #18 (does the creator have extra
  protection?).
- `docs/CURRENT_STATE.md` — new "Room owners" row, updated "Room size" row, ADR-0004 marked
  superseded, ADR-0013 added, progress range 0001 … 0013.
- `docs/decisions/README.md` — ADR-0004 superseded, ADR-0013 added.

## 2. What was verified, and how

- `grep` for leftover `-fix` and `ADR-0004` references across the Markdown files. The only
  remaining `ADR-0004` references are ADR-0013 itself (intentional) and the Context section
  of ADR-0005 (see section 4).
- `git status` checked. Nothing was committed.

## 3. What was NOT done or verified

- No commit.
- ADR-0005's Context still references ADR-0004 (not edited, Accepted ADR, history only).
- The prompt and report of the previous round were not recreated retroactively.

## 4. Known issues, ambiguities and interpretations

- **ADR-0012 was edited, not superseded.** It was written in the previous round and has
  not been committed yet, and the user's instruction directly changed it. A superseding ADR
  seemed unnecessary for an uncommitted ADR; confirm if you prefer a new ADR instead.
- **Last owner leaving:** "a room always has at least one owner" was derived from
  ADR-0004's rule (the owner cannot leave without transferring). The user did not state it
  explicitly for multiple owners.
- **Any owner can grant the role:** the prompt says "the creator owner can give the role to
  others" and "same logic as a WhatsApp admin". Interpreted as: every owner, not only the
  creator, can make members owners.
- **Not specified:** whether an owner can remove or demote another owner, and whether the
  creator is protected → OPEN_QUESTIONS #17, #18.
- **Prompt language:** the new rule says "save the prompt as-is", while this task asked
  for files in English. The prompt file contains both the verbatim Turkish text and an
  English translation. Confirm if this should be the standard format.
- **Who picks `NNN` and the short name** for a new task is not defined (the user, or the
  next free number chosen by Claude Code).

## 5. Suggestions (out of scope)

- Add "A user's sessions never overlap (ADR-0011)" and the room-role rules (ADR-0013) to the
  "Architecture invariants" list in `CLAUDE.md`.
- Define in `WORKFLOW.md` how `NNN` is chosen and the standard prompt-file format
  (verbatim + English translation).
