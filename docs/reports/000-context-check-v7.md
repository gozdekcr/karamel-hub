# 000 — Context check (v7)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/000-context-check-v7.md`](../prompts/000-context-check-v7.md)

> **Correction (added in `001-review-uncommitted-changes-v2`):** ADR-0013 had already been
> committed in `bff7d98` when this round edited it, so "uncommitted" below is wrong. The
> edits were later moved to a new ADR-0014, and ADR-0013 was restored and superseded.

## 1. What was done

**Created**

- `docs/prompts/000-context-check-v7.md` — this task's prompt (English translation).
- `docs/reports/000-context-check-v7.md` — this report.

**Changed**

- `docs/decisions/0013-room-model-multiple-owners.md` — rewritten (uncommitted, edited
  directly) around a transferable **creator role**:
  - Exactly one member holds the creator role (first the room's creator; always an owner).
    Nobody can remove or demote them.
  - Only the creator-role holder can delete the room, at any time, without confirmation;
    remaining members get a "your room was deleted" notification.
  - When leaving, the creator-role holder chooses who receives the role (with all its
    rights, including protection).
  - The last person leaving sees a warning that the room will be deleted; then it is deleted.
  - Empty rooms are deleted automatically and cannot be joined again by link.
  - Removed: "keep without members", "first person to join an empty room becomes owner",
    the UI warning about empty rooms, "any owner can delete", "protection ends and does not
    come back", and the "sole owner must make someone an owner" rule (now covered by the
    role hand-over).
  - Permissions table, alternatives, consequences and open points updated; the section is
    now split into Rooms and joining / Roles / Leaving / Deleting a room / Permissions.
- `docs/OPEN_QUESTIONS.md` — added #22 (can the creator-role holder step down or hand the
  role over without leaving?) and #23 (how the deletion notification is delivered). The
  resolved note now says the answers to #19–#21 were later changed.
- `docs/CURRENT_STATE.md` — room rows rewritten: Rooms, Room owners, new Creator role,
  Leaving a room, Empty rooms, Deleting a room.
- `CLAUDE.md` — ADR-0013 invariant rewritten for the creator role and automatic deletion.

## 2. What was verified, and how

- `grep` for wording from the old model ("without members", "sole owner", "first person",
  "any owner can delete", "does not come back", "step down") outside `reports/` and
  `prompts/`: only intentional uses remain (the rejected alternative and open question #22).
- Nothing was committed.

## 3. What was NOT done or verified

- No notification system was designed (#23).
- Older reports (v5, v6) were not changed; they describe the model at that time.

## 4. Known issues, ambiguities and interpretations

- **One holder:** "those who have creator privileges" was read as exactly one person at a
  time, because the role is handed over to "someone".
- **Protection moves with the role:** "creator privileges" was read as including the
  protection from removal/demotion, not only deleting the room.
- **Step down conflict:** in v5 the creator could step down to member of their own will.
  With a transferable creator role it is unclear what happens to the role then, so this is
  open again (#22) and marked ❓ in the permissions table.
- **Receiver becomes owner:** the creator-role holder is always an owner, so a member who
  receives the role also becomes an owner. Not stated explicitly by the user.
- **"A notification can be sent"** was read as "is sent".

## 5. Suggestions (out of scope)

- None.
