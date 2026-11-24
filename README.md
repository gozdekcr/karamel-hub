# Karamel-hub

A study & productivity web app for studying alone or together. Track your study time with
a Pomodoro or free timer, manage courses and tasks, keep a streak, and join persistent
study rooms that anyone with the invite link can join. Studying earns coins and unlocks cats
you can collect and dress up.

**Status:** Phase 1 — Core. The project scaffold exists; features come next
([docs/ROADMAP.md](docs/ROADMAP.md)).

Start with [docs/README.md](docs/README.md).

## Development

Requires Node.js 26 (ADR-0030).

```sh
npm install                       # install dependencies
npx playwright install chromium   # once: the browser for end-to-end tests
npm run dev                       # start the app at http://localhost:5173
npm run typecheck                 # TypeScript
npm run lint                      # oxlint, including the import rules
npm test                          # Vitest unit tests
npm run test:e2e                  # Playwright end-to-end tests
```

## License

The code is licensed under the [MIT License](LICENSE).

The images under [`public/art/`](public/art/) (formerly `docs/assets/`; specification in
[`docs/assets/README.md`](docs/assets/README.md)) are **not** covered by the MIT License.
Copyright (c) 2026 Gözde Kacar. All rights reserved. The images were generated with
Google Gemini.
