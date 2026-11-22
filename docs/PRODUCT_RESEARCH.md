# Product research

- **Research date:** 2026-11-22 (first pass and verification pass on the same day)
- **Tasks:** [`prompts/002-product-research.md`](prompts/002-product-research.md),
  [`prompts/002-product-research-v2.md`](prompts/002-product-research-v2.md)
- **Scope:** core loop, social features, gamification (rewards, collection, streaks and what
  happens when a streak breaks), statistics, user complaints, and target users.
  Monetization is out of scope and left out on purpose.

## How this research was done (read first)

- **First pass:** web searches. Those claims come from **search-result summaries** of the
  linked pages; the pages were not opened one by one.
- **Verification pass (v2):** the key claims were checked by **opening and reading the source
  pages**. Every checked claim carries a label:
  - **[verified]** — the page was read and the claim (or the quote) was found on it.
  - **[not verified]** — the page could not be read (blocked, error, or rendered only with
    JavaScript), or it was read and the claim was not on it. The reason is given.
  - **[contradicted]** — the page was read and says something different.
  - Claims **without a label** are from the first pass only (search summaries).
- Pages that could not be read: the Habitica Fandom wiki (HTTP 402), the Habitica FAQ
  (JavaScript only), `mutra.pages.dev` (host does not resolve), Internet Matters on Habitica
  (connection reset), WhistleOut and Headway's Finch reviews (403 / 404), UX Collective and
  Medium on Duolingo (403), the EA Forum post on Focusmate (429).
- App Store and review quotes are **individual user opinions**. App Store pages show only a
  few reviews, so "not found in reviews" does not mean nobody complains about it.
- Reddit did not appear in the results; forum coverage is thin.
- "Not found" means the research did not surface it — not that the feature does not exist.

Apps reviewed: Forest, Focusmate, StudyStream, YPT, Flocus, Pomofocus, Habitica, Finch, plus
three added by Claude Code: **Study Bunny** and **Focus Friend** (study timers with a pet /
character and a cosmetic collection — closest to Karamel-hub's cats) and **Duolingo** (only
as the best-documented example of streak mechanics).

---

## 1. Findings (sourced only)

### Forest

