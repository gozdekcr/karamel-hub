# 009 — First-version cat and item catalog (v3)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/009-first-version-catalog-v3.md`](../prompts/009-first-version-catalog-v3.md)

## 1. Files created or changed

- `docs/decisions/0028-first-version-catalog.md` (uncommitted, edited directly) — new
  section "Placement data": cat landmark columns, item placement columns, hood-only
  `opening_center_x`, `opening_center_y`, `opening_width` (required for hoods, empty
  otherwise), computed once when the art is added and loaded by the catalog migration,
  `real` type, placement computed in TS. One more consequence (new cats/items need their
  placement values computed first).
- `docs/DATABASE.md` — §1.5: Proposed markers removed; three `opening_*` columns added;
  notes point to ADR-0028. §3: hood-opening `CHECK` and a positive-values `CHECK`. §7: item
  placement row points to ADR-0028.
- `docs/GAMIFICATION.md` — placement note points to ADR-0028; #66 row removed from "Still
  open".
- `docs/OPEN_QUESTIONS.md` — #66 closed (→ ADR-0028).
- `docs/CURRENT_STATE.md` — Shop row (automatic placement), ADR-0028 row, Gamification
  design progress.

## 2. What was done, and what was NOT done or verified

- An edit script stopped halfway because of one leftover "#66" marker in DATABASE.md §7;
  the marker was fixed and the remaining steps were run. Checked afterwards: no "#66" or
  "Proposed" left in DATABASE.md and GAMIFICATION.md; #66 no longer in the open table.
- Nothing was committed (CLAUDE.md).

## 3. Contradictions or ambiguities

- The "placement values are positive" `CHECK` (`eye_distance`, `width_factor`,
  `opening_width` > 0) was added by Claude as an obvious data-integrity rule; it is not in
  the user's prompt.

## 4. Suggestions (out of scope)

- None.
