

## Add 6 New Projects to the Work Page

Append 6 new project entries (IDs 7-12) to the existing `projects` array in `src/pages/Work.tsx`, bringing the total to 12. The "View More" button will automatically kick in since `VISIBLE_COUNT` is 6.

### New Projects

| # | Title | Category | Vimeo ID |
|---|-------|----------|----------|
| 7 | Reddit AI Search Event Recap | Event Recaps | 1168847247 |
| 8 | Iris Ministries -- Malawi | Impact Stories | 1140283574 |
| 9 | Canadian Institute for People of Afrikan Ancestry | Initiatives | 1140284690 |
| 10 | Hair for Self-Esteem | Program Highlights | 1135409664 |
| 11 | Black Creek Community Health Ambassadors | Initiatives | 833854968 |
| 12 | KidTalks Global | Promo & Hero Videos | 1145353261 |

### Write-ups (Problem > Solution > Execution)

1. **Reddit AI Search Event Recap** -- In collaboration with Jessica Alex Marketing, Impact Loop helped bring a Reddit-led event to life through story-first visual production. The event explored how AI search is reshaping discovery online and why human conversation and community context are becoming the new trust layer for brands and audiences. We produced full-length speaker videos designed for education and long-term reuse, alongside a social content package that turned key moments into shareable clips -- building momentum for the next event while giving attendees a reason to revisit the insights.

2. **Iris Ministries -- Malawi** -- Iris Ministries needed to give their global supporters a window into the daily reality of their work in southern Malawi -- from feeding programs and children's education to church planting and prison ministry. The challenge was translating the scale of 450 churches and countless lives touched into something personal and emotionally resonant. We produced a cinematic piece that captures the laughter, the worship, and the gratitude on the ground -- giving donors and prayer partners a tangible connection to the impact their generosity makes possible.

3. **Canadian Institute for People of Afrikan Ancestry** -- CafCan, with support from the Government of Canada, is leading the development of CIPAA. They needed coverage of a key discussion session that brought together professionals and advocates to shape the institute's direction. The challenge was broadening engagement beyond those who had participated in earlier consultations. We produced a documentary-style recap capturing the camaraderie, the fresh voices, and the shared commitment to building generational capacity within the community -- a piece designed to fuel continued engagement and demonstrate the collaborative process to stakeholders.

4. **Hair for Self-Esteem** -- In collaboration with the Muamba Foundation, the Bartley Skills Development Program, and Aylesbury Public School, this initiative was born from a heartbreaking reality: a young girl was contemplating self-harm because her family couldn't afford to have her hair done. We produced a video capturing the power of what happens when community steps in -- professional braiders volunteering their craft, educators creating safe spaces, and students walking away with the confidence to raise their hands in class. The result is a piece that proves self-esteem starts with being seen.

5. **Black Creek Community Health Ambassadors** -- Black Creek Community Health Centre needed to showcase their innovative Community Health Ambassador model -- a grassroots approach born during the pandemic where trusted community members became the bridge between residents and critical health services. The video captures ambassadors delivering meals, checking blood pressure, and building the kind of trust that institutions alone can't create. The piece helped inspire other community centres across the region to adopt the same model, proving that health equity starts with the people who already belong to the community.

6. **KidTalks Global** -- Dr. Gregg Gary, educator and motivational speaker, had a vision: a ten-week leadership and speaking program designed to equip kids with the confidence, communication skills, and moral foundation to thrive in a world dominated by screens. He needed a hero video that would make parents feel the urgency and the opportunity. We produced a cinematic piece that frames the problem -- social media replacing real connection -- and positions KidTalks as the solution, helping every child discover their right heart, right mind, and right voice leading to right action.

### File Changes

| File | Change |
|------|--------|
| `src/pages/Work.tsx` | Append 6 new entries (IDs 7-12) to the `projects` array after line 54, before the closing `];` |

### Technical Notes

- No structural changes needed -- the existing `VISIBLE_COUNT = 6` means the first 6 show by default and the "View More" button reveals the rest
- All Vimeo IDs are numeric and compatible with the existing preview loop and lightbox
- Categories used align with the existing filter tabs

