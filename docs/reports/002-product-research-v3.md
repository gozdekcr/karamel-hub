# 002 — Product research (v3)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/002-product-research-v3.md`](../prompts/002-product-research-v3.md)

## 1. What was done

- `docs/CURRENT_STATE.md` — new product decision **Primary users**: university students
  and YKS students who want to study together from different places; goal: study-group
  members motivate each other remotely.
- `docs/PRODUCT_RESEARCH.md` §3 — split into "Decided by the user" (the primary users and
  the goal) and "Inference" (secondary users, not targeted, and what the primary group
  implies for the design).
- `docs/OPEN_QUESTIONS.md` — #29 removed (resolved → CURRENT_STATE). New **#30
  (Proposed):** age-related requirements, since many YKS students are likely under 18.

## 2. What was verified, and how

- Checked that the decision appears in CURRENT_STATE and that #29 is listed as resolved.
- Nothing was committed.

## 3. What was NOT done or verified

- No ADR was written: target users is a product decision, recorded in CURRENT_STATE like
  the other product decisions.
- "Many YKS students are under 18" and the possible legal requirements (e.g. KVKK) are
  assumptions; they were not researched.
- `PRODUCT_BRIEF.md` was not changed (it must not be rewritten).

## 4. Known issues, ambiguities and interpretations

- The inferred implications in §3 (long daily study, Turkish as main language) are Claude's
  reading of the decision, labeled as inference.

## 5. Suggestions (out of scope)

- Consider the under-18 question (#30) before the database and security design, because it
  can affect sign-up and room chat.
