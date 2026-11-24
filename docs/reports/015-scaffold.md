# 015 — Scaffold (P1-02)

Date: 2026-11-24 · Prompt: [`../prompts/015-scaffold.md`](../prompts/015-scaffold.md)

## 1. Files created or changed

**Configuration (repo root)**

- `package.json`, `package-lock.json` — scripts (`dev`, `build`, `preview`, `typecheck`,
  `lint`, `test`, `test:watch`, `test:e2e`), `engines.node >= 26`, exact versions.
- `.npmrc` — `save-exact=true`, so new packages are pinned (ADR-0015).
- `tsconfig.json` + `tsconfig.app.json` (browser code, `strict`, `@/*` → `src/*`) +
  `tsconfig.test.json` (unit tests: app settings plus Node types) + `tsconfig.node.json`
  (config files, `e2e/`, `tests/`).
- `vite.config.ts` — React plugin, `@` alias, port 5173, Vitest settings.
- `playwright.config.ts` — Chromium desktop only, starts `npm run dev`.
- `.oxlintrc.json` — lint, including the import rules.
- `index.html`, `.env.example`; `.gitignore` gains `*.local`, `blob-report/`,
  `*.tsbuildinfo`, `*.log`.

**Source**

- `src/app/` — `main.tsx` (entry), `App.tsx` (providers + router), `QueryProvider.tsx`,
  `i18n.ts` + `language.ts` (+ test) + `i18next.d.ts` (typed keys), `NotFoundPage.tsx`,
  `global.css` (Nunito, headings 800).
- `src/features/home/HomePage.tsx` — placeholder home page.
- `src/locales/{tr,en}/common.json`, `home.json`; `src/locales/locales.test.ts`.
- `src/architecture.test.ts` — each feature has its own lint block.
- `e2e/smoke.spec.ts`.
- `.gitkeep` in `src/domain/`, `src/data/`, `src/shared/ui/`, `tests/integration/`,
  `tests/shared-cases/`, `tools/` (git does not keep empty folders).

**Moved:** the 14 images from `docs/assets/{cats,items}` to `public/art/{cats,items}`
(plain move, not `git mv`, so nothing is staged; git shows them as renames once staged).

**Docs:** `README.md` (status, development commands, license path), `docs/assets/README.md`
(images now in `public/art/`, license path), `docs/CURRENT_STATE.md` (header, pinned
versions, art path), `docs/ARCHITECTURE.md` (how the import rules are enforced;
`supabase test db` verified), `docs/DATABASE.md` and `docs/UI_UX.md` (art path),
`docs/prompts/015-scaffold.md`, this report.

## 2. Folders: what each one is for

| Folder | Purpose |
| --- | --- |
| `src/` | All application code that runs in the browser. |
| `src/app/` | The app's starting point: it starts the app, sets up the providers (TanStack Query, i18n) and the router, and later holds the layout (menu, timer strip). |
| `src/domain/` | Pure TypeScript rules (timer, statistics, placement) that know nothing about React or Supabase, so they can be unit-tested alone. |
| `src/data/` | Everything that talks to Supabase: queries, function calls, Realtime, and Zod checks on incoming data. |
| `src/features/` | One folder per screen area (home, timer, courses, rooms…), each with its own components and hooks. |
| `src/features/home/` | The home page; for now only a placeholder. |
| `src/shared/ui/` | Reusable visual pieces (card, button, ring) that have no data access. |
| `src/locales/` | Translation files: one JSON per feature namespace, with `tr/` and `en/` holding the same keys. |
| `public/` | Files served as they are, without processing (Vite copies them into the build). |
| `public/art/` | Cat and item images; the file name is the catalog key (`/art/items/head/frog-hood.png`). |
| `e2e/` | Playwright tests that open the app in a real browser and click through it. |
| `tests/integration/` | (empty) Later: supabase-js tests that check database permissions from the app's side. |
| `tests/shared-cases/` | (empty) Later: one data file of cases checked by both Vitest and pgTAP (ADR-0029). |
| `tools/` | (empty) Later: helper scripts, e.g. measuring cat images and generating the pgTAP test. |
| `node_modules/` | Installed packages; created by `npm install` and git-ignored. |

