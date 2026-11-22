# 012 — Roadmap

Date: 2026-11-23

(Translated to English from the user's Turkish prompt.)

> Start the roadmap task. Output: `docs/ROADMAP.md`. Do not write code.
>
> Phase order (Accepted):
> 1. Core: setup and the start-of-Phase-1 checks (btree_gist, pgcrypto, publishable key,
>    Node version #41, Turkish support of the fonts), sign-in/sign-up, timer (Pomodoro +
>    free), sessions, courses and tasks.
> 2. Tracking: statistics, goals, streak, study calendar, session history and editing /
>    manual entry.
> 3. Rooms: creating, joining by link and the invite screen, Presence and live status, room
>    statistics, chat, room settings.
> 4. Karamel: coin ledger, dressing and shop, automatic placement, achievements.
> 5. Polish: first-login flow, notifications, heartbeat and the forgotten timer,
>    accessibility check, going live.
>
> For each phase: scope, what is out of scope, which ADRs it relies on, dependencies,
> acceptance criteria (including the "definition of done" in WORKFLOW.md), tests to write
> (Vitest / pgTAP / Playwright). Split each phase into small tasks; each task should be the
> size of a single Claude Code round.
>
> Phase 0 end check: if anything in OPEN_QUESTIONS still blocks Phase 1, list it.
>
> Rules: rely only on Accepted decisions; if something new is needed, add it to
> OPEN_QUESTIONS as Proposed. Write a report file. Do not commit.
