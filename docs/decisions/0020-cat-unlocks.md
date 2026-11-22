# ADR-0020: Cat unlocks

- **Status:** Partially superseded by ADR-0028 (first-version cat list)
- **Date:** 2026-11-22

## Context

The brief says cat species are unlocked through study milestones and streaks, and that
collected cats are never lost. ADR-0008 stores unlocked cats as permanent grants. The
unlock rules and the first set of cats were open (OPEN_QUESTIONS #10). Details and
examples: [GAMIFICATION.md](../GAMIFICATION.md).

## Decision

- **Cats are unlocked by studying, never bought with coins.**
- The first version has **5 cats**:

  | Cat | Unlock condition |
  | --- | --- |
  | Starter cat | Granted at sign-up |
  | 10-hour cat | 10 hours of total study time |
  | 50-hour cat | 50 hours of total study time |
  | 3-day streak cat | Longest streak reached ≥ 3 days |
  | 7-day streak cat | Longest streak reached ≥ 7 days |

- Streak cats depend on the **longest streak ever reached**, not the current streak
  (streak definition: ADR-0022).
- **An unlocked cat is permanent**: it is not removed when a streak breaks or when
  sessions are edited so that the condition is no longer met (ADR-0008).
- Unlocks are granted by database functions, like coins (ADR-0008).

## Alternatives considered

- **Cats bought with coins** — rejected by the user; coins are spent only in the shop
  (ADR-0021).
- **Streak cats based on the current streak** — would make an unlock depend on not missing
  a day at the right moment; the longest streak is simpler and fits "cats are never lost".

## Consequences

- Unlock checks run whenever total study time or the longest streak can grow: when a
  session ends, and when a session is edited or added manually (ADR-0007).
- Catalog cats are stored as keys; their names are translated (ADR-0010).

## Open points

- Art style and production of the cats: resolved — the art is in `docs/assets/`
  ([ADR-0028](0028-first-version-catalog.md)).
- Later, not in the first version: a 150-hour cat and a 30-day streak cat.
