import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Work from "./pages/Work";
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
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BookingConfirmed from "./pages/BookingConfirmed";
import RescheduleBooking from "./pages/RescheduleBooking";
import CancelBooking from "./pages/CancelBooking";
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
          <Route path="/hub/cafcan-opkt" element={<HubCafcanOPKT />} />
          <Route path="/hub/cafcan" element={<HubCafcanOPKT />} />
          <Route path="/hub/cafcan-opkt-hub" element={<HubCafcanOPKT />} />
          <Route path="/hub/cafcan-hub" element={<HubCafcanOPKT />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/metrics-that-matter-2026" element={<ReportMetricsThatMatter />} />
          <Route path="/cinematic-impact-films" element={<CinematicImpactFilms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
