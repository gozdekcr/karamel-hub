# 000 — Context check (v5)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/000-context-check-v5.md`](../prompts/000-context-check-v5.md)

> **Correction (added in `001-review-uncommitted-changes-v2`):** ADR-0013 had already been
> committed in `bff7d98` when this round edited it, so "uncommitted" below is wrong. The
> edits were later moved to a new ADR-0014, and ADR-0013 was restored and superseded.

## 1. What was done

**Created**

- `docs/prompts/000-context-check-v5.md` — this task's prompt (English translation).
- `docs/reports/000-context-check-v5.md` — this report.

**Changed**

- `docs/decisions/0013-room-model-multiple-owners.md` (edited directly; uncommitted):
  - Creator protection: the creator can step down, leave, or make others owners of their
    own will; other owners can never remove or demote the creator. Once the creator steps
    down or leaves, the protection ends, does not come back, and nobody inherits it.
  - Empty room: it can be joined again with its link; the first person to join becomes
    owner (without creator protection).
  - New **Permissions** table (member / owner / creator).
  - New consequence: an empty room's link keeps working, so anyone who has it can take
    ownership.
  - Open points: #19, #20 removed; #21 added.
- `docs/OPEN_QUESTIONS.md` — #19 and #20 removed (resolved). Added #21: can owners delete
  a room that still has other members?
- `docs/CURRENT_STATE.md` — "Room owners" row updated; new "Empty rooms" row.
- `CLAUDE.md` and `docs/decisions/README.md` — rule changed: only **committed** Accepted
  ADRs need a superseding ADR; uncommitted ADRs may be edited directly.

## 2. What was verified, and how

- Re-read ADR-0013 after the edits; Decision, Permissions table and Open points are
  consistent with each other.
- Nothing was committed.

## 3. What was NOT done or verified

- The permission table covers only actions decided so far. Actions that were never
  discussed (e.g. renaming a room, deleting chat messages) are not in it.

## 4. Known issues, ambiguities and interpretations

- **Re-promoted creator:** "protection does not come back if they rejoin" was also applied
  to a creator who stepped down and is later made owner again in the same room.
- **Nobody inherits the protection:** not stated by the user; it follows from the
  protection belonging to the creator only.
- **Deleting a room with members:** the table made this gap visible; added as #21 instead
  of deciding it.

## 5. Suggestions (out of scope)

- When the room UI is designed, the "keep without members" choice should warn that anyone
  with the link can later join and become owner.
