# ADR-0002: Frontend layering

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

The hardest logic in this app is about time and rules (timer state, streaks, statistics,
shared time, rewards). It must be testable without a browser, React or a database.

## Decision

Three layers:

| Layer | Contains | May import |
| --- | --- | --- |
| `domain/` | Pure TypeScript: timer state machine, streaks, stats, shared-time (sweep-line), reward rules | Nothing from React or Supabase |
| `data/` | Supabase queries, RPC calls, realtime subscriptions, Zod validation at boundaries | `domain/` types |
| `features/` | UI per feature: timer, courses, stats, rooms, chat, cats… | `domain/`, `data/` |

The actual folders are created in Phase 1.

## Alternatives considered

- **Logic inside components and hooks** — faster at the start, but hard to test and reuse.

## Consequences

- `domain/` is the main target of unit tests (Vitest).
- Data from the network is validated with Zod in `data/` before it reaches `domain/`.
- Files are split by feature, never by numbered growth (`events2.ts`).
