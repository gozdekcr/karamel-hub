# 011 — Architecture overview

Date: 2026-11-23

(Translated to English from the user's Turkish prompt.)

> Start the architecture overview task. Output: `docs/ARCHITECTURE.md`. Do not write code,
> do not make new decisions.
>
> Content:
> 1. System diagram (Mermaid): Browser (React SPA) ↔ Supabase (Auth, PostgreSQL,
>    Realtime); which data travels on which path.
> 2. Layers: `domain/`, `data/`, `features/` — the responsibility of each and what it may
>    not import.
> 3. Data path of the main flows (sequence diagrams): start/end session → coins and
>    achievements; live status in a room (Presence + active session); buying and equipping
>    an item; joining a room by link.
> 4. "Where is it calculated" table: each calculation (duration, coins, streak, room
>    total/shared time, item placement) — in SQL or in TS, according to which ADR.
> 5. Proposed folder structure for Phase 1 (Proposed): `src/`, `supabase/migrations/`,
>    tests, where the assets will move.
> 6. Decision map: a one-line summary of each ADR and which section it affects.
>
> Rules: rely only on Accepted ADRs and existing documents. If you find contradictions
> between documents, do not fix them; list them in the report. If something new is needed,
> add it to OPEN_QUESTIONS as Proposed. Write a report file. Do not commit.
