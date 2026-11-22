# Karamel-hub — current state (single source of truth)

Last updated: 2026-11-22 · Phase 0 (research, architecture, planning) · No application code

If this document conflicts with another document, this document and the code win.
Undecided items live in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## Product

A study & productivity web app. Fully usable alone; optional persistent study rooms let
people see each other's study time in realtime. A cat-collection system rewards studying.

## Product decisions (Accepted)

| Topic | Decision |
| --- | --- |
| Platform | Desktop browser only. No mobile app or PWA for now. |
| Users | Multi-user with public sign-up. Solo use is fully supported; rooms are optional. |
| Rooms | Persistent. A user can join several rooms. Anyone with the invite link can join. |
| Room stats | Each room shows per-member time, room total time and room shared time. |
| Privacy in rooms | Members see only study time (studying or not, durations). Never courses or tasks. |
| Timer in rooms | The user starts one personal timer; it shows and counts in all their rooms. |
| Friends | No friends system for now (may be added later). |
| Messaging | Room chat only. No direct messages. |
| Languages | Turkish and English. |
| Cheating | Not a design goal. Coins exist for fun; sessions can be edited freely. |

## Architecture decisions

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](decisions/0001-backend-supabase.md) | Supabase (Auth, PostgreSQL, Realtime); backend logic in the database | Accepted |
| [0002](decisions/0002-frontend-layering.md) | `domain/` · `data/` · `features/` layering | Accepted |
| [0003](decisions/0003-timer-and-session-model.md) | One active personal session; `started_at` + pauses; server time | Accepted |
| [0004](decisions/0004-room-model.md) | Persistent rooms, membership history, invite link, owner transfer | Accepted |
| [0005](decisions/0005-room-statistics.md) | Room stats derived from sessions; total vs shared (sweep-line) | Accepted |
| [0006](decisions/0006-realtime-and-privacy.md) | Presence per room, status from active session, time-only visibility | Accepted |
| [0007](decisions/0007-forgotten-timer-and-session-editing.md) | No auto-stop; heartbeat suggestion; free session editing | Accepted |
| [0008](decisions/0008-coin-ledger.md) | Coin ledger; rewards granted by DB functions | Accepted |
| [0009](decisions/0009-server-state-tanstack-query.md) | TanStack Query for server state | Accepted |
| [0010](decisions/0010-i18n-principle.md) | Key-based i18n, feature namespaces, TR + EN | Accepted |

## Tech under consideration (not final unless in an Accepted ADR)

React, TypeScript, Vite, Supabase (accepted), Zod, Recharts, Vitest, Playwright,
TanStack Query (accepted), an i18n library (to be researched).

## Phase 0 progress

| Area | Status |
| --- | --- |
| Product idea and scope | Done (this document) |
| Core architecture decisions | Done (ADR-0001 … 0010) |
| Product research | Not started |
| Technical research | Not started |
| Database design | Not started |
| Security | Not started |
| Gamification design | Not started |
| UI/UX | Not started |
| Roadmap (Phase 1+) | Not started |
