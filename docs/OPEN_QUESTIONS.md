# Open questions

Nothing here is decided. When a question is answered, move the answer into an ADR or
`CURRENT_STATE.md` and remove it from this list. Numbers are never reused, so references
in ADRs stay valid.

| # | Question | Related | Notes |
| --- | --- | --- | --- |
| 1 | Heartbeat "large gap" threshold (the interval starts at 60 s, ADR-0016) | ADR-0007, ADR-0016 | Needs testing with real usage |
| 8 | Client-only global state library (if ever needed) | ADR-0009 | None until needed |
| 9 | Frontend hosting | TECH_RESEARCH §4 | **Deferred until the release stage (user decision).** Research proposal on record: Cloudflare Workers with static assets; alternative Vercel Hobby |
| 11 | Cat and item art: style and production (layered SVG?) | ADR-0020, ADR-0021 | **To be discussed in the UI/UX stage (user decision).** Art is likely the most expensive part of gamification. The first version has 5 cats and 9 items (GAMIFICATION.md) |
| 12 | Phase order after Phase 0 | — | Draft: solo core → stats/streak → rooms/realtime → coins/cats → cosmetics. **Account deletion goes to a later phase (user decision, task 007-v2)** |
| 13 | Upper bound for a room's member limit | ADR-0012, 0006 | Owners choose the limit; what is the maximum allowed value? |
| 14 | What happens if an owner lowers the limit below the current member count? | ADR-0012 | E.g. refuse the change, or allow it and only block new joins |
| 15 | Per-user room limit (how many rooms one user can join or own) | ADR-0014, 0006, ADR-0017 | Each room is one Presence channel for the user. Supabase free plan allows 100 channels per connection — a hard ceiling |
| 25 | Should personal statistics include a calendar heatmap (color intensity by daily study time)? | PRODUCT_RESEARCH.md | **Proposed: yes.** Pattern seen in YPT; personal only, not shown in rooms |
| 26 | Should rooms have a cooperative weekly goal (total or shared time target) with no penalty? | ADR-0005, PRODUCT_RESEARCH.md | **Proposed: yes, optional per room.** Builds on room total/shared time; avoids collective punishment (Forest group focus) |
| 27 | Should rooms show a ranking of members by study time? | ADR-0005, PRODUCT_RESEARCH.md | **Proposed: no ordered ranking.** YPT ranks users; ranking adds pressure among friends. Per-member time is already shown |
| 28 | Ambient sounds and visual themes (as in Flocus)? | PRODUCT_RESEARCH.md | **Proposed: later, low priority** |
| 32 | Before public release: review privacy and legal requirements, including the age policy | CURRENT_STATE | **Out of scope for now.** To be done before the app is released publicly |
| 41 | Node.js version for development and CI | ADR-0018, ADR-0019 | **To be decided at the start of Phase 1 (user decision).** Must satisfy Vitest (≥ 22.12) and Playwright (22, 24 or 26). Current LTS status not checked |
| 48 | How does removing a member prevent rejoining: a ban record or a link rotation? | ADR-0014, ADR-0023 | **Deferred (user decision).** No table is designed for it in `DATABASE.md`. Since all members see the link (ADR-0023), rotation alone does not keep a removed user out |

Resolved: #2 → ADR-0011 (sessions never overlap). #4 → ADR-0012 (room member limit).
#7, #33, #34 → ADR-0015 (i18next + react-i18next, React Router, Recharts). #16, #35, #37 →
ADR-0016 (heartbeat table, overlap constraint, table split). #36 → ADR-0017 (private
channels). #38, #39 → ADR-0018 (local development and testing). #40 → ADR-0015 (React
Router declarative mode).
#3 → ADR-0021 (coins recalculated on edit, difference as a correction entry; achievement
coins kept). #5, #24 → ADR-0022 (≥ 25 minutes a day, midnight in the user's timezone, 1
forgiven day per calendar week). #10 → ADR-0020, ADR-0021 and GAMIFICATION.md (art style
stays open as #11).
#43 → ADR-0021 (achievement list, items with slots and prices). #44 → ADR-0022 (the
calendar week starts on Monday in every language).
#42 → ADR-0024 (catalog tables in the database, loaded by migrations; reward calculations
only in SQL). #31 → dropped (the 18+ rule was removed; the app is not being released now; the age
policy is part of #32).
#45, #46 → ADR-0025 (goals private and optional, in owner-only `user_settings`; `profiles`
holds only the display name). #47 → ADR-0026 (creator role to the oldest owner or member;
messages and membership history deleted).
#49–#58 → DATABASE.md (accepted in task 007-v2): owner-only courses and tasks; Pomodoro
breaks as pauses; pauses clipped on edit; sessions can be deleted (coins corrected to 0);
room name and text limits; whole chat history, no editing; gamification data owner-only;
timezone and language from the browser, current timezone for past days; no future times;
`room_memberships` over Realtime.
#6, #59–#64 → ADR-0027 (security baseline: email confirmation off until public launch;
32-byte invite tokens; API functions with their own checks, helpers in a non-exposed schema,
no `EXECUTE` for `anon`; no extra rate limits; 1-hour JWT; browser and Auth hardening
before launch).
#29 → CURRENT_STATE "Primary users" (university students studying together remotely).
#30 → CURRENT_STATE "Primary users" (YKS students removed). The 18+ rule decided then was
removed later (task 006).
#17–#23 → ADR-0014 (owner removal, creator role and protection, empty rooms, deleting
rooms, no deletion notification). Some answers changed during the discussion; ADR-0014
holds the final rules: the creator role can be handed over at any time (and must be when
leaving), empty rooms are deleted, and only the creator-role holder can delete a room.
