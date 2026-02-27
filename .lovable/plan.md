

## Add Vimeo Preview Videos to Portfolio Grid

### What's Changing
Since the previews are hosted on Vimeo (not raw .mp4 files), we'll switch from native `<video>` tags to **Vimeo background embeds** using the `?background=1` parameter. This makes Vimeo play silently, without controls, on autoplay loop -- exactly the behavior we want for background previews.

### Vimeo ID Mapping
Each portfolio item gets its preview Vimeo ID:
1. Community Health Initiative -- `1168718287`
2. Youth Empowerment Program -- `1168718353`
3. Environmental Restoration -- `1168718362`
4. Education Access Campaign -- `1168718383`
5. Housing First Initiative -- `1168718335`
6. Mental Health Awareness -- `1168718317`

### Technical Details

**File: `src/components/home/VideoPortfolioSection.tsx`**

- Replace `previewUrl` field with `previewVimeoId` field on each portfolio item
- Replace the native `<video>` element with a Vimeo `<iframe>` using `?background=1&autoplay=1&loop=1&muted=1` parameters (chromeless, silent, looping)
- The iframe will be positioned absolutely to fill each container, with `pointer-events-none` so clicks pass through to the overlay/play button
- On click, the existing lightbox opens with the same Vimeo ID (full playback with audio)
- Thumbnail images remain as a fallback/loading state behind the iframe

No other files need changes.

