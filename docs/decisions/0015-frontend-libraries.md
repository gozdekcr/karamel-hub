# ADR-0015: Frontend libraries — i18n, router, charts, validation

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

ADR-0010 left the i18n library open. A router and a chart library were also needed before
Phase 1, and ADR-0002 already names Zod for validating network data in `data/`. Options were compared in [TECH_RESEARCH.md](../TECH_RESEARCH.md) §1–§3 (checked
2026-11-22).

## Decision

- **i18n:** **i18next + react-i18next.** One namespace per feature per language, lazy-loaded
  (ADR-0010); translation keys are type-checked through i18next's TypeScript type
  augmentation.
- **Router:** **React Router in declarative mode.** (The research proposed TanStack Router;
  the user chose React Router.) Declarative mode because data loading is done by TanStack
  Query (ADR-0009), not by router loaders.
- **Charts:** **Recharts** for bar and line charts. If the calendar heatmap (OPEN_QUESTIONS
  #25) is accepted, it is built as a small custom grid rather than with a second library.
- **Validation:** **Zod.** Data from the network is validated in `data/` before it reaches
  `domain/` (ADR-0002); route params are validated the same way (see Consequences).

Exact versions are pinned when the project is set up in Phase 1. Versions seen during
research: i18next 27.2.4, react-i18next 18.0.3, React Router 8.5.2, Recharts 3.11.0. The Zod
version was not checked in the research.

## Alternatives considered

- **react-intl (FormatJS)** — ICU and native TypeScript, but no documented per-feature
  namespaces.
- **Lingui** — requires an extract + compile step; no namespaces.
- **TanStack Router** — type-safe routes and documented TanStack Query integration; not chosen.
- **React Router data or framework mode** — router loaders would duplicate TanStack Query;
  framework mode also adds a Vite plugin and server-oriented features.
- **Chart.js + react-chartjs-2** — canvas rendering, styling only through options.
- **Nivo** — has a calendar chart, but slower release activity and TypeScript support not
  verified.

## Consequences

- i18next releases very often (about 10 releases in 13 days during research): pin versions
  and upgrade on purpose. i18next's docs and README disagree on supported TypeScript versions;
  check when setting up.
- React Router's generated route types exist only in its framework mode; in declarative
  mode, route params are not type-checked by the router, so `data/` and `features/` validate
  them with Zod (ADR-0002).
- Chart axis labels and tooltips must use `Intl` formatting for the current locale (ADR-0010).

## Open points

- None.
