# 010 — UI/UX design

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/010-ui-ux-design.md`](../prompts/010-ui-ux-design.md)

## 1. Files created or changed

- **New:** `docs/UI_UX.md` (draft for review) — layout (ASCII sketch), 10 screens (purpose,
  components, data), 4 Mermaid flows (first login, joining by link, study session,
  forgotten timer), empty states, error states, visual direction (decided parts; Proposed
  palette with hex codes and contrast notes, font, shapes and motion).
- `docs/OPEN_QUESTIONS.md` — new **Proposed** #67–#74; #25 (calendar heatmap) closed: the
  user's decision includes the Home study calendar.
- `docs/CURRENT_STATE.md` — new product rows: Layout, Pomodoro (25/5 fixed, notifications;
  merged with the earlier Pomodoro row from task 007-v2), First login, Study calendar,
  Visual direction; UI/UX progress.
- `docs/README.md` — UI_UX.md added; removed from "planned documents".

## 2. What was done, and what was NOT done or verified

- Based on the user's task-010 decisions, Accepted ADRs, DATABASE.md, SECURITY.md,
  GAMIFICATION.md and the assets README.
- **Not verified:**
  - Mermaid diagrams were not rendered (syntax checked by reading; labels with `#` are
    quoted).
  - Contrast ratios in §6.2 were calculated by hand with the WCAG luminance formula, not
    with a tool.
  - Nunito's Turkish character support and tabular digits; browser notifications without a
    PWA (#69). No web pages were read in this task.
- When this task started, task 009's changes (v1–v3) were still uncommitted; they are in
  the same working tree.
- Nothing was committed (CLAUDE.md).

## 3. Contradictions, ambiguities and interpretations

- **"Today's tasks" vs the task model:** tasks have no due date (#49), so "today" needs a
  definition (#67).
- **Pomodoro and server time:** breaks are pauses (#50), and pauses are written by
  functions with server time. If the page is closed when 25 minutes end, nobody records the
  break; #68 proposes recording it at the exact phase-end time and waiting for a click
  before the next work phase.
- **Invite screen needs the room name** before joining, but non-members cannot read
  `rooms` (DATABASE.md §4); a name-only lookup function is proposed (#73). This would be a
  new function in DATABASE.md §5.5 once accepted.
- **Room management UI:** the user's screen list does not mention owner/creator actions,
  but ADR-0014 requires them; they are listed on the room page and their placement is
  Proposed (#73).
- **"X more minutes"** = 2 × (price − balance) (30 coins/hour); a lower bound because coins
  are rounded down per session.
- **Low contrast vs readable text:** white text on the lighter caramel is about 2.7:1, so
  the palette uses a deeper caramel for buttons.
- Claude additions, labeled in the document: "already a member → go to the room" in the
  invite flow; timer strip hidden on Home (#74); "Achievements granted to roommates are not
  shown"; notes in Settings next to goals and timezone.

## 4. Suggestions (out of scope)

- After #67–#74 are answered, mark UI_UX.md as reviewed and carry the name-lookup function
  (#73) into DATABASE.md §5.5 and SECURITY.md §3.3.
