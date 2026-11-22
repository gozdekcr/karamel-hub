# ADR-0016: Database implementation rules — overlap constraint, room-visible data, heartbeat

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Three accepted decisions need a concrete database approach before `DATABASE.md` is written:
sessions never overlap (ADR-0011), room members see only time data (ADR-0006), and the app
sends a heartbeat (ADR-0007). Research: [TECH_RESEARCH.md](../TECH_RESEARCH.md) §5, §7, §8.

## Decision

1. **Overlap constraint (ADR-0011):** an exclusion constraint using GiST — equality on the
   user, overlap (`&&`) on the session's time range — with the **btree_gist** extension. This
   is the pattern shown in the PostgreSQL documentation. **The first Phase 1 database step is
   to verify that btree_gist is available** on the local stack and the hosted project.
2. **Time-only visibility (ADR-0006) by table split:** the table that room members can read
   holds **only** the user and time data (start, end, pauses). Course, task and other private
   links live in a **separate table readable only by the owner**. Views, if used, are created
   with `security_invoker = true`.
3. **Heartbeat (ADR-0007):** stored in a **separate per-user table that is not part of the
   Realtime publication**. The starting interval is **60 seconds**, to be tuned with real
   usage.

## Alternatives considered

- **Overlap check in a trigger** — no extension needed, but weaker than a constraint and
  race-prone.
- **A view over the full sessions table** — RLS filters rows, not columns; members could read
  private columns from the base table. Postgres Changes also sends whole rows.
- **A security definer function** — hides columns, but cannot be used with Postgres Changes;
  Supabase recommends security invoker.
- **Column-level privileges** — not recommended by Supabase.
- **Heartbeat as a column on the session row** — every heartbeat would become a Realtime
  message to every watching member (estimated ≈1.8M messages/month in an example, against a
  2M free limit).
- **Heartbeat in Presence or browser storage only** — lost when the browser closes or the
  device changes.

## Consequences

- An overlapping insert or edit fails with SQLSTATE `23P01` (exclusion_violation); the UI maps
  it to a translated message.
- Statistics that need a course (personal stats per course) join the owner-only table; room
  statistics never touch it.
- Heartbeat writes do not create Realtime traffic; without an index on the timestamp column
  they can be HOT updates.
- Exact tables, columns and RLS policies are defined in `DATABASE.md`.

## Open points

- The "large gap" threshold for the forgotten-timer suggestion (OPEN_QUESTIONS #1).
