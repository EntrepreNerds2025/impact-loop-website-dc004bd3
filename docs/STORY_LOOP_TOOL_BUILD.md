# Story LOOP — Build Spec

> Lead magnet tool that branches by org type. Three paths: Nonprofit, Business, Independent Founder. Each path produces a multi-format storytelling content package tailored to that audience and routes the lead back to the right Rovonn brand at the end. Lives on impactloop.ca. Strategic, not film-script. Built on existing Lovable + Supabase stack.
>
> Last updated 2026-05-11

---

## Three paths by org type

The first screen of the tool is a path selector. One question: "Which best describes you?" Three cards. Click chooses the path. Everything after that — intake questions, audience versions, output framing, end CTA — is path-specific.

### Path A — Nonprofit / community organization
*"I'm a nonprofit, charity, or community-serving org telling stories to funders, donors, partners, or our community."*

- Intake adapts to: funders, donors, programs, beneficiaries, mission, impact reporting, grant cycles
- Audience versions: funder / donor / community / partner
- "The human at the center" → a beneficiary or program participant
- End CTA → **Impact Loop** ("We make these stories into films. Book a discovery call.")
- Routes to: `impactloop.ca/contact`

### Path B — For-profit business / B2B founder
*"I'm running a business or B2B startup telling stories to customers, prospects, partners, or investors."*

- Intake adapts to: products, customers, transformation, business outcomes, market positioning, growth stage
- Audience versions: prospect / customer / investor / partner
- "The human at the center" → a customer whose work changed because of the product
- End CTA → **EntrepreNerds** (for AI systems builds) OR **rovonnrussell.com/studio** (for a premium directorial brand film)
- Routes to: `entreprenerdsagency.com/contact` and `rovonnrussell.com/studio`

### Path C — Independent founder / creator / coach
*"I'm a solo founder, creator, coach, consultant, or speaker building authority and audience."*

- Intake adapts to: origin story, point of view, audience, offer, transformation arc
- Audience versions: audience / peers / clients / press
- "The human at the center" → you yourself, or a transformation moment in your own work
- End CTA → **rovonnrussell.com/advisory** (for thinking partner work) or **rovonnrussell.com/studio** (for a personal brand film)
- Routes to: `rovonnrussell.com/work-with-me`

### Not included
No Path D for small service businesses. Nerds Creative gets its own lead magnet flow. Keeping this tool focused on the three paths with the highest deal value and the strongest credibility.

### What stays the same across all three paths
- The LOOP framework (Lens / Origin / Obstacle / Payoff) and how it generates structure
- The output sections (story three lengths, audience versions, quote starters, headlines, visual brief, content calendar, CTAs)
- The voice rules (bridge tone, observation → reflection → bigger picture, specifics over abstractions)
- The 90-second processing screen and the print-to-PDF result page

### What varies per path
- The intake form questions (some shared, some path-specific)
- The audience labels in the four-version output
- The Claude prompt variant used to generate content
- The end CTA copy + link target
- The follow-up email sequence


---

## What the user actually gets

A nonprofit ED or comms lead spends 12-18 minutes filling out a structured intake form on `impactloop.ca/loop`. They submit. After a ~90-second processing screen they land on a result page that gives them, for their specific organization and program:

1. **Their core impact story written three lengths** — long form (~500 words for grant proposals and annual reports), medium form (~150 words for donor emails and newsletter spotlights), short form (~50 words for social captions and email subjects)
2. **Four audience adaptations** of the same story — funder version, donor version, community version, partner version
3. **5-8 strong quote-starters** they can use as prompts when interviewing the person at the center, or pull from existing testimonials
4. **8-10 headlines and hooks** they can use across formats
5. **Visual brief** describing 5-8 specific photo or scene moments that would strengthen the story (they can shoot these on a phone or pull from existing assets)
6. **Content calendar suggestion** — when to break the story into a 4-week social sequence vs releasing it in one piece
7. **CTA library** — different calls to action tuned per audience

