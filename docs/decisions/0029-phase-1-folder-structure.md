# ADR-0029: Phase 1 folder structure and shared test cases

- **Status:** Accepted
- **Date:** 2026-11-23
- **Extends ADR-0002**

## Context

ADR-0002 defines the `domain/` · `data/` · `features/` layers but not the rest of the
project tree, and has no place for the app shell or shared presentational components.
ADR-0018 sets the tools (Supabase CLI, Vitest, Playwright, pgTAP), and ADR-0024 requires
the same test cases to run in Vitest and pgTAP for its two exceptions (`minutes ÷ 2`, room
shared time). The art lives in `docs/assets/` (ADR-0028). Proposed in
[ARCHITECTURE.md](../ARCHITECTURE.md) §5 (OPEN_QUESTIONS #76, #77).

## Decision

### Folder structure

```
karamel-hub/
├── docs/                 # Phase 0 documents; docs/assets/README.md stays as the art spec
├── public/art/           # images moved from docs/assets/ (cats/, items/head/, items/neck/)
├── src/
│   ├── app/              # entry, providers (TanStack Query, i18n), router, layout
│   ├── domain/           # pure TS (ADR-0002); unit tests next to files (*.test.ts)
│   ├── data/             # Supabase client, queries, RPC, Realtime, Zod schemas
│   ├── features/         # one folder per feature
│   ├── shared/ui/        # shared presentational components
│   └── locales/{tr,en}/  # one file per feature namespace (ADR-0010)
├── supabase/
│   ├── migrations/       # schema, RLS, functions, catalog data
│   ├── seed.sql          # local development data only
│   └── tests/            # pgTAP
├── tests/
│   ├── integration/      # supabase-js RLS tests
│   └── shared-cases/     # cases shared by Vitest and pgTAP
├── e2e/                  # Playwright
└── tools/                # scripts (cat landmarks, hood openings, pgTAP generation)
```

- **`src/app/`** holds the entry point, providers, router and the layout (menu, timer
  strip). It may import every layer.
- **`src/shared/ui/`** holds presentational components (card, ring, button) with no data
  access: it imports nothing from `data/` or `features/`. Features may import it.
- **Features do not import each other's internals.**
- `domain/` also holds the item placement math (ADR-0028) and the live coin display
  (`minutes ÷ 2`, ADR-0024).
- **Art** moves from `docs/assets/` to `public/art/`, so file names stay the catalog keys
  at runtime; `docs/assets/README.md` stays in `docs/` as the specification.

### Shared test cases (ADR-0024 exceptions)

- The cases live in **one data file** in `tests/shared-cases/`.
- **Vitest reads the file directly.**
- **A script in `tools/` generates the pgTAP test** from the same file, so both
  implementations are checked against the same cases.

## Alternatives considered

- **Shared components inside a feature** — other features would import that feature's
  internals.
- **Art kept in `docs/assets/`** — documentation and runtime files would be mixed, and the
  app would serve files from the docs folder.
- **Writing the same cases twice (TS and SQL)** — the two lists can drift apart.

## Consequences

- Import rules (ADR-0002 plus the ones above) can be enforced by a lint rule in Phase 1.
- Adding a shared case means editing one file and regenerating the pgTAP test.
- **[not verified]** whether `supabase test db` reads `supabase/tests/` by default; check
  when the project is set up.

## Open points

- None.
