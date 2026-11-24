# 017 — Hosted project (P1-03b), rounds 1–5

Date: 2026-11-24 · Prompts: [`017-hosted-project`](../prompts/017-hosted-project.md),
[`-v2`](../prompts/017-hosted-project-v2.md), [`-v3`](../prompts/017-hosted-project-v3.md),
[`-v4`](../prompts/017-hosted-project-v4.md), [`-v5`](../prompts/017-hosted-project-v5.md)

One report for the whole task: rounds 1–4 were steps of the same work, done together with
the user.

## 1. Files created or changed

- `supabase/migrations/20261124163331_align_default_privileges.sql` — **new**: no default
  grants in `public` for `anon`, `authenticated`, `service_role` (tables, sequences,
  functions), locally and on the hosted project.
- `supabase/tests/database_base_test.sql` — 19 → **23** tests: default privileges grant
  nothing to the API roles; a new table or function gets rights only from an explicit grant.
- `.gitignore` — `backups/` (hosted dumps contain `auth.users`).
- `docs/DATABASE.md` (Conventions: "Grants are explicit"), `docs/SECURITY.md` (§3.1 status,
  §3.4: pgcrypto on hosted, Realtime public access, hosted Auth settings, where to close
  sign-ups), `docs/CURRENT_STATE.md` (header, "Where the app runs").
- `docs/prompts/017-hosted-project*.md` (5), this report.

Not in git: `supabase/.temp/` (link data, ignored by `supabase/.gitignore`),
`backups/2026-11-24-hosted-data.sql`.

## 2. What was done, with evidence

Who did what: the **user** created the project, ran every command that touches the hosted
project (`login`, `link`, `db push`, `db dump`, SQL Editor queries) and changed the
dashboard settings; **Claude** wrote the migration and tests, ran everything locally,
explained each step and checked the outputs the user pasted. No password was shared.

| Step | Evidence |
| --- | --- |
| Project | `karamel-hub`, ref `hrkzjmtstuenwakiyntf`, Europe, Free plan, "Grant API access to new tables automatically" unchecked (user) |
| `supabase login`, `supabase link` | Both successful; link did not ask for a password (user) |
| Hosted default privileges before | tables: `anon`/`authenticated` only `Dxtm` (truncate, references, trigger, maintain); sequences and functions: `postgres` only (user's SQL Editor output) |
| Local alignment | `migration up`, then `db reset` from zero: both migrations apply, pgTAP **23/23** |
| `db push --remote --dry-run` | Listed exactly the two migrations (user) |
| `db push --remote` | Both applied, "Finished supabase db push", no error (user, after approval) |
| `migration list --remote` | Both migrations local and remote (user) |
| Hosted default privileges after | `(all)/f`, `public/S`, `public/f`, `public/r`: `postgres` only — same as local |
| Hosted extensions | `btree_gist` 1.7 (new) and `pgcrypto` 1.3, both in `extensions` |
| Hosted schema `private` | `anon` usage false, `authenticated` usage true |
| `db dump --remote --data-only -f backups/2026-11-24-hosted-data.sql` | Finished without error (user). Checked by Claude without printing values: 4,564 bytes; **0 `INSERT`s** (no users or app tables yet); **0** `CREATE`/`ALTER`/`DROP`/`GRANT`/`REVOKE`/`COMMENT ON`; only session `SET`s, `set_config('search_path')` and one `setval` for `auth.refresh_tokens_id_seq` → data only |
| Dashboard | "Confirm email" off; access token expiry 3600; Realtime "Allow public access to channels" off; Data API "Automatically expose new tables" off; publishable key exists; "Allow new users to sign up" still **on** (closed in P1-14) |

### Explained simply

- **Why a second migration:** the hosted project gives new tables no read/write rights
  for the API roles; the local stack did. Different behaviour would let a test pass locally
  and fail on the hosted project. Now both start with **no rights**, and each table or
  function migration grants exactly what it needs.
- **What the backup is:** a SQL file with `INSERT` statements for every row of data
  (structure comes from the migrations). The Free plan has **no automatic backups**
  (Supabase pricing: "Not included"), and Supabase recommends `db dump` for Free projects.
  The file includes `auth.users` (emails, password hashes), so it stays out of git and is
  never shared.
- **Before every later `db push`:** run the same dump with a new date in the file name.

## 3. NOT done or NOT verified

- pgTAP was **not run on the hosted project** (it would create the pgtap extension there);
  the hosted state was checked with read-only queries instead.
- **Restoring** the dump was not tested (an empty dump proves little); worth testing once
  real data exists.
- Closing sign-ups: located and written down; done by the user in P1-14 (ADR-0031).
- SECURITY.md §3.4 items about the frontend bundle and keys in the app: P1-14.
- Nothing was committed.

## 4. Contradictions, ambiguities and interpretations

- **Dashboard label:** the project-creation option is called "Grant API access to new tables
  automatically"; the docs and the Data API settings call it "Automatically expose new
  tables". Treated as the same setting (the user found it off under Data API).
- **"Allow public access to channels"** is the dashboard's label; the docs say "Allow public
  access".
- **CLI message:** `db dump --data-only` ends with "Dumped schema to …" although the file is
  data only (checked).
- **Uncommitted migration on the hosted project:** `20261124163331_align_default_privileges.sql`
  is applied on the hosted project but not committed yet. Its name and content must not
  change; commit it.
- **Realtime warning:** "No Realtime RLS policies found on realtime.messages" is expected
  until Phase 3; policies come only from migrations (ADR-0017).

## 5. Suggestions (out of scope)

- An npm script for the backup, e.g. `npm run db:backup`, that puts the date in the file
  name, so the step before `db push` is one command.
- Free-plan pause after 1 week without activity: if friends stop using the app for a week,
  the project pauses; restart it from the dashboard.
