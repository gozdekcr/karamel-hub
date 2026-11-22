# ADR-0008: Coin ledger and server-side rewards

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Studying earns coins; coins buy items. Rewards must not be granted twice (e.g. two open
tabs finishing the same session). Cheating is not a goal; consistency is.

## Decision

- Coins are a **ledger**: a `coin_transactions` table (+50 for a session, −120 for a hat).
  Balance = sum of transactions. No mutable balance column.
- Rewards are granted by **database functions** (for example, when a session ends), not by
  the client. The reason is consistency and idempotency, not anti-cheat.
- A **unique constraint** guarantees that an achievement is granted at most once per user.
- Unlocked cats and items are stored as permanent grants. They are never recomputed from
  streaks, so breaking a streak never removes them.

## Alternatives considered

- **Balance column updated by the client** — simple, but double grants and lost updates are
  easy, and "where did this coin come from?" has no answer.

## Consequences

- Every coin change is explainable and reversible.
- Reward rules may exist both in TypeScript (for tests/preview) and in SQL. How to avoid
  duplicating them is decided in the gamification design.

## Open points

- The whole gamification design: resolved by [ADR-0020](0020-cat-unlocks.md) (cat unlocks),
  [ADR-0021](0021-coin-economy-and-shop.md) (economy, shop, achievements) and
  [ADR-0022](0022-streak-definition.md) (streak); details in `GAMIFICATION.md`.
- How rewards react to session edits: resolved by ADR-0021.
- Reward rules in both TypeScript and SQL: deferred to the database stage
  (OPEN_QUESTIONS #42).
