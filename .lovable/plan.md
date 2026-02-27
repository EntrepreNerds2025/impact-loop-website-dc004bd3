

## Redesign the /work page to an editorial portfolio layout

Inspired by the SkyBlue Creative reference, the Work page will shift from a grid-of-cards layout to a **stacked editorial format** where each project gets its own section with a text block alongside a Vimeo preview video, alternating sides as you scroll.

### Layout concept

Each project will be a full-width row with two columns:
- **Text side**: Category tag, project title, and a longer description explaining the client's goal and Impact Loop's approach
- **Video side**: The same Vimeo background preview embed used on the homepage (looping, muted, 2.35:1 aspect ratio), clickable to open the lightbox

The text and video will **alternate sides** per project (odd rows: text left / video right, even rows: video left / text right), creating a visually engaging zigzag rhythm.

### Animations

- Each project section animates in on scroll using Framer Motion's `useInView`
- Text slides in from its respective side (`slideFromLeft` / `slideFromRight`)
- Video scales in (`scaleIn`)
- Staggered timing between text and video for a polished feel
- No category filter tabs -- the editorial flow replaces the need for filtering

### Data changes

Each project in the data array will gain:
- A `previewVimeoId` field (reusing the same IDs from the homepage `VideoPortfolioSection`)
- A longer `description` field with 2-3 sentences about the client goal and approach (placeholder copy for now since the current descriptions are one-liners)

### Hero section

Kept as-is (dark background, animated heading) but the filter bar below it is removed.

### CTA section

Kept as-is at the bottom.

### File to modify

| File | Change |
|------|--------|
| `src/pages/Work.tsx` | Complete redesign: remove grid + filter tabs, replace with alternating editorial rows using Vimeo preview embeds + longer text blocks, scroll-triggered animations, lightbox on click |

### Technical details

- Reuse `VimeoLightbox` component (already imported)
- Reuse animation variants from `@/hooks/useScrollAnimation` (`slideFromLeft`, `slideFromRight`, `scaleIn`, `staggerContainer`)
- Vimeo iframe config matches homepage: `background=1&autoplay=1&loop=1&muted=1`, scaled 140% for cover effect
- Each row uses `useInView` with `once: true` for scroll-triggered entrance
- On mobile, stacks vertically (video on top, text below) for all rows
- Play button overlay appears on hover, same style as homepage cards

