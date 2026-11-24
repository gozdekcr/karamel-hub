# 015 — Scaffold (v2)

Date: 2026-11-24

(Translated to English from the user's Turkish prompt.)

> - Lint: let's switch to ESLint. First verify that the plugins for the folder import rules
>   (e.g. eslint-plugin-boundaries) and for the rule that catches text written in JSX
>   instead of a translation key (e.g. eslint-plugin-i18next) work with TypeScript 7 and
>   Vite 8. If they work, switch; remove the oxlint workarounds (one block per feature +
>   the check test). If they don't work, stop and tell me.
> - TypeScript 7 and Vite 8: accepted.
> - Cat images: I deliberately did not add the other 4 cats to the repo; they are on my
>   computer (ADR-0028). Fix CURRENT_STATE.md and GAMIFICATION.md accordingly.
> - GitHub Actions: accepted. On every push and pull request run typecheck, lint, Vitest and
>   build (Playwright not needed for now).
> - Do not commit; present the report.

Messages sent during the task (translated):

> [After being told that the ESLint plugins do not work with TypeScript 7 and that a dev
> server blocked `npm ci`] I closed the server, continue.

> Lint: we stay on TypeScript 7 + oxlint (option b). Record this with the decisions; when
> typescript-eslint supports TypeScript 7, re-evaluate the switch to ESLint and the
> "hardcoded text" rule (add it to OPEN_QUESTIONS).
