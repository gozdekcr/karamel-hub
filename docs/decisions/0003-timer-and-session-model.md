# ADR-0003: Timer and session model

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Tabs close, laptops sleep, browsers throttle timers in background tabs, and different
devices have different clocks. Other people must see the same elapsed time as the owner.
A user may be a member of several rooms at once.

## Decision

- A **session** is personal. It has **no `room_id`**.
- A user has **at most one active session** (`ended_at` is null). Enforced in the database
  (e.g. a partial unique index).
- That single session counts in **every room** the user belongs to (see ADR-0005).
- Elapsed time = server now − `started_at` − total pause time. Pauses are stored as segments.
- Timestamps come from the **server**, not the client clock. Ticks are never counted.
- Modes: Pomodoro and free study timer.
- Sessions are the single source of truth: daily totals, streaks, charts, room stats and
  rewards are all derived from sessions.

## Alternatives considered

- **Count ticks on the client and save periodically** — drifts in background tabs, loses
  time when a tab closes.
- **A session per room** — would double count time across rooms and complicate the UI.
- **Separate counters (e.g. `total_minutes`)** — drift out of sync with sessions.

## Consequences

- Refreshing the page or switching devices does not affect the timer.
- Any client can compute the same remaining/elapsed time from the same data.
- Room features never need to write to sessions.

## Open points

- Overlapping sessions: resolved by [ADR-0011](0011-sessions-never-overlap.md) — a user's
  sessions never overlap.
