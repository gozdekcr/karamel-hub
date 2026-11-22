# 004 — Gamification design (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/004-gamification-design-v2.md`](../prompts/004-gamification-design-v2.md)

## 1. Files created or changed

- `docs/decisions/0021-coin-economy-and-shop.md` (uncommitted, edited directly) — achievement
  list (5, total 225 coins) and item list with slots and prices (9, total 1,500 coins);
  #43 removed from Open points.
- `docs/decisions/0022-streak-definition.md` (uncommitted, edited directly) — the calendar
  week starts on Monday in every language; Open points: none.
- `docs/GAMIFICATION.md` — achievement and item tables, whole-shop cost (1,500 coins = 50 h,
  about 42 h 30 min with all achievement coins); accepted interpretations (v1 report items
  3–7) are no longer labeled; Monday week start; #43/#44 removed from "Still open".
- `docs/OPEN_QUESTIONS.md` — #43, #44 resolved.
- `docs/CURRENT_STATE.md` — streak (Monday–Sunday), coins and shop rows.
- `CLAUDE.md` — three short invariants (ADR-0020, 0021, 0022).

## 2. What was done, and what was NOT done or verified

- Checked by hand: tiers match the decided counts and ranges (easy 4 × 50; medium 150, 200,
  250; hard 300, 400); achievement coins are within 20–75; time-to-earn column.
- Committed as requested (`faf88c5`); the user then undid the commit with a soft reset, so
  the changes are staged but not committed. From task 005 on, Claude never commits
  (CLAUDE.md). Suggested message: `docs: add gamification design and ADR-0020..0022`.

## 3. Contradictions, ambiguities and interpretations

- "c–g" was read as items 3–7 of the v1 report's interpretation list (total study time,
  today not missed, no carry-over, two forgiven days across weeks, one item per slot).
  Items 1 (minutes exclude pauses) and 2 (manual sessions earn coins) were not mentioned;
  they stay labeled **Interpretation** in GAMIFICATION.md.
- New interpretations, labeled in GAMIFICATION.md: Better together is counted per room
  (like room shared time, ADR-0005); creating a room counts for Team player; the Star of
  the week week is Monday 00:00 – Sunday 24:00 in the user's timezone.

## 4. Suggestions (out of scope)

- None.
