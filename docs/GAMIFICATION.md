# Gamification

Last updated: 2026-11-22 · Phase 0

Cats, coins, streaks and the shop. The binding decisions are in
[ADR-0020](decisions/0020-cat-unlocks.md) (cat unlocks),
[ADR-0021](decisions/0021-coin-economy-and-shop.md) (coin economy and shop) and
[ADR-0022](decisions/0022-streak-definition.md) (streak) and
[ADR-0028](decisions/0028-first-version-catalog.md) (first-version cat and item catalog), on top of
[ADR-0008](decisions/0008-coin-ledger.md) (coin ledger, rewards granted by database
functions). If this document and an ADR disagree, the ADR wins.

The catalog values (cat thresholds, items and prices, achievement conditions and coins)
live in database catalog tables loaded by migrations; the TypeScript side reads them
([ADR-0024](decisions/0024-gamification-catalog-in-database.md)).

## 1. Overview

| System | In one sentence |
| --- | --- |
| Cats | First version: one cat, Karamel, given at sign-up. Later cats are unlocked by study time and streaks; never bought; never lost. |
| Coins | Earned by studying (30/hour) and achievements; spent only in the shop. |
| Streak | Consecutive days with ≥ 25 minutes of study; 1 missed day per calendar week is forgiven. |
| Shop | 13 items (head and neck; the eyes slot is empty for now); each bought once and usable on every cat. |

## 2. Cats (ADR-0020, ADR-0028)

### Rules

- Cats are unlocked by studying, **never bought with coins**.
- Streak cats depend on the **longest streak ever reached**, not the current one.
- An unlocked cat is **permanent**: breaking a streak or editing sessions never removes it.

### First version: one cat

| Key | Cat | Unlock condition |
| --- | --- | --- |
| `karamel` | Karamel, orange tabby Scottish Fold (assets README) | Granted to everyone at sign-up |

### Unlock rules (in the design, not used in the first version)

