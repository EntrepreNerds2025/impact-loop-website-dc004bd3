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
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ImpactMediaHub from "./pages/ImpactMediaHub";
import HubDemo from "./pages/HubDemo";
import HubExamples from "./pages/HubExamples";
import HubCorporateDemo from "./pages/HubCorporateDemo";
import Research from "./pages/Research";
import ReportMetricsThatMatter from "./pages/ReportMetricsThatMatter";
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
          <Route path="/login" element={<Login />} />
          <Route path="/impact-media-hub" element={<ImpactMediaHub />} />
          <Route path="/hub/demo" element={<HubDemo />} />
          <Route path="/hub/examples" element={<HubExamples />} />
          <Route path="/hub/corporate-demo" element={<HubCorporateDemo />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/metrics-that-matter-2026" element={<ReportMetricsThatMatter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
