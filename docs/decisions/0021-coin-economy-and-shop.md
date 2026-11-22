# ADR-0021: Coin economy and shop

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

ADR-0008 made coins a ledger granted by database functions, but left the economy, the
shop and the reaction to session edits open (OPEN_QUESTIONS #3, #10). Sessions can be
edited freely (ADR-0007), and cheating is not a design goal. Details and examples:
[GAMIFICATION.md](../GAMIFICATION.md).

## Decision

### Earning

- **Studying: 30 coins per hour.** When a session ends, its coins are
  `floor(minutes ÷ 2)`, where `minutes` is the session's whole minutes of study time.
- Study time excludes pauses (ADR-0003); seconds are dropped before dividing.
- Pomodoro and the free timer earn at the same rate.
- A manually added session (ADR-0007) earns coins with the same formula when it is added.
- **Achievements:** 5 achievements in the first version, each earned **once** per user
  (unique constraint, ADR-0008):

  | Achievement | Condition | Coins |
  | --- | --- | --- |
  | First step | First session with at least 25 minutes of study time | 20 |
  | Team player | Joins a room for the first time | 30 |
  | Better together | 1 hour of shared time in total with someone else in one room | 50 |
  | Marathon | 3 hours of study time in a single session | 50 |
  | Star of the week | 10 hours of study time in one calendar week (ADR-0022) | 75 |

  - **Better together:** shared time is time during which the user and at least one other
    member of the same room were studying at once (as room shared time, ADR-0005). It is
    counted per room, never summed across rooms; 1 hour in one room is needed.
  - **Team player:** creating a room also counts, because the creator becomes a member.
  - **Star of the week:** uses the calendar week of ADR-0022; sessions are split at
    midnight as for the streak.

### Session edits

- When a session is edited, its coins are **recalculated** and the **difference** is
  written to the ledger as a **correction entry** (positive or negative).
- **Achievement coins are never taken back.**

### Balance

- Balance = sum of the ledger (ADR-0008). **The balance can go negative** (for example
  after a correction).
- **While the balance is negative, nothing can be bought.**

### Shop

- An item is **bought once** and can be **used on all cats**.
- **3 slots:** head, eyes, neck.
- **9 items** in the first version (4 easy, 3 medium, 2 hard; 1,500 coins in total):

  | Slot | Item | Tier | Price (coins) |
  | --- | --- | --- | --- |
  | Head | Ribbon | Easy | 50 |
  | Head | Beret | Medium | 150 |
  | Head | Crown | Hard | 400 |
  | Eyes | Round glasses | Easy | 50 |
  | Eyes | Sunglasses | Medium | 200 |
  | Neck | Bow tie | Easy | 50 |
  | Neck | Bell collar | Easy | 50 |
  | Neck | Scarf | Medium | 250 |
  | Neck | Pearl necklace | Hard | 300 |

- Bought items are permanent (ADR-0008).

## Alternatives considered

- **Keep coins after an edit** — the ledger would no longer match the sessions.
- **Recalculate and also take back achievement coins** — rejected by the user.
- **Never let the balance go negative** (clamp the correction at the current balance) —
  the ledger would no longer match the sessions; a negative balance only blocks buying.
- **Different rates for pomodoro and the free timer** — rejected; both are study time.

## Consequences

- For every session, the sum of its ledger entries equals `floor(minutes ÷ 2)` of its
  current duration; this is checkable in tests.
- The shop must refuse a purchase when the balance is negative or lower than the price
  (checked in the database function, ADR-0008).
- Achievement and item names are translation keys (ADR-0010).

## Open points

- Whether reward rules are written in both TypeScript and SQL (OPEN_QUESTIONS #42).
- Later, not in the first version: an outfit slot and the cat room.
