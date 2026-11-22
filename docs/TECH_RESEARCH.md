# Technical research

- **Checked on:** 2026-11-22
- **Task:** [`prompts/003-tech-research.md`](prompts/003-tech-research.md)
- **Goal:** research the open technical choices before Phase 1. The recommendations below
  were written as **Proposed**; the research itself is kept as it was.
- **Review outcome (2026-11-22, [`prompts/003-tech-research-v2.md`](prompts/003-tech-research-v2.md)):**
  topics 1, 3, 5–10 approved as proposed; topic 2 → **React Router** (not the proposed
  TanStack Router); topic 4 (hosting) deferred until the release stage. Decisions:
  [ADR-0015](decisions/0015-frontend-libraries.md), [ADR-0016](decisions/0016-database-implementation-rules.md),
  [ADR-0017](decisions/0017-realtime-private-channels.md), [ADR-0018](decisions/0018-local-development-and-testing.md).
  The OPEN_QUESTIONS numbers below are historical; see the "Resolved" note there.

## How this research was done (read first)

- Source pages were **opened and read** (by page-reading subagents) on 2026-11-22. Facts
  below come from those pages unless marked otherwise.
- **[not verified]** = the page could not be read, was truncated, or did not contain the
  fact. The reason is given.
- **(summary)** = the page was too long and this part came from a model summary of the
  unread remainder, not verbatim text. Treat it as weaker than a quote.
- GitHub release pages show "17 Nov" without a year. The year **2026** is inferred from other
  dates on the same pages (footers, tag pages); it is not printed next to every release.
- **Inference** sections are Claude's interpretation, not sourced.
- Nothing was installed and no code was written.

### Constraints from accepted decisions that the options are judged against

- ADR-0001: Supabase (Auth, PostgreSQL, Realtime); backend logic in the database; free plan.
- ADR-0002: `domain/` pure TypeScript; `data/` talks to Supabase.
- ADR-0006: room members see **only time data**, enforced in the database; Presence per room.
- ADR-0007: heartbeat; ADR-0009: TanStack Query; ADR-0010: key-based i18n with feature
  namespaces, TR + EN; ADR-0011: sessions never overlap (exclusion constraint).
- CURRENT_STATE: desktop browser only; primary users are university students, 18+ (the 18+ rule was removed later, task 006).

---

## 1. i18n library

| | i18next + react-i18next | react-intl (FormatJS) | Lingui |
| --- | --- | --- | --- |
| Version (2026-11-22) | i18next **27.2.4** (22 Nov); react-i18next **18.0.3** (19 Nov 2026) | react-intl **12.2.0** (18 Nov) | **6.12.0** (3 Nov 2026) |
| Maintenance | Very active: ~10 i18next releases in 13 days; react-i18next major v18 on 7 Nov 2026 | Active (many FormatJS packages released 18–19 Nov) | Active (roughly every 1–3 weeks) |
| TypeScript | Typed keys via `CustomTypeOptions` type augmentation | Written in TypeScript; typed message IDs opt-in | TS supported; no key model (hashed IDs) |
| Namespaces per feature (ADR-0010) | ✅ built-in, lazy-loadable | [not verified] — docs read show one provider with one message object | [not verified] — lazy loading is per locale |
| Message format | Own format with plurals; ICU via plugin | ICU (plural, select) | ICU-style |
| Build step | None required (optional CLI for extraction/types) | Optional extractor / build plugins | **Required**: `lingui extract` + `lingui compile` (Vite plugin can do compile) |
| License | MIT | [not verified] (LICENSE page 404) | MIT |
| Learning value | Namespaces, type augmentation | ICU message syntax | Macros, compile step |

