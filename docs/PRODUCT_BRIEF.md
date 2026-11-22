# Product brief (user context)

> This is the user's original idea, kept as context. Do not rewrite it. Later decisions
> in `CURRENT_STATE.md` and Accepted ADRs take priority where they differ
> (for example, the app is now multi-user, not only for two people).

## Idea

Karamel-hub started as a private study & productivity app for two people on different
computers and networks: follow each other's study status, record individual progress and
study together. It was then widened: anyone can use it alone or in study rooms.

## Core features

- Pomodoro and free study timer
- Course and task management
- Daily/weekly study goals, streak system
- Weekly and monthly statistics, charts
- Realtime online/offline and studying status
- Shared study room and shared study time calculation
- Simple messaging

## Gamification

A cat-collection system where studying earns rewards:

- Unlock different cat species through study milestones and streaks
- Cat collection screen
- Earning coins and a shop
- Dressing cats with hats, outfits, glasses, accessories, etc.
- Achievements and special rewards
- Later: a cat room and decoration

Cats and cosmetic items are permanent. Breaking a streak never removes collected cats.

## Technology direction (from the brief, not final)

React, TypeScript, Vite, Supabase (Auth, PostgreSQL, Realtime), Zod, Recharts, Vitest,
Playwright.

## How the user wants to build it

Documentation-first, modular, testable and incremental. The goal is not only a working
app but understanding its architecture: decisions are discussed with their reasons,
unnecessary complexity is avoided, and nothing is final until the user approves it.
