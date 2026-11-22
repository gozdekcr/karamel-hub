# ADR-0012: Room member limit

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Anyone with a room's invite link can join it (ADR-0014). Rooms need a size limit, but an
owner may later want to add someone even when the room is full.

## Decision

- When creating a room, the creator **chooses a member limit** for that room.
- The room's **current owners** can **change the limit after the room is created**, for
  example raise it to let one more person join. A room can have several owners (ADR-0014).
- When the room has reached its limit, new joins are refused.
- The limit is **checked in the database**, so two people joining at the same time cannot
  exceed it (ADR-0001).

## Alternatives considered

- **One fixed limit for every room** — an owner could not add someone to a full room.
- **No limit** — anyone with a leaked link could fill a room without bound.
- **Check the limit only in the client** — concurrent joins could exceed it.

## Consequences

- Rooms store their own limit; the join path checks it in the database.
- Changing the limit is an owner action, like regenerating the link (ADR-0014).

## Open points

- The upper bound for the limit (OPEN_QUESTIONS #13).
- What happens if an owner lowers the limit below the current member count
  (OPEN_QUESTIONS #14).
