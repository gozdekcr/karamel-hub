# ADR-0022: Streak definition

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

The streak definition (minimum daily time, day boundary) was open (OPEN_QUESTIONS #5), and
product research proposed a forgiving streak (OPEN_QUESTIONS #24). ADR-0010 calculates
"day" in the user's timezone; streaks are derived from sessions (ADR-0003). Details and
examples: [GAMIFICATION.md](../GAMIFICATION.md).

## Decision

- **A day counts** when the user studied **at least 25 minutes** that day.
- **Day boundary:** midnight in the user's timezone (ADR-0010). A session that crosses
  midnight is **split** between the two days.
- **Forgiveness:** in **every calendar week, 1 missed day is forgiven automatically**.
  A forgiven day **does not increase** the streak; it only keeps it from breaking.
- A second missed day in the same calendar week breaks the streak.
- **Calendar week:** Monday 00:00 – Sunday 24:00 in the user's timezone, in every
  language.
- The streak is **derived from sessions**, never stored as a counter (ADR-0003), so edits
  and manual sessions change it retroactively (ADR-0007).

## Alternatives considered

- **No forgiveness** — one missed day resets the streak; product research found that
  protection against a missed day helps users return (OPEN_QUESTIONS #24).
- **Any study time counts the day** — a 1-minute session would keep the streak.
- **Freezes bought with coins (as in Duolingo)** — not chosen; forgiveness is automatic.

## Consequences

- Breaking a streak never removes cats (ADR-0020).
- Because the streak is derived, the longest streak can also shrink after an edit; cats
  already unlocked stay (ADR-0020).

## Open points

- None.
