

# Design System Overhaul: Light Theme with Premium Animations

## Overview
Transform Impact Loop from a dark, SaaS-style aesthetic to a light, editorial, high-end look inspired by the Enfold Parallax demo. This redesign focuses on the visual foundation (colors, typography, animations, component styles) so that when we build the new homepage sections, they look right from the start.

---

## What Changes

### 1. Color Palette: Dark to Light

**Current:** Dark navy backgrounds everywhere (`220 20% 8%`)
**New:** Clean white/off-white base with dark sections used sparingly for contrast

| Token | Current | New |
|-------|---------|-----|
| `--background` | Dark navy (8% lightness) | White `0 0% 100%` |
| `--foreground` | White | Charcoal `220 15% 15%` |
| `--card` | Dark card | White/light grey |
| `--muted` | Dark grey | Light grey `220 14% 96%` |
| `--impact-dark` | Primary bg color | Accent section bg only |
| `--impact-cream` | Barely used | Section alternation bg |

The brand blue (#4F5BD5) and purple (#7C3AED) stay as accent colors but are used more sparingly, like the red accent in Enfold.

### 2. Typography: Unique, Editorial Fonts

**Current:** Playfair Display (serif) + Inter (sans-serif), both very common.
**New:** Switch to more distinctive, premium pairings:

- **Headlines:** "DM Serif Display" or "Cormorant Garamond" for an elegant, editorial feel that does not scream "template"
- **Body:** "Plus Jakarta Sans" for a modern, clean sans-serif that is less ubiquitous than Inter

These are all available on Google Fonts and free to use.

### 3. Premium Scroll Animations (Framer Motion)

Replace the current simple fade-up animations with cinematic, directional reveals:

- **Slide from left:** Text blocks and headlines enter from the left as you scroll into view
- **Slide from right:** Images and supporting content enter from the right
- **Converge animation:** Two elements (e.g., image + text) start offset and slide toward each other to land in their final position
- **Parallax depth:** Background elements move at a slower rate than foreground content on scroll
- **Staggered reveals:** List items and cards appear one by one with slight delays
- **Scale-up on enter:** Cards gently scale from 95% to 100% as they enter the viewport

All animations will use Framer Motion's `useInView` and `useScroll` hooks for scroll-triggered behavior.

### 4. Button Styles

**Current:** Rounded corners with gradient/solid blue fills.
**New:** Cleaner, more editorial buttons:

- Primary: Solid brand blue with no rounded corners (sharp or very subtle radius), uppercase tracking
- Secondary: Outlined with dark border, transparent background
- Hover states: Subtle background shift, no flashy effects

### 5. Section Layout Rhythm

**Current:** All dark backgrounds, hard to distinguish sections.
**New:** Alternating backgrounds like Enfold:

- White sections for most content
- Light grey/cream (`impact-cream`) for alternating sections
- Dark (`impact-dark`) used only for 1-2 high-impact sections (hero, final CTA, or a featured section)
- Clean dividers between sections using spacing, not borders

### 6. Card Styles

Inspired by Enfold's three service cards:
- Clean white cards with subtle shadow or border
- Dark card variant for contrast (one card in a row can be dark with light text)
- Generous padding and spacing
- No gradient backgrounds on cards

### 7. Navigation and Layout Component Updates

- **Header:** Light/transparent header that becomes white with shadow on scroll (instead of dark)
- **Footer:** Dark footer stays (common pattern even on light sites), but updated with the new font
- **Layout wrapper:** Remove forced `bg-impact-dark` from the layout wrapper

---

## Files to Modify

### Design System Files
- **`src/index.css`** - Update all CSS custom properties for light theme, swap font imports, update component classes (btn-primary, btn-secondary, section classes)
- **`tailwind.config.ts`** - Update fontFamily entries to new fonts, add new animation keyframes for slide-left, slide-right, converge, and parallax

### Layout Components
- **`src/components/layout/Layout.tsx`** - Remove `bg-impact-dark` from wrapper, use `bg-background`
- **`src/components/layout/Header.tsx`** - Change to light header with dark text, white on scroll with shadow
- **`src/components/layout/Footer.tsx`** - Update fonts (keep dark bg), adjust text colors for new font

### Shared Animation Utility
- **Create `src/hooks/useScrollAnimation.ts`** - A reusable hook wrapping Framer Motion's `useInView` and `useScroll` for consistent directional scroll animations (slideFromLeft, slideFromRight, converge, parallax)

### Homepage Sections (Light Styling Pass)
All existing homepage section components will need their background colors and text colors adjusted from dark-first to light-first:
- `HeroSection.tsx` - Can remain dark as a cinematic opener, or shift to a split layout
- `PrinciplesSection.tsx` - White/cream background, dark text
- `VideoPortfolioSection.tsx` - Alternating bg
- `ClientLogosSection.tsx` - White bg
- `ImpactStatsSection.tsx` - Cream/light bg
- `ServicesPreviewSection.tsx` - White bg with card styles
- `FrameworkPreviewSection.tsx` - Cream bg
- `FounderSection.tsx` - White bg

---

## Animation Implementation Details

A reusable `useScrollAnimation` hook will provide these animation variants:

```text
slideFromLeft:  starts at x: -80, opacity: 0  -->  x: 0, opacity: 1
slideFromRight: starts at x: 80, opacity: 0   -->  x: 0, opacity: 1
slideUp:        starts at y: 60, opacity: 0    -->  y: 0, opacity: 1
converge:       two elements start offset      -->  meet at center
scaleIn:        starts at scale: 0.9, opacity: 0 --> scale: 1, opacity: 1
```

Each section component will use these instead of the current uniform `fade-up` on everything.

---

## Implementation Order

1. Update `index.css` with new color tokens and font imports
2. Update `tailwind.config.ts` with new fonts and animation keyframes
3. Update `Layout.tsx`, `Header.tsx`, and `Footer.tsx` for light theme
4. Create the `useScrollAnimation.ts` hook
5. Update all homepage section components with light backgrounds and new animations

This should be done before the homepage content restructure so that all new sections are built on the correct visual foundation.

