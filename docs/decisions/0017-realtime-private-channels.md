# ADR-0017: Realtime — private channels for room Presence

- **Status:** Accepted · Note: the JWT lifetime is 1 hour (ADR-0027)
- **Date:** 2026-11-22

## Context

ADR-0006 uses one Presence channel per room and says you see another user only if you share
a room. On a public Realtime channel, anyone who knows the channel name can join. Research:
[TECH_RESEARCH.md](../TECH_RESEARCH.md) §6.

## Decision

- Room Presence uses **Realtime private channels**: public access is disabled, channels are
  created as private, and **RLS policies on `realtime.messages`** allow a user to listen and
  track only in rooms they are a member of.
- The Supabase **free plan is considered sufficient** for the expected scale (free plan seen
  during research: 200 concurrent connections, 2M messages/month, 100 channels per
  connection).

## Alternatives considered

- **Public channels with unguessable names** — the name would act as a secret, and membership
  removal could not be enforced.
- **Broadcast-only design** — not needed for online/offline state; Presence fits it.

## Consequences

- Realtime authorization is checked when the user connects and cached until the JWT expires.
  A member removed from a room (ADR-0014) may keep receiving that room's Presence until the
  token expires; the JWT lifetime should be kept short.
- 100 channels per connection is a hard ceiling for the number of rooms per user
  (OPEN_QUESTIONS #15).
- Free-plan availability of private channels was **not verified** during research (no plan
  restriction was found); confirm when the project is set up.

## Open points

- Per-user room limit (OPEN_QUESTIONS #15).
