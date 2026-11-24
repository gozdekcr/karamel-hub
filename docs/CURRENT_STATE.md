# Karamel-hub — current state (single source of truth)

Last updated: 2026-11-24 · **Phase 1 in progress** ([ROADMAP.md](ROADMAP.md)); P1-01 … P1-03 done (start checks, scaffold, database base) · No features yet

If this document conflicts with another document, this document and the code win.
Undecided items live in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## Product

A study & productivity web app. Fully usable alone; optional persistent study rooms let
people see each other's study time in realtime. A cat-collection system rewards studying.

## Product decisions (Accepted)

| Topic | Decision |
| --- | --- |
| Platform | Desktop browser only. No mobile app or PWA for now. |
| Users | Multi-user. Until the Phase 5 launch only the user's friends (new sign-ups closed after they sign up); public sign-up with email confirmation from Phase 5 (ADR-0031). Solo use is fully supported; rooms are optional. |
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
| Cats | First version: one cat, Karamel, granted at sign-up (ADR-0028). Cats are never bought and never removed; the unlock rules (10 h, 50 h, 3-day and 7-day longest streak) stay in the design for later cats. |
| Coins | 30 coins/hour: `floor(minutes ÷ 2)` per session when it ends; pomodoro and free timer equal. 5 one-time achievements (20–75 coins each, list in ADR-0021). Edited sessions are recalculated with a correction entry; achievement coins are kept. Balance may go negative; no buying while negative. |
| Streak | A day counts with ≥ 25 minutes; midnight in the user's timezone, sessions split at midnight. 1 missed day per calendar week (Monday to Sunday) is forgiven automatically (keeps, does not add). |
| Shop | 13 items in the head and neck slots (eyes slot empty for now), 2,350 coins in total; bought once, usable on all cats. List in ADR-0028. Items are placed on the cat automatically (assets README); placement values are catalog data. |
| Goals | A daily and a weekly goal in minutes; optional, no default; private (owner-only `user_settings`, with timezone and language). No history: past days are evaluated against the current goal. |
| Profiles | `profiles` holds only the display name, which room members can read. |
| Account deletion | **Later phase.** The user's sessions, chat messages, membership history and all personal data are deleted; room statistics shrink accordingly. The creator role passes to the oldest owner, else the oldest member; an empty room is deleted. |
| Release | Phases 1–4: friends only, on the hosted project; new sign-ups closed once they have signed up. Phase 5: public launch with email-confirmed sign-up (custom SMTP) after the 🚀 security items; privacy, legal requirements and the age policy are reviewed in Phase 5 (OPEN_QUESTIONS #32). ADR-0031. |
| Courses and tasks | Owner-only. A session can link to one course and one task (optional). |
| Session editing | Pauses are clipped to the new range. Times cannot be in the future. A user can delete a finished session; its coins are corrected to 0, rewards already granted stay. |
| Room chat | Members see the whole history; messages cannot be edited or deleted. Rooms have a required name. Limits: display name 30, room name 50, message 1,000 characters. |
| Gamification visibility | Cats, items and coins are visible only to their owner. |
| Timezone and language | Taken from the browser at sign-up; past days use the current timezone. |
| Email verification | Off for the friend-group stage; turned on with custom SMTP in Phase 5, before the public launch (ADR-0031). |
| Layout | Fixed left menu with the user's dressed Karamel above it; a timer strip (elapsed time + stop) at the top of pages while a session runs. Screens and flows in [UI_UX.md](UI_UX.md). |
| Pomodoro | Fixed 25 minutes of work and 5 minutes of break. The break starts automatically (stored as a pause from the exact phase end); the next work phase starts when the user clicks "Continue". Browser notification at phase ends; permission asked at the first Pomodoro. |
| First login | Sign-up → display name → meet Karamel → daily goal (can be skipped) → Home. |
| Home | Greeting with coin and streak badges; timer card (2 columns, dark caramel `#8E5222`) with goal rings; My rooms, Today's tasks (open + done today), monthly study calendar (4 tones, today framed); achievements strip. |
| Visual direction | Pastel, low contrast, large rounded cards (26 px), ring charts, personal greeting. Palette from Karamel (UI_UX.md §6.2); one font, Nunito, self-hosted (headings 700–800, body 400–800, timer digits included; Fredoka removed because it lacks ğ Ğ İ ş Ş); clickable areas ≥ 44 px; minimum window width 1024 px. Contrast rules, calendar tones, errors (pink + icon), reduced motion and visible focus in UI_UX.md §6. |
| Gamification later | Four more cats (draft art kept on the user's computer, deliberately not in the repo; ADR-0028), eyes-slot items, outfit slot, cat room, 150-hour and 30-day streak cats. |
| Phase order | 1 Core → 2 Tracking → 3 Rooms → 4 Karamel → 5 Polish and public launch (custom SMTP, email confirmation, 🚀 security items, privacy review); account deletion comes later. The user uses the app from Phase 1; Phase 4 includes a one-time backfill of coins and achievements. Tasks in [ROADMAP.md](ROADMAP.md). |
| Where the app runs | **A hosted Supabase project from Phase 1**; the user's friends can use the app from Phase 1, so its data is real and the hosted database is never reset. Local development and tests stay on the local stack. The frontend runs on **Cloudflare Workers with static assets**. Hosted setup (P1-03b) and deployment (P1-14) are Phase 1 tasks; the hosted data is dumped before each `db push` (ADR-0030). |

## Architecture decisions

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](decisions/0001-backend-supabase.md) | Supabase (Auth, PostgreSQL, Realtime); backend logic in the database | Accepted |
| [0002](decisions/0002-frontend-layering.md) | `domain/` · `data/` · `features/` layering | Partially superseded by 0024 (streak and reward rules); extended by 0029 |
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
| [0020](decisions/0020-cat-unlocks.md) | Cats unlocked by study time and longest streak; permanent | Partially superseded by 0028 (cat list) |
| [0021](decisions/0021-coin-economy-and-shop.md) | 30 coins/hour, correction entries on edits, negative balance blocks buying; shop with 3 slots, 9 items | Partially superseded by 0028 (item list) |
| [0022](decisions/0022-streak-definition.md) | ≥ 25 min/day, user's midnight, 1 forgiven day per calendar week | Accepted |
| [0023](decisions/0023-invite-link-visible-to-members.md) | All members can see and share the invite link; owners regenerate it | Accepted |
| [0024](decisions/0024-gamification-catalog-in-database.md) | Catalog in database tables loaded by migrations; reward calculations only in SQL (except `minutes ÷ 2` and shared time, tested in both) | Accepted |
| [0025](decisions/0025-study-goals.md) | `profiles` = display name only; goals, timezone, language in owner-only `user_settings`; goals optional | Accepted |
| [0026](decisions/0026-account-deletion.md) | Account deletion deletes the user's data; creator role to the oldest owner or member | Accepted |
| [0027](decisions/0027-security-baseline.md) | Security baseline: email confirmation off until launch; 32-byte invite tokens; function placement and grants; 1-hour JWT; publishable key only | Accepted |
| [0028](decisions/0028-first-version-catalog.md) | First version: one cat (Karamel); 13 items in head and neck slots; placement data in the catalog | Accepted |
| [0029](decisions/0029-phase-1-folder-structure.md) | Phase 1 folder structure (`src/app`, `shared/ui`, art in `public/art/`); shared Vitest/pgTAP test cases | Accepted |
| [0030](decisions/0030-phase-1-environment.md) | Node.js 26 LTS; Supabase CLI as an npm dev dependency; hosted Supabase project from Phase 1; frontend on Cloudflare Workers | Accepted |
| [0031](decisions/0031-release-path.md) | Phases 1–4 friends only with sign-ups closed; public launch in Phase 5 with custom SMTP, email confirmation and the 🚀 security items | Accepted |
| [0032](decisions/0032-lint-oxlint.md) | Lint with oxlint while on TypeScript 7 (`@/` imports, one lint block per feature); ESLint revisited later (#82) | Accepted |

## Tech under consideration (not final unless in an Accepted ADR)

Accepted: Supabase (ADR-0001), TanStack Query (ADR-0009), i18next + react-i18next, React
Router in declarative mode, Recharts, Zod (ADR-0015), Supabase CLI, Vitest, Playwright,
pgTAP (ADR-0018), React, TypeScript, Vite (ADR-0019), Node.js 26 LTS and the Supabase CLI
as an npm dev dependency, Cloudflare Workers with static assets for the frontend (ADR-0030).
Pinned in P1-02 (exact versions in `package.json`): React 19.3.1, TypeScript 7.0.2, Vite 8.3.8,
TanStack Query 5.108.4, React Router 8.5.2, i18next 27.2.7, react-i18next 18.0.3, Vitest 5.1.1,
Playwright 1.65.1, Supabase CLI 3.3.0. Lint: **oxlint** 1.95.0 with TypeScript 7 (ADR-0032); ESLint is
revisited when typescript-eslint supports TypeScript 7 (OPEN_QUESTIONS #82). CI: GitHub Actions runs
typecheck, lint, Vitest and build on pushes to `main` and on pull requests (Playwright from P1-05).
Still open: the SMTP provider and domain (Phase 5 research, ADR-0031).

## Phase 0 progress (complete)

| Area | Status |
| --- | --- |
| Product idea and scope | Done (this document) |
| Core architecture decisions | Done (ADR-0001 … 0014; later ADRs 0015 … 0029 come from the research and design tasks) |
| Product research | Reviewed ([PRODUCT_RESEARCH.md](PRODUCT_RESEARCH.md)) |
| Technical research | Reviewed; decisions in ADR-0015 … 0019, hosting deferred ([TECH_RESEARCH.md](TECH_RESEARCH.md)) |
| Database design | Draft ([DATABASE.md](DATABASE.md)); #49–#58 accepted in task 007-v2 |
| Security | Draft ([SECURITY.md](SECURITY.md)); decisions in ADR-0027 |
| Gamification design | Done (ADR-0020 … 0022, ADR-0028, [GAMIFICATION.md](GAMIFICATION.md)); art in `public/art/`, placement rules in `docs/assets/README.md`; placement re-implemented and tested in Phase 1 |
| UI/UX | Decided ([UI_UX.md](UI_UX.md)) |
| Architecture overview | Done ([ARCHITECTURE.md](ARCHITECTURE.md)); folder structure in ADR-0029 |
| Roadmap (Phase 1+) | Approved ([ROADMAP.md](ROADMAP.md)) |
