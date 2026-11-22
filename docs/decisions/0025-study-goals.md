# ADR-0025: Profiles, user settings and study goals

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

The brief lists daily and weekly study goals. Room members can only see time data
(ADR-0006), and RLS filters rows, not columns (ADR-0016), so private fields cannot share a
row with data that room members read. Where goals, timezone and language are stored was
needed before the database design.

## Decision

- **`profiles`** holds **only the display name**. Room members can read it.
- **`user_settings`** holds the **daily goal**, the **weekly goal** (both in minutes), the
  **timezone** and the **language**. **Only the owner** can read it.
- **Goals are private** and **optional**: a goal can be left empty, and there is **no
  default**.
- **No goal history** is kept. Past days and weeks are evaluated against the **current**
  goal.
- "Day" is the user's day in their timezone (ADR-0010); the weekly goal uses the calendar
  week of ADR-0022 (Monday 00:00 – Sunday 24:00 in the user's timezone).

## Alternatives considered

- **Goals in `profiles`** — room members would read the goals too.
- **Goal history (one row per change)** — past days would keep the goal that was valid at
  the time, but it adds a table and queries for little benefit.

## Consequences

- Changing a goal changes how past days and weeks look in statistics ("goal met").
- With no goal set, there is nothing to evaluate; statistics show time only.

## Open points

- None.
