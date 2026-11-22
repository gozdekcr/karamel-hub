# 011 — Architecture overview

Date: 2026-11-23 · Phase 0 · Prompt: [`../prompts/011-architecture-overview.md`](../prompts/011-architecture-overview.md)

## 1. Files created or changed

- **New:** `docs/ARCHITECTURE.md` (draft for review) — system diagram (Mermaid) with a
  "which data, which path" table; layers with responsibilities and forbidden imports;
  four sequence diagrams (session start/end → coins and achievements; live room status;
  buy and equip; join by link); "where is it calculated" table; Proposed Phase 1 folder
  structure; decision map of ADR-0001 … 0028.
- `docs/OPEN_QUESTIONS.md` — new **Proposed** #76 (folder structure, incl. `src/app`,
  `src/shared/ui`, art in `public/art/`) and #77 (shared Vitest/pgTAP test cases).
- `docs/CURRENT_STATE.md` — progress row "Architecture overview".
- `docs/README.md` — ARCHITECTURE.md added; removed from "planned documents".

## 2. What was done, and what was NOT done or verified

- Based only on Accepted ADRs, CURRENT_STATE and the design documents; no new decisions
  except the Proposed #76, #77.
- `git status` before starting: clean (tasks 009–010 committed by the user as `0d7d9c9`).
- **Not verified:** Mermaid diagrams were not rendered (syntax checked by reading; the
  `<room>` placeholder in a sequence diagram was replaced with «room» to avoid HTML
  parsing); whether `supabase test db` reads `supabase/tests/` by default.
- Contradictions below were **not fixed**, as instructed. Nothing was committed.

## 3. Contradictions between documents (not fixed)

1. **ADR-0014 vs OPEN_QUESTIONS #48 / SECURITY.md §2.2.** ADR-0014 (Accepted) says
   "Removal must prevent rejoining with an old link (a ban record or an automatic link
   rotation)". #48 defers the mechanism, and SECURITY.md lists "a removed member can come
   back" as an accepted limitation. The ADR's "must" is currently not met by the design.
2. **ADR-0017 vs ADR-0027.** ADR-0017 says "the JWT lifetime should be kept short";
   ADR-0027 keeps Supabase's default of 1 hour (which Supabase calls the recommended
   default). Not strictly contradictory, but the wording differs.
3. **ADR-0006 wording vs ADR-0016.** ADR-0006 says time-only visibility is enforced by "a
   view exposing only time fields and/or RLS"; ADR-0016 rejects a view over the full
   sessions table and uses a table split. ADR-0016 refines it, but ADR-0006 was not marked
   as partially superseded.
4. **ADR-0010 decision text** still says "Library: to be decided in technical research.
   react-i18next is the main candidate", although ADR-0015 decided it (only the Open point
   points to ADR-0015).
5. **UI_UX.md §4 vs §2.2.** The empty-state table still has a row "Home — Recent
   achievements", while the decided Home layout (task 010-v2) has a full-width
   "achievements strip".
6. **PRODUCT_RESEARCH.md comparison table.** The Karamel-hub row says "Study time and
   streaks → cats"; since ADR-0028 the first version has one cat given at sign-up, and
   unlock rules are not used yet.
7. **CURRENT_STATE / WORKFLOW "Core architecture decisions — Done (ADR-0001 … 0014)".**
   Later architecture ADRs (0015–0028) exist; the label is historical but can be read as
   the full list.

## 4. Interpretations in ARCHITECTURE.md

- Item placement math and the live coin display are placed in `domain/` (pure TS, ADR-0002);
  the ADRs say only "TypeScript".
- Mapping database error codes to i18n keys is placed in `data/` (DATABASE.md §5 says only
  "the UI maps").
- The decision-map "Affects" column is Claude's reading of each ADR.

## 5. Suggestions (out of scope)

- Contradictions 3 and 4 could be handled like ADR-0002 (a status note), and 5–7 are
  one-line wording fixes, if the user wants them fixed.
