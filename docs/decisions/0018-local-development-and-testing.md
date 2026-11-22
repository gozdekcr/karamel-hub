# ADR-0018: Local development, migrations and testing

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Backend logic lives in the database (ADR-0001), and the definition of done requires tests
(WORKFLOW.md). Research: [TECH_RESEARCH.md](../TECH_RESEARCH.md) §9–§10.

## Decision

- **Local development:** Supabase CLI with the local stack, using **Docker Desktop on
  Windows**. Migrations, seed data (`supabase/seed.sql`) and generated TypeScript types are
  kept in git. **The hosted database is never changed directly**; changes go through
  migrations.
- **Testing:**
  - **Vitest** for unit tests of `domain/` (ADR-0002).
  - **Playwright** for a few critical end-to-end flows.
  - **pgTAP** via `supabase test db` for RLS policies, constraints and database functions.
    supabase-test-helpers are added only if plain pgTAP becomes tedious.
  - **A few supabase-js integration tests** against the local stack for the time-only
    visibility rule (ADR-0006, ADR-0016).

Versions seen during research: Supabase CLI 3.2.0, Vitest 5.1.1, Playwright 1.65.1.

## Alternatives considered

- **CLI linked to the hosted project only** — no local database; tests would run against the
  hosted project.
- **Dashboard SQL editor only** — no migration history; breaks `db push` later.
- **Only application-level RLS tests** — slower and less precise than SQL tests.

## Consequences

- Docker Desktop must be installed and running for local development.
- Vitest requires Node ≥ 22.12 and Vite ≥ 6.4; Playwright supports Node 22, 24 and 26 — the
  Node version is chosen at setup (OPEN_QUESTIONS #41).
- CI can run `supabase start` and `supabase test db`.

## Open points

- Node.js version (OPEN_QUESTIONS #41).
