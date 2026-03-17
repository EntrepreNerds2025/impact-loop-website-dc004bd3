

# Redesign Sections + New Blog Post + Tech CTA

## 1. Dark Background + Split Layout for "The Storytelling Standard Behind the Work"

**File: `src/components/home/FrameworkPreviewSection.tsx`** -- Full redesign

Replace the current centered card grid with a cinematic split layout:
- Dark background using `section-dark` (the Impact Loop dark navy)
- Left side: A compelling stock/Unsplash image (embedded via URL) showing storytelling/filmmaking
- Right side: The text content (label, heading, description) + the 3 framework module cards stacked vertically
- CTA button styled for dark background (white outline or primary on dark)
- All text colors updated to white/white-muted for dark bg contrast

## 2. Dark Background + Split Layout for "Videos That Move People to Action"

**File: `src/components/home/ServicesPreviewSection.tsx`** -- Full redesign

Flip the layout (text left, image right) to create visual rhythm:
- Dark background using `bg-[hsl(var(--impact-dark))]`
- Left side: Text content (label, heading, description) + the 4 service cards in a 2x2 grid below
- Right side: A compelling image showing video production/impact work
- Footer line and CTA adapted for dark background
- Alternating direction from the Framework section creates visual interest

## 3. New Blog Post -- "AI Is Making Impact Apps Possible Without Big Dev Teams"

**Database insert** into `blog_posts` table with the full copy provided by the user:
- **slug**: `ai-apps-for-impact`
- **title**: "AI Is Making Impact Apps Possible Without Big Dev Teams"
- **excerpt**: "Apps, portals, and internal tools that support programs, partnerships, and reporting can now be built in weeks to months, not years."
- **content**: Full markdown content from the user's copy (formatted with proper markdown headings, lists, blockquotes)
- **author**: "Rovonn Russell"
- **published**: true
- **published_at**: Current date
- **meta_title**: "AI Is Making Impact Apps Possible Without Big Dev Teams"
- **meta_description**: The provided meta description
- **cover_image**: An appropriate Unsplash image URL for the blog hero

## 4. Add "Read More" Blog CTA to TechSolutionsSection

**File: `src/components/home/TechSolutionsSection.tsx`**

Add a secondary link/button below the existing "Let's Build Something" CTA that links to the new blog post:
- Text: "Read: How AI Is Changing What's Possible" or similar
- Links to `/blog/ai-apps-for-impact`
- Styled as a text link or outline button to not compete with the primary CTA

## Files Changed

| File | Change |
|---|---|
| `src/components/home/FrameworkPreviewSection.tsx` | Dark bg + split layout (image left, text right) |
| `src/components/home/ServicesPreviewSection.tsx` | Dark bg + split layout (text left, image right) |
| `src/components/home/TechSolutionsSection.tsx` | Add blog post link below existing CTA |
| Database: `blog_posts` | Insert new blog post with full content |

## Design Notes

- The two redesigned sections will alternate their image/text positioning (Framework: image-left/text-right, Services: text-left/image-right) creating a zig-zag visual pattern as users scroll
- Both sections use the dark Impact Loop background for dramatic contrast against the lighter sections above and below
- Images will use high-quality Unsplash URLs with appropriate subjects (storytelling/filmmaking for Framework, video production/community for Services)
- Animations shift from `scaleIn` cards to `convergeFromLeft` / `convergeFromRight` to match the split layout direction

