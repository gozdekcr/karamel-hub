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
| Primary users | The design is driven by university students who want to study together from different places. Goal: study-group members motivate each other remotely. |
| Age | The app is for users aged 18 and over. |
| Rooms | Persistent while they have members. A user can join several rooms. Anyone with the invite link can join. |
| Room owners | A room can have several owners; any owner can make a member an owner and remove or demote other owners (like WhatsApp group admins). Permission table in ADR-0014. |
| Creator role | Exactly one member holds the creator role (first the room's creator; always an owner). Nobody can remove or demote them. Only they can delete the room. They can hand the role over at any time (and must when leaving); the receiver becomes an owner if needed, the previous holder stays an owner. |
| Leaving a room | Members and owners leave freely; the creator-role holder hands the role over first. The last person sees a warning and the room is deleted. |
| Empty rooms | A room with no members is deleted automatically and cannot be joined again. |
| Deleting a room | Only the creator-role holder, at any time, without confirmation. The room simply disappears; nobody is notified. |
| Room size | The creator chooses a member limit; current owners can change it later. Checked in the database. |
| Sessions | A user's sessions never overlap, including edited and manually added sessions. |
| Room stats | Each room shows per-member time, room total time and room shared time. |
| Privacy in rooms | Members see only study time (studying or not, durations). Never courses or tasks. |
| Timer in rooms | The user starts one personal timer; it shows and counts in all their rooms. |
| Friends | No friends system for now (may be added later). |
| Messaging | Room chat only. No direct messages. |
| Languages | Turkish and English. |
| Cheating | Not a design goal. Coins exist for fun; sessions can be edited freely. |
| Cats | Unlocked by studying, never bought. First version: 5 cats (starter at sign-up, 10 h, 50 h, 3-day and 7-day longest streak). Permanent. |
| Coins | 30 coins/hour: `floor(minutes ÷ 2)` per session when it ends; pomodoro and free timer equal. 5 one-time achievements (20–75 coins each, list in ADR-0021). Edited sessions are recalculated with a correction entry; achievement coins are kept. Balance may go negative; no buying while negative. |
| Streak | A day counts with ≥ 25 minutes; midnight in the user's timezone, sessions split at midnight. 1 missed day per calendar week (Monday to Sunday) is forgiven automatically (keeps, does not add). |
| Shop | 9 items in 3 slots (head, eyes, neck), 1,500 coins in total; bought once, usable on all cats. List in ADR-0021. |
| Gamification later | Outfit slot, cat room, 150-hour and 30-day streak cats. |

## Architecture decisions

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](decisions/0001-backend-supabase.md) | Supabase (Auth, PostgreSQL, Realtime); backend logic in the database | Accepted |
| [0002](decisions/0002-frontend-layering.md) | `domain/` · `data/` · `features/` layering | Accepted |
| [0003](decisions/0003-timer-and-session-model.md) | One active personal session; `started_at` + pauses; server time | Accepted |
| [0004](decisions/0004-room-model.md) | Persistent rooms with a single owner | Superseded by 0013 |
| [0005](decisions/0005-room-statistics.md) | Room stats derived from sessions; total vs shared (sweep-line) | Accepted |
| [0006](decisions/0006-realtime-and-privacy.md) | Presence per room, status from active session, time-only visibility | Accepted |
| [0007](decisions/0007-forgotten-timer-and-session-editing.md) | No auto-stop; heartbeat suggestion; free session editing | Accepted |
| [0008](decisions/0008-coin-ledger.md) | Coin ledger; rewards granted by DB functions | Accepted |
| [0009](decisions/0009-server-state-tanstack-query.md) | TanStack Query for server state | Accepted |
| [0010](decisions/0010-i18n-principle.md) | Key-based i18n, feature namespaces, TR + EN | Accepted |
| [0011](decisions/0011-sessions-never-overlap.md) | A user's sessions never overlap; DB exclusion constraint | Accepted |
| [0012](decisions/0012-room-member-limit.md) | Per-room member limit chosen by the creator, changeable by owners, checked in the DB | Accepted |
| [0013](decisions/0013-room-model-multiple-owners.md) | Persistent rooms, invite link, membership history, multiple owners | Superseded by 0014 |
| [0014](decisions/0014-room-model-creator-role.md) | Multiple owners plus one transferable creator role (protection, deletes the room); empty rooms deleted; permission table | Accepted |
| [0015](decisions/0015-frontend-libraries.md) | i18next + react-i18next; React Router (declarative mode); Recharts; Zod | Accepted |
| [0016](decisions/0016-database-implementation-rules.md) | Overlap via GiST exclusion + btree_gist; room-visible data in a time-only table; heartbeat table outside Realtime | Accepted |
| [0017](decisions/0017-realtime-private-channels.md) | Private Realtime channels for room Presence; free plan sufficient | Accepted |
| [0018](decisions/0018-local-development-and-testing.md) | Supabase CLI + Docker, migrations in git; Vitest, Playwright, pgTAP, supabase-js RLS tests | Accepted |
| [0019](decisions/0019-react-typescript-vite.md) | React + TypeScript + Vite; client-rendered SPA | Accepted |
| [0020](decisions/0020-cat-unlocks.md) | Cats unlocked by study time and longest streak; 5 cats; permanent | Accepted |
| [0021](decisions/0021-coin-economy-and-shop.md) | 30 coins/hour, correction entries on edits, negative balance blocks buying; shop with 3 slots, 9 items | Accepted |
| [0022](decisions/0022-streak-definition.md) | ≥ 25 min/day, user's midnight, 1 forgiven day per calendar week | Accepted |

## Tech under consideration (not final unless in an Accepted ADR)

Accepted: Supabase (ADR-0001), TanStack Query (ADR-0009), i18next + react-i18next, React
Router in declarative mode, Recharts, Zod (ADR-0015), Supabase CLI, Vitest, Playwright,
pgTAP (ADR-0018), React, TypeScript, Vite (ADR-0019).
Still open: hosting, deferred until the release stage (OPEN_QUESTIONS #9).

## Phase 0 progress

| Area | Status |
| --- | --- |
| Product idea and scope | Done (this document) |
| Core architecture decisions | Done (ADR-0001 … 0014) |
| Product research | Reviewed ([PRODUCT_RESEARCH.md](PRODUCT_RESEARCH.md)) |
| Technical research | Reviewed; decisions in ADR-0015 … 0019, hosting deferred ([TECH_RESEARCH.md](TECH_RESEARCH.md)) |
| Database design | Not started |
| Security | Not started |
| Gamification design | Core rules decided (ADR-0020 … 0022, [GAMIFICATION.md](GAMIFICATION.md)); art style open (#11) |
| UI/UX | Not started |
| Roadmap (Phase 1+) | Not started |