They also get the result emailed to them as a permanent shareable link plus a downloadable PDF.

**Not delivered:** a film storyboard, a video script, or any artifact that requires production they can't afford. Everything in the output is something they can ship themselves within a week.

---

## The intake form — what we ask, in this order

Multi-step form, one section per screen. Each section short. Progress bar. No login required to start; email captured at the end before processing.

### Section 1 — About your organization (2 questions)
- Organization name
- Type of organization (drop-down: nonprofit, community health centre, social service, mental health, youth program, advocacy, mutual aid, faith-based, other)
- Who you primarily serve (one sentence — e.g., "Black youth aging out of foster care in the GTA")
- Your mission in one sentence

### Section 2 — The specific story you want to tell (3 questions)
- Which program, initiative, campaign, or moment is this story about?
- Why are you telling it now? (drop-down or free text: annual report, grant proposal, year-end appeal, donor stewardship, new campaign launch, board presentation, social media push, partner outreach)
- What's at stake if this story doesn't get told well?

### Section 3 — The human at the center (3 questions)
- Is there a specific person whose story carries this? (yes / no / composite)
- If yes — first name only or initials, and what were they facing before they connected with your organization?
- What's different now? (the change you've seen — be specific)

If no specific person: free-form description of the kind of person and situation, written as a composite.

### Section 4 — Audience and use (2 questions)
- Primary audience for this story (single select: funder / donor / community / partner / board / general public)
- Where will you use it? (multi-select: grant proposal, donor email, newsletter, social media, website hero, annual report, pitch deck, gala, board meeting)

### Section 5 — Existing assets (open-ended)
- Do you have testimonials, real quotes, photos, video footage, or other materials related to this story? Briefly describe what you have, even in rough form. Example: "We have a 2-minute interview clip with the participant, three photos from the program, and a written reflection she sent us in an email."

### Section 6 — Voice and tone preferences (1 question, optional)
- Anything we should know about your organization's voice? (e.g., "We avoid savior framing," "We always center the participant's own words," "Our funders are clinical, our donors are emotional")

### Section 7 — Contact (3 fields)
- Your name
- Your role at the organization
- Email to send results
- Checkbox: "OK to email me occasionally with related resources from Impact Loop"

Submit triggers processing. ~90 seconds spinner with real-feeling progress copy ("Reading your inputs... structuring your story arc using LOOP... drafting your four audience versions... pulling quote starters... building your visual brief...").

---

## The result page — what shows after processing

Public URL: `impactloop.ca/loop/result/[sessionId]`

Permanent link (so they can come back). Email contains the link. Page is private-by-default (only accessible with the unique ID) but easy to share with their team.

### Page structure

**Hero band**
- Organization name and program name at top
- Headline: "Your Story LOOP — [program name]"
- Subline: "Generated from your inputs on [date]. Save this link. Share it with your team."

**Section 1 — Your LOOP**
Visual breakdown of the four pillars applied to their story:
- **L — Lens:** [whose voice carries this best, and why]
- **O — Origin:** [the real opening moment, written as 2-3 sentences]
- **O — Obstacle:** [the friction or stakes, framed for their primary audience]
- **P — Payoff:** [the change, measurable in their context]

Each pillar gets a 2-4 line written paragraph, specific to their inputs. This is the spine.

**Section 2 — Your story, three lengths**
Three tabs or expandable cards:
- Long form (500 words) — for grant proposals, annual reports
- Medium form (150 words) — for donor emails, newsletter features, website
- Short form (50 words) — for social captions, board summaries

Each version has a copy-to-clipboard button. Each is written in their organizational voice (informed by Section 6 inputs).

**Section 3 — Four audience versions**
Four cards side by side. Each shows the same core story reframed for one audience:
- Funder version (outcome-led, evidence-led)
- Donor version (transformation-led, emotional)
- Community version (relational, ongoing)
- Partner version (collaborative, capacity-focused)

Each card has the version written out (~120-150 words) and a copy button.

