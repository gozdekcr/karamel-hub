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
| 10 | Gamification design: unlock rules, coin economy, shop, cosmetics, achievements, cat room | ADR-0008 | Not discussed yet. Research input: keep the first reward fast and progress to the next cat visible — an assumption; the "too slow to earn" complaints (Forest, Study Bunny) could not be verified (PRODUCT_RESEARCH.md) |
| 11 | Cat art: style and production (layered SVG? how many species/items in the first version?) | — | Art is likely the most expensive part of gamification |
| 12 | Phase order after Phase 0 | — | Draft: solo core → stats/streak → rooms/realtime → coins/cats → cosmetics |
| 13 | Upper bound for a room's member limit | ADR-0012, 0006 | Owners choose the limit; what is the maximum allowed value? |
| 14 | What happens if an owner lowers the limit below the current member count? | ADR-0012 | E.g. refuse the change, or allow it and only block new joins |
| 15 | Per-user room limit (how many rooms one user can join or own) | ADR-0014, 0006 | Each room is one Presence channel for the user |
| 16 | Where is the heartbeat stored? | ADR-0007 | E.g. a column on the active session or a separate table; decided in database design |
| 24 | Should streaks forgive a missed day (e.g. a limited number of "rest days" or freezes)? | #5, PRODUCT_RESEARCH.md | **Proposed: yes.** Duolingo's streak protection improved return in its own A/B tests; Finch has no penalties |
| 25 | Should personal statistics include a calendar heatmap (color intensity by daily study time)? | PRODUCT_RESEARCH.md | **Proposed: yes.** Pattern seen in YPT; personal only, not shown in rooms |
| 26 | Should rooms have a cooperative weekly goal (total or shared time target) with no penalty? | ADR-0005, PRODUCT_RESEARCH.md | **Proposed: yes, optional per room.** Builds on room total/shared time; avoids collective punishment (Forest group focus) |
| 27 | Should rooms show a ranking of members by study time? | ADR-0005, PRODUCT_RESEARCH.md | **Proposed: no ordered ranking.** YPT ranks users; ranking adds pressure among friends. Per-member time is already shown |
| 28 | Ambient sounds and visual themes (as in Flocus)? | PRODUCT_RESEARCH.md | **Proposed: later, low priority** |
| 31 | How is the 18+ rule applied at sign-up (e.g. a self-declaration checkbox, or a birth date)? | CURRENT_STATE (Age) | **Proposed:** a self-declaration checkbox at sign-up, recorded with the account. Details in `SECURITY.md` |
| 32 | Before public release: review privacy and legal requirements | CURRENT_STATE (Age), #31 | **Out of scope for now.** To be done before the app is released publicly |

Resolved: #2 → ADR-0011 (sessions never overlap). #4 → ADR-0012 (room member limit).
#29 → CURRENT_STATE "Primary users" (university students studying together remotely).
#30 → CURRENT_STATE "Age" (users must be 18+; YKS students removed from the primary users).
#17–#23 → ADR-0014 (owner removal, creator role and protection, empty rooms, deleting
rooms, no deletion notification). Some answers changed during the discussion; ADR-0014
holds the final rules: the creator role can be handed over at any time (and must be when
leaving), empty rooms are deleted, and only the creator-role holder can delete a room.
