# ADR-0028: First-version cat and item catalog

- **Status:** Accepted
- **Date:** 2026-11-22
- **Supersedes the first-version cat list of ADR-0020 and the item list of ADR-0021**

## Context

ADR-0020 listed 5 cats and ADR-0021 listed 9 items for the first version. The art now
exists in [`docs/assets/`](../assets/README.md): one finished cat (Karamel) and 13 items
for the head and neck slots. Asset file names are the catalog keys (assets README).

## Decision

### Cats

- The first version has **one cat: `karamel`**, the starter cat, granted to everyone at
  sign-up.
- The other four cats (`grey-shorthair`, `orange-white`, `white-longhair`,
  `grey-white-longhair` in the assets README) are **left for later versions**.
- The unlock rules of ADR-0020 (total study hours, longest streak) **stay in the design**
  (catalog columns, reward check), but they are **not used in the first version**, because
  the first-version catalog has no other cat.

### Items

- **13 items**; the **eyes slot is empty** in the first version (the three slots of
  ADR-0021 stay).

  | Slot | Key | Price (coins) |
  | --- | --- | --- |
  | Head | `red-gingham-bow` | 50 |
  | Head | `pink-visor` | 50 |
  | Head | `yellow-bucket-hat` | 50 |
  | Head | `denim-cap` | 150 |
  | Head | `plaid-beret` | 150 |
  | Head | `plaid-bucket-hat` | 200 |
  | Head | `frog-hood` | 300 |
  | Head | `bunny-hood` | 300 |
  | Head | `strawberry-bonnet` | 350 |
  | Head | `sunflower-bonnet` | 400 |
  | Neck | `red-gingham-bandana` | 50 |
  | Neck | `bear-plaid-bandana` | 50 |
  | Neck | `lace-collar` | 250 |

- Tiers follow ADR-0021's price ranges (easy 50, medium 150–250, hard 300–400): 5 easy,
  4 medium, 4 hard.
- Keys are English kebab-case and never change; display names are translations
  (ADR-0010, assets README).

### Placement data (automatic placement)

Items are placed automatically by the method in the
[assets README](../assets/README.md#automatic-placement). Its values are catalog data
(ADR-0024):

- **Cats:** landmark columns `eye_x`, `eye_y`, `eye_distance` (`d`) and `skull_top_y`, in
  pixels of the 512×512 cat image. The chin is derived (`eye_y + 0.70 × d`), not stored.
- **Items:** `placement_type` (`hood`, `hat`, `bow`, `neck`), `width_factor` and
  `vertical_offset` (both in units of `d`).
- **Hood items only:** `opening_center_x`, `opening_center_y` and `opening_width` of the
  face opening, in pixels of the item image. Required when `placement_type = 'hood'`, and
  empty otherwise (database `CHECK`).
- Landmarks and hood openings are **computed once when the art is added** and inserted by
  the catalog migration. Numeric values use the `real` type.
- Placement is computed in **TypeScript**, as a display-only calculation (ADR-0024).

Everything else in ADR-0020 and ADR-0021 is unchanged (cats are never bought and never
removed; items are bought once and usable on all cats; one item per slot per cat).

## Alternatives considered

- **Keep the 5 cats of ADR-0020** — only Karamel's art is release quality; the other cats
  were cut from a low-resolution sheet (assets README, Known issues).
- **Keep the 9 items of ADR-0021** — the art was made for a different list.

## Consequences

- With one cat, the cat collection and the "unlocked by studying" rule have no visible
  effect in the first version; coins are spent only on items for Karamel.
- The whole shop costs **2,350 coins** (head 2,000, neck 350): about **78 h 20 min** of
  study at 30 coins/hour, or about 70 h 50 min with all 225 achievement coins.
- Catalog content and placement columns in DATABASE.md §1.5 change accordingly (loaded by
  a migration, ADR-0024).
- Adding a new cat or item needs its placement values (and, for a cat, its landmarks)
  computed from the art before the migration is written.

## Open points

- Which later cat uses which unlock rule (OPEN_QUESTIONS #65).
