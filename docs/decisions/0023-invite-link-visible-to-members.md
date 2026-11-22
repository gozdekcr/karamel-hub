# ADR-0023: Invite link visible to all members

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

ADR-0014 defines joining by a secret invite link and lets owners regenerate it, but does
not say who can see the link. This is needed before the database design (RLS on the link).

## Decision

- **All members of a room can see and share its invite link**, not only owners.
- Regenerating the link stays an owner action (ADR-0014); the old link stops working
  immediately.

## Alternatives considered

- **Only owners see the link** — every new member would have to go through an owner.

## Consequences

- RLS must let every current member read the room's link token; former members and
  non-members must not (ADR-0014 visibility rule).
- After a regeneration, every member sees the new link. Rotation alone therefore does not
  keep a removed user out if another member re-shares the link. How removal prevents
  rejoining (ADR-0014: a ban record or a link rotation) is deferred (OPEN_QUESTIONS #48).
- Extends ADR-0014's permission table: "See and share the invite link" is ✅ for members,
  owners and the creator-role holder.

## Open points

- How removal prevents rejoining: deferred (OPEN_QUESTIONS #48).
