# ADR-0026: Account deletion

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Room statistics are derived from sessions (ADR-0005), and a member who leaves a room keeps
their hours in its statistics (ADR-0014). Every room with members has exactly one
creator-role holder (ADR-0014). Deleting an account was not decided.

## Decision

- When a user deletes their account, **their sessions are deleted**. **Room statistics
  shrink accordingly** (they are derived, ADR-0005).
- **Their room chat messages and membership history are deleted** too.
- **Coins, cats, items, settings and heartbeat rows** belong only to the user and are
  deleted with the account.
- **Creator role:** in each room where the user holds the creator role, the role passes to
  the **oldest owner**; if there is no other owner, to the **oldest member**, who also
  becomes an owner. "Oldest" means the earliest `joined_at` of the person's current
  membership. If nobody is left, the room is deleted (ADR-0014).

## Alternatives considered

- **Keep sessions anonymized** — room totals would stay, but the user's study data would
  remain after deletion.
- **Block deletion until the user hands over every creator role** — an extra step for the
  user; the automatic hand-over follows a fixed rule.

## Consequences

- This differs from leaving a room (ADR-0014): after leaving, the hours stay as "former
  member"; after account deletion, they are gone.
- Other members' already granted rewards are not affected; for example, "Better together"
  coins are never taken back (ADR-0021).
- The hand-over and the deletion run in the database, like other role rules (ADR-0014).

## Open points

- None.
