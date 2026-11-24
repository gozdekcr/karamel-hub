# ADR-0030: Phase 1 environment — Node.js, Supabase CLI, hosted project from Phase 1

- **Status:** Accepted
- **Date:** 2026-11-24

## Context

Task P1-01 (ROADMAP.md) asked the user for the Node.js version (OPEN_QUESTIONS #41) and
for where the app runs with real data (#78). Report: [`../reports/013-phase-1-start-checks.md`](../reports/013-phase-1-start-checks.md).

Facts checked on 2026-11-24 (sources in the report):

- Node.js release schedule: Node 26 is **Active LTS** (end of life 2029-04-30); Node 24 is
  **Maintenance LTS** (end of life 2028-04-30). Latest: 26.13.1, 24.22.3.
- Vitest needs Node ≥ 22.12; Playwright supports Node 22, 24 and 26 (ADR-0018). The
  Supabase CLI needs Node 20 or later when run through npm/npx.
- The Supabase docs list three ways to install the CLI on Windows: Scoop (global), a
  project dev dependency (`npm install supabase --save-dev`), or `npx`. A global npm
  install is not documented.

## Decision

Decided by the user in task 013:

1. **Node.js 26 (LTS)** for development and CI (resolves #41).
2. **Supabase CLI as a project dev dependency** (npm), so its version is pinned in
   `package.json` and run with `npx supabase …`. Added in P1-02. Version seen in P1-01:
   3.3.0.
3. **A hosted Supabase project is used from Phase 1**, and the user's friends can use the
   app from Phase 1 (resolves #78; the Proposed "local stack only for Phases 1–2" was not
   accepted).
4. **The frontend hosting decision (#9) is brought forward** from the release stage to
   Phase 1: **Cloudflare Workers with static assets** (task 013-v2; the research proposal
   in TECH_RESEARCH.md §4). The Cloudflare account is created by the user.

Unchanged: local development and tests run on the local stack (ADR-0018); the hosted
database is changed only through migrations; creating the hosted project and any
deployment needs the user's explicit permission, and the user creates the accounts.

## Alternatives considered

- **Node 24** — already installed, but in maintenance and with a shorter support window.
- **Supabase CLI with Scoop** — a global command, but the version is not pinned per
  project and Scoop must be installed first.
- **Local stack only for Phases 1–2** (#78 proposal) — friends could not use the app until
  hosting.
- **Vercel Hobby** for the frontend (TECH_RESEARCH.md §4) — a monthly transfer cap that
  cannot be exceeded on the free plan; Cloudflare serves static assets without a request
  limit.

## Consequences

- The user installs Node 26 before P1-02 (steps in the report). Done: v26.13.1 with npm
  11.20.0, checked in task 013-v3.
- Data on the hosted project is real from the first sign-up: migrations must keep data;
  the hosted database is never reset.
- The SECURITY.md §3.4 setup checks (Realtime public access off, email confirmation off,
  JWT 1 hour, publishable key only) apply when the hosted project is created, not in
  Phase 5.
- The former ROADMAP.md tasks P5-05 (hosting and deployment) and parts of P5-06 move into Phase 1:
  new tasks **P1-03b Hosted project** and **P1-14 Deployment** (#79, accepted in task
  013-v2). Before each `db push`, the hosted data is dumped (`supabase db dump
  --data-only`, tested in P1-03b) to a git-ignored folder.
- Who can sign up while friends use the app: ADR-0031.
- `btree_gist` and `pgcrypto` were verified on the local stack only; they must be verified
  again on the hosted project when it is created.

## Open points

None.
