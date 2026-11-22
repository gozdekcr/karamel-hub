# 004 — Gamification design

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/004-gamification-design.md`](../prompts/004-gamification-design.md)

## 1. Files created or changed

- **New:** `docs/GAMIFICATION.md` — rules, tables and example calculations for cats, coins,
  streak and shop; "Later" and "Still open" sections.
- **New (Accepted, user decisions):** `docs/decisions/0020-cat-unlocks.md`,
  `0021-coin-economy-and-shop.md`, `0022-streak-definition.md`.
- `docs/OPEN_QUESTIONS.md` — #3, #5, #10, #24 removed and noted as resolved; #11 narrowed to
  art style ("UI/UX stage"); new #42 (TS + SQL reward rules, database stage), #43
  (achievement list, item names/prices/slots), #44 (first day of the calendar week).
- `docs/decisions/0007`, `0008`, `0010` (committed) — only the **Open points** were updated
  to point to the new ADRs; their decisions were not changed.
- `docs/CURRENT_STATE.md` — product rows Cats, Coins, Streak, Shop, Gamification later;
  ADR rows 0020–0022; Gamification design progress.
- `docs/decisions/README.md`, `docs/README.md` — index rows; GAMIFICATION.md moved out of
  "planned documents".
- `docs/PRODUCT_RESEARCH.md` — Karamel-hub row in the comparison table said "Coins → cats";
  corrected to "Study time and streaks → cats; coins → cosmetics", streak column updated.

## 2. What was done, and what was NOT done or verified

- All example calculations in GAMIFICATION.md were checked by hand (coin table, edit and
  negative-balance ledgers, streak rows, shop totals 1,250–1,750 coins ≈ 41 h 40 min –
  58 h 20 min).
- `git status` before editing: the tree was clean; the new ADRs are new files.
- Not done: no achievement list, item names or exact prices were invented (see #43).
- Nothing was committed.

## 3. Contradictions, ambiguities and interpretations

- **Missing from the summary:** the 5 achievements (names, conditions, amounts) and the 9
  items (names, exact medium/hard prices, slot per item). The user said only two topics
  remain open; these were added as #43 instead of being invented.
- **Calendar week start** (Monday/Sunday/locale) affects forgiveness → #44.
- Interpretations written in GAMIFICATION.md, labeled, need confirmation:
  1. "Minutes" = study time without pauses (ADR-0003), seconds dropped.
  2. A manually added session earns coins with the same formula.
  3. "Total study time" for hour cats includes edited and manual sessions.
  4. Today is not a missed day until midnight; unused forgiveness does not carry over.
  5. Two consecutive missed days can both be forgiven if they fall in different weeks.
  6. Each cat wears one item per slot; one item can be worn by several cats at once.
- ADR-0021's alternatives "keep coins after an edit" and "never let the balance go
  negative" were written by Claude, not discussed with the user.
- PRODUCT_RESEARCH.md's comparison table contradicted the decision ("Coins → cats");
  corrected (see §1).

## 4. Suggestions (out of scope)

- Add invariants to `CLAUDE.md`: "Cats are unlocked by studying, never bought, and never
  removed (ADR-0020)"; "For every session, the sum of its ledger entries equals
  `floor(minutes ÷ 2)` (ADR-0021)"; "Streaks are derived from sessions (ADR-0022)".
