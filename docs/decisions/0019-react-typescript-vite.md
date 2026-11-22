# ADR-0019: React, TypeScript and Vite

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

The product brief names React, TypeScript and Vite as the technology direction, and several
accepted decisions already assume them: the `domain/` · `data/` · `features/` layering in
TypeScript (ADR-0002), TanStack Query (ADR-0009), react-i18next, React Router and Recharts
(ADR-0015), and Vitest, which reuses the Vite configuration (ADR-0018). The app is a
desktop-browser single-page app that talks directly to Supabase (ADR-0001); no server
rendering is needed.

## Decision

- **UI library:** React.
- **Language:** TypeScript for all application code, including `domain/` (ADR-0002).
- **Build tool and dev server:** Vite.
- The app is a **client-rendered single-page app** (no server-side rendering).

Exact versions are pinned when the project is set up in Phase 1. They were not checked in
the technical research.

## Alternatives considered

- **A meta-framework with server rendering (e.g. Next.js, React Router framework mode)** —
  adds a server layer the app does not need; backend logic lives in the database (ADR-0001),
  and data loading is in TanStack Query (ADR-0009, ADR-0015).
- **Another UI library (e.g. Vue, Svelte)** — the accepted libraries (react-i18next, React
  Router, Recharts, TanStack Query for React) and the brief are React-based.
- **JavaScript without TypeScript** — loses the type safety that ADR-0002 and typed i18n keys
  (ADR-0015) rely on.

## Consequences

- Version constraints found in research must be met at setup: Vitest needs Vite ≥ 6.4 and
  Node ≥ 22.12 (ADR-0018); react-i18next needs React ≥ 18 (ADR-0015).
- i18next's docs and README disagree on supported TypeScript versions; check when choosing
  the TypeScript version (ADR-0015).
- Hosting only needs to serve static files with an SPA fallback (OPEN_QUESTIONS #9).

## Open points

- Node.js version (OPEN_QUESTIONS #41).
