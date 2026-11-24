# Security design

Last updated: 2026-11-22 · Phase 0 · **Status: draft for review (task 008)**

This document contains no code and no SQL. It is based on Accepted ADRs and
[DATABASE.md](DATABASE.md). Mitigations that needed a new decision were accepted in task 008-v2 and recorded in
[ADR-0027](decisions/0027-security-baseline.md) (former OPEN_QUESTIONS #6, #59–#64). Facts about
Supabase and PostgreSQL come from the official pages in [Sources](#sources) (read
2026-11-22); anything not confirmed there is marked **[not verified]**.

## Context and priorities

- In **Phases 1–4** a **group of friends** uses the app on the hosted project. After they
  have signed up, the user **turns off new sign-ups** (S6). In **Phase 5** the app opens to
  the public with email-confirmed sign-up (ADR-0031, CURRENT_STATE "Release").
- Cheating is not a design goal (CURRENT_STATE): a user inflating their **own** study time
  or coins is not a threat. A user reading or changing **someone else's** data is.
- **Priority** in the tables is for the friend-group stage:
  - **High** — a mistake here exposes private data or lets one user change another user's
    data, even among friends.
  - **Medium** — matters, but needs an unusual mistake or a hostile user.
  - **Low** — unlikely among friends.
- 🚀 **Before public launch** marks items that only become important when strangers can
  use the app. They are not needed for the friend-group stage; they are done in Phase 5,
  before sign-ups open to the public (ADR-0031, ROADMAP.md P5-05 … P5-10).

Status values: **Covered** (the design already handles it) · **Open** (a mitigation must
be done in Phase 1, or 🚀 before public launch) · **Accepted limitation** (known, see §2).

## Contents

1. [Threat table](#1-threat-table)
2. [Accepted limitations](#2-accepted-limitations)
3. [Phase 1 security checklist (pgTAP)](#3-phase-1-security-checklist-pgtap)
4. [Sources](#sources)

---

## 1. Threat table

### 1.1 Row Level Security (RLS)

| # | Threat | Impact | Mitigation | Covered by | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | A table in the exposed schema without RLS. Supabase: such a table "is readable and writable by any role with a grant on it", and new tables in `public` start with every privilege granted | Anyone signed in (or anonymous) reads or changes the whole table | Enable RLS on **every** table in the exposed schema; a pgTAP test fails if one is missing (§3) | DATABASE.md §4; ADR-0001 | High | Open (Phase 1 test) |
| R2 | `session_details` readable by roommates | Courses, tasks and mode leak to the room (breaks ADR-0006) | Self-only read; no roommate policy. Private data lives only in this table (table split) | ADR-0006, ADR-0016; DATABASE.md §1.2, §4 | High | Covered |
| R3 | `user_settings` readable by others | Goals, timezone, language leak | Self-only read and update | ADR-0025; DATABASE.md §4 | High | Covered |
| R4 | `profiles` gains private columns later | RLS filters rows, not columns, so any new column is visible to roommates | `profiles` holds only the display name; new private fields go to `user_settings` | ADR-0016, ADR-0025 (invariant in CLAUDE.md) | Medium | Covered |
| R5 | `sessions` / `session_pauses` readable outside shared rooms | Strangers or former roommates see when someone studies | Roommate read only for sessions overlapping a membership interval in a room the reader is currently in | ADR-0014; DATABASE.md §4 note 1 | High | Covered (partial-overlap limitation: §2.1) |
| R6 | `rooms` (with `invite_token`) readable by non-members | Anyone gets the link and joins | Read only for current members; joining goes through `join_room` with the token | ADR-0014, ADR-0023; DATABASE.md §4 | High | Covered |
| R7 | `room_messages` read or written by non-members, or written as another user | Chat leaks, or messages appear under someone else's name | Read and insert only for current members; insert must have `user_id = auth.uid()`; `created_at` is set by the database, not the client | ADR-0006; DATABASE.md §1.4, §4 | High | Covered (Phase 1: force `created_at`) |
| R8 | Gamification rows (`user_cats`, `user_items`, `user_achievements`, `coin_transactions`) written directly | Free coins or items for **another** user; own coins are not a threat | Self-only read; no direct writes; only database functions write | ADR-0008, ADR-0024; DATABASE.md §4 | Medium | Covered |
| R9 | `cat_equipment` used to reference another user's cats or items | Equipment rows that point at someone else's grants | Insert/update `WITH CHECK user_id = auth.uid()`; composite foreign keys to the user's own `user_cats` and `user_items` | DATABASE.md §1.6, §3 | Low | Covered |
| R10 | Catalog tables written by users | Prices or thresholds changed for everyone | No write policies; changes only by migration | ADR-0024; DATABASE.md §1.5 | Medium | Covered |
| R11 | A policy uses `auth.uid()` without handling `NULL`. Supabase: without a signed-in user, `auth.uid()` returns `null` | A badly written policy matches rows for anonymous requests | Every policy and function checks `auth.uid() IS NOT NULL`; the `anon` role gets no table grants | Supabase RLS docs | High | Open (Phase 1 test) |
| R12 | Recursive or slow policies on `room_memberships` | Errors, or policies that are rewritten in a hurry and become wrong | Small `security definer` helper functions (e.g. "is the caller in this room") in a **non-exposed** schema (ADR-0027); `auth.uid()` wrapped in `select` for performance (Supabase RLS docs) | DATABASE.md §8; ADR-0027 | Medium | Covered (Phase 1 test) |

### 1.2 Database functions

| # | Threat | Impact | Mitigation | Covered by | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| F1 | A `security definer` function trusts its input. Functions created by a migration are owned by `postgres`, which bypasses RLS | A caller changes another user's session, room or role | Every function checks `auth.uid()` itself (owner of the session, current member/owner/creator of the room). "Pinning the search_path doesn't change who can call the function" (Supabase) | DATABASE.md §5 | High | Open (Phase 1 tests, §3) |
| F2 | `search_path` hijacking in a `security definer` function | A user-created object is called with the owner's privileges | `search_path = ''` and schema-qualified names in every `security definer` function (Supabase); PostgreSQL: exclude schemas writable by untrusted users, `pg_temp` last | Supabase / PostgreSQL docs | High | Open (Phase 1 test) |
| F3 | Functions executable by everyone. PostgreSQL grants `EXECUTE` to `PUBLIC` by default for new functions | `anon` calls write functions; internal helpers (reward check) are called directly | Revoke default `EXECUTE` from `PUBLIC` and `anon`; grant to `authenticated` only for the API functions; internal functions (reward check, helpers) not granted at all | ADR-0027; PostgreSQL / Supabase docs | High | Covered (Phase 1 test) |
| F4 | `security definer` functions in an exposed schema are callable over the Data API "with the creator's privileges" (Supabase) | Internal functions become public API | API functions (DATABASE.md §5) are meant to be called; they stay in the exposed schema with their own checks. RLS helpers and the reward check go to a non-exposed schema | DATABASE.md §5, §8; ADR-0027 | High | Covered (Phase 1 test) |
| F5 | Race conditions: two joins past the member limit, two purchases past the balance, two tabs ending one session | Room over its limit; negative balance purchase; double reward | Row lock on the room in `join_room`; per-user lock in `buy_item`; unique index on `session_reward` | ADR-0008, ADR-0012, ADR-0021; DATABASE.md §3 | Medium | Covered |
| F6 | Role rules bypassed (demoting the creator-role holder, removing them, a non-creator deleting the room) | Takeover or loss of a room | Checks in `set_owner_role`, `remove_member`, `transfer_creator_role`, `delete_room`, `leave_room` | ADR-0014; DATABASE.md §5.5 | High | Covered (Phase 1 tests) |
| F7 | Error messages reveal data (e.g. "room exists but is full" for a wrong token) | Small information leak | Errors return codes mapped to i18n keys; a wrong token and a deleted room give the same error | ADR-0010; DATABASE.md §5 | Low | Open (Phase 1) |

### 1.3 Realtime: private channels and Presence

| # | Threat | Impact | Mitigation | Covered by | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Public channels still allowed | Anyone who knows a room's channel name joins its Presence | Disable "Allow public access" in Realtime settings; clients connect with `private: true` (Supabase) | ADR-0017 | High | Open (Phase 1 setup) |
| T2 | Presence policy too wide on `realtime.messages` | Non-members see who is online, or appear online in a room | Policies for `extension = 'presence'` only, both listen and track, allowed when `realtime.topic()` names a room the caller is currently a member of | ADR-0017; DATABASE.md §4 | High | Open (Phase 1 test) |
| T3 | Broadcast left open | Members (or others) send arbitrary messages on the channel | No Broadcast policies, so Broadcast is denied (ADR-0006: Broadcast is not used) | ADR-0006 | Medium | Covered |
| T4 | Postgres Changes leak rows | Subscribers receive rows they cannot read | Supabase: records are "sent only to clients who are allowed to read them based on your RLS policies"; only tables in DATABASE.md §6 are published; `session_details`, `heartbeats` and other private tables are not | DATABASE.md §6 | High | Covered |
| T5 | Removed member keeps Presence | Sees who is online until the token expires | Authorization is checked on connect and cached until the JWT expires (Supabase) | ADR-0017 | Low | Accepted limitation (§2.3) |
| T6 | Realtime quota exhausted (free plan 2M messages/month) by spam | App stops updating live | Only a few tables published; heartbeats not published (ADR-0016) | ADR-0016, ADR-0017 | Low · 🚀 | Covered for friends; see S1 |

### 1.4 Invite links

| # | Threat | Impact | Mitigation | Covered by | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| I1 | Guessable token | Strangers join rooms | Token = **32 bytes** from `gen_random_bytes` (pgcrypto, "cryptographically strong random bytes"), URL-safe encoded (ADR-0027). Not a UUID: PostgreSQL documents `gen_random_uuid` as version 4 (random) but does not say "cryptographically" on the pages read | ADR-0014, ADR-0027; DATABASE.md §1.4 | Medium | Covered (pgcrypto checked in Phase 1) |
| I2 | Link shared further by a member | Unwanted people join | Intended: all members may share (ADR-0023). Owners regenerate the link; the old link stops at once; owners remove members; member limit | ADR-0012, ADR-0014, ADR-0023 | Low | Covered |
| I3 | Removed member rejoins with a re-shared link | Removal does not keep someone out | Deferred decision (#48) | ADR-0023 | Low · 🚀 | Accepted limitation (§2.2) |
| I4 | Token leaks from the URL (browser history, `Referer` header, screenshots) | Someone outside the group finds the link | 🚀 Remove the token from the address bar after it is read and send no referrer from the join page, with hosting (#9) | ADR-0027 | Low · 🚀 | Open (🚀) |
| I5 | Token brute force through `join_room` | Strangers find a room | 256-bit tokens make guessing impractical (I1); no rate limit needed for this | — | Low | Covered (ADR-0027) |

### 1.5 Keys and configuration

| # | Threat | Impact | Mitigation | Covered by | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| K1 | The secret (`service_role`) key reaches the browser or git. Supabase: it gives "full access to your project's data, bypassing Row Level Security"; "Never put one in a browser, a shipped application, or source control" | Total data exposure | The frontend uses only the **publishable** key and the project URL. The app has no server, so the secret key is not needed by the app at all | ADR-0001, ADR-0019 | High | Covered (Phase 1 check) |
| K2 | A secret is put in a `VITE_` variable. Vite: `VITE_` variables "will be exposed in client-side source code" | Secret shipped to every user | Only `VITE_SUPABASE_URL` and the publishable key use the `VITE_` prefix; nothing else is prefixed | Vite docs | High | Open (Phase 1 check) |
| K3 | `.env` files with real values committed | Keys in git history | Real values only in `.env.local` / `.env.*.local`, ignored with `*.local` in `.gitignore` (Vite); an `.env.example` without values is committed; CLAUDE.md already forbids committing secret files | Vite docs; CLAUDE.md | Medium | Open (Phase 1 setup) |
| K4 | Legacy `anon` / `service_role` keys stop working. Supabase is deprecating them "by the end of 2026" | App breaks after the deprecation | Use the new `sb_publishable_…` key format from the start | Supabase API keys docs | Medium | Open (Phase 1 setup) |
| K5 | Account deletion needs the secret key (Supabase admin API) | A server component would be needed | Account deletion is a later phase; verify in Phase 1 whether a database function can delete the auth user (DATABASE.md §8). If not, the secret key lives only in a server-side function, never in the frontend | ADR-0026; DATABASE.md §8 | Low | Open (Phase 1 check) |

### 1.6 Chat, input validation and XSS

| # | Threat | Impact | Mitigation | Covered by | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| X1 | Script in a chat message, display name, room name or course name | Session token stolen from the browser, actions as the victim | React escapes values in JSX by default ("React DOM escapes any values embedded in JSX"). User text is always rendered as text; **`dangerouslySetInnerHTML` is never used for user content** (React: risk of XSS "if it's based on user data"). Links in chat are plain text | ADR-0019 | High | Open (Phase 1 rule) |
| X2 | Oversized or malformed input | Broken layout, large rows, Realtime load | Zod validates input in `data/` before it is sent (ADR-0015); the database enforces length limits: display name 1–30, room name 1–50, message 1–1,000 characters (#53) | ADR-0015; DATABASE.md §3 | Medium | Covered |
| X3 | Client-side validation bypassed (direct API calls) | Invalid data stored | Zod is a convenience; the database `CHECK` constraints and function checks are the real limits | DATABASE.md §3 | Medium | Covered |
| X4 | Missing browser security headers (Content-Security-Policy, etc.) | XSS has more impact | 🚀 Set headers on Cloudflare in Phase 5 (P5-08) | ADR-0027; OPEN_QUESTIONS #9 | Low · 🚀 | Open (🚀) |

### 1.7 Spam, rate limits and accounts

| # | Threat | Impact | Mitigation | Covered by | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| S1 | Chat or RPC spam. The Supabase rate-limit page covers only Auth endpoints; no default limit for database requests was found **[not verified]** | Annoyance, Realtime quota use, database load | Friend group: no limit. 🚀 Per-user limits in the database (e.g. messages per minute), which means chat inserts move into a function | ADR-0027 | Low · 🚀 | Open (🚀) |
| S2 | Mass sign-ups or sign-in attempts | Fake accounts, password guessing | Supabase Auth limits per IP by default (e.g. sign-up/sign-in "30 requests per 5 minutes"; token endpoint 150 per 5 minutes). 🚀 Review password rules and bot protection before launch | ADR-0027; Supabase rate-limit docs | Low · 🚀 | Covered for friends; Open (🚀) |
| S3 | Room creation or join spam | Many rooms or channels per user | Upper bound for the member limit (#13) and a per-user room limit (#15) are still open | ADR-0012, ADR-0017 | Low · 🚀 | Open (#13, #15) |
| S4 | Accounts with someone else's email (no verification) | Impersonation by email address | Friend group: email confirmation **off** (ADR-0027), because the built-in email service "will refuse to deliver messages to addresses that are not part of the project's team" and sends about 2 per hour; 🚀 before launch — custom SMTP and confirmation **on**. Supabase warns: "Do not disable email confirmations under pressure" | ADR-0027 | Low · 🚀 | Accepted for friends; Open (🚀) |
| S5 | Display name impersonation (a friend picks another friend's name) | Confusion inside a room | Friends know each other; not handled | — | Low | Accepted (not listed in §2; social, not technical) |
| S6 | A stranger finds the URL and signs up during the friend stage | An unknown account with an unconfirmed email (it sees only its own data; rooms need an invite link) | The URL is shared with friends only; once they have signed up, the user turns off new sign-ups on the hosted project (Supabase dashboard, Auth settings). The CLI's `config.toml` documents the switch (`enable_signup`): "Existing users can still sign in." Sign-ups reopen only in Phase 5, with email confirmation | ADR-0031 | Medium | Open (P1-03b, P1-14) |

### 1.8 Other

| # | Threat | Impact | Mitigation | Covered by | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| O1 | Hosted database changed by hand, drifting from tested migrations | An untested policy reaches production | The hosted database is never changed directly; only migrations (ADR-0018) | ADR-0018 | Medium | Covered |
| O2 | Privacy and legal duties (GDPR/KVKK-like rules, age policy) | Legal risk with public users | 🚀 Reviewed before public release | OPEN_QUESTIONS #32 | 🚀 | Open (#32) |

---

## 2. Accepted limitations

Known gaps that are acceptable for the friend-group stage. Each is a design consequence,
not a bug.

### 2.1 Session times outside a membership interval can be visible

RLS filters whole rows, not parts of rows (ADR-0016). A roommate can read a session that
**overlaps** a membership interval (DATABASE.md §4, note 1). If a session started before
the user joined the room (or ended after a member left), the roommate sees its **full**
start and end, including the part outside the interval. Room statistics still clip the
time (ADR-0005), so totals are correct; only the raw times are visible.

- **Why accepted:** only time data is exposed, never courses or tasks (ADR-0006), and only
  for a session that overlaps a real shared membership.
- **If it must be fixed later:** room statistics would read sessions through a function
  that returns clipped intervals instead of raw rows.

### 2.2 A removed member can come back (#48)

How removal prevents rejoining is deferred (#48). Because all members can see and share
the invite link (ADR-0023), a removed user can rejoin if someone gives them the link, even
after a regeneration.

- **Why accepted:** in a friend group, removal is rare and social pressure works.
- **Before public launch:** decide #48 (ban record or another mechanism). 🚀

### 2.3 Presence after removal, until the JWT expires

Realtime checks private-channel authorization when the user connects and caches it for the
connection; a removed user keeps receiving messages "until their JWT expires or a new one
is sent" (Supabase). Postgres Changes rows (sessions, chat) follow RLS per change, so only
**Presence** (who is online) keeps flowing (ADR-0017). The removed user may also keep
appearing online in the room for that time.

- **How long:** the access-token lifetime. Supabase's default is 1 hour, and it recommends
  that "Most applications should use the default expiration time of 1 hour" and not going
  below 5 minutes. The 1-hour default is kept (ADR-0027).
- **Why accepted:** only online/offline status, for at most one token lifetime.
- Whether Postgres Changes re-checks RLS on every change was summarized in the technical
  research (TECH_RESEARCH §6) but not quoted from the page **[not verified]**.

---

## 3. Phase 1 security checklist (pgTAP)

Run with `supabase test db` (ADR-0018). Each line is one or more tests. Tests run as a
signed-in user, as a second user, and as `anon`.

### 3.1 Whole schema

- [ ] Every table in the exposed schema has RLS enabled (R1).
- [ ] `anon` has no table privileges and cannot execute any function (R11, F3).
- [ ] Every `security definer` function has `search_path = ''` (F2).
- [ ] No function is executable by `PUBLIC`; only API functions are executable by
      `authenticated` (F3, F4).
- [ ] RLS helper functions and the reward check live in the non-exposed schema (F4, ADR-0027).
- [ ] The Realtime publication contains exactly the tables in DATABASE.md §6 (T4).

### 3.2 Table access (DATABASE.md §4)

- [ ] `user_settings`, `session_details`, `heartbeats`, `courses`, `tasks`, `user_cats`,
      `user_items`, `user_achievements`, `cat_equipment`, `coin_transactions`: another
      user reads **zero** rows (R2, R3, R8).
- [ ] `profiles`: a roommate reads the display name; a stranger and a former roommate read
      nothing (R4, ADR-0014).
- [ ] `sessions`, `session_pauses`: a roommate reads sessions overlapping the owner's
      membership interval; not sessions from after the owner left or before they joined;
      a stranger reads nothing (R5).
- [ ] `rooms`: a non-member cannot read the row or its `invite_token` (R6).
- [ ] `room_memberships`: current members read the room's rows, former members' rows
      included; others read nothing.
- [ ] `room_messages`: a non-member cannot read or insert; a member cannot insert with
      another `user_id`; `created_at` cannot be set by the client; nobody can update or
      delete (R7, #54).
- [ ] Direct insert, update or delete is refused on every table marked "nobody" in §4 of
      DATABASE.md, including `sessions`, `coin_transactions` and the catalog (R8, R10).
- [ ] `cat_equipment`: cannot reference a cat or item the user does not own, or an item in
      the wrong slot (R9).
- [ ] `realtime.messages`: a member can listen and track Presence on their room's topic; a
      non-member and a former member cannot; Broadcast is refused (T2, T3).

### 3.3 Functions (DATABASE.md §5)

- [ ] Every API function refuses a call without `auth.uid()` (F1, R11).
- [ ] `edit_session`, `delete_session`: refused for another user's session and for an
      active session; `ended_at` after `now()` refused (#57); overlap gives `23P01`.
- [ ] `end_session` twice (two tabs): one `session_reward` only (F5).
- [ ] `edit_session` keeps the session's ledger sum equal to `floor(minutes ÷ 2)`;
      `delete_session` brings it to 0 (ADR-0021, #52).
- [ ] `buy_item`: refused with a negative balance or a balance below the price; two
      parallel purchases cannot both pass (F5).
- [ ] `get_invite_room_name`: returns only the name; wrong token and deleted room give the
      same error (F7).
- [ ] `pause_session` with `at`: refused unless `at` is a work-phase end of the caller's
      Pomodoro session and not in the future (#68).
- [ ] `join_room`: wrong token and deleted room give the same error (F7); a full room is
      refused; two parallel joins cannot exceed the limit (F5).
- [ ] `regenerate_invite_link`, `set_member_limit`, `remove_member`, `set_owner_role`:
      refused for members; the creator-role holder cannot be removed or demoted (F6).
- [ ] `transfer_creator_role`, `delete_room`: refused for everyone except the creator-role
      holder (F6).
- [ ] `leave_room`: the creator-role holder cannot leave without naming a new holder while
      others remain; the last member's leave deletes the room (ADR-0014).
- [ ] Reward check is not callable directly by `authenticated` (F3).

### 3.4 Setup checks (not pgTAP)

- [ ] Realtime "Allow public access" is disabled on the hosted project (T1).
- [ ] The frontend bundle contains no secret key; only `VITE_SUPABASE_URL` and the
      publishable key are `VITE_` variables (K1, K2).
- [ ] `*.local` is in `.gitignore`; `.env.example` has no real values (K3).
- [ ] The new key format is used: the frontend has only the publishable key
      (`sb_publishable_…`); legacy `anon` / `service_role` keys are not used (K4, ADR-0027).
- [ ] No `dangerouslySetInnerHTML` with user content (a lint rule or a code search) (X1).
- [ ] `pgcrypto` (`gen_random_bytes`) is available on the local stack (verified in P1-01,
      task 013) and the hosted project (checked in P1-03b) (I1, ADR-0027).
- [ ] New sign-ups are turned off on the hosted project once the friends have signed up,
      and a new sign-up is refused; the local stack keeps sign-ups on for tests (S6,
      ADR-0031, P1-14).

---

## Sources

Read on 2026-11-22.

- PostgreSQL — [CREATE FUNCTION: Writing SECURITY DEFINER Functions Safely](https://www.postgresql.org/docs/current/sql-createfunction.html)
- PostgreSQL — [UUID functions](https://www.postgresql.org/docs/current/functions-uuid.html), [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html)
- Supabase — [Database functions](https://supabase.com/docs/guides/database/functions)
- Supabase — [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Supabase — [Realtime Authorization](https://supabase.com/docs/guides/realtime/authorization)
- Supabase — [API keys](https://supabase.com/docs/guides/api/api-keys)
- Supabase — [User sessions](https://supabase.com/docs/guides/auth/sessions)
- Supabase — [Auth rate limits](https://supabase.com/docs/guides/auth/rate-limits)
- Supabase — [Password-based auth](https://supabase.com/docs/guides/auth/passwords), [Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)
- Vite — [Env variables and modes](https://vite.dev/guide/env-and-mode)
- React — [Introducing JSX: JSX prevents injection attacks](https://legacy.reactjs.org/docs/introducing-jsx.html) (legacy site), [Common components: dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common)
