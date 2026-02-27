

## Update Homepage Video Portfolio Grid

Replace the 6 portfolio items in `src/components/home/VideoPortfolioSection.tsx` with new videos matching the requested layout.

### New Grid Layout

| Row | Type | Position | Video | Vimeo ID |
|-----|------|----------|-------|----------|
| 1 | Full | — | Mental Health Awareness (lightbox opens **1140514160**) | preview: 1168718317, lightbox: 1140514160 |
| 2 | Pair | Left | Iris Ministries — Malawi | 1140283574 |
| 2 | Pair | Right | Lakeridge Health — I Belong Initiative | 1140641190 |
| 3 | Full | — | Hair for Self-Esteem | 1135409664 |
| 4 | Pair | Left | Black Creek Community Health Ambassadors | 833854968 |
| 4 | Pair | Right | Octavia Sampson — Wellness Educator | 1142229793 |

### Technical Details

**File**: `src/components/home/VideoPortfolioSection.tsx`

- Update the `portfolioItems` array (lines 16-23) with 6 new entries
- Row 1 keeps its existing `previewVimeoId: "1168718317"` but changes `vimeoId` to `"1140514160"` so the lightbox plays the correct video
- For rows 2-4, set both `previewVimeoId` and `vimeoId` to the same Vimeo ID (the actual project video), since no separate preview clips exist for these
- Lakeridge and Black Creek will use `background=1` in the iframe embed, so Vimeo handles the silent autoplay loop natively (no SDK-based start offset needed on the homepage since the homepage cards don't use the Player SDK)
- Update titles and categories to match the actual projects

