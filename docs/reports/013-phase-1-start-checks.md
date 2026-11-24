# 013 — Phase 1 start checks (P1-01)

Date: 2026-11-24 · Phase 1 started · Prompt: [`../prompts/013-phase-1-start-checks.md`](../prompts/013-phase-1-start-checks.md)

## 1. Files created or changed

- `CLAUDE.md` — "Current phase" is now Phase 1; the Phase 0 "no code, no setup, no package
  installs" restriction is removed. All other rules unchanged.
- `docs/decisions/0030-phase-1-environment.md` — **new, Accepted** (user decisions in this
  task): Node.js 26 LTS; Supabase CLI as an npm dev dependency; hosted Supabase project
  from Phase 1 with friends; hosting decision (#9) brought forward.
- `docs/OPEN_QUESTIONS.md` — #41 and #78 resolved (ADR-0030); #9 brought forward; new
  **Proposed** #79 (roadmap changes for the hosted project), #80 (heading font), #81
  (timer digit font).
- `docs/CURRENT_STATE.md` — header (Phase 1 in progress), new "Where the app runs" row,
  ADR-0030 in the table, tech list, font note.
- `docs/ROADMAP.md` — the "real data" paragraph and Phase 1 dependencies point to
  ADR-0030 and #79–#81. **The task tables are not changed** (#79 is Proposed).
- `docs/UI_UX.md` §6.3 — font check results replace the two "[not verified]" lines.
- `docs/WORKFLOW.md` — Phase 1 in progress.
- `docs/decisions/README.md` — ADR-0030 listed.
- `docs/prompts/013-phase-1-start-checks.md`, this report.

Nothing outside the repo was kept except in the session's temporary folder (a Python venv
with fontTools, the font files, a throwaway `supabase init` folder). Docker images of the
local Supabase stack stay on the machine (they are reused in P1-03).

## 2. What was done, with evidence

### Tools on the machine (checked with `--version`, `docker info`)

| Tool | Found | Note |
| --- | --- | --- |
| Node.js | v24.17.0 | ADR-0030 chose Node 26 → **the user installs Node 26** |
| npm | 11.13.0 | — |
| git | 2.52.0.windows.1 | — |
| Docker | 29.9.3, Docker Desktop running (WSL 2) | — |
| Supabase CLI | **not installed** | Decided: npm dev dependency in P1-02. For P1-01 it was run with `npx supabase@3.3.0` from a temporary folder |

### Node.js version (#41)

Sources: [schedule.json](https://raw.githubusercontent.com/nodejs/Release/main/schedule.json),
[previous releases](https://nodejs.org/en/about/previous-releases). On 2026-11-24 Node 26
is Active LTS (end 2029-04-30, latest 26.13.1), Node 24 is Maintenance LTS (end
2028-04-30, latest 24.22.3), Node 22 is Maintenance LTS (end 2027-04-30). **User chose
Node 26.**

### Local stack checks (Supabase CLI 3.3.0, PostgreSQL 17.12)

| Check | Result | How |
| --- | --- | --- |
| `btree_gist` available | ✅ version 1.7 (not installed by default) | `pg_available_extensions`; `CREATE EXTENSION btree_gist WITH SCHEMA extensions` inside a rolled-back transaction |
| Overlap constraint works | ✅ a second overlapping range for the same user is refused with **SQLSTATE 23P01** | `EXCLUDE USING gist (user_id WITH =, during WITH &&)` on a throwaway table; pgTAP `throws_ok(…, '23P01')` |
| `pgcrypto` available | ✅ version 1.3, **already installed** in schema `extensions` | `pg_extension`; `length(extensions.gen_random_bytes(32)) = 32` |
| `supabase test db` reads `supabase/tests/` | ✅ the file `supabase/tests/start_checks_test.sql` ran: `Files=1, Tests=4 … Result: PASS` | Also the CLI docs: "unit test files volume mounted from `supabase/tests` directory" ([test db](https://supabase.com/docs/reference/cli/supabase-test-db)). Note: the test run found `pgtap` already created |
| New key format locally | ✅ `supabase start` printed `PUBLISHABLE_KEY` = `sb_publishable_…` and `SECRET_KEY` = `sb_secret_…` (legacy `ANON_KEY` / `SERVICE_ROLE_KEY` are also printed) | Docs: "Running `supabase start` prints a publishable key and a secret key" ([API keys](https://supabase.com/docs/guides/api/api-keys)); legacy keys deprecated "by the end of 2026" |

The throwaway stack was stopped with `supabase stop --no-backup` (no real data in it).

### Fonts (files from the google/fonts repository, checked with fontTools 4.68.0)

| | Fredoka 2.001 (`Fredoka[wdth,wght].ttf`) | Nunito 3.602 (`Nunito[wght].ttf`) |
| --- | --- | --- |
| ç Ç ı ö Ö ü Ü | ✅ | ✅ |
| **ğ Ğ İ ş Ş** | ❌ **missing** (U+011F, U+011E, U+0130, U+015F, U+015E) | ✅ |
| `tnum` feature | ❌ none | ❌ none |
| Digit widths 0–9 | Different (e.g. 509–587 units at weight 500) → digits jump | **All 600 units** at weights 200, 400, 500, 600, 700, 1000 → tabular by default |

Google's `METADATA.pb` lists `latin-ext` for Fredoka, but the font file itself has no
glyphs for these five letters. **This is a failed assumption** (UI_UX.md §6.3, CURRENT_STATE
"Visual direction"); per the ROADMAP acceptance criteria it is raised before P1-02:
OPEN_QUESTIONS #80 and #81 (Proposed: Nunito for headings and the timer).

### NOT done or NOT verified

- `btree_gist` and `pgcrypto` on the **hosted** project — no hosted project exists. To be
  checked when it is created (#79 (a)).
- The SECURITY.md §3.4 checklist was not ticked: it covers the hosted project too.
- `supabase db dump --data-only` in #79 (c) is from memory of the CLI, **not checked** in
  this task.
- No ADR's decision was edited: the database assumptions held. The font assumption lives
  in UI_UX.md, not in an ADR.
- Node 26 is not installed yet; the checks ran with Node 24.17.0 (the CLI needs Node ≥ 20).
- Nothing was committed.

## 3. Contradictions, ambiguities and interpretations

- **Hosted from Phase 1 vs ROADMAP.** ROADMAP puts hosting and the hosted project in
  P5-05, and SECURITY.md §3.4 checks in Phase 5. The user's decision moves them into
  Phase 1. Only the decision was recorded (ADR-0030); the task changes are **Proposed
  (#79)** and the task tables were not edited.
- **Public sign-up with friends from Phase 1.** Email confirmation is off and rate limits
  are 🚀 items (ADR-0027). Anyone who finds the URL can sign up. ADR-0027 already accepts
  this for the friend-group stage; #79 (d) only suggests sharing the URL with friends only.
- **Phase 1 has no rooms**, so friends would use the app alone until Phase 3.
- **Fredoka** (see above): the decided heading font cannot write Turkish headings without
  a fallback font.

## 4. Suggestions (out of scope)

- Decide #80 and #81 before P1-02 (P1-02 self-hosts the fonts).
- Decide #9 and #79 before the deployment task, so the hosted project is set up once with
  the SECURITY.md §3.4 settings.
