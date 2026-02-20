

# Digital Impact Report Hub - Simplified Static Build

## Overview
Three new static pages plus a homepage section and navigation updates. No database, no auth, no admin. All content is hardcoded and editable directly in the code.

---

## Part 1: Navigation and Routing

### Header.tsx
- Add "Impact Report Hub" to the navLinks array, pointing to `/impact-report-hub`
- Remove the Login link from both desktop and mobile nav (not needed without auth)

### Footer.tsx
- Add "Impact Report Hub" and "Example Hub Demo" links under the Navigate column

### App.tsx
- Add 2 new routes:
  - `/impact-report-hub` - Marketing page
  - `/hub/demo` - Example hub demo

---

## Part 2: Homepage Section

### New file: `src/components/home/ImpactReportHubSection.tsx`
- Placed in Index.tsx between `ServicesPreviewSection` (Packages) and `FrameworkPreviewSection`
- Cream background (`section-cream`) for visual rhythm
- Content:
  - Eyebrow: "NEW"
  - Title: "Digital Impact Report Hub"
  - Subheadline about shareable, story-first web reports
  - 3 bullet items with icons (Globe, FileDown, Images)
  - Two buttons: "View Example Hub" linking to `/hub/demo`, "Build My Hub" linking to `/bookings`
- Uses `slideFromLeft`, `slideFromRight`, and `staggerContainer` animations from the existing animation hook

---

## Part 3: Marketing Page

### New file: `src/pages/ImpactReportHub.tsx`
Route: `/impact-report-hub`

Sections:
1. **Hero** - Dark background, large serif headline "A living impact report built to earn trust", subheadline, two CTA buttons (View Example Hub, Book a Story Call)
2. **What It Includes** - 4 cards with icons: Web Hub, PDF Export, Media Appendix, Partner Kit
3. **Who It Is For** - 4 audience cards: Nonprofits, CSR Teams, Partnerships, Workforce/Community Impact
4. **How It Works** - 4-step horizontal timeline: Diagnose, Blueprint, Build Hub, Deploy
5. **FAQs** - 6-item accordion using the existing Accordion component (What is included, how do videos work, can we embed YouTube/Vimeo, how is proof shown, can we update quarterly, how long does it take)
6. **Bottom CTA** - "Ready to build your hub?" with two buttons

All sections use the existing animation variants and the light-theme design system.

---

## Part 4: Example Hub Demo Page

### New file: `src/pages/HubDemo.tsx`
Route: `/hub/demo`

This is the largest deliverable. A fully designed, static demo hub with realistic dummy content. Built as one page with clearly separated sections.

### Layout
- Sticky table of contents sidebar on desktop (left side, collapsible)
- Dropdown section selector on mobile
- Top-right floating CTA: "Book a Story Call"
- Each section has an `id` attribute for anchor navigation

### Sections with dummy content:

**A) Cover and Overview**
- Title: "EmployNext Community Impact Report 2025"
- Tagline: "Real stories. Real outcomes. Built to be shared."
- Summary paragraph about the organization
- Quick-link buttons to each section below

**B) Stories (3 cards)**
- Each card: title, 1-2 paragraph narrative, YouTube embed iframe (using public embeddable videos), outcome indicators (e.g. "128 youth trained"), participant quote, CTA link
- Dummy video embeds using YouTube embed URLs

**C) Outcomes**
- Grid of 8 metric cards (3 columns desktop, 2 tablet, 1 mobile)
- Metrics: Youth Served (420), Completion Rate (78%), Employer Partners (24), Workshops Delivered (68), Certifications Earned (310), Volunteer Hours (1,200), Job Placements (89), Community Events (12)
- Explanatory paragraph

**D) Partners**
- Logo strip with 6 lettermark tiles (styled divs with initials like "AC", "BF", "GH")
- 1 spotlight card with partner name, contribution, enabled outcome, quote
- Partner kit preview box with sample caption, thumbnail placeholder, "Download Partner Kit" button (shows toast on click)

**E) Financial Snapshot**
- Simple table: Program Delivery, Staff and Training, Technology, Marketing, In-Kind Contributions
- "Example only" disclaimer badge

**F) Ethics and Consent**
- "Dignity by Design" headline
- 4 check-marked bullets: Consent process, Privacy boundaries, Strength-based framing, Consent removal path
- Short paragraph

**G) Downloads**
- 3 buttons: Download PDF, Download Partner Kit, Download Media Appendix
- All trigger a toast: "This is a demo. Downloads are available in real hubs."

**H) Media Appendix**
- Filter tabs using the existing Tabs component: All, Photos, Quotes, Videos, Partner Assets
- Grid of asset cards:
  - 6 photo cards using Unsplash placeholder URLs
  - 6 quote cards with styled text
  - 6 video link cards
- Click opens a Dialog/modal with larger view
- Each card has a "Copy Link" button (copies current URL with anchor)

**I) Quarterly Updates**
- 3 cards: Q1, Q2, Q3
- Each with a short paragraph and 1 highlighted metric

**Bottom CTA**
- "Want a hub like this? Build your Digital Impact Report Hub"
- Two buttons: Learn More (to marketing page), Book a Story Call (to bookings)

---

## New Files
```text
src/components/home/ImpactReportHubSection.tsx
src/pages/ImpactReportHub.tsx
src/pages/HubDemo.tsx
```

## Modified Files
```text
src/App.tsx                          (add 2 routes)
src/pages/Index.tsx                  (add ImpactReportHubSection)
src/components/layout/Header.tsx     (add nav link, remove Login)
src/components/layout/Footer.tsx     (add hub links)
```

## Implementation Order
1. Update App.tsx with new routes
2. Update Header.tsx and Footer.tsx navigation
3. Create ImpactReportHubSection.tsx and add to Index.tsx
4. Create ImpactReportHub.tsx marketing page
5. Create HubDemo.tsx example demo page

