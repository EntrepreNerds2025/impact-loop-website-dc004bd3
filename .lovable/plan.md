

## Plan: Add Media Download Functionality to Black Creek Hub

Enable Black Creek (or any hub client) to download photos and videos directly from the hub page.

### What we'll build

1. **Download button on each photo in the gallery grid** — A small download icon overlay on hover, triggers a direct image download.

2. **Download button in the MediaLightbox** — Add a download icon button next to the close button. For photos, it downloads the image file directly. For videos, it links to the Vimeo video page (since Vimeo videos can't be directly downloaded via embed).

3. **"Download All Photos" bulk button** — Add a button above the photo gallery section that downloads all photos as a ZIP file using JSZip (client-side). This is the most useful feature for a client wanting to grab everything.

### Technical approach

- **Single photo download**: Use `fetch()` + `blob` + programmatic `<a download>` click. Works for same-origin and CORS-enabled images. For the local assets (bundled photos), this works natively.
- **Bulk ZIP download**: Add `jszip` + `file-saver` packages. Fetch all photo blobs, bundle into a ZIP, and trigger download. Show a progress indicator while building.
- **Video download**: Since Vimeo embeds don't allow direct file download, the download button for videos will open the Vimeo page in a new tab (where download may be enabled depending on Vimeo settings). Alternatively, we can note "Contact us for video files."
- **MediaLightbox**: Add a `Download` icon button in the top bar, next to the close button.

### Files to change

| File | Change |
|------|--------|
| `src/components/shared/MediaLightbox.tsx` | Add download button for current media item |
| `src/pages/HubBlackCreekBHM.tsx` | Add "Download All Photos" button above photo grid, add download overlay on individual photos |
| `package.json` | Add `jszip` and `file-saver` dependencies |

### Notes
- Local photos (from `import.meta.glob`) are bundled as asset URLs — they support fetch + blob download.
- Vimeo video files cannot be downloaded client-side from embeds; we'll provide a "View on Vimeo" fallback or a note to contact for raw files.
- The download buttons use the same dark/minimal aesthetic as the rest of the hub.

