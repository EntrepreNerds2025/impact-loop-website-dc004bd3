import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import { setSEO, resetSEO } from "@/lib/seo";
import PrinciplesSection from "@/components/home/PrinciplesSection";
import VideoPortfolioSection from "@/components/home/VideoPortfolioSection";
import FrameworkPreviewSection from "@/components/home/FrameworkPreviewSection";
import ClientLogosSection from "@/components/home/ClientLogosSection";
import ImpactStatsSection from "@/components/home/ImpactStatsSection";
import ServicesPreviewSection from "@/components/home/ServicesPreviewSection";
import ImpactMediaHubSection from "@/components/home/ImpactMediaHubSection";
import TechSolutionsSection from "@/components/home/TechSolutionsSection";
import ImpactStandardSection from "@/components/home/ImpactStandardSection";
import FounderSection from "@/components/home/FounderSection";

const Index = () => {
  useEffect(() => {
    setSEO({
      title: "Impact Loop: Prove Your Impact. Tell Your Story.",
      description: "Impact Loop helps mission-driven organizations prove their impact with the Impact Loop Standard — auditable, funder-ready measurement — and tell it through cinematic storytelling systems. Toronto-based, working with nonprofits and changemakers.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      <HeroSection />
      <ClientLogosSection />
      <ImpactStandardSection />
      <PrinciplesSection />
      <VideoPortfolioSection />
      <ImpactStatsSection />
      <ServicesPreviewSection />
      <ImpactMediaHubSection />
      <TechSolutionsSection />
      <FrameworkPreviewSection />
      <FounderSection />
    </Layout>
  );
};

export default Index;
