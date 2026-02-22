

# Research & Reports Page + Sample Web-Based Reports

## Overview
Build a `/research` page that closely mirrors VaynerMedia's reports page layout, plus create web-based report detail pages for each report. The page will feature a dark hero banner, alternating report card layouts (featured large card, 3-card grid rows, alternating featured cards), and a lead capture modal gated behind each "Download" button. Each report will also have a viewable web page with editorial-style content.

---

## Page Structure (matching VaynerMedia reference)

### 1. Dark Hero Banner
- Full-width dark background with a background image overlay (impact/storytelling photo)
- Large serif heading: "RESEARCH & REPORTS"
- Subtitle text about Impact Loop's research on impact communications

### 2. Featured Report (large, side-by-side)
- Left: cover image area (Unsplash photo relevant to report topic)
- Right: title, description paragraph, "DOWNLOAD" button
- Mimics VaynerMedia's top featured report layout

### 3. Three-Card Grid Row
- 3 report cards in equal columns
- Each card: square cover image on top, title below, short description, "DOWNLOAD" button
- Purple/branded accent color on buttons

### 4. Featured Report (alternate layout)
- Left: large styled cover image with overlaid text/label
- Right: title, description, "DOWNLOAD" button
- Reversed layout from the first featured report

### 5. Three-Card Grid Row (second set)
- Another row of 3 report cards, same format as row 1

### 6. Single Report Card (centered)
- One final report card, centered on the page

### 7. Bottom CTA Section
- "Work With Us" heading with link to /bookings
- Matches the existing site CTA pattern

---

## 7 Impact Loop Original Reports

Each report uses a relevant Unsplash image as its cover:

1. **The Anti-Vanity Report 2026** -- Why impressions don't equal impact. A guide to measuring what matters in social impact communications.
2. **Culture vs. Counterfeit: The Nonprofit's Guide to Authentic Storytelling** -- How organizations can tell real stories without extracting from the communities they serve.
3. **The Trust Effect: Rebuilding Stakeholder Confidence Through Media** -- A framework for using video, photography, and narrative to rebuild trust after organizational change.
4. **Constellations Outlook: The Forces Shaping Impact Communications in 2026** -- Trends in nonprofit media, CSR reporting, and community-led storytelling.
5. **Inside Modern Impact Reporting: Trust, Timing & Building Credibility** -- A deep dive into earned attention in the impact sector.
6. **Building a Story-First Strategy: A Guide for Nonprofits** -- How to shift from data-heavy reports to narrative-driven impact communications.
7. **The Growing Power of Community-Led Media** -- Why the most credible impact stories come from the communities themselves.

---

## Lead Capture Modal

- Triggered by any "DOWNLOAD" button
- Fields: First Name, Last Name, Email, Organization (all required)
- Validated with zod + react-hook-form
- On submit: saves lead to `research_leads` table in the database
- Shows success toast: "Thanks! We'll send your report to your inbox shortly."
- No actual email delivery yet (Resend integration later)

---

## Database Changes (1 migration)

### Table: `research_reports`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| title | text | Report title |
| description | text | Short description |
| slug | text | Unique, URL-friendly |
| cover_image | text | Unsplash image URL |
| cover_label | text | Short label overlaid on cover |
| pdf_url | text | Nullable, for future PDF uploads |
| published | boolean | Default true |
| sort_order | integer | Default 0 |
| created_at | timestamptz | Default now() |

RLS: Anyone can SELECT (public). Authenticated users can INSERT/UPDATE/DELETE.

### Table: `research_leads`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| first_name | text | Required |
| last_name | text | Required |
| email | text | Required |
| organization | text | Required |
| report_slug | text | Which report they requested |
| created_at | timestamptz | Default now() |

RLS: Anyone can INSERT (so anonymous visitors can submit). Only authenticated users can SELECT/UPDATE/DELETE (so you can view leads later).

Seed data: All 7 reports inserted via migration.

---

## Navigation Updates

- **Header.tsx**: Add "Research" link between "Impact Media Hub" and "Book"
- **Footer.tsx**: Add "Research" link to the Navigate column
- **App.tsx**: Add `/research` route

---

## Files Summary

### New files:
- `src/pages/Research.tsx` -- Full page with hero, alternating report layouts, and lead capture modal component built inline

### Modified files:
- `src/App.tsx` -- Add Research import and route
- `src/components/layout/Header.tsx` -- Add "Research" nav link
- `src/components/layout/Footer.tsx` -- Add "Research" link

### Database:
- 1 migration creating both tables with RLS policies and seed data

---

## Technical Approach

- Uses existing Layout component, design system (section-dark, btn-primary, font-serif, motion animations)
- Report covers use high-quality Unsplash images with gradient overlays and text labels (replacing VaynerMedia's hand-drawn illustrations)
- Lead capture form uses react-hook-form + zod for validation
- Database interaction via the existing Supabase client
- Framer Motion scroll animations consistent with other pages
- Responsive: featured reports stack vertically on mobile, 3-card grids collapse to single column

