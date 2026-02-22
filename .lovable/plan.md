

# Impact Media Hub - Phase 1 Pivot (Static Pages + Photo Storage)

## Overview
Rename "Digital Impact Report Hub" to "Impact Media Hub" and rebuild as media-first showcase pages. All content is static/hardcoded except for photo galleries, which use Lovable Cloud storage so you can easily upload and manage photos.

---

## Part 1: Photo Storage Setup

### Database Migration
- Create a `hub_photos` table in the database:
  - `id` (UUID, primary key)
  - `hub_slug` (text) -- which hub the photo belongs to (e.g. "cafcan-demo", "corporate-demo")
  - `image_url` (text) -- the public URL from storage
  - `caption` (text, optional)
  - `sort_order` (integer)
  - `created_at` (timestamp)
- RLS policy: public read (anyone can view photos), no public write (uploads happen through your session only)

### Storage Bucket
- Create a public `hub-photos` storage bucket
- RLS policies for authenticated upload and public read

### Upload Component
- Build a simple bulk photo upload component (visible only when you are logged in)
- Drag-and-drop or file picker for multiple images at once
- Auto-saves to the storage bucket and creates a row in `hub_photos`
- Appears inline on the hub page when logged in, hidden for public visitors

---

## Part 2: Navigation Updates

### Header.tsx
- Rename "Impact Hub" link to "Impact Media Hub" pointing to `/impact-media-hub`
- Add a "Book a Story Call" secondary CTA button (desktop only, links to `/bookings`)

### Footer.tsx
- Rename "Impact Report Hub" to "Impact Media Hub"
- Update link from `/impact-report-hub` to `/impact-media-hub`
- Add "Hub Examples" link pointing to `/hub/examples`

### App.tsx
- Replace `/impact-report-hub` route with `/impact-media-hub`
- Add `/hub/examples` route
- Add `/hub/corporate-demo` route
- Keep `/hub/demo` for CAFCan nonprofit demo

---

## Part 3: Homepage Section

### Rename ImpactReportHubSection to ImpactMediaHubSection
- New headline: "Impact Media Hub"
- New subheadline: "A shareable media page for your program, event, campaign, or partnership. Story-first. Proof woven in through real outcomes, quotes, and partner context."
- Three buttons:
  - "View Nonprofit Demo Hub" (links to `/hub/demo`)
  - "View CSR Demo Hub" (links to `/hub/corporate-demo`)
  - "Build a Hub" (links to `/bookings`)

---

## Part 4: Marketing Page

### New file: ImpactMediaHub.tsx (route: `/impact-media-hub`)
- Hero section with media-first messaging
- What it includes: Overview, Hero Video, Clips, Photos, Quotes, Partners, Downloads, Quick Outcomes
- Who it is for: Nonprofits, CSR Teams, Partnerships
- How it works: Diagnose, Blueprint, Produce, Deploy (4 steps)
- FAQ accordion (6 questions about the media-first approach)
- Bottom CTA: Book a Story Call

---

## Part 5: Hub Examples Gallery

### New file: HubExamples.tsx (route: `/hub/examples`)
- Two cards:
  - CAFCan Our People's Keeper Employment Program (Nonprofit / Program)
  - Northfield Tech Community Investment Hub 2025 (Corporate / CSR)
- Each card: title, type badge, 1-line description, "View Hub" button

---

## Part 6: CAFCan Nonprofit Demo Hub (HubDemo.tsx rewrite)

Complete rewrite as a media-first hub page with these sections:

1. **Overview** -- Title, tagline, the approved initiative brief, who/what/when/where, two CTAs
2. **Initiative Overview** -- Structured breakdown of the program
3. **Hero Video** -- YouTube/Vimeo embed placeholder
4. **Clips** -- 8 embedded video placeholders with titles:
   - Launch Welcome and Purpose
   - Employment Pathways Overview
   - Wellness and Health Supports
   - Partner Spotlight: Collaboration in Action
   - Presenter Moment: City Services and Supports
   - Participant Moment: What This Program Means
   - Program Next Steps
   - Community Momentum Recap
5. **Photo Gallery** -- Pulls from `hub_photos` table (filtered by slug "cafcan-demo"). Shows upload button when logged in. Lightbox on click. Falls back to placeholder images if no uploads exist.
6. **Quotes** -- 12 quotes with name + role labels (Participant, Partner, Presenter, Staff)
7. **Partners and Presenters** -- Logo tiles for CIBC, Toronto Employment and Social Services, Toronto Business Development Centre, Up With Women, Black Creek Community Health Centre, Michael Jazz brand, Kairos Law. Three spotlight cards. Partner sharing kit preview.
8. **Downloads** -- 3 link buttons (One-Page Recap, Partner Kit, Media Pack) triggering demo toast
9. **Quick Outcomes** -- Small metrics panel with 4-6 demo values
10. **Final CTA** -- "Build your Impact Media Hub" with two buttons

Layout: Sticky sidebar navigation on desktop, dropdown selector on mobile, floating "Book a Story Call" CTA.

---

## Part 7: Corporate CSR Demo Hub

### New file: HubCorporateDemo.tsx (route: `/hub/corporate-demo`)
Same template structure as CAFCan but with corporate framing:
- Title: "Northfield Tech Community Investment Hub 2025"
- Corporate community investment overview
- 8 clips with corporate-themed titles
- Photo gallery pulling from `hub_photos` with slug "corporate-demo" (same upload system)
- 10 quotes from partners and staff
- 6 fictional corporate partner logos
- Downloads: Partner Kit, One-Page Recap
- Quick Outcomes: Investment amount, Partners supported, Volunteer hours, Events hosted

---

## Files Summary

**New files:**
```text
src/components/home/ImpactMediaHubSection.tsx
src/pages/ImpactMediaHub.tsx
src/pages/HubExamples.tsx
src/pages/HubCorporateDemo.tsx
src/components/hub/PhotoGallery.tsx (reusable gallery with upload + lightbox)
src/components/hub/PhotoUploader.tsx (bulk upload component, shown when logged in)
```

**Rewritten files:**
```text
src/pages/HubDemo.tsx
```

**Deleted files:**
```text
src/components/home/ImpactReportHubSection.tsx
src/pages/ImpactReportHub.tsx
```

**Modified files:**
```text
src/App.tsx
src/pages/Index.tsx
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
```

**Database changes:**
```text
1 migration: Create hub_photos table + hub-photos storage bucket + RLS policies
```

## Implementation Order
1. Create storage bucket and hub_photos table (database migration)
2. Update routing, header, footer
3. Build PhotoGallery and PhotoUploader components
4. Create homepage section and marketing page
5. Create hub examples gallery
6. Rewrite CAFCan demo hub with photo storage integration
7. Create corporate CSR demo hub

