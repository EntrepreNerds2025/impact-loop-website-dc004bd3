

## Upgrade Blog Post Page to Premium Editorial Layout

Transform the blog post template from plain text into a visually rich, magazine-style reading experience with a cover image, inline images, pullquotes, callout boxes, and editorial design elements.

---

### 1. Enhance the Markdown Renderer

Upgrade `renderMarkdown()` in `BlogPost.tsx` to support additional syntax:

- **Images**: `![alt text](url)` renders as styled images with captions, alternating between left-aligned and right-aligned float layouts
- **Blockquotes**: `> text` renders as styled pullquotes with a left border accent and larger italic text
- **Horizontal rules**: `---` renders as a styled section divider
- **Unordered lists**: `- item` renders as proper styled bullet lists
- **Numbered lists**: `1) item` renders as ordered lists with styling

---

### 2. Redesign the Blog Post Page Layout

**Cover image**: Full-width hero cover image that overlaps the header section, creating a cinematic feel. Will use a gradient overlay for the title text to sit on top of the image.

**Reading progress bar**: A thin accent-colored bar at the top of the viewport that fills as the reader scrolls down.

**Estimated read time**: Display next to the author and date (calculated from word count).

**Author byline enhancement**: Add a small avatar circle with initials and styled author card.

**Content typography**: Increase line height, add drop cap on first paragraph, and use wider margins with elegant spacing between sections.

**Pullquote styling**: Blockquotes rendered as large, visually distinct pullquotes with decorative quotation marks and accent color borders.

**Section dividers**: Styled `<hr>` elements with a small diamond or dot pattern.

**Bottom CTA**: Keep the existing CTA but enhance with a subtle gradient background.

---

### 3. Update Blog Post Content in Database

Update the existing blog post's markdown content to include:

- A cover image URL (using a relevant Unsplash image)
- Inline images throughout using `![description](unsplash-url)` syntax placed between sections
- Blockquote pullquotes at key moments (e.g., `> Put the proof beside the story, not above it.`)
- Horizontal rule dividers between major sections (`---`)
- Proper list formatting with `-` and `1)` syntax

---

### 4. Update Blog Listing Card

Update the Blog listing page (`Blog.tsx`) to show the cover image properly on the card when one exists.

---

### Technical Details

**Files changed:**
- `src/pages/BlogPost.tsx` -- Major rewrite: enhanced markdown renderer, full-bleed cover hero, reading progress bar, read time estimate, drop cap, pullquote styles, alternating image floats
- Database update: Update existing blog post record with cover_image URL and enriched markdown content with embedded images and pullquotes

**Markdown enhancements (new syntax support):**
```
![alt text](url)          --> Styled image with caption, alternating float
> blockquote text         --> Pullquote with accent border
---                       --> Decorative section divider  
- list item               --> Styled bullet list
1) numbered item          --> Styled numbered list
```

**Reading progress bar**: Uses a `scroll` event listener to calculate percentage and renders a fixed-position bar at the top.

**Read time**: Calculated as `Math.ceil(wordCount / 200)` minutes.

**Cover image approach**: The cover image will be set as a background on the hero section with a gradient overlay, so the title text sits elegantly on top of the image.