**Section 4 — Quote starters**
Card with 5-8 sentence starters for use in interviews or pulling from existing testimonials. Examples generated per their story:
- *"When [name] came to us, she was..."*
- *"What changed wasn't the program, it was..."*
- *"Three months in, [name] said..."*
- *"The first time I saw [name] [doing something specific]..."*

**Section 5 — Headlines and hooks**
8-10 punchy openers tailored to their story. Useful as Instagram captions, email subject lines, grant proposal openers, donor letter leads. Examples:
- *"The youth who almost dropped out is now teaching."*
- *"A $40 haircut changed her year."*

Each copy-to-clipboard.

**Section 6 — Visual brief**
5-8 specific visual moments described with framing notes. Examples:
- *"Close-up: hands during the moment of skill being taught. No faces needed. Tells the story without identifying anyone."*
- *"Wide shot: the room mid-workshop. Show density and presence. Helps a funder see scale."*
- *"Portrait: [participant] in their environment, eye level, not posed. The hero shot of the package."*

The user can shoot these on a phone or pull from existing assets.

**Section 7 — Content calendar suggestion**
Recommends a release sequence based on their inputs:
- *"Week 1: Short form on Instagram + LinkedIn. Lead with [specific hook]."*
- *"Week 2: Medium form as donor email. CTA: [specific ask]."*
- *"Week 3: Long form opens your grant proposal narrative section."*
- *"Week 4: Quote-led carousel on Instagram, repurposing the quote starters."*

**Section 8 — CTAs for each audience**
Suggested actions to ask of each audience, with rationale.
- Funder CTA: "Open a conversation about a multi-year grant."
- Donor CTA: "Give $50/month."
- Community CTA: "Join the next cohort."
- Partner CTA: "Coordinate next quarter's intake."

**Bottom of page — CTA for Impact Loop**
Sidebar or section card:
*"Want this story told as a cinematic film, with professional production and a working asset library? That's what Impact Loop does. Book a 30-minute discovery call."*
- Button: "Book a call"
- Secondary link: "See past Impact Loop work" → /case-studies

---

## Tech architecture

### New files on impact-loop-website

```
src/pages/
  StoryLoopTool.tsx          # The /loop landing page + intake form
  StoryLoopResult.tsx        # The /loop/result/[id] result viewer

src/components/loop/
  IntakeStepper.tsx          # Multi-step form component
  IntakeStep.tsx             # Single step wrapper
  ResultLOOP.tsx             # The LOOP framework breakdown
  ResultThreeLengths.tsx     # The 3-length story display
  ResultAudienceVersions.tsx # 4 audience cards
  ResultQuoteStarters.tsx
  ResultHeadlines.tsx
  ResultVisualBrief.tsx
  ResultCalendar.tsx
  ResultCTAs.tsx
  ResultPDFExport.tsx        # Print/export styling
  ProcessingScreen.tsx       # The 90-second loader

supabase/functions/
  generate-story-loop/index.ts   # Edge function — receives inputs, calls Claude, saves result, emails

supabase/migrations/
  YYYYMMDDHHMMSS_story_loop_sessions.sql   # Table for sessions
```

### Database

```sql
create table story_loop_sessions (
  id uuid primary key default gen_random_uuid(),
  org_name text not null,
  org_type text,
  org_serves text,
  org_mission text,
  program_focus text,
  use_case text,
  stakes text,
  has_specific_person boolean,
  person_before text,
  person_after text,
  primary_audience text,
  use_channels text[],
  existing_assets text,
  voice_notes text,
  contact_name text not null,
  contact_role text,
  contact_email text not null,
  allow_followup boolean default false,
  inputs jsonb,
  output jsonb,
  status text default 'pending' check (status in ('pending', 'processing', 'complete', 'failed')),
  error text,
  created_at timestamptz default now(),
  completed_at timestamptz
);

create index story_loop_sessions_email_idx on story_loop_sessions(contact_email);
create index story_loop_sessions_created_at_idx on story_loop_sessions(created_at desc);
```

