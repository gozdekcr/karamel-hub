# 003 — Technical research (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/003-tech-research-v2.md`](../prompts/003-tech-research-v2.md)

## 1. What was done

The user's review was recorded as four new **Accepted** ADRs:

- `docs/decisions/0015-frontend-libraries.md` — i18next + react-i18next; **React Router**
  (user's choice, not the proposed TanStack Router); Recharts (custom grid for a heatmap if
  #25 is accepted).
- `docs/decisions/0016-database-implementation-rules.md` — GiST exclusion constraint with
  btree_gist (verify availability as the first Phase 1 database step); time-only visibility by
  table split; heartbeat in a separate per-user table outside the Realtime publication, 60 s
  to start.
- `docs/decisions/0017-realtime-private-channels.md` — private channels with RLS on
  `realtime.messages` for room Presence; free plan considered sufficient.
- `docs/decisions/0018-local-development-and-testing.md` — Supabase CLI + Docker Desktop,
  migrations/seed/types in git, never change the hosted DB directly; Vitest, Playwright,
  pgTAP, a few supabase-js RLS tests.

Other changes:

- `docs/OPEN_QUESTIONS.md` — resolved and removed #7, #16, #33–#39 (with a "Resolved" note);
  #1 narrowed to the "large gap" threshold; #9 hosting marked **deferred until the release
  stage**; #15 now references ADR-0017. New: **#40 (Proposed)** React Router mode —
  declarative; **#41** Node.js version.
- `docs/CURRENT_STATE.md` — ADR table rows 0015–0018; "Tech under consideration" split into
  accepted and still-open items; technical research marked reviewed.
- `docs/decisions/README.md` — ADR index rows 0015–0018.
- `docs/decisions/0010-i18n-principle.md` — **open points only**: the i18n library item now
  points to ADR-0015. The decision text was not changed.
- `docs/TECH_RESEARCH.md` — a "Review outcome" note at the top; the research body is unchanged.
- `docs/README.md` — TECH_RESEARCH description updated.

## 2. What was verified, and how

- `git status` before editing: ADR-0001 … 0014 are committed; ADR-0015 … 0018 are new files.
  No committed ADR decision was edited.
- Checked that each removed open question is listed in the "Resolved" note.
- Nothing was committed.

## 3. What was NOT done or verified

- React, TypeScript, Vite and Zod are still not covered by an ADR; they remain "under
  consideration" in CURRENT_STATE.
- CLAUDE.md "Architecture invariants" were not updated with the new ADRs.

## 4. Known issues, ambiguities and interpretations

- **React Router mode was not specified** by the user; added as #40 with "declarative" as
  the Proposed answer.
- Topics 5–10 were grouped into three ADRs (0016–0018) instead of one ADR per topic, to keep
  related database rules together.
- `CURRENT_STATE.md` still lists **product research** as "Draft, awaiting review", although it
  was committed (`4463e96 docs: add product research`). Not changed, because the commit alone
  does not say it was approved.

## 5. Suggestions (out of scope)

- Add the key rules of ADR-0016 and ADR-0017 to CLAUDE.md's "Architecture invariants"
  (room-readable tables hold only time data; room Presence uses private channels).
- Record React, TypeScript and Vite in an ADR at the start of Phase 1.
