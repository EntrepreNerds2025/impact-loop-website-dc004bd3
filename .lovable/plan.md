

# Fixes, Blog SEO, and Responsiveness Audit

## 1. Fix: React forwardRef Console Warnings

The `FounderSection` and `Footer` components are likely triggering React warnings because `motion.div` or similar wrappers are passing refs through components that don't forward them. This is typically a non-breaking cosmetic warning, but we'll clean it up by ensuring any component receiving a ref uses `forwardRef` properly.

**Files to review/update:**
- `src/components/home/FounderSection.tsx` -- the `ref` on the section wrapper is fine (native element), so the warning may actually come from framer-motion's interaction with the `Link` component or image. Will verify and fix.
- `src/components/layout/Footer.tsx` -- similar check.

## 2. Blog SEO Improvements

Currently only `Blog.tsx` and `BlogPost.tsx` use the `setSEO()` utility. Every other page (Home, About, Work, Services, Contact, Bookings, Research, ImpactMediaHub, etc.) has **no dynamic SEO tags**. Also missing:

**Add `setSEO()` to all pages:**
- `Index.tsx` (Home)
- `About.tsx`
- `Work.tsx`
- `Services.tsx`
- `Contact.tsx`
- `Bookings.tsx`
- `Research.tsx`
- `ImpactMediaHub.tsx`
- `CinematicImpactFilms.tsx`
- `HubExamples.tsx`
- `Privacy.tsx`
- `Terms.tsx`

Each will get a unique `title`, `description`, and `ogType: "website"` via `useEffect` + `setSEO()`.

**Add structured data (JSON-LD) to blog posts:**
- Inject `Article` schema markup into `BlogPost.tsx` for Google rich results (author, datePublished, headline, image).

**Add a sitemap:**
- Create `public/sitemap.xml` with all static routes and a note that blog post URLs are dynamic.
- Update `public/robots.txt` to reference the sitemap.

**Fix `index.html` meta tags:**
- Update the static `og:description` and `description` meta tags to be meaningful defaults instead of just "Impact Loop".

## 3. Responsiveness Check

Based on code review, the site uses responsive patterns throughout:
- All pages use `container mx-auto px-6` for consistent padding
- Grid layouts use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` breakpoints
- Typography scales with `text-4xl md:text-5xl lg:text-6xl`
- Header has a mobile hamburger menu with accordion dropdowns
- Forms use `grid-cols-1 sm:grid-cols-2` for input fields

The responsive patterns look solid across all pages. I'll do a quick browser test on mobile viewport to verify after implementation.

---

## Technical Summary

| Task | Files |
|---|---|
| Add `setSEO()` to ~12 pages | Each page file in `src/pages/` |
| Add JSON-LD Article schema | `src/pages/BlogPost.tsx` |
| Create sitemap.xml | `public/sitemap.xml` |
| Update robots.txt with sitemap | `public/robots.txt` |
| Fix index.html default meta | `index.html` |
| Fix forwardRef warnings | `src/components/home/FounderSection.tsx`, `src/components/layout/Footer.tsx` |

