# 006 — Decisions before the database design (v2)

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> - #45: Goals are private. `profiles` holds only the display name (room members read it);
>   goals, timezone and language live in a separate `user_settings` table (only the owner
>   reads it).
> - #46: Goals are optional, can be left empty, no default.
> - #47: When an account is deleted, the creator role passes to the oldest owner, or, if
>   there is no owner, to the oldest member (who also becomes an owner); if nobody is left
>   in the room, the room is deleted. The user's messages and membership history are also
>   deleted.
> - #42: Calculations that affect rewards (coin formula, streak) are only in SQL; the UI
>   reads the result from the database. Display-only calculations (charts, room shared
>   time) are in TS. For the live coin display, repeating minutes ÷ 2 in TS is allowed; the
>   same test cases run in both Vitest and pgTAP.
> - Member removal (ban record or link rotation): no decision for now; keep it in
>   OPEN_QUESTIONS as "deferred". Do not design a table for it in DATABASE.md.
> - Assumptions a, b, c are correct; remove the "not confirmed" markers.
> - Apply your invariant suggestion.
> - Do not commit.
