

# Impact Loop - Premium Website with Light Client Access

## Overview
A cinematic, premium website that positions Impact Loop as a storytelling systems company. Combines the visual excellence of the original impactloop.ca with a lightweight, secure client access system for framework materials and resources — without becoming a SaaS dashboard.

---

## Part 1: Public Website (No Login Required)

### Homepage
- **Hero Section**: Full-screen video background with dark overlay
  - Headline: "Real Stories. Real Proof. Real Trust."
  - Subheadline: "Impact Loop helps organizations turn real human impact into trusted narratives without sounding generic or synthetic."
  - Two CTAs: "Book a Storytelling Diagnostic" + "Explore the Framework"
- **What Makes Impact Loop Different**: System principles section (blue background)
- **Video Portfolio Grid**: 2x3 grid with looping GIF previews, Vimeo lightbox with autoplay
- **Framework Preview**: Teaser cards for the framework (locked content indicators)
- **Client Logos**: Horizontal logo bar
- **Impact Statistics**: "22X Higher Impact" section
- **Founder Section**: Rovonn Russell bio with photo (purple background)
- **Footer**: Navigation, contact info, login link

### About Page
- Why Impact Loop exists now
- The shift from content to trust
- Storytelling as infrastructure philosophy
- Founder credibility section
- CTA: Book a diagnostic

### Work/Portfolio Page
- Filterable video portfolio grid
- Individual project pages with:
  - Vimeo embed
  - Story context
  - What changed / outcomes
  - How trust was protected
- CTA: "See the process behind this work"

### Services Page
Services presented as pathways, not packages:
1. **Workshops & Training** - Build internal storytelling capacity
2. **Framework Kit Access** - Self-guided system materials
3. **System Setup (Pilot)** - Guided implementation
4. **Video as Proof** - Limited availability production

Each includes: who it's for, problem solved, outcomes, CTA

### Bookings Page (Public)
- Embedded booking system (Calendly or native)
- Booking types:
  - Storytelling Diagnostic (30-45 min)
  - Workshop Discovery Call
  - System Pilot Call
- Intake form integration

---

## Part 2: Authentication & User Roles

### Role Structure (Supabase)
| Role | Access Level |
|------|-------------|
| Visitor | Public pages only |
| Free Member | Email signup, limited resources |
| Client | Full framework kit access |
| Subscriber | Future system access |
| Admin | Full management access |

### Auth Features
- Email/password login
- Magic link option
- Login link in footer + header
- Secure role-based access control
- No complex onboarding flow

---

## Part 3: Client Access Area (Post-Login)

**Design Philosophy**: This is NOT a dashboard. Clean, calm, link-based navigation. Premium feel, not software UI.

### Client Access Landing
Simple page with clear sections:
1. **Start Here** → Orientation
2. **Framework Modules** → Core content
3. **Templates & Downloads** → Resources
4. **Book a Session** → Scheduling
5. **Account** → Profile management

### Start Here Section
- Welcome message
- Short orientation text
- Recommended order: Story Standard → Story Types → Intake Prompts
- CTA to book onboarding call

### Framework Modules
- Card-style module list
- Each card shows: title, description, access level indicator
- "Open Module" button
- Links to: Gamma documents, PDFs, or hosted pages
- Locked indicators for unpurchased content

### Templates & Downloads
- Filterable resource list
- Categories: Templates, Checklists, Guides
- Each resource: description, format badge, download button
- Access control based on user role

### Book a Session
- Embedded booking with auto-filled user info
- Same booking types as public, but personalized

### Account Page
- Email display
- Purchased products list
- Current access level
- Logout button
- No analytics or tracking visible

---

## Part 4: Resource Management (Admin)

### Resource Library Structure
Database fields for each resource:
- Title
- Summary
- Type (PDF, doc, video, checklist)
- Category
- Tags
- Access Level (public / free / paid)
- File URL or embed URL
- Published toggle

### Admin Capabilities
- Add/edit/delete resources
- Manage module content
- View user list and roles
- Manual role assignment

---

## Part 5: Payments (Stripe Integration)

### Products
1. **Framework Kit** - One-time purchase
2. **Workshop Tickets** - Event-based (if needed)
3. **Subscription** - Future-ready structure

### Purchase Flow
1. User clicks "Get Framework Kit"
2. Stripe Checkout opens
3. Payment processed
4. Webhook updates user role to "Client"
5. Confirmation email sent
6. Immediate access to locked content

---

## Part 6: Technical Architecture

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion or CSS animations for smooth reveals
- Lazy loading for video/GIF performance
- Fully responsive design

### Backend (Supabase)
- **Auth**: User authentication with role management
- **Database Tables**:
  - `profiles` - User info
  - `user_roles` - Role assignments
  - `resources` - Framework materials
  - `modules` - Framework modules
  - `purchases` - Payment records
- **Row Level Security**: Role-based content access
- **Storage**: For downloadable files

### Integrations
- **Stripe**: Payment processing + webhooks
- **Vimeo**: Video embeds in lightbox modals
- **Calendly** (or native): Booking system

---

## Visual Design Principles
- Dark hero sections with motion video
- Blue (#4F5BD5) and purple (#7C3AED) accent sections
- Clean serif + sans-serif typography pairing
- Generous whitespace
- Subtle scroll animations
- No stock-photo marketing visuals
- Premium, calm, intentional feel

---

## What's NOT Being Built
❌ Dashboards with widgets  
❌ Workflow/task tracking  
❌ Story submission UI  
❌ Analytics panels  
❌ Complex user metrics  
❌ Course platform features  

---

## Future-Ready Architecture
The database structure will support future additions of:
- Story intake forms
- Review status tracking
- Proof attachments
- Reporting views

But these will NOT be built or surfaced in this phase.

---

## Build Order
1. **Phase 1**: Core public pages with video portfolio (original impactloop.ca recreation)
2. **Phase 2**: Supabase setup with auth and user roles
3. **Phase 3**: Client access area with framework modules
4. **Phase 4**: Resource library and templates section
5. **Phase 5**: Stripe integration for Framework Kit purchase
6. **Phase 6**: Polish, animations, and final content integration

