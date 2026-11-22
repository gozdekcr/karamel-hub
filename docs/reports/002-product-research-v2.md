# 002 — Product research (v2)

Date: 2026-11-22 · Phase 0 · Prompt: [`../prompts/002-product-research-v2.md`](../prompts/002-product-research-v2.md)

## 1. What was done

- Opened and read the source pages behind the † claims and the key conclusions (punishment
  complaints, streaks, "no app shows shared time") using six page-reading runs; 30+ URLs
  attempted.
- `docs/PRODUCT_RESEARCH.md` rewritten with verification labels: **[verified]**,
  **[not verified]** (with the reason), **[contradicted]**; unlabeled claims remain
  first-pass (search summaries). The † marker is gone.
- New sections: **Target users (sourced)** in Findings and **3. Target users for Karamel-hub
  (inference)**.
- Comparison table: new "Time-together stat" column; corrected cells (Forest streak ✅,
  Finch reward = rainbow stones, unverified cells marked "nv").
- `docs/OPEN_QUESTIONS.md`: #10, #24, #26 notes adjusted to the verified evidence; new
  **#29 (Proposed)** primary user group.

## 2. Verification results

| Claim | Result |
| --- | --- |
| † Forest: hard to get friends to join | **Verified** — but on the App Store page, not the Headway review (link corrected) |
| † Habitica: party members' missed tasks hurt others | **Not verified** — wiki (402) and Internet Matters unreadable |
| † Habitica: death loses level, gold, gear; Pause Damage | **Not verified** — wiki (402), FAQ JavaScript-only, Wikipedia silent |
| † Finch: missed day, bird does not suffer | **Not verified** as worded (WhistleOut 403); Engadget **verifies** "no guilt", "no real consequences" |
| † Duolingo Weekend Amulet | **Verified**, with results (+4% return a week later, 5% fewer lost streaks; 2017) |
| Forest: tree withers; group fails if one gives up | **Verified** |
| Forest: coins too slow | **Not verified** |
| Study Bunny: coin loss on pause; "4 coins per hour" | **Not verified**; timer-stops complaint **verified** |
| Habitica: health loss | **Partly verified** (bad habits; missed dailies only implied) |
| Mutra "shame spiral" | **Not verified** (host does not resolve) |
| Buttondown essay: punishment → avoidance; lost streak → avoidance | **Verified** (opinion essay) |
| Duolingo: loss aversion, freeze, revival event | **Verified** |
| Users quitting Duolingo after a lost streak | **Not verified** (UX Collective, Medium 403) |
| Finch: goals give "energy" | **Contradicted** — Engadget: goals award rainbow stones |
| No app shows time studied together | **Not found on any page read** (Forest, Focusmate, StudyStream, YPT, Flocus, Finch, Study Bunny, Focus Friend); Habitica and Pomofocus not checked |

**Effect on conclusions:** the punishment conclusion was weakened — punishment mechanics are
verified, direct user complaints about them mostly are not. The streak conclusion now rests
on Duolingo's own A/B results and one opinion essay. "Rewards too slow" is now an
assumption. The shared-time conclusion held on every page read.

## 3. What was NOT done or verified

- First-pass claims that were not part of the key conclusions were not re-checked; they
  remain unlabeled.
- Unreadable pages were not retried through other routes (e.g. a browser).
- Target users are inferred from the brief and from how similar apps describe their users;
  no interviews or surveys.

## 4. Known issues, ambiguities and interpretations

- Verification was done by page-reading subagents (web-fetch); their quotes were used as
  reported. App Store pages show only a few reviews.
- Several sources are old (Duolingo A/B results from 2017).

## 5. Suggestions (out of scope)

- Check the Habitica FAQ and wiki in a real browser if Habitica's failure mechanics matter
  for a decision.
- A few short interviews with the intended users would replace the inferred target-user
  section with real evidence.
