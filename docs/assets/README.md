# Art assets

Source art for cats and cosmetic items. Transparent PNGs.

## Structure

```
docs/assets/
├── cats/            one file per cat, 512×512 canvas, feet near the bottom edge
└── items/
    ├── head/        head slot items
    └── neck/        neck slot items
```

## Naming

- File name = catalog key: English, lowercase, kebab-case (`frog-hood.png` → key `frog-hood`).
- Keys never change. Display names (TR/EN) live in i18n files (ADR-0010).

## Cats (first version, ADR-0028)

| Key | Description |
|---|---|
| `karamel` | Orange tabby Scottish Fold. The starter cat, given to every user at sign-up. |

More cats will be added in later versions (OPEN_QUESTIONS #65).

## Items (ADR-0028)

| Key | Slot | Price |
|---|---|---|
| `red-gingham-bow` | head | 50 |
| `pink-visor` | head | 50 |
| `yellow-bucket-hat` | head | 50 |
| `denim-cap` | head | 150 |
| `plaid-beret` | head | 150 |
| `plaid-bucket-hat` | head | 200 |
| `frog-hood` | head | 300 |
| `bunny-hood` | head | 300 |
| `strawberry-bonnet` | head | 350 |
| `sunflower-bonnet` | head | 400 |
| `red-gingham-bandana` | neck | 50 |
| `bear-plaid-bandana` | neck | 50 |
| `lace-collar` | neck | 250 |

Prices are decided in ADR-0028; this table only mirrors them.

## Automatic placement

Users never align items. When an item is equipped, its position and size are computed
automatically. The method was prototyped (outside the repo) on 5 cats × 13 items and
produced consistent results; it must be re-implemented and tested in Phase 1.

### Cat landmarks

Detected from the cat image. All sizes are measured in **d = distance between the two eye centres**.

| Landmark | How |
|---|---|
| Eye centre (`ex`, `ey`) | Midpoint of the two dark blue-grey eye blobs in the upper part of the cat |
| `d` | Horizontal distance between the eye centres |
| Skull top | Topmost non-transparent pixel in the column `x = ex` (between the ears) |
| Chin | `ey + 0.70·d` |

Landmarks can be computed once per cat and stored in the cat catalog row.

### Item rules

Each item has a **type** and two numbers: a width factor and a vertical offset, both in units of `d`.
Items are horizontally centred on `ex`. Neck items are drawn first, head items on top.

| Type | Width | Vertical position |
|---|---|---|
| hood | width of the item's face opening = factor·d | centre of the face opening at `ey + offset·d` |
| hat | item width = factor·d | bottom edge of the item at `ey + offset·d` |
| bow | item width = factor·d | centre of the item at `skull top + offset·d` |
| neck | item width = factor·d | top edge of the item at `chin + offset·d` |

The face opening of a hood is the largest fully enclosed transparent area inside the item image.

| Item | Type | Width factor | Offset |
|---|---|---|---|
| `frog-hood` | hood | 2.2 | 0.12 |
| `bunny-hood` | hood | 2.2 | 0.12 |
| `sunflower-bonnet` | hood | 2.2 | 0.12 |
| `strawberry-bonnet` | hood | 2.2 | 0.15 |
| `plaid-bucket-hat` | hat | 2.7 | −0.30 |
| `yellow-bucket-hat` | hat | 2.5 | −0.30 |
| `plaid-beret` | hat | 2.4 | −0.55 |
| `denim-cap` | hat | 2.3 | −0.30 |
| `pink-visor` | hat | 2.3 | −0.40 |
| `red-gingham-bow` | bow | 1.3 | 0.10 |
| `red-gingham-bandana` | neck | 1.6 | −0.08 |
| `bear-plaid-bandana` | neck | 1.8 | −0.08 |
| `lace-collar` | neck | 1.9 | −0.12 |

The cat must be rendered with headroom above it (about 140 px on a 512 px cat), otherwise
tall hats are clipped.

## Provenance

AI-generated images. Backgrounds were removed and files renamed and cropped by script.

## Known issues

- `pink-visor`: leftover beige ear shapes at both sides. Regenerate or clean up.
- `strawberry-bonnet`: chin ties overlap neck items.
- `yellow-bucket-hat`: the inside of the hat is transparent, so the cat's head shows
  through. Fill it with a darker yellow.
