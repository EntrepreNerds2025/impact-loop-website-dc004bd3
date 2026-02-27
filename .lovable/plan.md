

## Multi-Part Update: Founder Photo, Blog System, Navigation, Bookings

This plan covers 5 changes across the site.

---

### 1. Add Founder Photo

Copy the uploaded image (`Rovonn_Photo_Transparent.png`) to `src/assets/founder/rovonn.png` and update `FounderSection.tsx` to display it instead of the placeholder text. The transparent background will work nicely with the existing gradient container.

**Files:** Copy image, edit `src/components/home/FounderSection.tsx`

---

### 2. Simplify Research Page

Strip the Research page down to only feature "The Metrics That Matter Report 2026" as a single standalone report. Remove the other 6 hardcoded reports and the multi-section grid layout. Keep the hero, the single report card with its "Read Report" and "Download" buttons, and the lead capture modal. The existing detail page at `/research/metrics-that-matter-2026` stays as-is.

**Files:** Edit `src/pages/Research.tsx`

---

### 3. Blog System with SEO

Create a `blog_posts` database table to store blog articles with fields for title, slug, excerpt, content (markdown), cover image, author, published status, published date, and SEO metadata (meta title, meta description, og image). Add RLS for public read access and authenticated write.

Build three frontend pieces:
- **Blog listing page** (`/blog`) -- grid of blog cards with cover images, titles, excerpts, and dates
- **Blog post detail page** (`/blog/:slug`) -- renders the markdown content with proper heading hierarchy, uses `<Helmet>`-style meta tags via `document.title` and meta tag injection for SEO (title, description, og:image, og:type=article, canonical URL)
- **SEO helpers** -- each blog post page sets `document.title`, and injects/updates meta description and Open Graph tags dynamically

Blog posts will be stored in the database so you can add them via ChatGPT and insert directly. No admin UI needed for now.

**Files:** New migration, new `src/pages/Blog.tsx`, new `src/pages/BlogPost.tsx`, edit `src/App.tsx`

---

### 4. Update Navigation: "Resources" Dropdown

Replace the standalone "Research" link in the header with a **Resources** dropdown (same pattern as the Services dropdown) containing:
- Research (links to `/research`)
- Blog (links to `/blog`)

Update both desktop and mobile navigation.

**Files:** Edit `src/components/layout/Header.tsx`

Also update Footer navigation to include Blog.

**Files:** Edit `src/components/layout/Footer.tsx`

---

### 5. Bookings Page Updates

Two changes:
- Replace the Calendly placeholder with an actual Calendly inline embed using an iframe pointing to `https://calendly.com/rovonnrussell/impactcall`
- Change the "prefer to reach out directly" email from `hello@impactloop.ca` to `rovonn@impactloop.ca`

**Files:** Edit `src/pages/Bookings.tsx`

---

### Technical Details

**Database migration:**
```sql
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT 'Rovonn Russell',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

**Blog post page SEO approach:**
- On mount, dynamically set `document.title` to the post's meta_title (or title)
- Create/update `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`, `<meta property="og:type" content="article">` tags in `document.head`
- Clean up on unmount to restore defaults
- Use canonical URL based on the published site URL

**Files changed summary:**
- `src/assets/founder/rovonn.png` (new -- copied from upload)
- `src/components/home/FounderSection.tsx` (edit)
- `src/pages/Research.tsx` (edit -- simplify to single report)
- `src/pages/Blog.tsx` (new)
- `src/pages/BlogPost.tsx` (new)
- `src/App.tsx` (edit -- add blog routes)
- `src/components/layout/Header.tsx` (edit -- Resources dropdown)
- `src/components/layout/Footer.tsx` (edit -- add Blog link)
- `src/pages/Bookings.tsx` (edit -- Calendly embed + email)
- Database migration for `blog_posts` table
