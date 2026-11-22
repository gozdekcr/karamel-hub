# 006 — Decisions before the database design

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> Decisions before the database design:
>
> - Invite link: all members of a room can see and share the link.
> - Catalog (cat thresholds, item prices, achievement conditions): lives in the database,
>   in catalog tables loaded by migrations; the TS side reads from there. This resolves #42.
> - Goals: two fields in the `profiles` table (daily and weekly goal in minutes). No
>   history is kept; past days are evaluated against the current goal.
> - Account deletion: sessions are deleted, and room statistics shrink accordingly.
> - Remove the 18+ rule and the sign-up checkbox (#31); the app will not be released now.
>   The target user stays "university students". Add the age policy to the "before public
>   release" note.
> - Record these in the appropriate ADRs and in CURRENT_STATE.md. Do not commit.
