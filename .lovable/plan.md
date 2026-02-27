

## Fix Vimeo Preview Videos to Fill Containers Edge-to-Edge

### Problem
The Vimeo background embeds maintain their native aspect ratio (16:9) inside the wider 2.35:1 containers, leaving visible gaps (the thumbnail image showing through) on the sides -- especially noticeable on full-width rows.

### Solution
Scale the iframe beyond the container bounds so the video covers the entire area, cropping the excess. This mimics `object-fit: cover` behavior for iframes.

### Technical Details

**File: `src/components/home/VideoPortfolioSection.tsx`**

Update the iframe styling on line 49 to scale it larger than the container. Since the container is wider (2.35:1) than the video (16:9 = 1.78:1), we need to scale the iframe width to fill horizontally, which means scaling up by roughly 133% (2.35/1.78). To be safe and account for slight variations, we'll use a transform that scales to ~140% and centers it:

- Change the iframe from `className="absolute inset-0 w-full h-full"` to use a sizing/transform approach that overflows and covers:
  - Set width/height to `120%` (wider than container)
  - Center with `top: 50%; left: 50%; transform: translate(-50%, -50%)`
  - The parent already has `overflow-hidden` so the excess gets clipped cleanly

This is a small CSS-only change to the iframe element -- no structural or logic changes needed.

