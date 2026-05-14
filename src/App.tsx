import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Work from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ImpactMediaHub from "./pages/ImpactMediaHub";
import HubExamples from "./pages/HubExamples";
import HubBlackCreekBHM from "./pages/HubBlackCreekBHM";
import HubCafcanOPKT from "./pages/HubCafcanOPKT";
import Research from "./pages/Research";
import ReportMetricsThatMatter from "./pages/ReportMetricsThatMatter";
import CinematicImpactFilms from "./pages/CinematicImpactFilms";
import SignatureProduction from "./pages/SignatureProduction";
import AdaptAITraining from "./pages/AdaptAITraining";
import NonprofitAIWorkbook from "./pages/NonprofitAIWorkbook";
import ImpactVisibilitySystem from "./pages/ImpactVisibilitySystem";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import BookingConfirmed from "./pages/BookingConfirmed";
import RescheduleBooking from "./pages/RescheduleBooking";
import CancelBooking from "./pages/CancelBooking";
import TropicanaFriendRaiser from "./pages/proposals/TropicanaFriendRaiser";
import SampleContentRequests from "./pages/admin/SampleContentRequests";
import CaseStudyDeck from "./pages/CaseStudyDeck";
import StoryLoop from "./pages/StoryLoop";
import StoryLoopResult from "./pages/StoryLoopResult";
import StoryLoopSessions from "./pages/admin/StoryLoopSessions";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
          <Route path="/booking/reschedule/:token" element={<RescheduleBooking />} />
          <Route path="/booking/cancel/:token" element={<CancelBooking />} />
          <Route path="/impact-media-hub" element={<ImpactMediaHub />} />
          <Route path="/hub/demo" element={<HubBlackCreekBHM />} />
          <Route path="/hub/examples" element={<HubExamples />} />
          <Route path="/hub/corporate-demo" element={<HubBlackCreekBHM />} />
          <Route path="/hub/black-creek-bhm" element={<HubBlackCreekBHM />} />
          <Route path="/hub/story-cafcan" element={<HubCafcanOPKT />} />
          <Route path="/hub/story-cafcan/*" element={<HubCafcanOPKT />} />
          <Route path="/hub/cafcan-opkt" element={<Navigate to="/hub/story-cafcan" replace />} />
          <Route path="/hub/cafcan" element={<Navigate to="/hub/story-cafcan" replace />} />
          <Route path="/hub/cafcan/*" element={<Navigate to="/hub/story-cafcan" replace />} />
          <Route path="/hub/cafcan-opkt/*" element={<Navigate to="/hub/story-cafcan" replace />} />
          <Route path="/hub/cafcan-opkt-hub" element={<Navigate to="/hub/story-cafcan" replace />} />
          <Route path="/hub/cafcan-hub" element={<Navigate to="/hub/story-cafcan" replace />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/metrics-that-matter-2026" element={<ReportMetricsThatMatter />} />
          <Route path="/cinematic-impact-films" element={<CinematicImpactFilms />} />
          <Route path="/impact-story-capture" element={<CinematicImpactFilms />} />
          <Route path="/signature-production" element={<SignatureProduction />} />
          <Route path="/signature-productions" element={<Navigate to="/signature-production" replace />} />
          <Route path="/signature" element={<Navigate to="/signature-production" replace />} />
          <Route path="/adapt-ai-training" element={<AdaptAITraining />} />
          <Route path="/adapt" element={<Navigate to="/adapt-ai-training" replace />} />
          <Route path="/nonprofit-ai-workbook" element={<NonprofitAIWorkbook />} />
          <Route path="/workbook" element={<Navigate to="/nonprofit-ai-workbook" replace />} />
          <Route path="/impact-visibility-system" element={<ImpactVisibilitySystem />} />
          <Route path="/admin/sample-content-requests" element={<SampleContentRequests />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/category/:categorySlug" element={<BlogCategory />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* Unlisted proposal routes - not in nav, not in sitemap, noindex via meta */}
          <Route path="/proposals/tropicana-friendraiser" element={<TropicanaFriendRaiser />} />
          <Route path="/case-studies" element={<CaseStudyDeck />} />
          <Route path="/loop" element={<StoryLoop />} />
          <Route path="/loop/result/:id" element={<StoryLoopResult />} />
          <Route path="/admin/loop-sessions" element={<StoryLoopSessions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
