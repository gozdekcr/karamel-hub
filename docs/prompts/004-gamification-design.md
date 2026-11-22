# 004 — Gamification design

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> The core gamification decisions are complete. Summary:
>
> **Cats**
>
> - Cats are not bought with coins; they are unlocked by studying.
> - The first version has 5 cats: a starter cat (at sign-up), 10 hours, 50 hours, a 3-day
>   streak, a 7-day streak.
> - Streak cats unlock based on the longest streak reached. An unlocked cat is permanent.
>
> **Coins**
>
> - Studying: 30 coins/hour. Calculated when the session ends as minutes ÷ 2, rounded down.
>   Pomodoro and the free timer earn at the same rate.
> - Achievements: 5 achievements, each earned once, between 20 and 75 coins.
> - If a session is edited, its coins are recalculated and the difference is written to the
>   ledger as a correction entry. Achievement coins are not taken back.
> - The balance can go negative. While it is negative, nothing can be bought in the shop.
>
> **Streak**
>
> - A day counts only with at least 25 minutes of study.
> - The day ends at midnight in the user's timezone. A session that crosses midnight is
>   split between the two days.
> - In every calendar week, 1 day is forgiven automatically. A forgiven day does not
>   increase the streak; it only keeps it.
>
> **Shop**
>
> - An item is bought once and can be used on all cats.
> - There are 3 slots: head, eyes, neck.
> - 9 items: 4 easy (50), 3 medium (150–250), 2 hard (300–400).
>
> Later: an outfit slot, the cat room, and cats for 150 hours and a 30-day streak.
>
> Two topics are still open, but both belong to other stages:
>
> - Art style (#11): to be discussed in the UI/UX stage.
> - Writing the reward rules in both TS and SQL: to be discussed in the database stage.
>
> Tasks:
>
> - `docs/GAMIFICATION.md`: write all the rules, tables and example calculations.
> - New ADR(s): cat unlocks, coin economy and the streak definition.
> - OPEN_QUESTIONS: close the resolved #3, #5, #10 and #24; the art style stays open.
