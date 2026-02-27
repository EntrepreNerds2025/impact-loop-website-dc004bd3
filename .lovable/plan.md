

## Update Rotating Headlines and Video Preview Duration

### 1. Update rotating headline text in `RotatingWord.tsx`

Change the three headlines from:
- "Stories that Earn Donor Trust." (keep as-is)
- "Stories that Earn Partner Trust." --> "Stories that Earn Community Trust."
- "Stories that Earn Stakeholder Trust." --> "Stories that Drive Action."

### 2. Limit video preview playback to 10 seconds

The Vimeo background embeds in `VideoPortfolioSection.tsx` currently autoplay and loop indefinitely. Vimeo's background embed API does not support a native "stop after X seconds" parameter, so we will:

- Add a time-based approach using React state: each `VideoCard` will mount with the iframe visible, then after 10 seconds, hide the iframe (letting the static thumbnail show through) or use the Vimeo `#t=0s` fragment plus a timer to remove/reset the iframe `src` after 10 seconds.
- Specifically: wrap the iframe in a component that uses `useEffect` with a 10-second `setTimeout` to set a `showPreview` state to `false`, which removes the iframe and leaves the thumbnail fallback visible.
- The preview will play once for 10 seconds when the card scrolls into view, then stop and show the thumbnail.

### Files to modify

| File | Change |
|------|--------|
| `src/components/home/RotatingWord.tsx` | Update lines 5-7 with new headline text |
| `src/components/home/VideoPortfolioSection.tsx` | Add 10-second timer logic to `VideoCard` to hide the Vimeo iframe after 10 seconds |

