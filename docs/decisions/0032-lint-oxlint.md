# ADR-0032: Lint with oxlint while the project uses TypeScript 7

- **Status:** Accepted
- **Date:** 2026-11-24

## Context

P1-02 (task 015) set up the project with **TypeScript 7.0.2** and **Vite 8**, the versions
of the current Vite template (accepted by the user in task 015-v2), and linted it with
**oxlint**, the template's linter. ADR-0029 asks for a lint rule that enforces the import
rules between folders.

In task 015-v2 the user asked to switch to ESLint, with eslint-plugin-boundaries (folder
import rules) and eslint-plugin-i18next (text written in JSX instead of a translation key),
if they work with TypeScript 7. Checked on 2026-11-24:

- ESLint needs `typescript-eslint` to read TypeScript. Its latest (8.74.0), canary
  (8.74.1-alpha.0) and other published tags declare `typescript: >=4.8.4 <6.1.0`
  (`npm view … peerDependencies`).
- The `typescript` 7.0.2 package no longer exposes the JavaScript compiler API that
  typescript-eslint uses: `require('typescript').createProgram` is `undefined`; the package
  exports only its version and `unstable/*` APIs.
- oxlint has its own parser and works with TypeScript 7: `no-restricted-imports` with
  `regex` and `group` patterns enforces the import rules (verified with rule-breaking files
  in task 015). Its regex has no look-ahead, and an override replaces a rule's options.

## Decision

Decided by the user in task 015-v2:

- **Stay on TypeScript 7 and lint with oxlint.**
- The import rules use the **`@/` alias** for imports that leave the current folder (no
  `../`), and `.oxlintrc.json` has **one block per feature** that forbids other features;
  `src/architecture.test.ts` fails if a feature folder has no block (ARCHITECTURE.md §2).
- **Revisit** the switch to ESLint (eslint-plugin-boundaries) and a rule against hardcoded
  UI text (eslint-plugin-i18next) **when typescript-eslint supports TypeScript 7**
  (OPEN_QUESTIONS #82).

## Alternatives considered

- **TypeScript 6.0 + ESLint** with eslint-plugin-boundaries and eslint-plugin-i18next —
  works with typescript-eslint today, but goes back from the version the user accepted.
- **oxlint JS plugins** (running ESLint plugins inside oxlint) — not verified in this task.

## Consequences

- No automatic check for hardcoded UI text yet: ADR-0010 is enforced by review, the
  TR/EN key-parity test and typed translation keys.
- Adding a feature folder means adding its block to `.oxlintrc.json` (the test reminds).
- The CI workflow (`.github/workflows/ci.yml`) runs `npm run lint` (oxlint).

## Open points

- OPEN_QUESTIONS #82.
