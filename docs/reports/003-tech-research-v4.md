# 003 — Technical research (v4)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/003-tech-research-v4.md`](../prompts/003-tech-research-v4.md)

## 1. What was done

- `docs/decisions/0015-frontend-libraries.md` (uncommitted, edited directly):
  - Title now includes "validation"; Context mentions that ADR-0002 already names Zod.
  - New decision item: **Zod** validates network data in `data/` before it reaches `domain/`
    (ADR-0002), and route params the same way.
  - Consequences: "e.g. with Zod at the boundary" replaced by "validate them with Zod (ADR-0002)".
  - Note that the Zod version was not checked in the research.
- `docs/decisions/README.md` — ADR-0015 title updated.
- `docs/CURRENT_STATE.md` — ADR-0015 row lists Zod; Zod moved to "Accepted"; only hosting
  remains open in the tech section.

## 2. What was verified, and how

- `git status`: ADR-0015 is untracked (uncommitted), so it was edited directly.
- `grep`: no "e.g. with Zod" and no "Still under consideration" left outside prompts/reports.
- Nothing was committed (the user will commit).

## 3. What was NOT done or verified

- The Zod version was not researched; it is pinned in Phase 1 with the other libraries.

## 4. Known issues, ambiguities and interpretations

- None.

## 5. Suggestions (out of scope)

- None.
