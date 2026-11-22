# ADR-0005: Room statistics

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Each room shows how much its members study. Sessions are personal and count in every room
the user belongs to (ADR-0003). Membership changes over time (ADR-0004).

## Decision

All room statistics are **derived** from sessions and membership history. No counters are stored.

- **Member's time in a room** = the member's sessions clipped to their membership
  intervals. Studying before joining a room does not count in that room.
- **Room total time** = sum of all members' (and former members') clipped time.
  It can exceed wall-clock time (3 people × 1 h = 3 h).
- **Room shared time** = wall-clock time during which **at least 2** members were studying.
  Computed with a sweep-line: sort all start/end points, track how many members are active,
  sum the intervals where the count is ≥ 2. O(n log n), pure function in `domain/`.
- **Never show a sum across rooms.** A session in 5 rooms appears in 5 rooms; the personal
  total always comes from the sessions themselves.
- **MVP:** fetch sessions for the selected range (week/month) and compute in `domain/`.
  If history grows, move the calculation to a SQL function or daily aggregates.

## Alternatives considered

- **Counters per room** — fast to read, but drift from the real sessions and break on edits.
- **Pairwise shared time** ("4 h with Ayşe") — possible later from the same data, no schema change.

## Consequences

- UI labels must explain total vs shared time; otherwise total > shared looks like a bug.
- Session edits (ADR-0007) automatically update room statistics.
