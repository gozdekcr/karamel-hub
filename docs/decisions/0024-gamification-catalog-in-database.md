# ADR-0024: Gamification catalog and reward calculations in the database

- **Status:** Accepted
- **Date:** 2026-11-22
- **Supersedes the streak/reward part of ADR-0002**

## Context

Rewards are granted by database functions (ADR-0008), while the UI also needs the same
values (cat thresholds, item prices, achievement conditions) to show progress and the shop.
ADR-0008 asked how to avoid writing the reward rules in both TypeScript and SQL
(OPEN_QUESTIONS #42). The values are in ADR-0020 and ADR-0021.

## Decision

- The **catalog** — cat unlock thresholds, items (slot, tier, price) and achievement
  conditions and coins — lives in the **database**, in **catalog tables loaded by
  migrations** (ADR-0018).
- The **TypeScript side reads the catalog from the database**; it does not keep its own
  copy of these values.
- Catalog entries are identified by keys; their names are translations (ADR-0010).
- **Calculations that affect rewards** (the coin formula, the streak) exist **only in
  SQL**. The UI reads their results from the database.
- **Display-only calculations** (charts, room shared time) are done in **TypeScript**.
- **Exceptions — the same logic in both TypeScript and SQL:**
  - the live coin display of an active session may repeat `minutes ÷ 2` in TypeScript;
  - **room shared time** (ADR-0005) is shown by TypeScript and also calculated in SQL,
    because the "Better together" achievement (ADR-0021) grants coins from it.

  For each exception, the **same test cases run in both Vitest and pgTAP** (ADR-0018), so
  the two copies cannot drift apart unnoticed.

## Alternatives considered

- **Catalog as TypeScript constants, duplicated in SQL** — two copies that can drift apart.
- **Catalog only in TypeScript, sent to the database by the client** — rewards are granted
  by the database (ADR-0008), so the database must own the values.
- **Reward logic in both TypeScript and SQL** — two implementations of the same rule.

## Consequences

- Changing a price or a threshold is a migration, reviewed like any other schema change.
- The ledger stores the amount of each entry (ADR-0008), so a later price change does not
  change past purchases or rewards.
- Catalog tables are read-only for users and readable by every signed-in user (RLS).
- The streak shown in the UI comes from the database, not from a TypeScript calculation.

## Open points

- None.
