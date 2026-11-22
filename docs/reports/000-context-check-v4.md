# 000 — Context check (v4)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/000-context-check-v4.md`](../prompts/000-context-check-v4.md)

> **Correction (added in `001-review-uncommitted-changes-v2`):** ADR-0013 had already been
> committed in `bff7d98` when this round edited it, so "uncommitted" below is wrong. The
> edits were later moved to a new ADR-0014, and ADR-0013 was restored and superseded.

## 1. What was done

**Created**

- `docs/prompts/000-context-check-v4.md` — this task's prompt (English translation).
- `docs/reports/000-context-check-v4.md` — this report.

**Changed**

- `docs/decisions/0013-room-model-multiple-owners.md`:
  - Owners can remove another owner or take away their owner role.
  - Creator protection: other owners cannot remove or demote the creator; the creator
    stays an owner unless they step down or leave themselves.
  - Owner actions list updated accordingly.
  - "A room always has at least one owner" → "a room **with members** always has at least
    one owner" (needed because an empty room may now be kept).
  - Last person leaving: if the sole owner is also the only member, they choose to delete
    the room or keep it without members.
  - Alternatives and consequences updated (the room stores its creator; deleting a room
    does not delete sessions, since sessions have no `room_id`).
  - Open points: #17 and #18 removed; #19 and #20 added.
- `docs/OPEN_QUESTIONS.md` — #17 and #18 removed (resolved by ADR-0013). Added:
  - #19 What happens to creator protection if the creator steps down or leaves (and rejoins)?
  - #20 A room kept without members: how does it get an owner again, and does its link still work?
- `docs/CURRENT_STATE.md` — "Room owners" row updated; new "Leaving a room" row.
- `CLAUDE.md` — two new architecture invariants: ADR-0011 (sessions never overlap) and
  the ADR-0013 role rules.

## 2. What was verified, and how

- Re-read ADR-0013 after the edits for consistency between the Decision, Alternatives,
  Consequences and Open points sections.
- Nothing was committed.

## 3. What was NOT done or verified

- `docs/decisions/README.md` was not changed: ADR-0013's title and status are unchanged.

## 4. Known issues, ambiguities and interpretations

- **ADR-0013's decision was edited in place again** (it is uncommitted and was written in
  this task's earlier rounds). Under the rules, a decision change to an Accepted ADR needs
  a superseding ADR. The same question was raised for ADR-0012 in v2 and has not been
  answered yet: should uncommitted ADRs be edited in place?
- **The creator can still step down or leave voluntarily.** "The creator stays an owner"
  was read as protection against *other* owners only, because in v2 the user said the
  creator can hand the role over. What protection means after that is open (#19).
- **An empty kept room has no owner**, which is why the "at least one owner" rule now only
  applies to rooms with members. How it gets an owner again is open (#20).

## 5. Suggestions (out of scope)

- When the database design starts, list all room actions in a table showing which role
  can perform each one (member / owner / creator) so RLS and RPC rules can be checked against it.
