

## Multi-Part Site Update

### 1. Remove "Three Column Text" from PrinciplesSection

Remove the bottom three-column text block (lines 64-81 in `PrinciplesSection.tsx`) -- "Beyond Content", "Systems Thinking", "Human Voice Protection". Keep the 6-card grid above it.

### 2. Update Client Logos Section with Real Logos

Replace the placeholder text logos with the 10 uploaded white logo images. Change the section background to dark (`bg-impact-dark`) so the white logos are visible. Update the heading text to "Trusted by organizations and companies making real impact."

Logos to include (copied to `src/assets/logos/`):
- Cafcan
- Black Creek
- BCF (Barrie Community Foundation)
- Bartley Skills Development
- Reddit
- Fibe (Bell)
- EmployNext
- Addictive Services
- Leukemia
- Lakeridge

Each logo displayed as an `<img>` at roughly `h-10 w-auto` with `object-contain`, arranged in a responsive grid.

### 3. Remove "Build a Hub" Button from ImpactMediaHubSection

Remove the third CTA link ("Build a Hub") from `ImpactMediaHubSection.tsx` (line 51-53), keeping just "View Nonprofit Demo Hub" and "View CSR Demo Hub".

### 4. Update Footer Contact Info

In `Footer.tsx`:
- Email: `hello@impactloop.ca` to `info@impactloop.ca`
- Phone: `(123) 456-7890` to `(647) 832-9775` and `tel:+16478329775`
- Location: `Barrie, ON, Canada` to `Toronto, ON, Canada`

### 5. Create Terms of Service Page

New file `src/pages/Terms.tsx` with a proper Terms of Service for a video production and storytelling company (Impact Loop). Covers: services, intellectual property, payment terms, liability limitations, client responsibilities, content usage rights, and governing law (Ontario, Canada).

### 6. Create Privacy Policy Page

New file `src/pages/Privacy.tsx` with a privacy policy covering: data collection, use of information, cookies, third-party services, data retention, rights under Canadian privacy law (PIPEDA), and contact info using `info@impactloop.ca`.

### 7. Add Routes for Terms and Privacy

In `App.tsx`, import and add routes for `/terms` and `/privacy`. These links already exist in the footer.

### Technical Details

**Files modified:**
- `src/components/home/PrinciplesSection.tsx` -- remove three-column text block
- `src/components/home/ClientLogosSection.tsx` -- replace with real logos on dark background
- `src/components/home/ImpactMediaHubSection.tsx` -- remove "Build a Hub" button
- `src/components/layout/Footer.tsx` -- update contact details
- `src/App.tsx` -- add Terms and Privacy routes

**Files created:**
- `src/pages/Terms.tsx`
- `src/pages/Privacy.tsx`
- 10 logo files copied to `src/assets/logos/`
