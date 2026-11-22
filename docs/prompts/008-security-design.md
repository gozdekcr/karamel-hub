# 008 — Security design

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> Start the security design task. Output: `docs/SECURITY.md`. Do not write code or SQL.
>
> Context: the app will not be released now; a group of friends will use it. Prioritize
> risks accordingly; mark separately, as "Before public launch", only the ones that matter
> for a public release.
>
> Content:
> 1. Threat table: threat, impact, mitigation, which ADR / DATABASE.md section covers it,
>    status (covered / open / accepted limitation).
>    Look at least at:
>    - RLS leaks (`session_details`, `user_settings`, non-catalog tables)
>    - Security of database functions (SECURITY DEFINER, `search_path`, `auth.uid()` checks)
>    - Private channel authorization and Presence
>    - Invite token (length, randomness, leaking)
>    - Keys: the service role key never goes to the frontend, `.env` management
>    - XSS in chat and input validation (Zod + database length limits)
>    - Spam / rate limits
> 2. Accepted limitations: session times before a membership interval being visible, a
>    removed member being able to come back (#48), Presence visibility for the JWT lifetime.
> 3. Phase 1 security checklist: RLS and function rules to test with pgTAP.
>
> Rules:
> - Rely only on Accepted ADRs and DATABASE.md. If a new decision is needed, add it to
>   OPEN_QUESTIONS.md as Proposed (including open #6, email verification).
> - If sources are needed, open and read the official Supabase/Postgres docs; mark what you
>   cannot verify as [not verified].
> - Write a report file. Do not commit.
