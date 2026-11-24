# 015 — Scaffold (v2)

Date: 2026-11-24 · Prompt: [`../prompts/015-scaffold-v2.md`](../prompts/015-scaffold-v2.md) · Previous round: [`015-scaffold.md`](015-scaffold.md)

## 1. Files created or changed

- `.github/workflows/ci.yml` — **new**: on every push and pull request, Node 26, `npm ci`,
  then typecheck, lint, Vitest, build. Read-only permission (`contents: read`); a newer
  run on the same branch cancels the older one. No Playwright.
- `docs/decisions/0032-lint-oxlint.md` — **new, Accepted**: stay on TypeScript 7 with
  oxlint; ESLint revisited later.
- `docs/OPEN_QUESTIONS.md` — new **#82**: switch to ESLint (eslint-plugin-boundaries) and a
  hardcoded-text rule (eslint-plugin-i18next) when typescript-eslint supports TypeScript 7.
- `docs/CURRENT_STATE.md` — "Gamification later" (later cats' art is on the user's
  computer, not in the repo); tech list (oxlint, ADR-0032, #82, CI); ADR-0032 in the table.
- `docs/GAMIFICATION.md` — later cats' art: on the user's computer, deliberately not in the
  repo (ADR-0028).
- `docs/ARCHITECTURE.md` §2 — lint tool with ADR-0032 and #82.
- `docs/decisions/README.md` — ADR-0032 listed.
- `docs/prompts/015-scaffold-v2.md` (with the two messages sent during the task), this
  report.

No code or lint configuration changed: the oxlint setup of round 1 stays.

## 2. What was done, with evidence

### ESLint with TypeScript 7: does not work (the user's stop condition)

| Check | Result |
| --- | --- |
| `typescript-eslint` peer range (`npm view`) | latest 8.74.0 and canary 8.74.1-alpha.0: `typescript >=4.8.4 <6.1.0` |
| `typescript` 7.0.2 JS API (`node -e "require('typescript')"`) | 2 exports; `createProgram` is `undefined`; `package.json` exports only `./lib/version.cjs` and `./unstable/*` |
| eslint-plugin-boundaries 7.4.4, eslint-plugin-i18next 6.1.5 | No TypeScript requirement of their own, but they need a TypeScript parser in ESLint, which is typescript-eslint |

Work stopped there, as asked. The user chose to stay on TypeScript 7 + oxlint (ADR-0032).

### CI steps run locally, in the workflow's order

| Step | Result |
| --- | --- |
| `npm ci` | exit 0, "found 0 vulnerabilities" (after the user closed a running dev server, see §4) |
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 |
| `npm test` | 3 files, 8/8 passed |
| `npm run build` | exit 0 (the `dist/` folder was deleted afterwards) |

The lockfile contains the Linux x64 packages that `npm ci` needs on the GitHub runner:
`@typescript/typescript-linux-x64`, `@oxlint/binding-linux-x64-gnu`,
`@rolldown/binding-linux-x64-gnu`, `@supabase/cli-linux-x64`, `lightningcss-linux-x64-gnu`.
Action versions: `actions/checkout@v7` and `actions/setup-node@v7` are the latest major
tags (`git ls-remote --tags`).

### NOT done or NOT verified

- **The workflow has not run on GitHub** (that needs a push). It will run on the first push.
- oxlint's JS plugin support (running ESLint plugins inside oxlint) was not tried.
- Nothing was committed.

## 3. Contradictions, ambiguities and interpretations

- **ADR-0028** (committed) still says the four later cats are "in the assets README"; the
  README does not list them. ADR not edited; the current documents now say where the art is.
- **CI on every push** runs on all branches, as asked; it runs twice for a pull request
  from a branch in the same repo (push + pull_request). Accepted as asked.

## 4. Incident during the task

The first `npm ci` failed with `EPERM` because a running Vite dev server (`npm run dev`)
held a file in `node_modules`; `node_modules` was left half deleted. The user closed the
server, and the second `npm ci` succeeded. On Windows, stop the dev server before `npm ci`.

## 5. Suggestions (out of scope)

- Add Playwright to CI when the end-to-end tests start to cover sign-in (P1-05).
