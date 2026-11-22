# ADR-0006: Realtime and privacy

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Room members see who is online and who is studying. Anyone with a link can join a room,
so a room may contain people the user does not know well.

## Decision

Three kinds of data, three mechanisms. Rule: *"If it is lost, is that a problem?"*
Yes → database. No → Presence.

| Data | Example | Mechanism |
| --- | --- | --- |
| Online / offline | "online" | Supabase **Presence**, one channel per room. A user joins the channels of all their rooms. Not stored. |
| Studying status | "studying for 1 h 12 min" | Derived from the **active session row** + Postgres Changes |
| Messages | room chat | Stored in the **database** (room chat only, no DMs) |

Broadcast is not needed for now.

**Privacy:** room members see **only time data** — whether someone is studying and for how
long. Courses, tasks and notes are never visible to others. This is enforced in the
database (a view exposing only time fields and/or RLS), not only in the UI.

## Alternatives considered

- **One global presence channel** — everyone would see everyone; breaks the visibility rule.
- **Storing presence in the database** — unnecessary writes; presence is ephemeral.

## Consequences

- Presence can lag a few seconds when a tab closes; acceptable.
- A user in many rooms joins many channels. Each room has its own member limit
  (ADR-0012), but the upper bound of that limit and a per-user room limit are still open
  (OPEN_QUESTIONS #13, #15).
