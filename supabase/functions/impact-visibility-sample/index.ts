import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { syncBookingToCrm } from "../_shared/notifications.ts";
import { getServiceSupabaseClient } from "../_shared/supabase.ts";

const tags = [
  "impact_visibility_sample_request",
  "content_services_lead",
  "impact_loop",
];

const requiredFields = [
  "first_name",
  "last_name",
  "email",
  "organization_name",
  "organization_type",
  "website_or_social_link",
  "visibility_goal",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  try {
    const payload = await req.json();
    const missing = requiredFields.filter((field) => !String(payload[field] || "").trim());

    if (missing.length) {
      return jsonResponse({ success: false, error: `Missing fields: ${missing.join(", ")}` }, 400);
    }

    const requestPayload = {
      first_name: String(payload.first_name).trim(),
      last_name: String(payload.last_name).trim(),
      email: String(payload.email).trim().toLowerCase(),
      organization_name: String(payload.organization_name).trim(),
      organization_type: String(payload.organization_type).trim(),
      website_or_social_link: String(payload.website_or_social_link).trim(),
      visibility_goal: String(payload.visibility_goal).trim(),
      interested_in_ongoing_content_support: Boolean(payload.interested_in_ongoing_content_support),
      source: "impact_visibility_system_page",
      lead_magnet: "sample_content_pack",
      status: "sample_requested",
      stage: "Sample Content Requested",
      tags,
    };

    const supabase = getServiceSupabaseClient();

    const { data, error } = await supabase
      .from("sample_content_requests")
      .upsert(requestPayload, {
        onConflict: "email,organization_name,lead_magnet",
      })
      .select("*")
      .single();

    if (error || !data) {
      throw error || new Error("Could not save sample content request.");
    }

    const crmWarnings: string[] = [];

    try {
      await syncBookingToCrm({
        firstName: requestPayload.first_name,
        email: requestPayload.email,
        companyName: requestPayload.organization_name,
        serviceInterest: "Impact Visibility System - Sample Content Pack",
        message: [
          `Organization type: ${requestPayload.organization_type}`,
          `Website or social link: ${requestPayload.website_or_social_link}`,
          `Visibility goal: ${requestPayload.visibility_goal}`,
          `Interested in ongoing content support: ${requestPayload.interested_in_ongoing_content_support ? "Yes" : "No"}`,
          `Stage: ${requestPayload.stage}`,
          `Tags: ${requestPayload.tags.join(", ")}`,
        ].join("\n"),
      });
    } catch (crmError) {
      console.warn("Impact Loop CRM sync failed.", crmError);
      crmWarnings.push("Impact Loop CRM sync failed.");
    }

    const crmWebhookUrl = Deno.env.get("IMPACT_LOOP_CRM_WEBHOOK_URL");
    const crmApiKey = Deno.env.get("IMPACT_LOOP_CRM_API_KEY");

    if (crmWebhookUrl) {
      try {
        await fetch(crmWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(crmApiKey ? { Authorization: `Bearer ${crmApiKey}` } : {}),
          },
          body: JSON.stringify({
            ...requestPayload,
            id: data.id,
            crm_path: "/api/leads/impact-visibility-sample",
          }),
        });
      } catch (crmError) {
        console.warn("CRM webhook could not be reached.", crmError);
        crmWarnings.push("Configured CRM webhook could not be reached.");
      }
    }

    return jsonResponse({ success: true, request: data, warnings: crmWarnings });
  } catch (error) {
    console.error("impact-visibility-sample error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ success: false, error: message }, 500);
  }
});
