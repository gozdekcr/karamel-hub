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
| Rooms | Persistent while they have members. A user can join several rooms. Anyone with the invite link can join. All members can see and share the link; owners regenerate it. |
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
| Goals | A daily and a weekly goal in minutes; optional, no default; private (owner-only `user_settings`, with timezone and language). No history: past days are evaluated against the current goal. |
| Profiles | `profiles` holds only the display name, which room members can read. |
| Account deletion | **Later phase.** The user's sessions, chat messages, membership history and all personal data are deleted; room statistics shrink accordingly. The creator role passes to the oldest owner, else the oldest member; an empty room is deleted. |
| Release | The app is not being released publicly now. Privacy, legal requirements and the age policy are reviewed before a public release (OPEN_QUESTIONS #32). |
| Courses and tasks | Owner-only. A session can link to one course and one task (optional). |
| Pomodoro | Breaks are stored as pauses: not study time, no coins. |
| Session editing | Pauses are clipped to the new range. Times cannot be in the future. A user can delete a finished session; its coins are corrected to 0, rewards already granted stay. |
| Room chat | Members see the whole history; messages cannot be edited or deleted. Rooms have a required name. Limits: display name 30, room name 50, message 1,000 characters. |
| Gamification visibility | Cats, items and coins are visible only to their owner. |
| Timezone and language | Taken from the browser at sign-up; past days use the current timezone. |
| Email verification | Off for the friend-group stage; turned on with custom SMTP before public launch. |
| Gamification later | Outfit slot, cat room, 150-hour and 30-day streak cats. |

## Architecture decisions

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](decisions/0001-backend-supabase.md) | Supabase (Auth, PostgreSQL, Realtime); backend logic in the database | Accepted |
| [0002](decisions/0002-frontend-layering.md) | `domain/` · `data/` · `features/` layering | Partially superseded by 0024 (streak and reward rules) |
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
| [0023](decisions/0023-invite-link-visible-to-members.md) | All members can see and share the invite link; owners regenerate it | Accepted |
| [0024](decisions/0024-gamification-catalog-in-database.md) | Catalog in database tables loaded by migrations; reward calculations only in SQL (except `minutes ÷ 2` and shared time, tested in both) | Accepted |
| [0025](decisions/0025-study-goals.md) | `profiles` = display name only; goals, timezone, language in owner-only `user_settings`; goals optional | Accepted |
| [0026](decisions/0026-account-deletion.md) | Account deletion deletes the user's data; creator role to the oldest owner or member | Accepted |
| [0027](decisions/0027-security-baseline.md) | Security baseline: email confirmation off until launch; 32-byte invite tokens; function placement and grants; 1-hour JWT; publishable key only | Accepted |

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
| Database design | Draft ([DATABASE.md](DATABASE.md)); #49–#58 accepted in task 007-v2 |
| Security | Draft ([SECURITY.md](SECURITY.md)); decisions in ADR-0027 |
| Gamification design | Core rules decided (ADR-0020 … 0022, [GAMIFICATION.md](GAMIFICATION.md)); art style open (#11) |
| UI/UX | Not started |
| Roadmap (Phase 1+) | Not started |
