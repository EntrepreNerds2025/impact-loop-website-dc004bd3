import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import type { ImpactPage, ImpactSectionId } from "@/data/impactPages/types";
import {
  HeroSection,
  OverviewSection,
  StatsSection,
  CohortsSection,
  OutcomesSection,
  HighlightsSection,
  StandardSection,
  StoriesSection,
  StaffSection,
  MediaSection,
  PartnersSection,
  CtaSection,
} from "./sections";

/**
 * Config-driven Impact Page.
 * Renders any ImpactPage data object. A section appears when (a) its data is
 * present AND (b) it isn't explicitly disabled via `page.sections[id] === false`.
 * Order is fixed and report-credible: context → reach → proof → measurement →
 * stories → media → partners → CTA.
 */
export default function ImpactPageTemplate({ page }: { page: ImpactPage }) {
  useEffect(() => {
    setSEO({
      title:
        page.seo?.title ||
        `${page.programName} — Impact Report · ${page.organizationName}`,
      description:
        page.seo?.description ||
        page.programDescription ||
        `An impact report for ${page.programName} by ${page.organizationName}.`,
      ogType: "article",
      path: `/impact/${page.slug}`,
    });
    return resetSEO;
  }, [page]);

  const show = (id: ImpactSectionId, hasData: boolean) =>
    hasData && page.sections?.[id] !== false;

  const handleDownload = () => window.print();

  return (
    <Layout>
      <main className="bg-background text-foreground">
        {show("hero", true) && (
          <HeroSection
            organizationName={page.organizationName}
            programName={page.programName}
            hero={page.hero}
            reportingPeriod={page.reportingPeriod}
            communityServed={page.communityServed}
          />
        )}

        {show("overview", !!page.programDescription) && (
          <OverviewSection
            programName={page.programName}
            programDescription={page.programDescription}
            communityServed={page.communityServed}
          />
        )}

        {show("stats", !!page.stats?.length) && <StatsSection stats={page.stats!} />}

        {show("cohorts", !!page.cohorts?.length) && (
          <CohortsSection cohorts={page.cohorts!} />
        )}

        {show("outcomes", !!page.keyOutcomes?.length) && (
          <OutcomesSection outcomes={page.keyOutcomes!} />
        )}

        {show("highlights", !!page.impactHighlights?.length) && (
          <HighlightsSection highlights={page.impactHighlights!} />
        )}

        {show("standard", !!page.standard) && <StandardSection standard={page.standard!} />}

        {show("stories", !!page.testimonials?.length) && (
          <StoriesSection testimonials={page.testimonials!} />
        )}

        {show("staff", !!page.staffQuotes?.length) && (
          <StaffSection quotes={page.staffQuotes!} />
        )}

        {show("media", !!(page.photos?.length || page.videos?.length)) && (
          <MediaSection photos={page.photos} videos={page.videos} />
        )}

        {show("partners", !!page.partners?.length) && (
          <PartnersSection partners={page.partners!} />
        )}

        {show("cta", !!(page.cta || page.allowDownload)) && (
          <CtaSection
            cta={page.cta}
            allowDownload={page.allowDownload}
            onDownload={handleDownload}
          />
        )}
      </main>
    </Layout>
  );
}
