# Open questions

Nothing here is decided. When a question is answered, move the answer into an ADR or
`CURRENT_STATE.md` and remove it from this list.

| # | Question | Related | Notes |
| --- | --- | --- | --- |
| 1 | Heartbeat interval and the "large gap" threshold | ADR-0007 | Needs testing with real usage |
| 2 | Should a user's sessions be forbidden from overlapping (edits and manual entries included)? | ADR-0003, 0005, 0007 | **Proposed: yes**, enforced by a DB exclusion constraint. Overlaps would double count time |
| 3 | How do rewards react when a session is edited after coins were granted? (recompute, keep, or adjust) | ADR-0007, 0008 | |
| 4 | Room member limit | ADR-0004 | |
| 5 | Streak definition: minimum daily time? Day boundary in the user's timezone? | ADR-0010 | |
| 6 | Email verification on sign-up | ADR-0001 | Proposed, not accepted |
| 7 | i18n library | ADR-0010 | react-i18next is the main candidate |
| 8 | Client-only global state library (if ever needed) | ADR-0009 | None until needed |
| 9 | Frontend hosting | — | |
| 10 | Gamification design: unlock rules, coin economy, shop, cosmetics, achievements, cat room | ADR-0008 | Not discussed yet |
| 11 | Cat art: style and production (layered SVG? how many species/items in the first version?) | — | Art is likely the most expensive part of gamification |
| 12 | Phase order after Phase 0 | — | Draft: solo core → stats/streak → rooms/realtime → coins/cats → cosmetics |
