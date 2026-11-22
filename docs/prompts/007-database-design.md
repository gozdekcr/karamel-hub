# 007 — Database design

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> Start task 007, database design.
>
> Output: `docs/DATABASE.md`. Do not write SQL or migrations; it should be a design
> document.
>
> Content:
> 1. Tables: for each table, the columns (name, type, nullable or not), its purpose and
>    which ADR it is based on. Including the catalog tables (cats, items, achievements) and
>    how they are loaded by migrations.
> 2. Relationship diagram: a Mermaid ER diagram.
> 3. Constraints: one active session, sessions never overlap, each reward granted once,
>    one item per slot, etc. Which rule each one protects.
> 4. Access table (RLS): for each table, who can read, insert, update and delete it (self /
>    roommate / owner / nobody). Do not write policy text, only the table.
> 5. Database functions: ending a session (coins, cats, achievements), editing a session
>    (correction entry), buying an item, joining a room by link, regenerating the link, role
>    operations. For each one: inputs, what it does, which rules it checks.
> 6. Realtime: which tables are connected to Realtime, and which are deliberately not.
> 7. Computed values: streak, statistics, balance and room totals; where and how they are
>    calculated.
>
> Rules:
> - Rely only on Accepted ADRs and CURRENT_STATE.md. If a new decision is needed, add it to
>   OPEN_QUESTIONS.md as Proposed.
> - Leave security details (vulnerability analysis, attack scenarios) to SECURITY.md; here
>   only the access table.
> - Write a report file. Do not commit.
