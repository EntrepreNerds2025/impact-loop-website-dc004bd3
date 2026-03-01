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
import TechSolutionsSection from "@/components/home/TechSolutionsSection";
import FounderSection from "@/components/home/FounderSection";

const Index = () => {
  useEffect(() => {
    setSEO({
      title: "Impact Loop — Cinematic Storytelling for Nonprofits & Changemakers",
      description: "Impact Loop designs storytelling systems that protect human stories in an AI-saturated world. Cinematic video production, workshops, and strategy for nonprofits and corporate teams.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      <HeroSection />
      <PrinciplesSection />
      <VideoPortfolioSection />
      <ClientLogosSection />
      <ImpactStatsSection />
      <ServicesPreviewSection />
      <TechSolutionsSection />
      <FrameworkPreviewSection />
      <FounderSection />
    </Layout>
  );
};

export default Index;