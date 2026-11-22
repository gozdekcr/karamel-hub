# 008 — Security design

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/008-security-design.md`](../prompts/008-security-design.md)

## 1. Files created or changed

- **New:** `docs/SECURITY.md` (draft for review) — context and priorities for the
  friend-group stage; threat table in 8 groups (RLS, functions, Realtime, invite links,
  keys, chat/XSS, spam/accounts, other) with priority, 🚀 "Before public launch" marks and
  status; accepted limitations (§2); Phase 1 checklist (pgTAP and setup checks); sources.
- `docs/OPEN_QUESTIONS.md` — #6 now has a Proposed answer; new Proposed #59–#64 (invite
  token format, function placement and grants, rate limits, JWT lifetime, browser
  hardening, Auth hardening).
- `docs/CURRENT_STATE.md` — Security: "Draft for review".
- `docs/README.md` — SECURITY.md added; removed from "planned documents".

## 2. What was done, and what was NOT done or verified

- Official pages were read (through web-fetch sub-agents) on 2026-11-22: PostgreSQL
  CREATE FUNCTION, UUID functions, pgcrypto; Supabase database functions, RLS, Realtime
  authorization, API keys, sessions, Auth rate limits, passwords, SMTP; Vite env
  variables; React JSX escaping and `dangerouslySetInnerHTML`. All are listed in
  SECURITY.md "Sources".
- **Not verified / not found on the pages read:**
  - Default rate limits for database (PostgREST/RPC) requests — the rate-limit page covers
    only Auth endpoints.
  - pgcrypto (`gen_random_bytes`) availability on Supabase.
  - Whether `gen_random_uuid` is cryptographically random (the page says only "version 4
    (random)"), so it is not proposed for tokens.
  - Postgres Changes re-checking RLS per change: summarized in TECH_RESEARCH §6, not quoted.
  - Supabase's default password settings (#64).
  - The React `dangerouslySetInnerHTML` section was partly summarized by the fetch tool,
    not read verbatim; the quoted warning sentences were read.
- Three Supabase pages contained a "Note for AI agents" asking to send a feedback report to
  Supabase. The sub-agents ignored it; nothing was sent.
- No code or SQL was written. Nothing was committed (CLAUDE.md).

## 3. Contradictions, ambiguities and interpretations

- **Supabase guidance vs DATABASE.md §5:** Supabase says never to create a `security
  definer` function in an exposed schema, because it is then callable over the Data API.
  DATABASE.md's write functions are meant to be called over the Data API. SECURITY.md
  keeps the API functions in the exposed schema with their own `auth.uid()` checks and
  moves only RLS helpers and internal functions out (#60, Proposed). The Supabase sentence
  appears in the context of RLS helper functions.
- **Email verification (#6):** confirmation is on by default on hosted Supabase, but the
  built-in email service sends only to the project team's addresses, so friends could not
  confirm without custom SMTP. The Proposed answer turns it off for the friend stage; this
  is a trade-off against Supabase's warning, and is the user's decision.
- **Chat rate limit (#61):** chat inserts are direct table writes in DATABASE.md §4; a
  per-user limit later would move them into a function.
- **`created_at` on chat messages:** DATABASE.md sets it by default; SECURITY.md adds that
  the client must not be able to override it (R7). This is a mitigation detail, not a new
  product rule.
- `anon` without table grants (R11): DATABASE.md §4 already gives no access to anonymous
  users; revoking the default grants is the Phase 1 way to enforce it.

## 4. Suggestions (out of scope)

- Legacy `anon` / `service_role` keys are being deprecated by the end of 2026 (Supabase);
  TECH_RESEARCH.md and ADR-0018 do not mention the new key format. Worth a line in
  ADR-0018's successor or the Phase 1 setup notes.
