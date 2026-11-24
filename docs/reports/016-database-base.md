# 016 — Database base (P1-03)

Date: 2026-11-24 · Prompt: [`../prompts/016-database-base.md`](../prompts/016-database-base.md)

## 1. Files created or changed

- `supabase/config.toml`, `supabase/.gitignore` — created by `npx supabase init`
  (project id `karamel-hub`; defaults kept).
- `supabase/migrations/20261124141306_database_base.sql` — the first migration.
- `supabase/tests/database_base_test.sql` — pgTAP tests (19).
- `package.json` — scripts `db:start`, `db:stop`, `test:db`.
- `README.md` — the three commands; `docs/DATABASE.md` §8 — schema name `private`;
  `docs/SECURITY.md` §3.1 — status of three checklist lines; `docs/CURRENT_STATE.md` —
  header.
- `docs/prompts/016-database-base.md`, this report.

## 2. Explained simply

### What is a migration, and why we use it

A migration is a numbered SQL file that changes the database one step: create a table,
add a rule, change a permission. The files live in `supabase/migrations/` and run in the
order of the timestamp in their names. The database remembers which ones it has already
run (table `supabase_migrations.schema_migrations`), so each runs once.

Why: the database's shape is kept in git like code, so it can be reviewed and rebuilt; the
local database and the hosted one get exactly the same changes (`db push` sends the new
files, ADR-0018); and nobody changes the hosted database by hand. Because real data lives
on the hosted project, a migration only adds or changes; it never resets (ADR-0030).

### Tables created in this task

**None.** P1-03 prepares the ground; the first tables (`profiles`, `user_settings`) come
in P1-04. The migration does four things:

| Part | What it does |
| --- | --- |
| `btree_gist` extension | Lets a later rule say "the same user's sessions must not overlap in time" (ADR-0011). |
| `pgcrypto` extension | Gives `gen_random_bytes`, used for 32-byte invite tokens (ADR-0027); Supabase had it already. |
| Schema `private` | A folder in the database for helper functions that the API cannot reach; signed-in users may use it, but not create anything in it. |
| Default privileges | Rules for objects created later: no function can be run by everyone (`PUBLIC`) or by a visitor who is not signed in (`anon`), and `anon` gets no rights on new tables. |

### RLS policies

**None yet**, because there are no tables. RLS (Row Level Security) is a filter on each
table that decides, row by row, who may read or change it; the policies come with the
tables from P1-04 on (DATABASE.md §4). What exists now is the **safety net**: a test that
fails if any table in the API's schemas does not have RLS turned on.

### What the pgTAP tests check (19)

| Group | Checks |
| --- | --- |
| Extensions (2) | `btree_gist` and `pgcrypto` are installed. |
| Schema `private` (4) | It exists; `anon` cannot use it; signed-in users can use it but cannot create objects in it. |
| Whole database (2) | No table in the API's schemas is without RLS; no function in `public` or `private` can be run by `anon` or `PUBLIC`. |
| New tables (5) | A test table: `anon` has no rights, signed-in users keep theirs; the RLS check really reports a table without RLS, and stops once RLS is on. |
| New functions (6) | A test function in `public`: not for `anon`, allowed for signed-in users (API functions); one in `private`: allowed for nobody until a grant; the function check passes, and really reports a function opened to `anon`. |
| Invite tokens (1) | `gen_random_bytes(32)` returns 32 bytes. |

The test objects are created inside a transaction that is rolled back, so nothing stays.

## 3. What was done, with evidence

| Step | Result |
| --- | --- |
| `npx supabase init` | `supabase/config.toml` (exposed schemas `public`, `graphql_public`; JWT 3600 s; email confirmations off; local sign-ups on) |
| `npm run db:start` | "Applying migration 20261124141306_database_base.sql…", stack running |
| `npm run test:db` | `Files=1, Tests=19 … Result: PASS` (first run: 10/19 because of a type error in the test itself, fixed — see §4) |
| `pg_default_acl` (owner `postgres`) | functions, all schemas: `{postgres=X}` (no `PUBLIC`); `public`: functions, tables and sequences granted to `authenticated` and `service_role`, **not `anon`** |
| `supabase_migrations.schema_migrations` | one row, `database_base` |
| pgTAP as `authenticated` | runs (no permission error), so P1-04's role-switching tests can use it |
| Studio `http://127.0.0.1:54323` | HTTP 200 |
| lint, typecheck, Vitest | still pass (8/8) |

**Not done / not verified**

- Nothing on the hosted project (P1-03b). The migration was applied only locally.
- `storage` schema defaults still grant `anon` (Supabase's own; the app does not use
  Storage). Not changed.
- `site_url` in `config.toml` is `http://127.0.0.1:3000`, while the app runs on port 5173;
  it matters for Auth redirects in P1-05. Not changed.
- Generated TypeScript types (ADR-0018): nothing to generate without tables (P1-04).
- Nothing was committed. The local stack is still running (`npm run db:stop` stops it).

## 4. Contradictions, ambiguities and interpretations

- **Schema name `private`:** the documents say "non-exposed schema" without a name;
  `private` is the name used in Supabase's docs. Recorded in DATABASE.md §8.
- **`anon` table privileges in this task:** ROADMAP P1-03 lists only function privileges,
  but SECURITY.md R11 ("the `anon` role gets no table grants") is also a default-privilege
  setting, so it is set and tested here.
- **`PUBLIC` revoke is global:** PostgreSQL can remove the default `EXECUTE` for `PUBLIC`
  only for all schemas at once (for objects created by `postgres`). Checked: pgTAP still
  runs as `authenticated`.
- **Test fix:** the first run failed at a `results_eq` comparison ("could not determine
  which collation to use"); replaced by an array comparison. The migration was not changed.

## 5. Suggestions (out of scope)

- Set `site_url` to `http://localhost:5173` in P1-05 (sign-in redirects).
