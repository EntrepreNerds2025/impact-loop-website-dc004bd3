

# Add "Impact Technology" Service Offering

## Overview
Add a new service — **Impact Technology Solutions** — across the Services page, the homepage services preview, and the Contact form inquiry options. The positioning ties it naturally to Impact Loop's mission: building custom apps and platforms that help organizations operate, deliver, and measure their impact — powered by AI, delivered in weeks not years.

## 1. Services Page (`src/pages/Services.tsx`)

Add a 5th service entry to the `services` array:

- **Icon**: `Monitor` (from lucide-react) or `Code` — representing technology/software
- **Title**: "Impact Technology Solutions"
- **Tagline**: "Custom platforms that power your operations"
- **Description**: "We design and build custom apps, platforms, and software tools that help your organization operate more efficiently and deliver impact at scale. With AI-accelerated development, solutions that once required large teams and years of work can now be built in weeks."
- **Who It's For**: "Organizations that need purpose-built tools — intake systems, dashboards, reporting platforms, or stakeholder portals — but don't have the budget or timeline for traditional software development"
- **Problem It Solves**: "Off-the-shelf tools don't fit your workflows, and custom development has always felt out of reach. AI has changed that equation entirely."
- **What You Get**:
  - Custom app or platform tailored to your workflows
  - AI-powered development — weeks, not years
  - Ongoing support and iteration
  - Integration with your existing systems

This will appear as the 5th card in the existing services list, using the same layout pattern.

## 2. Homepage Services Preview (`src/components/home/ServicesPreviewSection.tsx`)

Add a 5th card to the `services` array on the homepage preview grid:

- **Icon**: `Monitor` (from lucide-react)
- **Title**: "Impact Technology"
- **Description**: "Custom apps and platforms built with AI — delivered in weeks, not years — to power your operations and amplify your impact."

The grid will shift from 2x2 to accommodate 5 items (the existing `md:grid-cols-2` layout will naturally handle the odd card).

## 3. Contact Page (`src/pages/Contact.tsx`)

Add "Custom Software / App Development" to the `serviceOptions` array so it appears as a selectable inquiry type in the contact form dropdown.

## Files Changed

| File | Change |
|---|---|
| `src/pages/Services.tsx` | Add 5th service object + import `Monitor` icon |
| `src/components/home/ServicesPreviewSection.tsx` | Add 5th card + import `Monitor` icon |
| `src/pages/Contact.tsx` | Add "Custom Software / App Development" to `serviceOptions` |

