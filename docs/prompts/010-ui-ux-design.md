# 010 — UI/UX design

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> Start the UI/UX design task. Output: `docs/UI_UX.md`. Do not write code.
>
> Decisions (all Accepted):
>
> - Desktop layout: a fixed menu on the left, with the user's dressed Karamel above the
>   menu. While the timer is running, a small strip at the top of every page (elapsed time
>   + stop).
> - Screens: Sign-in/Sign-up; Home (a large timer card in the middle; greeting "Hello,
>   <name>!"; coins and streak at the top right; cards: My rooms (who is online/studying),
>   Today's tasks, study calendar (days coloured by study time), daily goal / weekly goal /
>   streak rings, recent achievements); Courses and tasks; Statistics (weekly/monthly
>   charts, goal progress, session history; editing and manual entry are here); Rooms; Room
>   page (members and live status, personal/total/shared time, chat, invite link); Karamel
>   (dressing + shop on one screen: the cat on the left, items on the right; clicking an
>   owned item puts it on; for an item not owned, a preview + "Buy (price)"; if coins are
>   not enough, the button is disabled and shows "You need to study X more minutes");
>   achievements; Settings (display name, goals, language, timezone); Invite confirmation
>   screen ("Join the <room> room?").
> - Flows: First login (sign-up → display name → Karamel introduction → daily goal
>   question, can be skipped with "Skip" → home). Joining by link (if not signed in, first
>   sign in/sign up → confirmation screen → room; messages for an invalid link and a full
>   room). Session (choose mode → course/task optional → start → Pomodoro fixed 25/5, a
>   browser notification when the time is up → finish → summary card: duration and coins
>   earned, a celebration if there is an achievement). Forgotten timer (heartbeat gap →
>   "shall we end the session there?").
> - Visual direction: Reference: pastel, low-contrast, cards with large rounded corners,
>   ring charts, a personal greeting. Colours from Karamel: cream background, caramel
>   orange accent, soft brown text, small pink accents. Cat and item images are in
>   `docs/assets/`; the placement rules are in `docs/assets/README.md`.
>
> Content: for each screen, its purpose, the components it contains and which data it
> shows; flow diagrams (Mermaid); empty states (no sessions at all, no rooms at all); error
> states.
>
> Write the colour palette (hex codes) and the font suggestion as Proposed; add to
> OPEN_QUESTIONS the places that need more detail than I will decide here. Write a report
> file. Do not commit.
