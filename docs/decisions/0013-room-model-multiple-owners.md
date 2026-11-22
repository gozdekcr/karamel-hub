# ADR-0013: Room model with multiple owners

- **Status:** Accepted
- **Date:** 2026-11-22
- **Supersedes:** [ADR-0004](0004-room-model.md)

## Context

ADR-0004 defined persistent rooms with exactly one owner. The user wants owners to work
like admins in a WhatsApp group: the creator starts as owner, a room can have several
owners, and an owner can give the owner role to other members. Everything else in
ADR-0004 stays the same and is restated here so this ADR is complete on its own.

## Decision

- Rooms are **persistent**. A user can be a member of **several rooms**.
- **Joining:** an invite link with a secret, unguessable token (never the room id).
  Login is required before joining. Anyone with a valid link can join, as long as the room
  is not full (ADR-0012).
- **Roles:** `owner` and `member`. A room can have **several owners**.
- **Creator:** the user who creates a room becomes its first owner.
- **Granting the role:** an owner can make any member an owner (like a WhatsApp group admin).
- **Transferring:** an owner can hand over their role, i.e. make another member an owner and
  step down to member.
- **Owner actions** (any owner): regenerate the link (the old link stops working
  immediately), remove members, change the member limit (ADR-0012), and make members owners.
  Removal must prevent rejoining with an old link (a ban record or an automatic link
  rotation).
- **Owner leaving:** if the room has other owners, an owner can leave without
  transferring anything. Only a **sole owner** must first make another member an owner
  before leaving. A room always has at least one owner.
- **Membership history:** each membership is an interval (`joined_at`, `left_at`). A user
  who leaves and rejoins has several intervals.
- **Leaving:** a former member's hours stay in the room's statistics; their name is not
  listed and they appear as "former member".
- **Visibility rule:** you see another user only if you share a room.

## Alternatives considered

- **Exactly one owner (ADR-0004)** — the owner is a single point of failure and cannot
  share moderation.
- **Only the creator can grant the owner role** — rejected; the user chose the WhatsApp
  admin model, where any admin can make others admin.
- **One-off rooms** — less meaningful long-term statistics.
- **Approval to join** — safer, but the user prefers open links. Link regeneration and
  removal cover misuse.
- **Every leaving owner must transfer first** — unnecessary when other owners remain.
- **Sole owner leaves → ownership passes automatically / room closes** — surprising for members.

## Consequences

- The link works like the room's password; regenerating it is the main safety tool.
- Membership history is needed by room statistics (ADR-0005).
- Role checks (owner actions, "at least one owner") must be enforced in the database
  (RLS / RPC functions, ADR-0001), not only in the UI.
- More owners means more people who can remove members or rotate the link; owners must
  trust each other.

## Open points

- Can an owner remove another owner or take away their owner role? (OPEN_QUESTIONS #17)
- Does the creator have any extra protection (e.g. cannot be removed by other owners)?
  (OPEN_QUESTIONS #18)
- Per-user room limit (OPEN_QUESTIONS #15).