- **Core loop:** a virtual tree grows while you focus; if you leave the app, it withers —
  "Leave early and it withers" ([App Store](https://apps.apple.com/us/app/id866450515)),
  "Open another app, and the tree dies" ([forestapp.cc](https://forestapp.cc/)) **[verified]**.
  Coins are earned from sessions; focus milestones unlock tree species and soundscapes
  ([App Store](https://apps.apple.com/my/app/id866450515)). Coins can be used to plant real
  trees through Trees for the Future ([forestapp.cc](https://forestapp.cc/)).
- **Social:** group focus where "if anyone gives up, the whole forest falls"
  ([forestapp.cc](https://forestapp.cc/)) **[verified]**; the App Store says "Co-plant trees
  with friends and family during shared focus sessions" and "Compete with users around the
  world" ([App Store](https://apps.apple.com/us/app/id866450515)) **[verified]**. The plan
  comparison on [forestapp.cc](https://forestapp.cc/) lists "Friends & Leaderboard"
  **[verified]**.
- **Gamification:** tree species collection and achievements
  ([App Store](https://apps.apple.com/my/app/id866450515)). Streaks are tracked: "Track focus
  patterns, streaks, and total focused hours by day, week, or month"
  ([forestapp.cc](https://forestapp.cc/)) **[verified]**. What happens when a streak breaks:
  not found.
- **Statistics:** custom tags, weekly / monthly / yearly views and a timeline
  ([App Store](https://apps.apple.com/my/app/id866450515)); focus patterns, streaks and total
  hours by day, week or month ([forestapp.cc](https://forestapp.cc/)) **[verified]**. No
  statistic of time focused *together* was found on the pages read **[verified absence on
  forestapp.cc and both App Store pages]**.
- **Complaints:**
  - Getting friends to join is hard: "I've tried to get many people to join the app and
    plant trees with me … each time it's pretty difficult" (review, 2022)
    ([App Store](https://apps.apple.com/us/app/id866450515)) **[verified]**. *(In the first
    pass this was wrongly linked to a Headway review.)*
  - Coins feel slow ("less than half a coin per minute") **[not verified]** — not found on
    the App Store pages or the Headway review that were read.
  - Strict settings can punish accidental session starts
    ([Pratt design critique](https://ixd.prattsi.org/2022/09/design-critique-forest-ios-app/)).
  - Tree withering when split screen is activated
    ([user forum post](https://forums.justuseapp.com/en/post/WYINLMIOBU/tree-withers-instantly-when-split-screen-is-activated)).

### Focusmate

- **Core loop:** book a session (25, 50 or 75 minutes), meet a partner on video, say what you
  will work on, work mostly muted, and check in at the end
  ([focusmate.com](https://www.focusmate.com/),
  [founder's guide](https://www.focusmate.com/blog/guide-post)). The FAQ states "you aren't
  'hanging out' or collaborating with your partner", and partners cannot chat
  ([FAQ](https://www.focusmate.com/faq)) **[verified]**.
- **Social:** one-to-one matching with a stranger; "Over 99% of bookings get matched"
  ([FAQ](https://www.focusmate.com/faq)) **[verified]**; favorite partners can be starred and
  booked easily ([focusmate.com](https://www.focusmate.com/)) **[verified]**.
- **Gamification:** streaks on profiles and weekly emails with attendance score, session
  count and streak ([2018 update: streaks](https://www.focusmate.com/blog/feature-update-august-13-2018-streaks-auto-cancel/),
  [2018 update: weekly reports](https://www.focusmate.com/blog/product-update-august-27-2018-email-settings/)).
- **Statistics:** limited in the app; a community dashboard tracks "session streaks, goals,
  and history" ([Focusbeacon on GitHub](https://github.com/qu8n/focusbeacon)) **[verified]**.
  No statistic of time spent with specific partners was found **[verified absence on the
  homepage, FAQ and Focusbeacon]**.
- **Complaints:**
  - Partners who do not show up without cancelling ([G2 reviews](https://www.g2.com/products/focusmate/reviews)).
  - Partners leaving the mic on or seemingly watching TV
    ([review guide](https://flat.social/guides/focusmate-review)).
  - The effect wears off within a day
    ([inkl article](https://www.inkl.com/news/11-strangers-watched-me-write-this-article-is-this-the-answer-to-our-productivity-crisis)).

### StudyStream

- **Core loop / social:** live focus rooms with "hundreds of people inside at any time";
  "You decide who to pin on your screen"
  ([StudyStream blog, 2026](https://www.studystream.live/blog/focus-rooms-get-work-done-together-without-the-pressure))
  **[verified]**. In 2021 the rooms ran on Zoom with "up to 1,000 other students"
  ([TechCrunch](https://techcrunch.com/2021/10/06/studystream-gives-students-a-place-to-study-live-with-thousands-of-others/))
  **[verified]**.
- **Gamification:** "Pin study partners who hold you accountable and celebrate your daily
  streaks" ([App Store](https://apps.apple.com/us/app/studystream/id6461722416))
  **[verified]**. What happens when a streak breaks: not found.
- **Statistics:** no statistic of time studied together was found **[verified absence on
  the App Store page and blog post]**.
- **Complaints:** the mobile app does not show who you follow, so finding friends online is
  slow; connection bugs ([App Store reviews](https://apps.apple.com/us/app/studystream/id6461722416)).
- **Related risk (not StudyStream):** a media report found public online study rooms on
  another platform full of vulgar content
  ([Sixth Tone](https://www.sixthtone.com/news/1012103/online-study-rooms-rife-with-vulgar-content%2C-media-report-says)).

### YPT (Yeolpumta)

- **Core loop:** a study timer with free study or Pomodoro, and an "allowed apps" mode
  ([App Store](https://apps.apple.com/us/app/yeolpumta/id1441909643)).
- **Social:** "Create groups to check out friends' status and study activities"; "Realtime
  ranking: Get to know your rank in the same study category"; "Record your study time and
  share it with friends"; newer "Relative stats. See where your study time stands among
  people like you" ([App Store](https://apps.apple.com/us/app/yeolpumta/id1441909643))
  **[verified]**.
- **Statistics:** day / week / month records; "color gets deeper as you study more"
  ([App Store](https://apps.apple.com/us/app/yeolpumta/id1441909643)). Sharing is of
  individual records; no joint "studied together" statistic was found **[verified absence
  on the App Store page]**.
- **Gamification:** no collection or currency found.
- **Complaints:** crashes after updates and a timer that could not be ended
  ([JustUseApp reviews](https://justuseapp.com/en/app/1441909643/ypt-yeolpumta/reviews));
  language switching unexpectedly; requests for more timezone/region options
  ([App Store reviews](https://apps.apple.com/us/app/yeolpumta/id1441909643)).

### Flocus

- **Core loop:** a browser-based, aesthetic focus dashboard: timer modes
  ([timer](https://flocus.com/features/focus-timer)), layered ambient sounds
  ([soundscapes](https://flocus.com/features/soundscapes)), themed backgrounds
  ([flocus.com](https://flocus.com)), and a to-do list ([tasks](https://flocus.com/features/tasks)).
- **Statistics / streak:** individual stats: "focus time, break time, tasks completed,
  session counts, and streaks" ([stats](https://flocus.com/features/stats)) **[verified]**.
- **Social:** none found **[verified absence on the stats page]**. **Complaints:** not found.

### Pomofocus

- **Core loop:** a browser-based Pomodoro timer: add the day's tasks, estimate pomodoros per
  task, get an estimated finish time, save task templates
  ([pomofocus.io](https://pomofocus.io/)).
- **Statistics:** visual reports of focused time ([pomofocus.io](https://pomofocus.io/llms.txt)).
- **Social / gamification:** not found.
- **Complaints:** a user found an empty report and lost tasks after logging in (single,
  older anecdote) ([Product Hunt](https://www.producthunt.com/posts/pomofocus)).

### Habitica

- **Core loop:** habits, dailies and to-dos. Recording a bad habit costs health ("If they
  record not taking the stairs, they will lose health"); to-dos "do not damage health",
  implying habits and dailies can ([Wikipedia](https://en.wikipedia.org/wiki/Habitica))
  **[verified, partly: missed dailies costing health is only implied]**.
- **Social:** parties take on quests together; one member's missed tasks can hurt the party
  **[not verified]** — the Habitica wiki and Internet Matters could not be read. Wikipedia
  says the Tavern and guilds (social spaces) were removed on August 8, 2023
  ([Wikipedia](https://en.wikipedia.org/wiki/Habitica)) **[verified]**.
- **Gamification:** pets hatched from eggs and potions, fed into mounts
  ([Habitica Wiki](https://habitica.fandom.com/wiki/Habitica_Wiki)).
- **When you fail:** on death you lose a level, all gold and a piece of equipment, and a
  "Pause Damage" setting exists **[not verified]** — the wiki (HTTP 402) and FAQ (JavaScript
  only) could not be read, and Wikipedia does not mention death.
- **Complaints / critique:**
  - An essay argues "Punishing people for not getting things perfect just makes them
    avoidant and neurotic", and about streaks: when you lose one, "you get pissed off and
    start avoiding the thing" ([Buttondown essay, 2022](https://buttondown.com/matociquala/archive/gamification-might-be-bad-actually/))
    **[verified]**. It is an opinion essay and mentions Habitica only in passing.
  - Punishment causing a "shame spiral" **[not verified]** — the Mutra page does not load.
  - Buggy and slow, few new releases ([Product Hunt](https://www.producthunt.com/posts/habitica)).
  - Not enough content at higher levels ([App Store](https://apps.apple.com/gb/app/id994882113)).

### Finch

- **Core loop:** you set your own goals; completing them awards **rainbow stones**; you dress
  up the bird, decorate its home and send it on adventures
  ([Engadget, 2025](https://www.engadget.com/apps/this-self-care-virtual-pet-is-helping-me-get-my-act-together-160027169.html))
  **[verified]**. The App Store says mood checks "energize your pet to go exploring" and the
  pet comes "back from adventures to share stories"
  ([App Store](https://apps.apple.com/us/app/finch-self-care-pet/id1528595748)) **[verified]**.
  *The first-pass claim that completing goals gives "energy" is **[contradicted]** by Engadget
  (goals → rainbow stones).*
- **Social:** friends can be added with a code, and birds can visit each other's homes
  ([Engadget](https://www.engadget.com/apps/this-self-care-virtual-pet-is-helping-me-get-my-act-together-160027169.html))
  **[verified]**. No time-together statistic **[verified absence]**.
- **Streaks:** a streak exists ("my longest one yet: 32 days!") and opening the app daily
  comes with rewards; Finch "doesn't take the guilt approach"; "There aren't really any
  consequences" ([Engadget](https://www.engadget.com/apps/this-self-care-virtual-pet-is-helping-me-get-my-act-together-160027169.html))
  **[verified]**. A user review: "You also don't get penalized/made to feel bad if you don't
  complete some goals" ([App Store](https://apps.apple.com/us/app/finch-self-care-pet/id1528595748))
  **[verified]**. The specific claim "the bird does not suffer" **[not verified]** (WhistleOut
  returned 403).
- **Complaints:** the energy mechanic and notification volume get in the way
  ([unstar.app comparison](https://unstar.app/vi/blog/day-one-journey-reflectly-stoic-finch-journaling-apps-ranked-2026)).

### Study Bunny (added)

- **Core loop:** "Earn coins. Buy items or music in the store!"; "Hit pause when you can't
  stay focused for motivational advice!" ([App Store](https://apps.apple.com/us/app/id1478345385))
  **[verified]**.
- **Penalty:** losing coins after a long pause **[not verified]** — not on the listing that
  was read (the listing describes pause as giving motivational advice).
- **Complaints:** "the timer shuts off when I pull up another app for my study" (review,
  2022) ([App Store](https://apps.apple.com/us/app/id1478345385)) **[verified]**. "Only 4
  coins in about an hour" **[not verified]** — not among the visible reviews. Ads
  complaints: first pass only.

### Focus Friend (added)

- **Core loop:** a bean knits while you stay off your phone; opening other apps makes it drop
  its knitting; socks are traded for room decorations
  ([Fast Company](https://www.fastcompany.com/91388304/focus-friend-app-store-hank-green-bria-sullivan),
  [App Store](https://apps.apple.com/US/app/id6742278016)). "The app temporarily blocks
  distractions, like social media, while the timer runs"
  ([NBC News](https://www.nbcnews.com/tech/tech-news/hank-green-focus-friend-app-rcna225967))
  **[verified]**.
- **Social / shared statistics:** none found **[verified absence on the App Store page]**.
- **Recognition:** App Store Award 2025, Cultural Impact
  ([App Store story](https://apps.apple.com/bb/ipad/story/id1847901870)).

### Duolingo (added, streaks only)

- The streak works through "loss aversion"
  ([Duolingo blog, 2022](https://blog.duolingo.com/how-duolingo-streak-builds-habit))
  **[verified]**.
- A streak freeze must be equipped in advance and "fills in the missing day"
  ([Duolingo blog, 2021](https://blog.duolingo.com/protecting-streaks-from-site-issues));
  up to two at a time ([Duolingo blog, 2022](https://blog.duolingo.com/how-duolingo-streak-builds-habit))
  **[verified]**.
- **Weekend Amulet test (2017):** learners offered it "were 4% more likely to come back a week
  later and 5% less likely to lose their streak"; a "Streak Wager" test raised Day-7
  retention by 14%
  ([Duolingo blog, 2017](https://blog.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals))
  **[verified]**. These are old, company-reported A/B results.
- **Revival event (June 2026):** any learner could restore an old streak of 30+ days by
  completing three lessons in one sitting
  ([PocketGamer.biz](https://www.pocketgamer.biz/duolingo-is-restoring-lost-streaks-for-a-limited-time-aiming-to-recover-lapsed-users/))
  **[verified]**.
- Users quitting after losing a long streak
  ([UX Collective](https://uxdesign.cc/3-reframing-streaks-on-duolingo-5-ideas-for-a-more-healthy-and-flexible-approach-to-language-8fd89545771e),
  [personal essay](https://medium.com/letter-from-taro/a-losing-streak-c72eeedf5c93))
  **[not verified]** — both pages returned 403. No Duolingo page with data on "streak loss
  reduces retention" was found.

### Target users (sourced)

- StudyStream addresses students: "We don't want any student to have to study alone ever
  again" ([TechCrunch](https://techcrunch.com/2021/10/06/studystream-gives-students-a-place-to-study-live-with-thousands-of-others/))
  **[verified]**.
- Focusmate is "not designed specifically for adults affected by ADHD" but "does help those
  with attentional and executive function challenges get things done"
  ([CHADD](https://chadd.org/adhd-news/adhd-news-adults/focusmate-virtual-coworking/))
  **[verified]**.
- Focus Friend is called "the ADHD-friendly app"; named users include a teacher and an
  11-year-old doing homework
  ([NBC News](https://www.nbcnews.com/tech/tech-news/hank-green-focus-friend-app-rcna225967))
  **[verified]**.

---

## 2. Inference (Claude's interpretation, not sourced)

1. **Two kinds of "studying together".** Focusmate and StudyStream use **synchronous video**;
   YPT and Forest use **ambient status**. Video brings no-shows, etiquette problems and
   moderation risk; ambient status is low-friction. Karamel-hub's rooms (ADR-0006: time-only
   visibility, no video) are in the ambient-status family, closest to YPT groups.
2. **Punishment mechanics are common; direct evidence of complaints is weaker than first
   reported.** Verified: Forest withers trees and fails the whole group; Habitica costs
   health for bad habits; an opinion essay argues punishment makes people avoidant; Finch
   users and reviewers praise the absence of penalties. Not verified: Habitica's death
   penalty, Study Bunny's coin loss, the "shame spiral" critique. The direction still holds,
   and Karamel-hub's decisions (no auto-stop, free editing, permanent cats) are on the gentle
   side — but this is a design judgment, not a measured finding.
3. **Protecting streaks pays off for Duolingo.** Its own (old) A/B tests show streak
   protection improved return and streak survival. User quitting after a lost streak is
   supported only by one opinion essay (verified) — the Duolingo-specific anecdotes could not
   be read. A streak without any forgiveness is still a risk worth designing against.
4. **Reward rate.** The "too slow to earn" complaints for Forest and Study Bunny could
   **not** be verified. Keeping early rewards fast is still reasonable, but it is now an
   assumption, not a finding.
5. **Collection + decoration is the norm** (Forest species, Habitica pets, Finch outfits and
   home decor, Focus Friend room decor, Study Bunny items). Cats alone are not unique; how
   they are earned and shown can be.
6. **Shared time looks uncommon.** On every page read in the verification pass (Forest,
   Focusmate, StudyStream, YPT, Flocus, Finch, Study Bunny, Focus Friend), no statistic of
   time studied *together* was found; YPT shares individual records and rankings, Focusmate
   explicitly says partners are not collaborating. Not checked: Habitica (pages unreadable)
   and Pomofocus. This is absence on the pages read, not proof that no app has it.
7. **Group stakes cut both ways.** Forest's "the whole forest falls" creates pressure; it
   can motivate, but turns a friend's failure into your loss.
8. **Public rooms need moderation.** Large open rooms (StudyStream; the Sixth Tone report on
   another platform) invite problems. Invite-only rooms (ADR-0014) avoid most of this.
9. **Phone-focused mechanics do not transfer.** App blocking and "leave the app and the tree
   dies" depend on mobile OS features. Karamel-hub is desktop-browser only.
10. **Target users of similar apps** are students and people who struggle with attention
    (ADHD is mentioned for Focusmate and Focus Friend). Body-doubling-style "someone is
    there" seems to be a core need.

---

## 3. Target users for Karamel-hub

### Decided by the user (2026-11-22, recorded in CURRENT_STATE)

The **primary users who drive the design** are **university students** who want to study
together but are in different places. The app is for users **aged 18 and over**.

**Goal:** members of a study group motivate each other, even remotely.

*(An earlier version also included students preparing for YKS; the user removed them
because many are under 18.)*

### Inference (Claude, not sourced)

- **Secondary:** solo users who want a calm timer, statistics and a gentle collection
  reward, without social features (solo use stays fully supported — CURRENT_STATE).
- **Also likely:** people who struggle with focus and benefit from "someone is there"
  (body-doubling style) — the ambient room presence serves them without video.
- **Not targeted:** large public study communities with strangers, mobile-first users,
  users looking for strict app blocking.
- **What the primary group implies (to be checked in later design work):**
  - Rooms are small groups of people who already know each other, which matches the
    invite-only rooms (ADR-0014) and time-only visibility (ADR-0006).
  - University study comes in waves (exam weeks vs. quiet weeks); long sessions without a
    maximum (ADR-0007), weekly/monthly statistics and a forgiving streak (#24) fit this.
  - Turkish is likely the main language at first; English stays supported (ADR-0010).
  - How the 18+ rule is applied at sign-up is open → OPEN_QUESTIONS #31 (Proposed).

---

## 4. Recommendations for Karamel-hub

### Take

- **Ambient presence in rooms** (YPT groups, Forest group focus): who is studying now and for
  how long — already in ADR-0006.
- **Gentle streaks** (Finch's no-guilt approach; Duolingo's freeze and its positive A/B
  results): a streak that can survive a missed day. → OPEN_QUESTIONS #24.
- **Color-intensity calendar** (YPT): a heatmap of daily study time. → #25.
- **Breakdown by course** (Forest tags): courses already play the role of tags; show time per
  course in personal statistics (private, never in rooms — ADR-0006).
- **Milestone unlocks + a place to show the collection** (Forest species, Finch home decor,
  Focus Friend room decor): fits cats and the planned cat room (OPEN_QUESTIONS #10).
- **Fast, visible early rewards** (assumption, see Inference 4). → part of #10.
- **Ambient sounds / themes** (Flocus): nice-to-have, low priority. → #28.

### Avoid

- **Punishing failure:** no withering, no losing coins or cats, no damage (consistent with
  ADR-0007 and ADR-0008).
- **Collective punishment** (Forest "the whole forest falls"): one member's stop must never
  cost others anything.
- **Video and open public rooms:** no-shows, etiquette and moderation problems.
- **Streaks that break without any safety net.**
- **Lost data and broken timers** (Pomofocus, YPT, Study Bunny complaints): addressed by the
  server-time session model (ADR-0003).

### What could make Karamel-hub different

- **Shared time** as a first-class room statistic ("we studied together for 3 h this week") —
  not found on any page read (Inference 6).
- **Persistent small rooms with friends**, invite-only, time-only visibility — between YPT's
  groups and Forest's group sessions.
- **Cooperative, never punitive** room goals. → #26.
- **Cats that are permanent and personal**, with a gentle streak, as the emotional reward —
  closer to Finch's tone than to Forest's or Habitica's.

---

## 5. Comparison table

✅ found · ❌ explicitly absent or opposite · — not found · (nv) not verified in v2

| App | Core reward | Social mode | Video | Currency | Collection | Streak | Streak break / failure | Penalty for distraction | Statistics | Time-together stat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Forest | Tree grows; coins; real trees | Group focus; friends & leaderboard | — | ✅ coins | ✅ tree species | ✅ | — | ✅ tree withers; whole group fails | Tags, day/week/month/year, timeline | — |
| Focusmate | Accountability with a partner | 1:1 stranger sessions, favorites | ✅ | — | — | ✅ | — | — | Limited (third-party dashboard) | — |
| StudyStream | Studying alongside others | Large live rooms, pinned partners | ✅ | — | — | ✅ | — | — | — | — |
| YPT | Time records, ranking | Groups with friends' status; ranking; relative stats | — | — | — | — | — | Allowed-apps mode | Day/week/month, color intensity | — |
| Flocus | Aesthetic focus space | — | — | — | — | ✅ | — | — | Focus/break time, tasks, sessions, streaks | — |
| Pomofocus | Tasks done in pomodoros | — | — | — | — | — | — | — | Visual reports | not checked |
| Habitica | XP, gold, pets | Parties, quests (nv) | — | ✅ gold | ✅ pets, mounts | ✅ | Death penalty (nv) | ✅ health loss for bad habits | — | not checked |
| Finch | Rainbow stones, adventures | Friends visit birds' homes | — | ✅ | ✅ outfits, home decor | ✅ | ❌ "no real consequences" | — | — | — |
| Study Bunny | Coins for a bunny | — | — | ✅ coins | ✅ items | — | — | Coin loss on pause (nv) | Study tracker | — |
| Focus Friend | Socks → room decor | — | — | ✅ socks | ✅ room decor | — | — | ✅ bean drops knitting; app blocking | — | — |
| Duolingo (streak only) | Streak | — | — | ✅ | — | ✅ | Freeze, amulet, revival event | — | — | — |
| **Karamel-hub (decided)** | Study time and streaks → cats; coins → cosmetics | Persistent invite rooms, ambient presence, chat | ❌ | ✅ ledger | ✅ cats, cosmetics | ✅ | Cats never lost; 1 forgiven day per week (ADR-0022) | ❌ none | Personal day/week/month | ✅ room shared time |
