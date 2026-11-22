# 009 — First-version cat and item catalog (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/009-first-version-catalog-v2.md`](../prompts/009-first-version-catalog-v2.md)

## 1. Files created or changed

- `docs/DATABASE.md`:
  - §1.5 `cats`: **Proposed** (#66) landmark columns `eye_x`, `eye_y`, `eye_distance`
    (`d`), `skull_top_y`; the chin is derived (`eye_y + 0.70 × d`), not stored.
  - §1.5 `items`: **Proposed** (#66) `placement_type` (`hood`, `hat`, `bow`, `neck`),
    `width_factor`, `vertical_offset`.
  - §3: **Proposed** check that the placement type matches the slot.
  - §7: item placement is a display-only TS calculation.
  - Each links to the assets README "Automatic placement" section.
- `docs/GAMIFICATION.md` — shop: placement is automatic, link to the assets README; "Still
  open" updated (#66; re-implementation and tests in Phase 1).
- `docs/OPEN_QUESTIONS.md` — new **Proposed** #66.

## 2. What was done, and what was NOT done or verified

- Read the new `docs/assets/README.md` (automatic placement: landmarks in units of the eye
  distance `d`; four item types; per-item width factor and offset; neck items drawn first;
  about 140 px headroom above a 512 px cat).
- Tier inference: accepted; ADR-0028 already states it, so no change was needed.
- The placement method itself was not checked (the prototype is outside the repo; the
  README says it is re-implemented and tested in Phase 1).
- `docs/assets/` was not changed. Nothing was committed (CLAUDE.md).

## 3. Contradictions, ambiguities and interpretations

- **Hood face opening:** the `hood` rule needs the face opening's width and centre in the
  item image ("the largest fully enclosed transparent area"). The user named only "type
  and two numbers" for items, so the opening is either measured from the image when the
  item is drawn or stored as more columns; left as an open detail in #66.
- **Where landmarks are computed:** the README says once per cat; DATABASE.md assumes a
  script run when a cat's art is added, with the values inserted by the catalog migration
  (part of the #66 proposal).
- **Column types:** `real` for pixel and factor values is Claude's choice.
- New Known issue in the README: `yellow-bucket-hat` is transparent inside (the head shows
  through). An art task, not a data one.

## 4. Suggestions (out of scope)

- None.
