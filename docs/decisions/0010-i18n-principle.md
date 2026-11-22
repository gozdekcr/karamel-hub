# ADR-0010: i18n principle

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

The UI must be available in Turkish and English, and users may live in different timezones.
Translation files that grow without structure become hard to maintain.

## Decision

- UI text uses **keys** (e.g. `timer.start`), never hardcoded strings.
- One translation file per **feature namespace** per language (`timer`, `rooms`, `cats`…).
- Catalog items (cat species, items, achievements) are stored as keys; their names live in
  the translation files.
- User content (course names, messages) is not translated.
- Dates, numbers and durations are formatted with `Intl` for the current locale.
- "Day" (for streaks and daily totals) is calculated in the **user's timezone**.
- **Library:** to be decided in technical research. react-i18next is the main candidate.

## Alternatives considered

- **Hardcoded strings, translate later** — expensive to retrofit.
- **One big translation file** — grows into numbered files (`more2_tr`, `more3_tr`…).

## Consequences

- Every new UI text needs both a TR and an EN key (part of the definition of done).

## Open points

- i18n library (OPEN_QUESTIONS #7).
- Streak definition and day boundary (OPEN_QUESTIONS #5).
