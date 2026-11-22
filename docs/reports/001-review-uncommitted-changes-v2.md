# 001 — Review uncommitted changes (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/001-review-uncommitted-changes-v2.md`](../prompts/001-review-uncommitted-changes-v2.md)

## 1. What was done

**Finding 1 — Option A (new ADR)**

- `docs/decisions/0014-room-model-creator-role.md` — **new, Accepted.** The content that
  had been written into ADR-0013 during 000 v4–v8 (creator role, permissions table,
  deletion rules). Supersedes ADR-0013. The overlong Context line was rewrapped.
- `docs/decisions/0013-room-model-multiple-owners.md` — restored to its committed text
  (`bff7d98`); only the status changed to `Superseded by ADR-0014`.
- References moved from ADR-0013 to ADR-0014: `CLAUDE.md` (invariant),
  `docs/CURRENT_STATE.md` (room owners row, ADR table, progress), `docs/decisions/README.md`,
  `docs/OPEN_QUESTIONS.md` (#15, resolved note), `docs/WORKFLOW.md` (ADR range),
  `docs/decisions/0012-room-member-limit.md` (three cross-references; its decision is unchanged).
- ADR-0004 still says `Superseded by ADR-0013`, which stays correct as history.
- `docs/reports/000-context-check-v4.md` … `v8.md` — a short correction note under the
  header: ADR-0013 was already committed, so "uncommitted" in those reports is wrong.

**Minor findings**

- Finding 2 (commit messages): nothing to change in files; future commits should use `docs: …`.
- Finding 3: `OPEN_QUESTIONS.md` resolved note rewritten; it now says the creator role can
  be handed over at any time (and must be when leaving).
- Finding 4: `CLAUDE.md` invariant line break fixed; ADR Context rewrapped (in ADR-0014).
- Finding 5: `CURRENT_STATE.md` ADR table — the ADR-0014 summary mentions the creator role.
- Finding 6: `.gitattributes` added: `* text=auto eol=lf`.

## 2. What was verified, and how

- `git diff` of ADR-0013: only the status line differs from the committed version.
- `grep` for ADR-0013 references outside `reports/` and `prompts/`: only ADR-0004's status,
  ADR-0014's "supersedes" lines and the ADR index remain (all intentional).
- `git diff --stat`: the LF → CRLF warnings no longer appear.
- `git ls-files --eol`: all 33 tracked files are stored with LF in the index.
- Nothing was committed.

## 3. What was NOT done or verified

- The text "uncommitted" inside the v4–v8 report bodies was not edited; the note at the top
  corrects it.
- `.gitattributes` affects files on future checkouts; existing working-copy files were not
  renormalized (not needed: they are already LF).

## 4. Known issues, ambiguities and interpretations

- ADR-0014's file name (`0014-room-model-creator-role.md`) and title were chosen by Claude Code.

## 5. Suggestions (out of scope)

- Suggested commit message: `docs: add ADR-0014 room creator role and review fixes`.
