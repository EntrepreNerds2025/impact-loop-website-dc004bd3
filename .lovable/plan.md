

## Replace Work Page Projects with Real Client Videos

Replace the 6 placeholder projects in `src/pages/Work.tsx` with the real client videos, each with a tailored write-up covering the problem, solution, and execution.

### New Projects Data

| # | Title | Category | Vimeo ID |
|---|-------|----------|----------|
| 1 | Octavia Sampson -- Wellness Educator | Impact Stories | 1142229793 |
| 2 | Lakeridge Health -- I Belong Initiative | Initiatives | 1140641190 |
| 3 | Breathe Mindful Living | Promo & Hero Videos | 1168844885 |
| 4 | CafCan -- Our People's Keeper Program Launch | Program Highlights | 1143331891 |
| 5 | Muamba Foundation x Bartley Skills Winnipeg | Event Recaps | 1159742453 |
| 6 | Millions Retreat Full Recap | Event Recaps | 1064687560 |

### Write-up Approach

Each description will follow a **Problem > Solution > Execution** narrative drawn from the transcripts and context provided:

1. **Octavia Sampson** -- Psychotherapist wanting to scale her impact beyond one-on-one sessions, grow her personal brand, and reach women globally. We crafted a hero video anchored in her authentic story of becoming a safe place for others, capturing her journey from childhood curiosity to professional calling.

2. **Lakeridge Health** -- Needed to communicate their I Belong initiative internally and publicly, showing how inclusion, compassion, innovation, teamwork, and joy translate into better outcomes. We produced a documentary-style piece featuring staff voices that helped drive inclusivity results, public awareness, and institutional alignment with their IDEAA action plans.

3. **Breathe Mindful Living** -- A new wellness app needed a launch promo that captured the feeling of mindful living without being preachy. We created a cinematic piece grounded in the idea that calm is a choice, positioning the app as a community for people ready to live with more clarity and intention.

4. **CafCan Our People's Keeper** -- After securing improved funding, CafCan needed to visually demonstrate the impact of their employment program for newcomers. We produced a launch recap featuring testimonials from counselors and participants, followed by a series of cohort session videos for their impact report.

5. **Muamba Foundation x Bartley Skills** -- The Muamba Foundation, Brands for Canada, and Bartley Skills Development Program hosted a community event at Gordon Bell High School in Winnipeg. We collaborated with Butter Knife Creative to produce a recap video capturing the energy of the event and the confidence it built in participating youth.

6. **Millions Retreat** -- The retreat needed to showcase the value it delivers to its entrepreneurial members. We produced a full recap capturing the motivation, education, and empowerment that the event brings to founders starting and scaling their businesses.

### File Changes

| File | Change |
|------|--------|
| `src/pages/Work.tsx` | Replace the `projects` array (lines 11-54) with the 6 new entries above, keeping all other code (categories, `ProjectRow`, filtering, View More, lightbox) unchanged |

### Technical Notes

- No structural changes to the page -- only the data array is swapped
- All Vimeo IDs are numeric and will work with the existing embed and lightbox logic
- Categories remain: All, Impact Stories, Initiatives, Program Highlights, Event Recaps, Promo & Hero Videos
- The 10-second preview loop and click-to-lightbox behavior stay the same
