import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import PrinciplesSection from "@/components/home/PrinciplesSection";
import VideoPortfolioSection from "@/components/home/VideoPortfolioSection";
import FrameworkPreviewSection from "@/components/home/FrameworkPreviewSection";
import ClientLogosSection from "@/components/home/ClientLogosSection";
import ImpactStatsSection from "@/components/home/ImpactStatsSection";
import ServicesPreviewSection from "@/components/home/ServicesPreviewSection";
import FounderSection from "@/components/home/FounderSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PrinciplesSection />
      <VideoPortfolioSection />
      <ClientLogosSection />
      <ImpactStatsSection />
      <ServicesPreviewSection />
      <FrameworkPreviewSection />
      <FounderSection />
    </Layout>
  );
};

export default Index;