Public viewers access via session ID only. RLS allows anon read where `id = url_param`.

### Edge function flow

The `generate-story-loop` edge function:

1. Receives POST with intake inputs from frontend
2. Inserts row into `story_loop_sessions` with status='processing'
3. Builds the Claude prompt (see below) using inputs
4. Calls Anthropic API with `claude-sonnet-4-5` (or current generation), max_tokens ~8000
5. Parses the JSON response from Claude into structured output
6. Updates `story_loop_sessions` with output and status='complete'
7. Sends email via Resend with the result link + PDF attachment (optional)
8. Returns session ID to frontend, which then redirects to result page

If Claude returns malformed JSON, retry once, then mark failed and show error to user.

### Environment variables needed

- `ANTHROPIC_API_KEY` — stored in Supabase secrets (or Lovable's secrets UI)
- `RESEND_API_KEY` (or equivalent) — for email delivery
- `IMPACT_LOOP_FROM_EMAIL` — sender address for results

---

## The Claude prompt

This is the most important asset in the whole build. Refine for at least 3 cycles before launch.

### Prompt structure

```
You are the storytelling intelligence behind Impact Loop, a Toronto-based cinematic
storytelling company serving Black-serving and equity-focused community organizations.

You're producing a multi-format storytelling content package for a nonprofit using
the LOOP framework:
- L — Lens: whose voice carries this best
- O — Origin: the real moment this work started, no smoothing
- O — Obstacle: the friction or stakes that earn the audience's attention
- P — Payoff: the change, measured in the terms each audience cares about

Voice rules:
- Specific over abstract. Name real moments, real numbers where given.
- Observation → reflection → bigger picture is the dominant pattern.
- Bridge tone: technical fluency + creative judgment + community context.
- No SV AI-bro language. No creator-coach softness. No savior framing.
- Black founder voice — cultural fluency, never performative.
- Tricolons earn their place. Don't pad.
- Don't open with "I." Don't overuse "genuinely," "honestly," "straightforward."

The organization's inputs:
[INSERT STRUCTURED INPUTS HERE]

Generate a JSON object with the following shape:

{
  "loop": {
    "lens": "string — 2-3 sentences",
    "origin": "string — 2-3 sentences",
    "obstacle": "string — 2-3 sentences",
    "payoff": "string — 2-3 sentences"
  },
  "story": {
    "long_form_500w": "string",
    "medium_form_150w": "string",
    "short_form_50w": "string"
  },
  "audience_versions": {
    "funder": "string — 120-150 words, outcome-led, evidence-led",
    "donor": "string — 120-150 words, transformation-led, emotional but not maudlin",
    "community": "string — 120-150 words, relational, ongoing",
    "partner": "string — 120-150 words, collaborative, capacity-focused"
  },
  "quote_starters": ["string", ...] // 5-8 items, each a sentence opener
  "headlines": ["string", ...] // 8-10 short hooks
  "visual_brief": [
    {
      "shot_type": "string — e.g., 'Close-up', 'Wide', 'Portrait', 'Action'",
      "description": "string — what to capture",
      "purpose": "string — what story-job it does"
    }, ...
  ] // 5-8 items
  "content_calendar": [
    {
      "week": 1,
      "channel": "string",
      "format": "string",
      "lead_with": "string"
    }, ...
  ] // 4 weeks
  "ctas": {
    "funder": "string",
    "donor": "string",
    "community": "string",
    "partner": "string"
  }
}

Important: every field must be filled with content specific to the org's story.
Generic placeholder language fails. If you can't write specifically about something
based on the inputs, write the most plausible composite from the context they did
provide — never write "[describe here]" or generic filler.

Respond with the JSON only. No preamble, no markdown code fence.
```

The prompt loads the voice from `CONTENT_IDENTITY.md` so the output sounds like Rovonn's brand voice consistently.

### Cost estimate per generation

- Anthropic API call with ~3K input tokens + ~6K output tokens at claude-sonnet-4-5 rates
- Roughly $0.10-$0.15 per generation
- 100 free uses per month ≈ $10-15 in API cost
- Manageable. Email delivery via Resend free tier covers up to 3K emails/month.

---

## Build phases

| Phase | Deliverable | Time |
|---|---|---|
| 0 | Lock the prompt with 3 hand-tuned sample outputs | 1 weekend |
| 1 | Frontend form + result page (hard-coded sample data) | 1 weekend |
| 2 | Supabase table + edge function + Claude API integration | 3-4 evenings |
| 3 | Email delivery (Resend) + result URL persistence | 2 evenings |
| 4 | PDF export from result page | 2 evenings (use react-pdf or Puppeteer) |
| 5 | Polish — copy, UX, error handling, sample test runs | 1 weekend |
| 6 | Pre-launch beta with 5 friendly nonprofits | 1 week wait + iterate |
| 7 | Launch — share via LinkedIn, email Akeem + past clients | go-live |

**Total to launch:** ~3-4 weeks of evening/weekend work.

---

## Visual + UX direction

The whole experience should feel like a high-end nonprofit consultancy gave them a personalized strategy session, not like a generic AI tool.

- Color palette: Impact Loop's existing — cream, charcoal, copper, off-white
- Typography: Archivo Black for headlines, Manrope for body, Caveat sparingly
- Editorial-documentary feel, not SaaS dashboard
- Generous whitespace
- Each result section feels like a page from a thoughtful workbook
- Avoid sci-fi loading screens. The processing screen reads like a real strategist working: "Reading your inputs about the program..." not "Initializing AI sequence..."
- Result page is designed to print to PDF cleanly. They will absolutely print it and bring it into team meetings.

---

## Conversion path back to Impact Loop services

Every result page ends with a clear path back to paid Impact Loop work:

- "This is the strategy. We make the film. Book a call."
- Link to /case-studies (the deck we already built)
- Link to /contact

Follow-up email sequence (if user opts in):
- Day 0: confirmation email with result link
- Day 3: "Did your team find this useful? Two ways to go deeper..." (free office hours OR booked call)
- Day 10: "Here's a past Impact Loop project that started exactly where you're sitting now" (Tropicana, CAFCAN, or similar)
- Day 21: "Quarterly funder conversations are coming up. Want to talk?"

---

## Success metrics

| Metric | 30 days | 90 days |
|---|---|---|
| Total sessions completed | 25 | 100 |
| % completion rate (people who finish the form) | >65% | >70% |
| Email opt-in rate | >85% | >85% |
| Result page shared (multi-IP views) | 30% | 40% |
| Discovery calls booked from tool | 2 | 8 |
| Paid Impact Loop engagements from tool flow | 0 | 1 |

If after 60 days the tool is being used 30+ times per month and at least one discovery call is converting per month, double down. If usage is below 10 per month after promotion, the messaging or distribution channel needs work — not the tool itself.

---

## What I (Claude) can build right now

- All frontend pages and components
- The Supabase migration + edge function code
- The Claude prompt and the JSON schema validation
- The email template
- The PDF export logic
- Wire all of it through the existing GitHub push API

## What needs your involvement

- Anthropic API key in Supabase secrets (or Lovable's UI)
- Resend or similar email service key
- Final voice review on the prompt before launch (you read the 3 sample outputs and approve or flag)
- 5 friendly nonprofits willing to beta-test (Akeem can probably point you at 2-3 immediately)
- Domain decision — recommend `impactloop.ca/loop` (or `/story-loop`) as a path, not a subdomain, to consolidate SEO

---

## Next concrete step

Phase 0 — lock the prompt. Before any code, I write three sample outputs by hand (using Tropicana, Black Creek, and EmployNext as test cases). You read all three. If the structure feels right and the voice lands, we proceed with the build. If something's off, we adjust the prompt before writing any frontend code.

That single decision — does the output structure work — is the highest-leverage step in this whole build.
