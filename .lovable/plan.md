

## Remove Cube Effect, Add Vimeo Background Video

### What changes

1. **Remove HeroCubeWrapper from homepage** (`src/pages/Index.tsx`)
   - Remove the `HeroCubeWrapper` import and wrapper
   - Render `HeroSection` and `PrinciplesSection` as regular siblings so the page scrolls normally

2. **Update HeroSection video background** (`src/components/home/HeroSection.tsx`)
   - Replace the current Coverr placeholder `<video>` tag with a Vimeo embed using their background player
   - Use `https://player.vimeo.com/video/1135409559?background=1&autoplay=1&loop=1&muted=1` in an iframe
   - The `background=1` parameter removes all controls and enables autoplay/loop/mute automatically
   - Keep the dark gradient overlay for text readability
   - Keep the rotating headlines, subheadline, and CTA buttons exactly as they are

3. **HeroCubeWrapper component** -- will be left in place (not deleted) in case you want to reuse it later, but it will no longer be imported on the homepage.

### Technical detail

The Vimeo background embed iframe will be styled with `position: absolute; inset: 0; width/height scaled up` to ensure full coverage (Vimeo iframes need slight oversizing to avoid letterboxing). A poster image fallback remains for slow connections.

