import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import HeroCubeWrapper from "@/components/home/HeroCubeWrapper";
import PrinciplesSection from "@/components/home/PrinciplesSection";
import VideoPortfolioSection from "@/components/home/VideoPortfolioSection";
import FrameworkPreviewSection from "@/components/home/FrameworkPreviewSection";
import ClientLogosSection from "@/components/home/ClientLogosSection";
import ImpactStatsSection from "@/components/home/ImpactStatsSection";
import ServicesPreviewSection from "@/components/home/ServicesPreviewSection";
import ImpactMediaHubSection from "@/components/home/ImpactMediaHubSection";
import FounderSection from "@/components/home/FounderSection";

const Index = () => {
  return (
    <Layout>
      <HeroCubeWrapper
        contentChildren={<PrinciplesSection />}
      >
        <HeroSection />
      </HeroCubeWrapper>
      <VideoPortfolioSection />
      <ClientLogosSection />
      <ImpactStatsSection />
      <ServicesPreviewSection />
      <ImpactMediaHubSection />
      <FrameworkPreviewSection />
      <FounderSection />
    </Layout>
  );
};

export default Index;