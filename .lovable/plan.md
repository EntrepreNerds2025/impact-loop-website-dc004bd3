

# Connect Contact Form to CRM

## Overview
Add a POST request to your CRM endpoint in the contact form's submit handler, alongside the existing database save and email notification. No UI changes.

## Field Mapping
The current form fields map to the CRM payload as follows:

| Form Field | CRM Field |
|---|---|
| `name` | `first_name` (full name sent as first_name since there's no separate last_name field) |
| `email` | `email` |
| `organization` | `company_name` |
| `service_interest` | `service_interest` |
| `message` | `message` |
| (hardcoded) | `business_unit: "impact_loop"` |

## Technical Changes

### File: `src/pages/Contact.tsx`

In the `handleSubmit` function, after the existing database insert and email notification, add a `fetch` call to the CRM endpoint:

- POST to `https://oyjbpxdcazamsdtrrmey.supabase.co/functions/v1/receive-inquiry`
- Include `Content-Type` and `apikey` headers
- Map form fields to the CRM's expected JSON body
- The CRM call will be part of the main try/catch block -- if it fails, the user sees the error toast
- On success (200), show success toast and reset form (existing behavior)
- The existing database save and email notification remain unchanged

The apikey is a publishable/anon key, so it is safe to include directly in code.

### Submission Flow (after change)
1. Save to `contact_submissions` table (existing)
2. Send email notification via backend function (existing, non-critical)
3. POST to CRM endpoint (new)
4. Show success toast and reset form

