# Open questions

Nothing here is decided. When a question is answered, move the answer into an ADR or
`CURRENT_STATE.md` and remove it from this list. Numbers are never reused, so references
in ADRs stay valid.

| # | Question | Related | Notes |
| --- | --- | --- | --- |
| 1 | Heartbeat interval and the "large gap" threshold | ADR-0007 | Needs testing with real usage |
| 3 | How do rewards react when a session is edited after coins were granted? (recompute, keep, or adjust) | ADR-0007, 0008 | |
| 5 | Streak definition: minimum daily time? Day boundary in the user's timezone? | ADR-0010 | |
| 6 | Email verification on sign-up | ADR-0001 | Proposed, not accepted |
| 7 | i18n library | ADR-0010 | react-i18next is the main candidate |
| 8 | Client-only global state library (if ever needed) | ADR-0009 | None until needed |
| 9 | Frontend hosting | — | |
| 10 | Gamification design: unlock rules, coin economy, shop, cosmetics, achievements, cat room | ADR-0008 | Not discussed yet |
| 11 | Cat art: style and production (layered SVG? how many species/items in the first version?) | — | Art is likely the most expensive part of gamification |
| 12 | Phase order after Phase 0 | — | Draft: solo core → stats/streak → rooms/realtime → coins/cats → cosmetics |
| 13 | Upper bound for a room's member limit | ADR-0012, 0006 | Owners choose the limit; what is the maximum allowed value? |
| 14 | What happens if an owner lowers the limit below the current member count? | ADR-0012 | E.g. refuse the change, or allow it and only block new joins |
| 15 | Per-user room limit (how many rooms one user can join or own) | ADR-0013, 0006 | Each room is one Presence channel for the user |
| 16 | Where is the heartbeat stored? | ADR-0007 | E.g. a column on the active session or a separate table; decided in database design |
| 17 | Can an owner remove another owner, or take away their owner role? | ADR-0013 | WhatsApp-like admin model was chosen; this detail was not specified |
| 18 | Does the room creator have extra protection (e.g. cannot be removed or demoted by other owners)? | ADR-0013 | |

Resolved: #2 → ADR-0011 (sessions never overlap). #4 → ADR-0012 (room member limit).