**Sources:**
[react-i18next tags](https://github.com/i18next/react-i18next/tags),
[i18next releases](https://github.com/i18next/i18next/releases),
[i18next TypeScript](https://www.i18next.com/overview/typescript),
[i18next namespaces](https://www.i18next.com/principles/namespaces) — "namespace per module
which gets lazy loaded (single page applications)",
[react-i18next README](https://github.com/i18next/react-i18next) — requires "react >= 18.0.0"
and "i18next >= 27.0.0",
[FormatJS releases](https://github.com/formatjs/formatjs/releases),
[react-intl docs](https://formatjs.github.io/docs/react-intl/) — "written in TypeScript and
requires TypeScript 5.4 or newer",
[ICU syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax),
[Lingui releases](https://github.com/lingui/js-lingui/releases),
[lingui.dev](https://lingui.dev/) — "Run `lingui extract` and `lingui compile` before building".

**Notes:**
- i18next's docs say "The newest i18next versions only support TypeScript v5", while its
  README says "TypeScript 5, 6 and 7" — conflicting; check before pinning TypeScript.
- The fast release pace of i18next means versions should be pinned and upgraded on purpose.

**Proposed: i18next + react-i18next.** It is the only option whose namespaces match ADR-0010
directly (one file per feature per language, lazy-loaded), keys can be type-checked, and no
build step is needed. → OPEN_QUESTIONS #7.

---

## 2. Router

| | React Router | TanStack Router |
| --- | --- | --- |
| Version | **8.5.2** (18 Nov; v7 line 7.18.6 also maintained) | Release "2026-11-19"; core `@tanstack/react-router` version [not verified] (page shows other packages, e.g. `react-router-devtools@1.167.4`) |
| Maintenance | Active (releases on v8 and v7 on 18 Nov) | Active (two release batches on 19 Nov) |
| TypeScript | Generated route types — **framework mode only**; "Not available with Data / Declarative" | "100% inferred TypeScript support", typed navigation, typed and validated **search params** |
| Build tooling | Framework mode needs its Vite plugin; declarative mode needs nothing | File-based routing generated "by the Vite plugin or TanStack Router CLI"; code-based routing [not verified] whether a plugin is needed |
| TanStack Query (ADR-0009) | [not verified] (pages not read) | Documented: "Designed for client-side data caches (TanStack Query, SWR, etc.)"; `queryClient` passed through router context |
| License | MIT | MIT |
| Learning value | Classic, widely used; three modes | Type-safe routing, schema-validated URL state |

**Sources:**
[React Router releases](https://github.com/remix-run/react-router/releases),
[modes](https://reactrouter.com/start/modes),
[type safety](https://reactrouter.com/explanation/type-safety),
[TanStack Router releases](https://github.com/TanStack/router/releases),
[overview](https://tanstack.com/router/latest/docs/framework/react/overview),
[type safety guide](https://tanstack.com/router/latest/docs/framework/react/guide/type-safety).

**Notes:**
- TanStack Router has its own loader cache, "loosely based on TanStack Query, but with fewer
  features". With TanStack Query as the server-state layer (ADR-0009), the router cache
  should stay unused or minimal, to avoid two caches (inference).
- Typed search params are useful for statistics ranges (e.g. week/month) and room ids in URLs
  (inference).

**Proposed: TanStack Router.** Type safety without a framework mode, documented TanStack Query
integration, and the same ecosystem as ADR-0009. Alternative: React Router in declarative mode
if simplicity matters more than typed routes. → OPEN_QUESTIONS #33.

---

## 3. Chart library

| | Recharts | Chart.js + react-chartjs-2 | Nivo |
| --- | --- | --- | --- |
| Version | **3.11.0** (17 Nov) | Chart.js **4.6.1** (22 Oct); react-chartjs-2 **5.3.1** (27 Oct) | **0.99.0** (23 May — about 6 months old, year inferred) |
| Maintenance | Active (canary builds every 1–2 weeks) | Active | Slower: many releases in May, none after on the first page |
| TypeScript | Typed props (release notes); "written in TS" [not verified] | Chart.js: "built-in TypeScript typings"; wrapper [not verified] | [not verified] |
| Rendering | SVG | Canvas ("disallows CSS styling") | SVG, HTML and Canvas variants |
| Calendar heatmap (#25) | Not built in (not seen) | [not verified] (chart list page empty) | ✅ `@nivo/calendar` |
| Theming | New "Themes" in 3.11.0 (context-based) | Options only; dark mode [not verified] | `theme` prop |
| React 19 | Fixes for React 19 in notes; no support statement | react-chartjs-2 5.3.0 "support react 19" | 0.98.0 "React 19 support" (react-spring) |
| License | MIT | MIT / MIT | MIT |

**Sources:**
[Recharts releases](https://github.com/recharts/recharts/releases),
[Recharts](https://github.com/recharts/recharts),
[Chart.js releases](https://github.com/chartjs/Chart.js/releases),
[Chart.js docs](https://www.chartjs.org/docs/latest/),
[react-chartjs-2 releases](https://github.com/reactchartjs/react-chartjs-2/releases),
[Nivo releases](https://github.com/plouc/nivo/releases),
[Nivo calendar](https://nivo.rocks/calendar/),
[Nivo theming](https://nivo.rocks/guides/theming/).

**Notes:** locale formatting of axes (TR/EN) was not covered by any page read **[not verified]**
for all three; all accept custom formatters, so `Intl` formatting (ADR-0010) can be passed in
(inference).

**Proposed: Recharts** for bar/line charts (active, SVG, themable). If the calendar heatmap
(#25) is accepted, build it as a small custom grid instead of adding a second library
(inference: a heatmap is a simple grid of colored cells). → OPEN_QUESTIONS #34.

---

## 4. Hosting (static SPA, free plan)

| | Vercel Hobby | Netlify Free | Cloudflare Pages / Workers static assets |
| --- | --- | --- | --- |
| Traffic | 100 GB/month transfer; 1M CDN requests/month | 300 credits/month; bandwidth costs 20 credits/GB (≈15 GB if spent only on bandwidth — arithmetic) | Workers: "Requests to static assets are free and unlimited" |
| Builds | 45 min per build; 1 concurrent; 100 deployments/day | Production deploy = 15 credits; build minutes [not verified] | Pages: 500 builds/month, 1 at a time, 20 min; Workers Builds [not verified] |
| Over the limit | Hobby: wait until 30 days have passed; extra usage cannot be bought | [not verified] (billing doc 404) | Pages: [not verified]; Workers: 429 only for routes that run the Worker first |
| SPA fallback | Rewrite all paths to `/index.html` (documented) | [not verified] | Pages: automatic if no top-level `404.html`; Workers: `not_found_handling = "single-page-application"` |
| Custom domain + HTTPS | ✅ HTTPS certificates included | ✅ "Custom domains with SSL" | Pages: 100 domains/project, HTTPS [not verified]; Workers: domain must use Cloudflare nameservers |
| Previews | ✅ | ✅ unlimited deploy previews | ✅ |
| Commercial-use limit | None found on pages read; fair-use page not read [not verified] | None found | None found |
| Status | — | — | Cloudflare: "Start new projects with Workers" (Pages not deprecated) |

**Sources:**
[Vercel pricing](https://vercel.com/pricing), [Vercel Hobby](https://vercel.com/docs/plans/hobby),
[Vercel limits](https://vercel.com/docs/limits),
[Vercel rewrites](https://vercel.com/docs/project-configuration/vercel-json#rewrites),
[Netlify pricing](https://www.netlify.com/pricing/),
[Cloudflare Pages](https://developers.cloudflare.com/pages/),
[Pages limits](https://developers.cloudflare.com/pages/platform/limits/),
[Pages SPA behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/),
[Workers static assets](https://developers.cloudflare.com/workers/static-assets/),
[Workers billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/),
[migrate from Pages](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/).

**Is the free plan enough?** For a static SPA used by a few dozen students: yes on all three
(inference — the app's data goes to Supabase, so the host only serves static files). Netlify's
credit model is the tightest and least verified.

**Proposed: Cloudflare Workers with static assets.** Unlimited free static requests, no
monthly cap to hit, SPA fallback documented, and it is Cloudflare's recommended path for new
projects. Alternative: Vercel Hobby (simplest setup, clear limits). → OPEN_QUESTIONS #9.

---

## 5. Exclusion constraint and btree_gist on Supabase (ADR-0011)

**Sourced:**
- PostgreSQL's own example combines equality and overlap: `EXCLUDE USING GIST (room WITH =,
  during WITH &&)` after `CREATE EXTENSION btree_gist` — "reject overlapping ranges only if
  the meeting room numbers are equal"
  ([range types](https://www.postgresql.org/docs/current/rangetypes.html)).
- btree_gist provides GiST operator classes with B-tree behavior for types including `uuid`
  and `timestamp with time zone`; it "can be installed by non-superusers who have CREATE
  privilege" ([btree_gist](https://www.postgresql.org/docs/current/btree-gist.html)).
- In ranges, "Using NULL for either bound causes the range to be unbounded on that side"; the
  two-argument constructor defaults to `'[)'` ([range types](https://www.postgresql.org/docs/current/rangetypes.html)).
- Violations raise SQLSTATE **23P01 `exclusion_violation`**
  ([error codes](https://www.postgresql.org/docs/current/errcodes-appendix.html)).
- `UNIQUE (id, valid_at WITHOUT OVERLAPS)` "behaves like `EXCLUDE USING GIST (id WITH =,
  valid_at WITH &&)`" ([CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html));
  the version that introduced it **[not verified]**. Current PostgreSQL docs are version 19.
- Supabase is "pre-configured with over 50 extensions" and extensions are enabled from the
  dashboard or with `create extension`
  ([Supabase extensions](https://supabase.com/docs/guides/database/extensions)).
- **btree_gist availability on Supabase: [not verified]** — not named on the page read.
- Supabase's Postgres version for new projects: **[not verified]**.

**Options:**
1. **EXCLUDE USING GIST** on (user = , time range &&) with btree_gist — the documented pattern.
2. **`WITHOUT OVERLAPS`** — shorter syntax, but needs a range column and a Postgres version
   that supports it [not verified on Supabase].
3. **Trigger that checks for overlaps** — no extension needed, but race-prone unless locking
   is handled (inference); weaker than a constraint.

**Inference:** with a half-open range and a NULL end for the active session, an active session
blocks any later session, and back-to-back sessions do not conflict — matching ADR-0003 and
ADR-0011. The UI can map SQLSTATE 23P01 to a translated "overlaps another session" message.

**Proposed: option 1**, and as the **first Phase 1 database step, verify that btree_gist is
available** on the local stack and the hosted project. → OPEN_QUESTIONS #35.

---

## 6. Realtime / Presence free-plan limits (ADR-0006)

**Sourced** ([Realtime limits](https://supabase.com/docs/guides/realtime/limits),
[pricing](https://supabase.com/pricing),
[billing](https://supabase.com/docs/guides/platform/billing-on-supabase)):

| Free plan | Value |
| --- | --- |
| Concurrent connections | 200 |
| Messages per second | 100 |
| Messages per month | 2 million |
| Channels per connection | 100 |
| Channel joins per second | 100 |
| Presence messages per second | 20 |
| Presence calls per client per 30 s | 5 |
| Database size / RAM | 500 MB / shared CPU, 500 MB RAM |
| Egress | 5 GB |
| Auth monthly active users | 50,000 |
| Pausing | "Free projects are paused after 1 week of inactivity" |

- Over the limit: joins can be refused (`too_many_channels`, `too_many_connections`,
  `too_many_joins`); too many messages per second disconnects connections, and the client
  reconnects when throughput drops.
- Presence is for "slow-changing state such as online/offline status"; "Calling track()
  rapidly … will flood the channel" ([Presence](https://supabase.com/docs/guides/realtime/presence)).
- **Private channels:** "disable the 'Allow public access' setting", write RLS policies on
  `realtime.messages`, and create channels with `private: true`. Authorization is checked
  "when the user connects" and cached for the connection until the JWT expires
  ([Realtime Authorization](https://supabase.com/docs/guides/realtime/authorization)).
  Plan restriction: none found on the pages read; free-plan availability **[not verified]**.
- Postgres Changes: records are "sent only to clients who are allowed to read them based on
  your RLS policies" ([Authorization](https://supabase.com/docs/guides/realtime/authorization));
  every event is authorized per subscriber and processed on a single thread (summary)
  ([Postgres Changes](https://supabase.com/docs/guides/realtime/postgres-changes)).

**Inference:**
- For a few dozen students, 200 connections and 2M messages/month are enough **if** nothing
  writes to Realtime-published tables at a high rate (see §8).
- 100 channels per connection is a hard ceiling for "one Presence channel per room" — a
  per-user room limit (#15) must stay below it.
- Without private channels, anyone who guesses a room's channel name could join its
  Presence. ADR-0006's visibility rule ("you see another user only if you share a room")
  needs private channels.
- Because authorization is cached until the JWT expires, a removed member (ADR-0014) may keep
  receiving room Presence for up to the token lifetime.

**Proposed:** use **private channels** for room Presence, with RLS on `realtime.messages`
based on room membership; keep JWT lifetime short enough for removals to take effect.
→ OPEN_QUESTIONS #36. Free plan: sufficient for the expected scale (#15 note added).

---

## 7. Time-only visibility for room members (ADR-0006)

**Sourced:**
- "Views bypass RLS by default because they are usually created with the `postgres` user";
  in Postgres 15+ set `security_invoker = true` so the view obeys the underlying RLS
  ([Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security),
  [CREATE VIEW](https://www.postgresql.org/docs/current/sql-createview.html)).
- Supabase's advisor flags definer views as an ERROR: lint 0010 "View bypasses row-level
  security" ([Database Advisors](https://supabase.com/docs/guides/database/database-advisors)).
- Security definer functions: "Prefer `security invoker`"; with `security definer` "you must
  set the `search_path`"; "A `security definer` function can return rows the caller isn't
  allowed to read"; "Any role can call it by default, including `anon`"
  ([Functions](https://supabase.com/docs/guides/database/functions)).
- Column-level privileges: "We do not recommend using column-level privileges for most users";
  `select *` fails for restricted roles
  ([Column-level security](https://supabase.com/docs/guides/database/postgres/column-level-security)).
- RLS performance: index the columns policies filter on; wrap `auth.uid()` in `select`
  ([Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)).
- Postgres Changes subscribes to **tables**; views are not mentioned **[not verified]**.

**Options:**
1. **View with `security_invoker = true`** over the sessions table, exposing only time columns.
2. **Security definer function** returning only time fields for rooms the caller is in.
3. **Column-level privileges** on the sessions table.
4. **Table split:** the table that room members may read contains **only** user and time
   fields; private links (course, task, notes) live in a separate table readable only by the
   owner.

**Inference (important):** RLS filters **rows, not columns**. With option 1, room members
need SELECT on the base sessions rows, so they could query the base table directly and read
every column — the view alone does not hide columns. Postgres Changes also sends whole rows of
a **table** to every subscriber allowed by RLS. So if a room-readable table holds a course or
task reference, it would reach other members. Option 2 hides columns but cannot be used with
Postgres Changes. Option 3 is discouraged by Supabase.

**Proposed: option 4 (table split)** — keep room-visible data (user, start, end, pauses) in a
table with membership-based RLS, and owner-only details in a separate table; use views only
with `security_invoker = true` for convenience. To be finalized in `DATABASE.md`.
→ OPEN_QUESTIONS #37.

---

## 8. Heartbeat storage and write cost (#1, #16)

**Sourced:**
- HOT updates avoid new index entries when "The update does not modify any columns referenced
  by the table's indexes" and there is "sufficient free space on the page"; lowering
  fillfactor helps ([HOT updates](https://www.postgresql.org/docs/current/storage-hot.html)).
- Postgres Changes delivers each change to every allowed subscriber, and the free plan has 2M
  Realtime messages/month (§6).
- Presence is not stored and is meant for slow-changing state (§6).

**Options:**
1. **Column on the active session row** (e.g. "last heartbeat at").
2. **Separate small table**, one row per user, **not** added to the Realtime publication.
3. **No server storage** (Presence or browser storage only).

**Inference — rough cost** (assumptions: 50 active users, 4 h of studying per day, heartbeat
every 60 s, 5 other members watching each user):
- Updates: 50 × 240 = 12,000 small updates/day — trivial for Postgres either way.
- Option 1: each update is also a Postgres Change to ~5 subscribers ≈ 60,000 messages/day ≈
  **1.8M/month — close to the 2M free limit** for this example alone.
- Option 2: no Realtime messages; with no index on the timestamp column, updates can be HOT.
- Option 3: does not survive closing the browser or switching devices; ADR-0007 says the app
  "tells the server", so it does not fit.

**Proposed: option 2**, a separate per-user heartbeat table outside the Realtime
publication; start with a **60 s** interval and tune it (#1). → OPEN_QUESTIONS #16, #1.

---

## 9. Local development and migrations (Supabase CLI)

**Sourced:**
- Latest stable CLI **v3.2.0 (2026-11-16)**; v4.0.0-next and v3.3.0 betas exist
  ([CLI releases](https://github.com/supabase/cli/releases/latest)). Via npm it needs
  "Node.js 20 or later"; on Windows also `scoop install supabase`
  ([getting started](https://supabase.com/docs/guides/local-development/cli/getting-started)).
- Local stack needs "a container runtime"; Docker Desktop is "recommended on Windows and
  Linux"; the native runtime without Docker supports only Linux and macOS
  ([local development](https://supabase.com/docs/guides/local-development)).
- Local stack includes Postgres, Auth, Storage, Realtime path and Studio (`localhost:54323`).
- Migrations: `supabase migration new`, `supabase db diff`, `supabase db reset` (applies
  migrations + `supabase/seed.sql`), `supabase link`, `supabase db push`; "never change the
  remote database directly" ([database migrations](https://supabase.com/docs/guides/deployment/database-migrations)).
- TypeScript types: `supabase gen types typescript`
  ([generating types](https://supabase.com/docs/guides/api/rest/generating-types)).

**Options:**
1. **CLI + local Docker stack** — migrations in git, `db reset` for a clean state, local Auth
   and Realtime, `supabase test db`.
2. **CLI linked to the hosted project only** — migration files and `db push`, no local
   database; tests run against the hosted project (inference: riskier, slower).
3. **Dashboard SQL editor only** — no migration history; breaks `db push` later.

**Proposed: option 1**, with Docker Desktop on Windows. Migrations, seed data and generated
types live in the repo. → OPEN_QUESTIONS #38.

---

## 10. Testing (Vitest, Playwright, RLS)

**Sourced:**
- **Vitest 5.1.1** (17 Nov): "reads your `vite.config.*` by default"; "requires Vite >=v6.4.0
  and Node >=v22.12.0" ([releases](https://github.com/vitest-dev/vitest/releases),
  [guide](https://vitest.dev/guide/)).
- **Playwright 1.65.1** (13 Nov): Chromium, WebKit, Firefox on Windows, Linux, macOS; Windows
  11+; Node "latest 22.x, 24.x or 26.x" ([releases](https://github.com/microsoft/playwright/releases),
  [intro](https://playwright.dev/docs/intro)).
- Supabase database tests: SQL files in `supabase/tests/database`, run with `supabase test db`
  using **pgTAP**, which "tests database structure, Row Level Security (RLS) policies,
  functions…"; "Use begin and rollback to ensure test isolation"
  ([database testing](https://supabase.com/docs/guides/database/testing),
  [testing overview](https://supabase.com/docs/guides/local-development/testing/overview)).
- Application-level tests "check your policies end to end, through the same client your app
  uses" ([testing overview](https://supabase.com/docs/guides/local-development/testing/overview)).
- **supabase-test-helpers**: `tests.create_supabase_user`, `tests.authenticate_as`,
  `tests.rls_enabled`, `tests.freeze_time`…; MIT; installed via dbdev (version 0.0.6 in
  Supabase's guide); 25 commits, no releases; last commit date **[not verified]**
  ([repo](https://github.com/usebasejump/supabase-test-helpers),
  [pgTAP extended](https://supabase.com/docs/guides/local-development/testing/pgtap-extended)).

**Options for RLS testing:**
1. **pgTAP** with `supabase test db` (SQL tests, can impersonate users).
2. **pgTAP + supabase-test-helpers** (easier user creation and switching; small project,
   maintenance unclear).
3. **Vitest integration tests via supabase-js** against the local stack (tests what the app
   really sees, including Realtime).

**Proposed:** Vitest for `domain/` unit tests; Playwright for a few critical flows; **pgTAP
for RLS and constraints** (option 1, adding the helpers only if plain pgTAP becomes tedious);
plus **a few supabase-js integration tests** for the time-only visibility rule (option 3).
Node version: Vitest needs ≥ 22.12 and Playwright supports 22/24/26 — choose one in Phase 1
setup. → OPEN_QUESTIONS #39.

---

## Summary of Proposed recommendations

| # | Topic | Proposed | OPEN_QUESTIONS |
| --- | --- | --- | --- |
| 1 | i18n | i18next + react-i18next | #7 |
| 2 | Router | TanStack Router (alt: React Router declarative) | #33 |
| 3 | Charts | Recharts; custom grid for a heatmap | #34 |
| 4 | Hosting | Cloudflare Workers static assets (alt: Vercel Hobby) | #9 |
| 5 | Overlap constraint | EXCLUDE USING GIST + btree_gist; verify availability first | #35 |
| 6 | Realtime | Private channels for room Presence; free plan enough | #36, #15 |
| 7 | Time-only visibility | Table split; `security_invoker` views only | #37 |
| 8 | Heartbeat | Separate per-user table outside Realtime; 60 s to start | #16, #1 |
| 9 | Local dev | Supabase CLI + Docker Desktop; migrations in git | #38 |
| 10 | Testing | Vitest + Playwright + pgTAP + a few supabase-js RLS tests | #39 |
