# 003 — Technical research (v3)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/003-tech-research-v3.md`](../prompts/003-tech-research-v3.md)

## 1. What was done

- `docs/decisions/0015-frontend-libraries.md` (uncommitted, edited directly) — React Router
  **declarative mode**, with the user's reason (data loading is done by TanStack Query);
  "React Router data or framework mode" added to the alternatives; open point removed.
- `docs/decisions/0019-react-typescript-vite.md` — **new, Accepted**: React, TypeScript for
  all application code, Vite, client-rendered SPA. Versions are pinned in Phase 1 (not checked
  in research).
- `CLAUDE.md` — three new architecture invariants: room-readable tables hold only time data,
  private links in owner-only tables, views with `security_invoker` (ADR-0016); heartbeats in a
  separate table outside the Realtime publication (ADR-0016); room Presence on private channels
  (ADR-0017).
- `docs/OPEN_QUESTIONS.md` — #40 resolved (→ ADR-0015); #41 marked "to be decided at the start
  of Phase 1".
- `docs/CURRENT_STATE.md` — product research marked **Reviewed**; ADR row 0019; ADR-0015 row
  mentions declarative mode; React, TypeScript, Vite moved to "Accepted"; only Zod remains
  under consideration.
- `docs/decisions/README.md`, `docs/README.md` — index rows and status updated.

## 2. What was verified, and how

- `git status` before editing: ADR-0015 … 0018 are untracked (uncommitted), so editing
  ADR-0015 directly follows the rule in CLAUDE.md.
- Nothing was committed.

## 3. What was NOT done or verified

- React, TypeScript and Vite versions were not researched; ADR-0019 says they are pinned in
  Phase 1.

## 4. Known issues, ambiguities and interpretations

- ADR-0015 now says route params must be validated in `data/` / `features/`, "e.g. with Zod".
  Zod itself is still not accepted; it is only an example there.
- ADR-0019's alternatives (Next.js, Vue, Svelte, plain JavaScript) were written by Claude from
  the existing ADRs; they were not part of the technical research.

## 5. Suggestions (out of scope)

- Decide on Zod (ADR-0002 already says network data is validated with Zod) — it is the only
  library from the brief without an ADR.
