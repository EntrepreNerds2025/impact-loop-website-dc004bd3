import type { ImpactPage } from "./types";
import { cafcanOpkt } from "./cafcan-opkt";

/**
 * Registry of Impact Pages, keyed by slug.
 * Add new pages here — they become available at /impact/:slug automatically.
 * Later, this registry can be replaced by (or fall back to) data fetched from
 * the Impact Loop Standard software / Supabase, without changing the template.
 */
export const impactPages: Record<string, ImpactPage> = {
  [cafcanOpkt.slug]: cafcanOpkt,
};

export function getImpactPage(slug: string | undefined): ImpactPage | undefined {
  if (!slug) return undefined;
  return impactPages[slug];
}

export function listImpactPages(): ImpactPage[] {
  return Object.values(impactPages);
}
