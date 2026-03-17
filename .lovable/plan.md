

## Plan: Restore Impact Media Hub Visibility + Link to Black Creek Hub

The Impact Media Hub section, nav links, and footer links are currently hidden. Here's what we'll do to bring them back, now pointing to the real Black Creek BHM hub as the featured example.

### Changes

1. **Homepage — Re-add ImpactMediaHubSection**
   - Import and place `ImpactMediaHubSection` back into `src/pages/Index.tsx` (after `ServicesPreviewSection`, before `TechSolutionsSection`)
   - Update the section's CTAs: one "View Example Hub" button linking to `/hub/black-creek-bhm`, remove the duplicate second button (or make it link to `/impact-media-hub` as "Learn More")
   - Update the preview card content to reference Black Creek BHM instead of the generic "Our People's Keeper" placeholder

2. **Header Navigation — Add Impact Media Hub link**
   - Add "Impact Media Hub" to the Services dropdown in `src/components/layout/Header.tsx` (e.g. `{ href: "/impact-media-hub", label: "Impact Media Hub" }`)

3. **Footer — Add link back**
   - Add `{ href: "/impact-media-hub", label: "Impact Media Hub" }` to the Navigate list in `src/components/layout/Footer.tsx`

4. **Hub Examples page — Already has Black Creek**
   - `src/pages/HubExamples.tsx` already lists the Black Creek BHM hub, no changes needed

### Technical Notes
- The `ImpactMediaHubSection` component already exists and is functional — just needs to be re-imported on the homepage
- The `/impact-media-hub` and `/hub/black-creek-bhm` routes are already registered in `App.tsx`
- The preview card in the homepage section will be updated to show Black Creek BHM stats (3 events, 3 partners, 100+ photos) to reflect the real hub

