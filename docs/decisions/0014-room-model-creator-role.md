# ADR-0014: Room model with multiple owners and a creator role

- **Status:** Accepted · Note: how removal prevents rejoining is deferred (OPEN_QUESTIONS #48)
- **Date:** 2026-11-22
- **Supersedes:** [ADR-0013](0013-room-model-multiple-owners.md) (which superseded ADR-0004)

## Context

ADR-0004 defined persistent rooms with exactly one owner; ADR-0013 allowed several owners.
The user wants owners to work like admins in a WhatsApp group: a room can have several
owners, and owners can give the owner role to other members. On top of that, one person
holds the **creator role**: it starts with the user who created the room, carries extra
rights (protection, deleting the room) and can be handed over at any time — and must be
when that person leaves. Everything else in ADR-0013 stays the same and is restated here
so this ADR is complete on its own.

## Decision

### Rooms and joining

- Rooms are **persistent** while they have members. A user can be a member of
  **several rooms**.
- **Joining:** an invite link with a secret, unguessable token (never the room id).
  Login is required before joining. Anyone with a valid link can join, as long as the room
  is not full (ADR-0012).
- **Membership history:** each membership is an interval (`joined_at`, `left_at`). A user
  who leaves and rejoins has several intervals.
- **Leaving:** a former member's hours stay in the room's statistics; their name is not
  listed and they appear as "former member".
- **Visibility rule:** you see another user only if you share a room.

### Roles

- **Roles:** `owner` and `member`. A room can have **several owners**.
- **Creator role:** exactly one member of a room holds the creator role. The user who
  creates the room holds it first. The creator-role holder is always an owner.
- **Handing over the creator role:** the creator-role holder can hand the role to another
  member **at any time**, not only when leaving. The receiver gets all creator rights,
  including protection, and automatically becomes an owner if they were not one. The
  previous holder **stays an owner**; they can then step down to member if they want.
- **Granting the owner role:** any owner can make any member an owner (like a WhatsApp
  group admin).
- **Removing or demoting owners:** any owner can remove another owner from the room or take
  away their owner role — **except the creator-role holder**, whom nobody can remove or demote.
- **Owner actions** (any owner): regenerate the link (the old link stops working
  immediately), remove members, remove or demote other owners (except the creator-role
  holder), change the member limit (ADR-0012), and make members owners. Removal must
  prevent rejoining with an old link (a ban record or an automatic link rotation).
- **Creator-only actions:** delete the room, and hand over the creator role.

### Leaving

- **Owners and members** (other than the creator-role holder) can leave freely.
- **The creator-role holder leaving:** when leaving, they **choose who receives the creator
  role** (the same hand-over as above).
- **Last person leaving:** a warning says the room will be deleted; if they continue, they
  leave and the room is **deleted**.
- **Empty rooms do not exist:** a room with no members is deleted automatically. A deleted
  room cannot be joined again with its old link.

### Deleting a room

- **Only the creator-role holder** can delete the room, at any time, even while other
  people are in it. **No confirmation** is asked.
- The room simply disappears. **No notification** is sent to anyone.

### Permissions

| Action | Member | Owner | Creator-role holder |
| --- | --- | --- | --- |
| See members, presence, study time and room statistics; use room chat | ✅ | ✅ | ✅ |
| Leave the room | ✅ | ✅ | ✅ ¹ |
| Regenerate the invite link | ❌ | ✅ | ✅ |
| Remove a member | ❌ | ✅ | ✅ |
| Make a member an owner | ❌ | ✅ | ✅ |
| Remove another owner from the room | ❌ | ✅ ² | ✅ |
| Take away another owner's role | ❌ | ✅ ² | ✅ |
| Change the member limit (ADR-0012) | ❌ | ✅ | ✅ |
| Step down to member | — | ✅ | ✅ ³ |
| Hand over the creator role (at any time) | ❌ | ❌ | ✅ |
| Delete the room (no confirmation, no notification) | ❌ | ❌ | ✅ |

1. When leaving, the creator-role holder chooses who receives the role. If they are the
   last person, a warning is shown and the room is deleted.
2. Never the creator-role holder.
3. Only after handing over the creator role (the holder is always an owner).

## Alternatives considered

- **Exactly one owner (ADR-0004)** — the owner is a single point of failure and cannot
  share moderation.
- **Only the creator can grant the owner role** — rejected; the user chose the WhatsApp
  admin model, where any admin can make others admin.
- **Owners cannot touch other owners** — rejected; the user chose the WhatsApp admin model.
- **No special protection for the creator** — rejected; the creator could be pushed out of
  their own room by an owner they promoted.
- **Any owner can delete the room** — rejected; deleting is a creator-only right.
- **Creator protection ends when the creator leaves** — replaced by handing over the
  creator role, so every room with members has a creator-role holder.
- **Keep empty rooms, joinable again by link** — rejected; anyone with an old link could
  take over the room. Empty rooms are deleted.
- **Ask for confirmation before deleting a room with members** — rejected; the
  creator-role holder decides freely.
- **Notify members when a room is deleted** — rejected; the room simply disappears.
- **Hand over the creator role only when leaving** — rejected; it can be handed over at
  any time.
- **One-off rooms** — less meaningful long-term statistics.
- **Approval to join** — safer, but the user prefers open links. Link regeneration and
  removal cover misuse.

## Consequences

- The link works like the room's password; regenerating it is the main safety tool.
- Membership history is needed by room statistics (ADR-0005).
- The room must store who holds the creator role. A room with members always has exactly
  one creator-role holder, who is also an owner, so it always has at least one owner.
- Role checks (owner actions, creator-only actions, protection, handing over the role on
  leave, automatic deletion) must be enforced in the database (RLS / RPC functions,
  ADR-0001), not only in the UI.
- Deleting a room removes the room, its membership history, chat and statistics, but no
  one's sessions or personal time: sessions have no `room_id` (ADR-0003).
- Members of a deleted room only notice that it is gone from their room list; the UI must
  handle a room disappearing while it is open.
- More owners means more people who can remove members or rotate the link; owners must
  trust each other.

## Open points

- Per-user room limit (OPEN_QUESTIONS #15).
