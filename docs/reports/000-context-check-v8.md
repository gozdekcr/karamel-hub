# 000 — Context check (v8)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/000-context-check-v8.md`](../prompts/000-context-check-v8.md)

> **Correction (added in `001-review-uncommitted-changes-v2`):** ADR-0013 had already been
> committed in `bff7d98` when this round edited it, so "uncommitted" below is wrong. The
> edits were later moved to a new ADR-0014, and ADR-0013 was restored and superseded.

## 1. What was done

**Created**

- `docs/prompts/000-context-check-v8.md` — this task's prompt (English translation).
- `docs/reports/000-context-check-v8.md` — this report.

**Changed**

- `docs/decisions/0013-room-model-multiple-owners.md` (uncommitted, edited directly):
  - The creator-role holder can hand the role over **at any time**, not only when leaving.
  - The receiver gets all creator rights including protection and automatically becomes
    an owner; the previous holder stays an owner and may then step down to member.
  - The creator-role holder is always an owner, so stepping down to member happens only
    after handing over the role (permissions table: ❓ replaced by ✅ with this footnote).
  - Deleting a room sends **no notification**; the room simply disappears.
  - Context, alternatives (hand-over only on leave, notifying members — both rejected),
    consequences and open points updated.
- `docs/OPEN_QUESTIONS.md` — #22 and #23 removed; resolved note updated (#17–#23 → ADR-0013).
- `docs/CURRENT_STATE.md` — "Creator role" and "Deleting a room" rows updated.
- `CLAUDE.md` — ADR-0013 invariant: the role can be handed over at any time and must be
  when leaving.

## 2. What was verified, and how

- `grep` for `notif`, `#22`, `#23` and `❓` outside `reports/` and `prompts/`: only the new
  "no notification" wording and the resolved note remain.
- Nothing was committed.

## 3. What was NOT done or verified

- Older reports (v5–v7) were not changed; they describe the model at that time.

## 4. Known issues, ambiguities and interpretations

- "Step down to member only after handing over the role" is derived from the confirmed
  rule that the creator-role holder is always an owner.
- New consequence noted in ADR-0013: the UI must handle a room disappearing while a member
  has it open (to be covered in UI/UX design).

## 5. Suggestions (out of scope)

- ADR-0013 is now stable after several rounds; this may be a good point to review all
  uncommitted changes and commit them as one `docs:` commit (only with your approval).