`supabase/` is not created here: `supabase init` belongs to P1-03.

## 3. What was done, with evidence

| Check | Result |
| --- | --- |
| `npm run typecheck` (`tsc -b`, TypeScript 7.0.2) | exit 0 |
| `npm run lint` (oxlint 1.95.0) | exit 0, no findings |
| `npm test` (Vitest 5.1.1) | 3 files, **8/8 passed**: language choice (4), TR/EN key parity and no empty texts (3), every feature has a lint block (1) |
| `npm run test:e2e` (Playwright 1.65.1, Chromium) | **4/4 passed**: Turkish home + `<html lang="tr">`, English home + `lang="en"`, not-found page, Nunito loaded at weight 800 |
| `npm run build` | passed; Nunito `latin-ext` font file is in the build (ğ ş İ), no external URLs in the output; TR and EN namespaces are separate small files (lazy) |
| Import rules | Temporary files that broke each rule were linted and then deleted. Caught: React, Supabase and other layers in `domain/`; `features/` and `app/` in `data/`; `data/` in `shared/ui`; another feature and `app/` in a feature; `../` imports. Allowed: `@/domain/…` in `domain/`, a feature's own files |
| Typed translation keys | A temporary file using `t('titel')` failed `tsc` ("Did you mean 'title'?"), then was deleted |
| Supabase CLI | `npx supabase --version` → 3.3.0 (dev dependency, ADR-0030) |
| `npm install` | "found 0 vulnerabilities" |

Facts checked at install time: i18next 27.2.7 and react-i18next 18.0.3 declare TypeScript
`^5 || ^6 || ^7` as supported (`npm view … peerDependencies`), which settles ADR-0015's
"check the TypeScript version" note. React Router 8.5.2 needs Node ≥ 22.22 and React ≥ 19.2.7.

**Not done / not verified**

- No Supabase client, `supabase/` folder or Zod/Recharts/supabase-js packages: not part
  of P1-02 (P1-03, P1-05 and later). `.env.example` already lists the two `VITE_` values.
- No palette or type tokens beyond the font (P1-06).
- Feature folders other than `home/` are created when their tasks come.
- The Playwright Chromium browser was downloaded to the user's Playwright cache
  (`%LOCALAPPDATA%\ms-playwright`), outside the repo.
- Nothing was committed.

## 4. Contradictions, ambiguities and interpretations

- **Lint tool: oxlint instead of ESLint.** No ADR names the lint tool. The current Vite
  template uses oxlint, it has `no-restricted-imports`, and it needs no plugins. Two
  limits found: its regex has no look-ahead, and an override replaces a rule's options.
  Hence the **`@/` import convention** (no `../` across folders) and **one lint block per
  feature** (guarded by `src/architecture.test.ts`). Documented in ARCHITECTURE.md §2;
  the user can ask for ESLint instead.
- **Versions newer than in the research:** TypeScript 7.0 (the template's choice) and
  Vite 8. Both are supported by every package installed.
- **`@types/node` 26** instead of the template's 24, to match Node 26.
- **Language at start:** taken from the browser (`navigator.languages`, Turkish or
  English, English as fallback), as in CURRENT_STATE "Timezone and language". The saved
  setting replaces it in P1-13.
- **Later cats' art:** CURRENT_STATE ("Gamification later") and GAMIFICATION.md say four
  later cats have art in `docs/assets/`, but the repo (and its git history) contains only
  `karamel.png`. Not changed; the user should say where those files are.
- **Task 014 is not committed yet** (README and `docs/assets/README.md` license sections,
  `docs/prompts/014-license-sections.md`); this task edits the same two READMEs.

## 5. Suggestions (out of scope)

- A CI workflow (GitHub Actions) that runs typecheck, lint, Vitest and Playwright.
- A lint rule against hardcoded UI text in JSX (e.g. a check for raw strings), to enforce
  ADR-0010 automatically.
