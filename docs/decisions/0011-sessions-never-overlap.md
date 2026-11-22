# ADR-0011: Sessions never overlap

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Sessions are the single source of truth for personal stats, streaks, room statistics and
rewards (ADR-0003, ADR-0005). Sessions can be edited freely and added manually (ADR-0007).
Without a rule, an edit or a manual entry could cover time that another session of the
same user already covers, and that time would be counted twice.

## Decision

- A user's sessions **never overlap** in time. This includes edited sessions and manually
  added sessions.
- Enforced in the **database** with an **exclusion constraint** on the user and the
  session's time range. An insert or edit that would overlap is rejected.
- Sessions that only touch (one ends exactly when the next starts) are not an overlap.
- An active session (no `ended_at`) is treated as open-ended for this check. The exact
  range expression is defined in the database design (`DATABASE.md`).

## Alternatives considered

- **Allow overlaps and merge them when computing stats** — every calculation (personal,
  room, rewards) would need the same merge logic; easy to get wrong in one place.
- **Check only in the client** — edits from two tabs or a buggy client could still create
  overlaps; the database must be the guard (ADR-0001).

## Consequences

- Personal and room time can never double count a user's own time.
- Statistics and the sweep-line (ADR-0005) can assume one user's intervals are disjoint.
- The session edit and manual-entry UI must handle a rejected save and explain why
  (i18n keys, ADR-0010).
- Assumption (not verified yet): the constraint needs the PostgreSQL `btree_gist`
  extension, which is to be checked during database design.
