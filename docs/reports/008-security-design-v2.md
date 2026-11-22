# 008 — Security design (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/008-security-design-v2.md`](../prompts/008-security-design-v2.md)

## 1. Files created or changed

- **New:** `docs/decisions/0027-security-baseline.md` (Accepted, user decisions) — email
  confirmation off until public launch (custom SMTP then); 32-byte invite tokens from
  `gen_random_bytes` (pgcrypto verified in Phase 1); API functions in the exposed schema
  with their own `auth.uid()` checks, helpers and internal functions in a non-exposed
  schema, `search_path = ''`, `EXECUTE` revoked from `PUBLIC` and `anon`; no extra rate
  limits for now; 1-hour JWT; browser and Auth hardening before launch; publishable key
  only.
- `docs/SECURITY.md` — Proposed markers replaced by ADR-0027; statuses updated (Covered with
  a Phase 1 test, or Open 🚀); Phase 1 setup checklist item for the new key format made
  explicit (it was already listed as K4).
- `docs/OPEN_QUESTIONS.md` — #6, #59–#64 closed with a resolved note.
- `docs/decisions/0001-backend-supabase.md` (committed) — only the Open point for #6
  points to ADR-0027.
- `docs/decisions/README.md`, `docs/CURRENT_STATE.md` — ADR-0027 rows; new product row
  "Email verification"; Security progress.

## 2. What was done, and what was NOT done or verified

- `git status` before editing: task 008 (v1) was not committed; ADR-0001 is committed and
  only its Open points changed.
- pgcrypto availability was not checked (Phase 1, as instructed).
- Nothing was committed (CLAUDE.md).

## 3. Contradictions or ambiguities

- None. Note: the user's #60 wording names only `anon`; ADR-0027 also revokes the
  `PUBLIC` default, as proposed in v1 (PostgreSQL grants `EXECUTE` to `PUBLIC` by default,
  which `anon` would otherwise inherit).

## 4. Suggestions (out of scope)

- None.
