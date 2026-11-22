# ADR-0027: Security baseline for the friend-group stage

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

The app is not being released publicly now; a group of friends will use it
(CURRENT_STATE "Release"). [SECURITY.md](../SECURITY.md) lists the threats and proposed
mitigations (OPEN_QUESTIONS #6, #59–#64), based on official PostgreSQL, Supabase, Vite and
React pages (read 2026-11-22). Items marked 🚀 are needed only before a public launch.

## Decision

1. **Email verification (#6):** **off** for the friend-group stage. Supabase's built-in
   email service delivers only to the project team's addresses (about 2 emails per hour),
   so friends could not confirm. 🚀 Before public launch: a **custom SMTP** server and
   email confirmation **on**.
2. **Invite token (#59):** **32 bytes** from `gen_random_bytes` (pgcrypto, documented as
   cryptographically strong), URL-safe encoded. Not a UUID. pgcrypto availability on
   Supabase is **verified in Phase 1**.
3. **Database functions (#60):**
   - The **API functions** (DATABASE.md §5) are `security definer` functions in the
     **exposed schema**. Each one checks `auth.uid()` itself (not `NULL`; owner, member,
     owner role or creator role as needed).
   - **RLS helper functions and internal functions** (such as the reward check) live in a
     **non-exposed schema**.
   - Every `security definer` function sets **`search_path = ''`** and schema-qualifies
     names.
   - **`EXECUTE` is revoked from `PUBLIC` and `anon`**; it is granted to `authenticated`
     only for the API functions.
4. **Rate limits (#61):** **none** for the friend-group stage beyond Supabase Auth's
   defaults. 🚀 Before public launch: per-user limits in the database (chat inserts then
   move into a function).
5. **Access-token (JWT) lifetime (#62):** Supabase's **default of 1 hour**.
6. **Browser hardening (#63):** 🚀 Before public launch, together with hosting
   (OPEN_QUESTIONS #9): security headers (Content-Security-Policy, Referrer-Policy) and
   removing the invite token from the address bar after it is read.
7. **Auth hardening (#64):** Supabase defaults for the friend-group stage. 🚀 Password
   rules and bot protection on sign-up are reviewed before public launch.
8. **API keys:** the frontend uses only the **new publishable key** (`sb_publishable_…`)
   and the project URL; the secret key never reaches the frontend or git. Checked in the
   Phase 1 setup.

## Alternatives considered

- **Email confirmation on with the built-in email service** — friends' addresses are
  refused unless they are project team members.
- **Custom SMTP now** — extra setup for a small group; deferred to the public launch.
- **UUIDs as invite tokens** — the PostgreSQL page does not describe `gen_random_uuid` as
  cryptographically random.
- **All `security definer` functions in a non-exposed schema with public wrappers** — the
  API functions are meant to be called over the Data API anyway; their own checks are what
  protects them.
- **A shorter JWT lifetime** — Supabase recommends the 1-hour default and advises against
  going below 5 minutes; the gain (shorter Presence after removal) is small among friends.

## Consequences

- Anyone who finds the URL can sign up with an unconfirmed email address until the public
  launch (SECURITY.md S4).
- A removed member may keep Presence for up to 1 hour (ADR-0017, SECURITY.md §2.3).
- Every new API function needs its own `auth.uid()` checks and a pgTAP test
  (SECURITY.md §3).
- Legacy `anon` / `service_role` keys are being deprecated by Supabase by the end of 2026,
  so the new key format is used from the start.

## Open points

- 🚀 Items 1, 4, 6, 7 are revisited before public launch (with OPEN_QUESTIONS #9, #32).
