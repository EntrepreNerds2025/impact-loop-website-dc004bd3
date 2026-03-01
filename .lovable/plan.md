

# Remove Impact Technology from Services Preview + Add Standalone Tech Section + Remove Hub Examples from Footer

## 1. Remove "Impact Technology" from ServicesPreviewSection

**File: `src/components/home/ServicesPreviewSection.tsx`**
- Remove the 5th entry (`Monitor` / "Impact Technology") from the `services` array (line 12)
- Remove `Monitor` from the lucide-react import
- Grid returns to a clean 2x2 layout

## 2. Create new TechSolutionsSection component

**New file: `src/components/home/TechSolutionsSection.tsx`**

A standalone homepage section dedicated to the technology offering, using the same animation patterns (`slideFromLeft`, `scaleIn`, `useInView`) as other sections. Content:

- **Label**: "Impact Technology"
- **Headline**: "Custom Platforms Built in Weeks, Not Years"
- **Body copy**: Explains how AI-accelerated development removes the need for large teams and long timelines. Organizations can now get purpose-built apps, dashboards, intake systems, and reporting platforms tailored to their workflows -- delivered in weeks.
- **3-4 feature highlights** in a minimal grid (icon + short text):
  - Custom apps tailored to your workflows
  - AI-powered development -- fast delivery
  - Integration with existing systems
  - Ongoing support and iteration
- **CTA**: Links to `/services` or `/contact`

Style: Alternating background (e.g. `section-cream` or `bg-muted`) to contrast with surrounding sections.

## 3. Add TechSolutionsSection to homepage

**File: `src/pages/Index.tsx`**
- Import and render `<TechSolutionsSection />` after `<ServicesPreviewSection />` (before `<FrameworkPreviewSection />`)

## 4. Remove "Hub Examples" from Footer

**File: `src/components/layout/Footer.tsx`**
- Remove `{ href: "/hub/examples", label: "Hub Examples" }` from the navigation links array (line 35)

## Files Changed

| File | Change |
|---|---|
| `src/components/home/ServicesPreviewSection.tsx` | Remove Impact Technology card + Monitor import |
| `src/components/home/TechSolutionsSection.tsx` | New standalone tech solutions section |
| `src/pages/Index.tsx` | Import and render TechSolutionsSection |
| `src/components/layout/Footer.tsx` | Remove Hub Examples link |

