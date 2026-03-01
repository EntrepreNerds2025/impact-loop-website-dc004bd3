

# Update Favicon and Hide Impact Media Hub

## 1. Update Favicon and Meta Images

**Files changed:**
- Copy uploaded logo to `public/favicon.png`
- `index.html` -- update `<link rel="icon">` to point to `/favicon.png`, add `<link rel="apple-touch-icon" href="/favicon.png">`, update `og:image` and `twitter:image` meta tags to reference the new logo

## 2. Hide Impact Media Hub (temporarily)

Remove all references to Impact Media Hub from public-facing navigation while keeping the page files intact so they can be re-enabled later.

**Files changed:**

- `src/pages/Index.tsx` -- Remove the `<ImpactMediaHubSection />` component from the homepage render (and its import)
- `src/components/layout/Header.tsx` -- Remove the `{ href: "/impact-media-hub", label: "Impact Media Hub" }` entry from `servicesDropdown`
- `src/components/layout/Footer.tsx` -- Remove the `{ href: "/impact-media-hub", label: "Impact Media Hub" }` link from the footer navigation list
- `src/App.tsx` -- Keep the `/impact-media-hub` route in place (so direct links still work), but it won't be discoverable from navigation
- `public/sitemap.xml` -- Remove the `/impact-media-hub` entry

The page files (`ImpactMediaHub.tsx`, `HubDemo.tsx`, `HubCorporateDemo.tsx`, `HubExamples.tsx`, `ImpactMediaHubSection.tsx`) remain untouched -- ready to bring back when updated.

