# ADR-0004: Room model

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Rooms let people see each other's study time. The user wants persistent rooms, membership
in several rooms, and joining by link for anyone who has it. There is no friends system.

## Decision

- Rooms are **persistent**. A user can be a member of **several rooms**.
- **Joining:** an invite link with a secret, unguessable token (never the room id).
  Login is required before joining. Anyone with a valid link can join.
- **Owner actions:** regenerate the link (the old link stops working immediately) and
  remove members. Removal must prevent rejoining with an old link (a ban record or an
  automatic link rotation).
- **Roles:** `owner` and `member`.
- **Owner leaving:** the owner cannot leave without first transferring ownership.
- **Membership history:** each membership is an interval (`joined_at`, `left_at`). A user
  who leaves and rejoins has several intervals.
- **Leaving:** a former member's hours stay in the room's statistics; their name is not
  listed and they appear as "former member".
- **Visibility rule:** you see another user only if you share a room.

## Alternatives considered

- **One-off rooms** — less meaningful long-term statistics.
- **Approval to join** — safer, but the user prefers open links. Link regeneration and
  removal cover misuse.
- **Owner leaves → ownership passes automatically / room closes** — surprising for members.

## Consequences

- The link works like the room's password; regenerating it is the main safety tool.
- Membership history is needed by room statistics (ADR-0005).

## Open points

- Room member limit (OPEN_QUESTIONS #4).
