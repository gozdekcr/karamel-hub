# 000 — Context check (v6)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/000-context-check-v6.md`](../prompts/000-context-check-v6.md)

> **Correction (added in `001-review-uncommitted-changes-v2`):** ADR-0013 had already been
> committed in `bff7d98` when this round edited it, so "uncommitted" below is wrong. The
> edits were later moved to a new ADR-0014, and ADR-0013 was restored and superseded.

## 1. What was done

**Created**

- `docs/prompts/000-context-check-v6.md` — this task's prompt (English translation).
- `docs/reports/000-context-check-v6.md` — this report.

**Changed**

- `docs/decisions/0013-room-model-multiple-owners.md` (edited directly; uncommitted):
  - New rule: any owner can delete a room, even while it has other members.
  - New rule: choosing "keep without members" shows a UI warning that anyone with the
    link can later join and become owner.
  - Permissions table: the "delete the room" row is now ✅ for owner and creator; the
    "not decided" footnote is removed.
  - Consequences: deleting a room removes its statistics view but no sessions or personal
    time; the UI warning covers the empty-room risk.
  - Open point #21 removed.
- `docs/OPEN_QUESTIONS.md` — #21 removed and listed as resolved.
- `docs/CURRENT_STATE.md` — "Empty rooms" row mentions the warning; new "Deleting a room" row.

## 2. What was verified, and how

- `grep` for leftover `#21` and `❓` references: only the resolved note, this round's
  prompt and the v5 report (history) remain.
- Nothing was committed.

## 3. What was NOT done or verified

- The warning's text and i18n keys were not written (UI/UX design and Phase 1).

## 4. Known issues, ambiguities and interpretations

- **"Owner" was read as any owner**, not only the creator. This means an owner can delete
  a room while the creator is in it, which in practice is stronger than removing the
  creator (creator protection does not stop it). Confirm whether this is intended.

## 5. Suggestions (out of scope)

- Ask for confirmation before deleting a room that has other members, and decide whether
  members are notified.
