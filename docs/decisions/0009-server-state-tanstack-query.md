# ADR-0009: Server state — TanStack Query

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Most of the app's state lives on the server (sessions, courses, rooms, messages) and is
updated by realtime events from other users.

## Decision

Use **TanStack Query** for server state. Realtime events invalidate or update the related
queries. No client-only global state library until a real need appears.

## Alternatives considered

- **Plain `useEffect` + `useState`** — fewer dependencies, but caching, refetching and
  loading/error states would be written by hand.

## Consequences

- One place for caching and refetch rules.
- Realtime subscriptions live in `data/` and talk to the query cache.

## Open points

- Client-only state library, if ever needed (OPEN_QUESTIONS #8).
