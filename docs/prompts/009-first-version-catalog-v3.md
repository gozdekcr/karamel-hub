# 009 — First-version cat and item catalog (v3)

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> - Hood opening: store it in separate columns (`opening_center_x`, `opening_center_y`,
>   `opening_width`). Filled only for the hood type; constraint: if
>   `placement_type = 'hood'` these three columns are required, otherwise empty. Like the cat
>   landmarks, computed once when the image is added and loaded by a migration.
> - Accept #66 with this detail (Accepted). The `real` type is correct.
> - Do not commit.
