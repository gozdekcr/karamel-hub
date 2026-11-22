# ADR-0007: Forgotten timer and session editing

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

A user may forget to stop the timer (e.g. closes the laptop overnight). But a long
session can also be real: the user explicitly rejected any maximum session length.
Cheating is not a design goal; coins exist for fun.

## Decision

- **The timer never stops automatically.** There is no maximum session length.
- **Heartbeat:** while the app is open, it periodically tells the server "I am here".
  When the user returns and there is a large gap since the last heartbeat, the app
  **suggests** ending the session at the last heartbeat. The user decides; nothing changes
  without their choice.
- **Session editing is free:** a user can change a finished session's start or end time
  in both directions.
- **Manual sessions:** a user can add a session they forgot to time.

## Alternatives considered

- **Auto-stop after N hours** — rejected; real long sessions exist.
- **Edits may only shorten a session** — rejected; anti-cheat is not a goal.

## Consequences

- Edits and manual sessions change personal stats, streaks and room statistics
  retroactively (they are all derived, ADR-0005).
- Edited time is visible to room members as part of room totals.

## Open points

- Heartbeat interval and "large gap" threshold (OPEN_QUESTIONS #1).
- Overlapping sessions after edits/manual entries: resolved by
  [ADR-0011](0011-sessions-never-overlap.md) — they are rejected.
- How rewards react to edits: resolved by [ADR-0021](0021-coin-economy-and-shop.md) —
  coins are recalculated and the difference is written as a correction entry.