The rules below stay in the design (catalog columns and the reward check, DATABASE.md
§1.5, §5.3), but the first-version catalog has no cat that uses them (ADR-0028). They are
used when later cats are added; which cat gets which rule is not decided
(OPEN_QUESTIONS #65).

| Unlock type | Thresholds from ADR-0020 |
| --- | --- |
| Total study time | 10 hours, 50 hours |
| Longest streak | 3 days, 7 days |

Later cats (draft art, not final quality, kept on the user's computer and deliberately not
in the repo; ADR-0028): `grey-shorthair`, `orange-white`, `white-longhair`,
`grey-white-longhair`.

"Total study time" is the sum of all of the user's sessions' study time
(pauses excluded, ADR-0003), including edited and manually added sessions (ADR-0007).

### When unlocks are checked

Whenever total study time or the longest streak can grow: a session ends, a session is
edited, or a session is added manually. If an edit later lowers the total below the
threshold, the cat stays.

### Examples (for when later cats exist)

- A user finishes their first session of 30 minutes → only the starter cat (it was granted
  at sign-up).
- Total study time reaches 10 h 0 min with a session that ends now → the 10-hour cat
  unlocks when that session ends.
- A user had 10 h 20 min in total and unlocked the 10-hour cat. They shorten an old session
  by 40 minutes → total 9 h 40 min; **the cat stays**.
- A user reached a 7-day streak last month and broke it → the 3-day and 7-day cats both
  stay; the current streak starts again.

## 3. Coins (ADR-0021)

### Earning by studying

- **30 coins per hour**, calculated when the session ends:

  `coins = floor(minutes ÷ 2)`

  where `minutes` is the session's whole minutes of study time.
- Pomodoro and the free timer earn at the same rate.
- Study time excludes pauses (elapsed time = server now − `started_at`
  − pauses, ADR-0003). "Whole minutes" means seconds are dropped first; the result is the
  same as `floor(seconds ÷ 120)`.
- An active session earns nothing until it ends.

| Session study time | Minutes | Coins |
| --- | --- | --- |
| 59 s | 0 | 0 |
| 1 min | 1 | 0 |
| 3 min | 3 | 1 |
| 25 min | 25 | 12 |
| 50 min | 50 | 25 |
| 1 h 30 min 59 s | 90 | 45 |
| 2 h | 120 | 60 |
| 60 min with a 10-minute pause | 50 | 25 |

Note: two 25-minute sessions earn 12 + 12 = 24 coins; one 50-minute session earns 25.
Rounding down happens per session.

### Achievements

- 5 achievements, each earned **once** per user (unique constraint, ADR-0008).
- Each is worth between **20 and 75 coins**.
- Achievement coins are **never taken back**, even if a session edit means the condition
  is no longer met.

| # | Achievement | Condition | Coins |
| --- | --- | --- | --- |
| 1 | First step | First session with at least 25 minutes of study time | 20 |
| 2 | Team player | Joins a room for the first time | 30 |
| 3 | Better together | 1 hour of shared time in total with someone else in one room | 50 |
| 4 | Marathon | 3 hours of study time in a single session | 50 |
| 5 | Star of the week | 10 hours of study time in one calendar week | 75 |
| | **Total** | | **225** |

An achievement is granted when its condition is first met: a session ends, is edited or is
added manually, or the user joins a room.

- **Better together:** "shared time" is time during which the user and at
  least one other member of the same room were studying at once (as room shared time,
  ADR-0005). It is counted per room and not summed across rooms (ADR-0005); 1 hour in one
  room is needed.
- **Team player:** creating a room also counts, because the creator becomes
  a member of it.
- **Star of the week:** the week is Monday 00:00 – Sunday 24:00 in the
  user's timezone, and sessions are split at midnight as for the streak.

### Session edits

- When a session is edited, its coins are **recalculated**, and the **difference** is
  written to the ledger as a **correction entry**.
- For every session, the sum of its ledger entries always equals `floor(minutes ÷ 2)` of
  its current duration.
- A manually added session (ADR-0007) earns coins with the same formula
  when it is added.

Example — one session edited twice:

| Step | Session study time | Coins it should have | Ledger entry | Sum for this session |
| --- | --- | --- | --- | --- |
| Session ends | 120 min | 60 | +60 (session reward) | 60 |
| Edited shorter | 30 min | 15 | −45 (correction) | 15 |
| Edited longer | 100 min | 50 | +35 (correction) | 50 |

### Balance

- Balance = sum of all ledger entries (ADR-0008). No balance column.
- The balance **can go negative**.
- **While the balance is negative, nothing can be bought.** A purchase also needs a balance
  of at least the item's price.

Example — negative balance:

| Step | Ledger entry | Balance |
| --- | --- | --- |
| New user, 120-minute session ends | +60 | 60 |
| Buys an easy item | −50 | 10 |
| Edits that session to 30 minutes | −45 (correction) | −35 |
| Tries to buy anything | refused (balance negative) | −35 |
| Studies 70 more minutes (one session) | +35 | 0 |
| Studies 100 more minutes (one session) | +50 | 50 |
| Can buy another easy item | −50 | 0 |

The bought item stays even while the balance is negative (items are permanent, ADR-0008).

## 4. Streak (ADR-0022)

### Rules

- **A day counts** when the user studied **at least 25 minutes** that day.
- **The day ends at midnight in the user's timezone** (ADR-0010).
- A session that **crosses midnight is split** between the two days.
- **In every calendar week, 1 missed day is forgiven automatically.** A forgiven day does
  not increase the streak; it only keeps it.
- A second missed day in the same calendar week breaks the streak.
- The streak is derived from sessions, so edits and manual sessions change it
  retroactively (ADR-0003, ADR-0007).
- Today is not a missed day while it is still in progress; it can only be missed after
  midnight.
- An unused forgiveness does not carry over to the next week.
- **The calendar week starts on Monday**, in every language.

### Midnight split examples

| Session (user's local time) | Day 1 | Day 2 | Counts for |
| --- | --- | --- | --- |
| 23:30 – 00:40 | 30 min | 40 min | both days |
| 23:50 – 00:20 | 10 min | 20 min | neither day, unless other sessions add up to 25 min |
| 22:00 – 00:10 | 120 min | 10 min | day 1 only |

The split is only for counting days. Coins are calculated per session: the 23:30 – 00:40
session earns `floor(70 ÷ 2)` = 35 coins once.

### Streak examples

✓ = ≥ 25 minutes · ✗ = less than 25 minutes · F = forgiven

| Mon | Tue | Wed | Thu | Fri | Sat | Sun | Streak at the end of the row |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7 |
| ✓ | ✓ | ✗ F | ✓ | ✓ | ✓ | ✓ | 6 (Wed kept it, did not add) |
| ✓ | ✓ | ✗ F | ✓ | ✗ | ✓ | ✓ | 2 (Fri is the 2nd miss of the week → broken; Sat starts again) |
| ✓ | ✗ F | ✓ | ✓ | ✓ | ✓ | ✓ | 6 |

Across a week boundary: ✓ Fri, ✓ Sat, ✗ Sun (forgiven, week 1),
✗ Mon (forgiven, week 2), ✓ Tue → streak 3. Two consecutive missed days can both be
forgiven when they fall in different weeks.

### Streak and cats

Streak-based cats (not in the first version) use the **longest** streak. Forgiven days do
not count, so a 3-day streak needs 3 counted days: ✓ ✗F ✓ ✓ would unlock a 3-day cat on
the last day.

## 5. Shop (ADR-0021, ADR-0028)

### Rules

- Coins are spent **only in the shop**.
- An item is **bought once** and can be **used on all cats**.
- **3 slots:** head, eyes, neck. The **eyes slot is empty** in the first version.
- Bought items are permanent.

Each cat wears at most one item per slot, and the same item can be worn
by several cats at the same time.

**Placement is automatic:** users never align items. Position and size come from the cat's
landmarks and each item's type and two numbers; the method, the values and the drawing
order are in the [assets README](assets/README.md#automatic-placement). Where these values
are stored is in DATABASE.md §1.5 (ADR-0028).

### First version: 13 items

| Slot | Key | Tier | Price (coins) | Study time to earn it alone |
| --- | --- | --- | --- | --- |
| Head | `red-gingham-bow` | Easy | 50 | 1 h 40 min |
| Head | `pink-visor` | Easy | 50 | 1 h 40 min |
| Head | `yellow-bucket-hat` | Easy | 50 | 1 h 40 min |
| Head | `denim-cap` | Medium | 150 | 5 h |
| Head | `plaid-beret` | Medium | 150 | 5 h |
| Head | `plaid-bucket-hat` | Medium | 200 | 6 h 40 min |
| Head | `frog-hood` | Hard | 300 | 10 h |
| Head | `bunny-hood` | Hard | 300 | 10 h |
| Head | `strawberry-bonnet` | Hard | 350 | 11 h 40 min |
| Head | `sunflower-bonnet` | Hard | 400 | 13 h 20 min |
| Neck | `red-gingham-bandana` | Easy | 50 | 1 h 40 min |
| Neck | `bear-plaid-bandana` | Easy | 50 | 1 h 40 min |
| Neck | `lace-collar` | Medium | 250 | 8 h 20 min |

Keys are the asset file names; display names (TR/EN) are translations (ADR-0010). Tiers
follow ADR-0021's price ranges (ADR-0028).

### Whole-shop cost

| Tier | Items | Coins |
| --- | --- | --- |
| Easy | 5 × 50 | 250 |
| Medium | 150 + 150 + 200 + 250 | 750 |
| Hard | 300 + 300 + 350 + 400 | 1,350 |
| **Total** | 13 items | **2,350** |

By slot: head 2,000 coins, neck 350 coins. 2,350 coins = **78 h 20 min** of study at
30 coins/hour, or about **70 h 50 min** if all 225 achievement coins are counted.

## 6. Later (not in the first version)

- Outfit slot
- Cat room (and decoration, from the brief)
- The four later cats (see §2) and their unlock rules (#65)
- Items for the eyes slot
- 150-hour cat and 30-day streak cat

## 7. Still open

| Topic | Where | When |
| --- | --- | --- |
| Which later cat uses which unlock rule | OPEN_QUESTIONS #65 | Before later cats are added |
| Re-implementing and testing automatic placement (assets README) | — | Phase 1 |
