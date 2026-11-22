# 009 — First-version cat and item catalog

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/009-first-version-catalog.md`](../prompts/009-first-version-catalog.md)

## 1. Files created or changed

- **New:** `docs/decisions/0028-first-version-catalog.md` (Accepted, user decisions) — one
  cat (`karamel`, at sign-up); the four other cats left for later; unlock rules kept in the
  design but unused; 13 items (10 head, 3 neck), eyes slot empty; whole shop 2,350 coins.
- `docs/decisions/0020-cat-unlocks.md`, `0021-coin-economy-and-shop.md` (committed) —
  status lines only: "Partially superseded by ADR-0028" (same pattern as ADR-0002 in task
  007-v2); ADR-0020's Open point on art now points to ADR-0028.
- `docs/GAMIFICATION.md` — overview, cats (one cat; unlock rules marked "not used in the
  first version"; examples marked "for when later cats exist"), streak-and-cats note, shop
  (13 items with tiers and time to earn, whole-shop cost), Later, Still open.
- `docs/DATABASE.md` — §1.5 catalog content uses the new keys; note that the unlock types
  stay in the schema for later cats; §5.3 names `karamel` as the starter cat.
- `docs/CURRENT_STATE.md` — Cats, Shop, Gamification later rows; ADR rows 0020, 0021, 0028;
  Gamification design progress.
- `docs/OPEN_QUESTIONS.md` — #11 closed (→ ADR-0028); new #65 (which later cat uses which
  unlock rule; not needed for the first version).
- `docs/decisions/README.md` — statuses of 0020, 0021; row 0028.

## 2. What was done, and what was NOT done or verified

- Read `docs/assets/README.md` and listed the files. PNG sizes read from the file headers:
  `karamel.png` is 512×512, as the README says; items are tightly cropped (305–519 px wide).
- Totals checked by hand: head 2,000 + neck 350 = 2,350 coins = 4,700 min = 78 h 20 min;
  minus 225 achievement coins = 2,125 coins = 70 h 50 min.
- `docs/assets/` was not changed. Nothing was committed (CLAUDE.md).

## 3. Contradictions, ambiguities and interpretations

- **"Automatic placement rules" are not in the README.** It says only that items are
  cropped tightly and that "their position and scale on each cat is set by per-cat anchor
  data (to be defined in the UI/UX phase)", and that cats share a 512×512 canvas with feet
  on the same baseline. Is there another file with placement rules, or are the anchor data
  still to be written?
- **Folder:** the assets are in `docs/assets/`, not `assets/` at the repo root; the docs
  refer to `docs/assets/`. The folder is untracked (not created by Claude).
- **Assets README vs files:** it lists `preview.png` and four other cat files; only
  `cats/karamel.png` exists. Its Known issue "`yellow-bucket-hat` … needs a price" is now
  answered (50, ADR-0028). Known issues still relevant for UI/UX: `pink-visor` leftover ear
  shapes; `strawberry-bonnet` chin ties overlap neck items.
- **Tiers:** the new list has no tiers; ADR-0028 assigns them by ADR-0021's price ranges
  (5 easy, 4 medium, 4 hard). This is derived, not a new rule; tiers have no other effect.

## 4. Suggestions (out of scope)

- Update `docs/assets/README.md`: remove the `yellow-bucket-hat` price issue, and mark
  `preview.png` and the four later cats as not present yet.
