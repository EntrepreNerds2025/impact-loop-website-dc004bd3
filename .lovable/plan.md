

## Redesign Video Portfolio: Landscape Grid with Native Auto-Playing Previews

### Layout
A narrower container (`max-w-5xl`) with a repeating two-row pattern for 6 videos total:

```text
Row 1: [────────── Video 1 (full width) ──────────]
Row 2: [──── Video 2 ────] [──── Video 3 ────]
Row 3: [────────── Video 4 (full width) ──────────]
Row 4: [──── Video 5 ────] [──── Video 6 ────]
```

All containers use a cinematic landscape aspect ratio (roughly 2.35:1 or similar wide format) to give the section a filmic feel.

### Auto-Playing Native Video Previews
- Each portfolio item will accept a `previewUrl` field pointing to a hosted `.mp4` file (you'll provide the 25-second clips)
- A native `<video>` element will be used with `autoPlay`, `muted`, `loop`, and `playsInline` attributes
- The video will play silently on loop as visitors scroll past
- Falls back to the existing thumbnail image if no preview URL is provided yet

### Click-to-Lightbox
- Clicking any video opens the existing Vimeo lightbox with the full version (with audio)
- Play button overlay appears on hover to signal interactivity
- Title and category labels remain at the bottom of each container

### What You'll Need to Provide
- 6 preview video files (`.mp4`, ideally under 5MB each, 25 seconds long) hosted somewhere accessible (e.g., a public URL, cloud storage link, or uploaded to file storage)
- Once you share the URLs, I'll plug them into each portfolio item

### Technical Details

**Files modified:**
- `src/components/home/VideoPortfolioSection.tsx` -- Rewrite grid to use the 1-2-1-2 layout pattern inside a `max-w-5xl` container. Replace `<img>` thumbnails with `<video>` elements using native HTML5 autoplay (`autoplay muted loop playsInline`). Each portfolio item gets a new `previewUrl` field. Grid uses single column with full-width items alternating with two-column rows via CSS grid (`grid-cols-1` then `grid-cols-2`).

**No other files need changes** -- the Vimeo lightbox and routing remain as-is.

