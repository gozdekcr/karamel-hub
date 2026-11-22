# 002 — Product research

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/002-product-research.md`](../prompts/002-product-research.md)

## 1. What was done

**Created**

- `docs/PRODUCT_RESEARCH.md` — research on 11 apps with the requested structure: a method
  note, Findings (sourced only, research date at the top), Inference (Claude's
  interpretation), Recommendations (take / avoid / what could make us different), and a
  comparison table (apps × features, with a Karamel-hub row).
  - Requested apps: Forest, Focusmate, StudyStream, YPT, Flocus, Pomofocus, Habitica, Finch.
  - Added: Study Bunny and Focus Friend (pet/character + cosmetic collection, closest to
    the cats), Duolingo (streak mechanics only).
- `docs/prompts/002-product-research.md`, this report.

**Changed**

- `docs/OPEN_QUESTIONS.md` — five new **Proposed** items:
  - #24 forgiving streaks (rest days / freezes) — proposed: yes
  - #25 calendar heatmap in personal statistics — proposed: yes
  - #26 optional cooperative weekly room goal, no penalty — proposed: yes
  - #27 member ranking in rooms — proposed: no ordered ranking
  - #28 ambient sounds and themes — proposed: later, low priority
  - #10 (gamification) note extended with the "rewards too slow" finding.
- `docs/README.md` — `PRODUCT_RESEARCH.md` moved from "planned" to the document list.
- `docs/CURRENT_STATE.md` — Phase 0 progress: product research is "Draft, awaiting review".

## 2. What was verified, and how

- About 20 web searches (standard mode) on 2026-11-22. Every Findings bullet has at least
  one link.
- Claims rely mainly on **search-result summaries**; the linked pages were not opened and
  read one by one. This is stated at the top of the document.
- Five claims are marked **†**: the search summary did not show clearly which of several
  pages they came from.

## 3. What was NOT done or verified

- Reddit and other forums did not appear in the results; forum coverage is thin.
- Several fields stayed "not found" (e.g. StudyStream statistics, Forest streaks, Flocus
  complaints). These are gaps in the research, not proof of absence.
- Monetization was left out as requested. Some complaints that are only about billing (e.g.
  Finch trial charges) were therefore not included.
- `docs/README.md` described PRODUCT_RESEARCH as also covering **target users**; the prompt
  did not ask for this, so it was not researched.
- No ADR was changed; the research did not contradict an accepted decision.

## 4. Known issues, ambiguities and interpretations

- "Flocus" searches first returned an unrelated mobile app ("Flofocus"); the research uses
  flocus.com, the browser dashboard.
- Many sources are App Store listings or third-party review sites, and some details (session
  lengths, feature tiers) differ between sources. The newest or official source was preferred.
- The Sixth Tone moderation report is about public study rooms on another platform, not
  StudyStream; it is listed as a related risk only.

## 5. Suggestions (out of scope)

- If deeper evidence is needed for a specific decision (e.g. streak forgiveness), a
  targeted follow-up that reads the primary pages in full would make those findings stronger.
- Target users could be covered in a short separate section or task.
