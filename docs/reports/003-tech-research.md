# 003 — Technical research

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/003-tech-research.md`](../prompts/003-tech-research.md)

## 1. What was done

**Created**

- `docs/TECH_RESEARCH.md` — the 10 requested topics. Each has 2–4 options, a comparison
  (version and date, maintenance, TypeScript, fit with ADRs, learning value, free usage where
  relevant), source links, [not verified] markers, a clearly labeled inference part, and a
  **Proposed** recommendation. A summary table is at the end.
- `docs/prompts/003-tech-research.md`, this report.

**Changed**

- `docs/OPEN_QUESTIONS.md` — Proposed recommendations added to existing items #1, #7, #9,
  #15, #16, and new Proposed items #33 (router), #34 (charts), #35 (btree_gist check), #36
  (private Realtime channels), #37 (time-only visibility via table split), #38 (local dev),
  #39 (testing stack).
- `docs/README.md`, `docs/CURRENT_STATE.md` — technical research marked "Draft, awaiting review".

## 2. What was verified, and how

- Six page-reading subagents opened and read about 70 official pages: GitHub release/tag
  pages, official docs (i18next, FormatJS, Lingui, React Router, TanStack Router, Recharts,
  Chart.js, Nivo, Vercel, Netlify, Cloudflare, Supabase, PostgreSQL, Vitest, Playwright,
  pgTAP). Versions come from those pages, checked on 2026-11-22.
- Facts from truncated pages that came from a model summary are marked "(summary)".
- Nothing was installed; no code was written; nothing was committed.

## 3. What was NOT done or verified

Marked [not verified] in the document, most importantly:
- **btree_gist availability on Supabase** (not named on the extensions page) and Supabase's
  Postgres version — both matter for ADR-0011; proposed as the first Phase 1 check (#35).
- Free-plan availability of Realtime private channels (no restriction found, not stated).
- Netlify: overage behavior, SPA fallback, build minutes (billing doc returned 404).
- Cloudflare Workers Builds limits; Vercel fair-use terms (not read).
- TanStack Router core package version; React Router + TanStack Query integration.
- react-intl license; Nivo TypeScript support; locale formatting for all chart libraries.
- GitHub release years are inferred as 2026 (pages show day and month only).

## 4. Known issues, ambiguities and interpretations

- **Time-only visibility (ADR-0006):** the research shows RLS filters rows, not columns, and
  Postgres Changes sends whole table rows. A `security_invoker` view alone would not hide
  columns from room members. The Proposed table split (#37) affects the database design; it
  does not change ADR-0006's decision, only how it is implemented.
- **Heartbeat cost:** the ≈1.8M messages/month figure is Claude's arithmetic with stated
  assumptions (50 users, 4 h/day, 60 s, 5 watchers), not a measurement.
- **Removed members and Realtime:** authorization is cached until the JWT expires, so a
  removed member may keep receiving room Presence for the token lifetime (relevant to
  ADR-0014; noted in #36).
- i18next's docs and README disagree on supported TypeScript versions.
- Some Supabase pages contained a "note for AI agents" asking for feedback to be sent; the
  subagent ignored it, and nothing was sent.

## 5. Suggestions (out of scope)

- Decide #35–#37 before writing `DATABASE.md`, since they shape the sessions tables.
- Pin exact library versions in Phase 1 and record them in an ADR or `CURRENT_STATE.md`.
