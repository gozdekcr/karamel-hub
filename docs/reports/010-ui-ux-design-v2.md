# 010 — UI/UX design (v2)

Date: 2026-11-23 · Phase 0 · Prompt: [`../prompts/010-ui-ux-design-v2.md`](../prompts/010-ui-ux-design-v2.md)

## 1. Files created or changed

- `docs/UI_UX.md` — #67–#70, #72–#74 written in as decisions (Proposed markers removed);
  Home layout (ASCII sketch and components) as decided; Pomodoro flow: the next work phase
  starts after "Continue"; §6.2 the user's palette (Accepted) with a full contrast table;
  §6.3 Fredoka + Nunito, self-hosted; §6.4 sizes (26 px, 14–18 px, 44 px). Status:
  decided except #75.
- `docs/DATABASE.md` — §5.1 `pause_session` takes an optional `at` (Pomodoro phase end,
  #68); §5.5 new `get_invite_room_name` (#73).
- `docs/SECURITY.md` — §3.3 tests for both functions.
- `docs/OPEN_QUESTIONS.md` — #67–#74 closed; new **Proposed** #75 (calendar tones and
  ranges, contrast fixes, error colour, motion and focus).
- `docs/CURRENT_STATE.md` — Pomodoro, Visual direction, Home rows; UI/UX progress.

## 2. What was done, and what was NOT done or verified

- Contrast ratios were **calculated with a Python script** using the WCAG 2 relative
  luminance formula, for every text colour on every background and for text on coloured
  backgrounds. Not checked in a browser or a contrast tool.
- Fredoka/Nunito Turkish support and tabular digits: Phase 1, as instructed.
- Nothing was committed (CLAUDE.md). Task 009 and 010 changes are still uncommitted in the
  same tree.

## 3. Contradictions, ambiguities and interpretations

- **Below 4.5:1 (normal text):** `#FFF8F0` on the accent `#A8642A` (4.41) — the timer card
  and buttons; accent `#A8642A` as text (3.34–4.32); pink `#B5525E` as text except on the
  app background; `#7A5E4B` on `#EAD8C3` (4.28); `#8E5222` on `#EAD8C3` (4.47); caramel mid
  `#C9813F` as text or as a background for text. Caramel mid and light also fail 3:1 as
  meaningful graphics. Fixes are Proposed in #75.
- **Error colour:** the palette has none; #75 proposes the pink accent plus an icon.
- **Calendar tones:** "4 tones by minutes" does not name colours or ranges; #75.
- **Motion and focus rules** from my v1 proposal were not part of the user's #71 answer;
  kept as Proposed in #75.
- `pause_session(at)` and `get_invite_room_name` are new functions that follow from #68
  and #73; they were added to DATABASE.md and SECURITY.md as part of those accepted
  answers.

## 4. Suggestions (out of scope)

- None.
