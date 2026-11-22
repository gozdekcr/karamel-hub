# 001 — Review uncommitted changes

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/001-review-uncommitted-changes.md`](../prompts/001-review-uncommitted-changes.md)

## 1. What was done

Reviewed every uncommitted change (`git status`, `git diff`, all untracked files) against
the last commit `bff7d98`. No file was changed except creating this task's prompt and
this report. Nothing was committed.

**Uncommitted changes reviewed**

| File | Change |
| --- | --- |
| `CLAUDE.md` | ADR edit rule (uncommitted ADRs may be edited); invariants for ADR-0011 and ADR-0013 |
| `docs/CURRENT_STATE.md` | Room rows rewritten (owners, creator role, leaving, empty rooms, deleting) |
| `docs/OPEN_QUESTIONS.md` | #17, #18 removed; resolved note |
| `docs/decisions/0013-room-model-multiple-owners.md` | Rewritten: creator role, permissions table, deletion rules |
| `docs/decisions/README.md` | ADR edit rule |
| `docs/prompts/000-context-check-v4.md` … `v8.md` | New |
| `docs/reports/000-context-check-v4.md` … `v8.md` | New |
| `docs/prompts/001-review-uncommitted-changes.md`, this report | New (this task) |

## 2. What was verified, and how

- `git log`, `git show --stat bff7d98` and `git show bff7d98:<ADR-0013>`: ADR-0013 was
  committed in `bff7d98` in its v3 state.
- `grep` for leftover references to removed open questions and the old owner model: none
  found outside reports and prompts (history).
- Checked that `CURRENT_STATE.md`, `decisions/README.md`, `OPEN_QUESTIONS.md`, `CLAUDE.md`
  and ADR-0013 describe the same room rules.

## 3. Findings

### Important

1. **ADR-0013 was already committed when it was edited in v4–v8.** The user committed
   `bff7d98` (containing ADR-0013 v3) after v3. From v4 on, ADR-0013's decision was changed
   in place, and reports v4–v8 wrongly say it was "uncommitted". This was not checked with
   `git status` at the time. Under the rule in `CLAUDE.md` (only uncommitted ADRs may be
   edited), the v4–v8 changes need a decision:
   - **Option A — new ADR (follows the rule):** restore ADR-0013 to its committed text,
     set it to `Superseded by ADR-0014`, and move the current content into a new
     ADR-0014. Update `CURRENT_STATE.md`, `decisions/README.md`, `CLAUDE.md`,
     `OPEN_QUESTIONS.md` and ADR-0012 references.
   - **Option B — keep the in-place edit:** accept it as a one-time exception approved by
     the user, and add a note in ADR-0013 saying it was revised after commit `bff7d98`.
   - In both cases, the wrong "uncommitted" statements in reports v4–v8 should be
     corrected with a short note.

### Minor

2. **Commit messages are not Conventional Commits:** `add Phase 0 documentation skeleton`
   and `add: context check v2 and v3`. `CLAUDE.md` expects e.g. `docs: …`. Existing
   commits do not need to change; this is for future commits.
3. **`OPEN_QUESTIONS.md` resolved note is outdated in one detail:** it says "the creator
   role is handed over on leave"; since v8 it can be handed over at any time.
4. **Formatting:** in `CLAUDE.md` the ADR-0013 invariant has an odd line break ("A room
   with no / members"); ADR-0013's Context has one overlong line (119 characters).
5. **`CURRENT_STATE.md` ADR table:** the ADR-0013 summary ("multiple owners") does not
   mention the creator role, its main rule.
6. **Line endings:** Git warns that LF will be replaced by CRLF. Harmless, but a
   `.gitattributes` file would make it consistent.

### No problem found

- Room rules are consistent across `CURRENT_STATE.md`, `CLAUDE.md`, `OPEN_QUESTIONS.md`
  and ADR-0013 (permissions table matches the Decision section).
- ADR-0012 matches ADR-0013 (owners change the limit; the creator chooses it first).
- No Turkish text in new prompt/report files.

## 4. What was NOT done or verified

- No findings were fixed; this task was a review only.
- Older reports (v4–v8) were not corrected yet (depends on finding 1).

## 5. Suggestions (out of scope)

- Before each round that edits an ADR, check `git status` / `git log` to know whether it
  is committed (the cause of finding 1).
