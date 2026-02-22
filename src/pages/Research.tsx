import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Report data (hardcoded to match seed)
const reports = [
  {
    title: "The Metrics That Matter Report 2026",
    description: "Why impressions don't equal impact. A guide to measuring what matters in social impact communications.",
    slug: "metrics-that-matter-2026",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    label: "MEASUREMENT",
  },
  {
    title: "Culture vs. Counterfeit: The Nonprofit's Guide to Authentic Storytelling",
    description: "How organizations can tell real stories without extracting from the communities they serve.",
    slug: "culture-vs-counterfeit",
    cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    label: "STORYTELLING",
  },
  {
    title: "The Trust Effect: Rebuilding Stakeholder Confidence Through Media",
    description: "A framework for using video, photography, and narrative to rebuild trust after organizational change.",
    slug: "trust-effect",
    cover: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    label: "TRUST",
  },
  {
    title: "Constellations Outlook: The Forces Shaping Impact Communications in 2026",
    description: "Trends in nonprofit media, CSR reporting, and community-led storytelling.",
    slug: "constellations-outlook-2026",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    label: "TRENDS",
  },
  {
    title: "Inside Modern Impact Reporting: Trust, Timing & Building Credibility",
    description: "A deep dive into earned attention in the impact sector.",
    slug: "modern-impact-reporting",
    cover: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80",
    label: "CREDIBILITY",
  },
  {
    title: "Building a Story-First Strategy: A Guide for Nonprofits",
    description: "How to shift from data-heavy reports to narrative-driven impact communications.",
    slug: "story-first-strategy",
    cover: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80",
    label: "STRATEGY",
  },
  {
    title: "The Growing Power of Community-Led Media",
    description: "Why the most credible impact stories come from the communities themselves.",
    slug: "community-led-media",
    cover: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
    label: "COMMUNITY",
  },
];

const leadSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(100),
  last_name: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  organization: z.string().trim().min(1, "Organization is required").max(200),
});

type LeadFormValues = z.infer<typeof leadSchema>;

// --- Sub-components ---

const ReportCover = ({ cover, label, className = "" }: { cover: string; label: string; className?: string }) => (
  <div className={`relative overflow-hidden rounded-sm group ${className}`}>
    <img src={cover} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    <span className="absolute bottom-4 left-4 text-white/90 text-xs font-sans font-semibold tracking-[0.25em] uppercase">{label}</span>
  </div>
);

const ReadReportLink = ({ slug }: { slug: string }) => {
  const reportPages: Record<string, string> = {
    "metrics-that-matter-2026": "/research/metrics-that-matter-2026",
  };
  const href = reportPages[slug];
  if (!href) return null;
  return (
    <Link to={href} className="text-[hsl(var(--impact-blue))] text-xs font-semibold uppercase tracking-wider hover:underline mt-4 inline-block mr-4">
      Read Report →
    </Link>
  );
};

const DownloadButton = ({ onClick, slug }: { onClick: () => void; slug?: string }) => (
  <div className="flex items-center gap-4 mt-4">
    {slug && <ReadReportLink slug={slug} />}
    <button onClick={onClick} className="btn-primary text-xs !px-6 !py-2.5">
      Download
    </button>
  </div>
);

const FeaturedReport = ({ report, reverse, onDownload }: { report: typeof reports[0]; reverse?: boolean; onDownload: (slug: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7 }}
    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reverse ? "lg:direction-rtl" : ""}`}
  >
    <div className={reverse ? "lg:order-2" : ""}>
      <ReportCover cover={report.cover} label={report.label} className="aspect-[4/3]" />
    </div>
    <div className={`space-y-4 ${reverse ? "lg:order-1" : ""}`}>
      <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">{report.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{report.description}</p>
      <DownloadButton onClick={() => onDownload(report.slug)} slug={report.slug} />
    </div>
  </motion.div>
);

const ReportCard = ({ report, onDownload }: { report: typeof reports[0]; onDownload: (slug: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
    className="flex flex-col"
  >
    <ReportCover cover={report.cover} label={report.label} className="aspect-square" />
    <div className="pt-5 space-y-2 flex-1 flex flex-col">
      <h4 className="font-serif text-xl font-semibold text-foreground leading-snug">{report.title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{report.description}</p>
      <DownloadButton onClick={() => onDownload(report.slug)} slug={report.slug} />
    </div>
  </motion.div>
);

// --- Main Page ---

const Research = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { first_name: "", last_name: "", email: "", organization: "" },
  });

  const handleDownload = (slug: string) => {
    setSelectedSlug(slug);
    form.reset();
    setModalOpen(true);
  };

  const onSubmit = async (values: LeadFormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("research_leads" as any).insert({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        organization: values.organization,
        report_slug: selectedSlug,
      });
      if (error) throw error;
      toast({ title: "Thanks!", description: "We'll send your report to your inbox shortly." });
      setModalOpen(false);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center section-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--impact-dark))]/80 to-[hsl(var(--impact-dark))]" />
        </div>
        <div className="relative z-10 text-center px-6 py-32">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white"
          >
            Research & Reports
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-white/70 max-w-2xl mx-auto text-lg"
          >
            Original research on impact communications, nonprofit storytelling, and building trust through media.
          </motion.p>
        </div>
      </section>

      {/* Featured Report 1 */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <FeaturedReport report={reports[0]} onDownload={handleDownload} />
        </div>
      </section>

      {/* 3-Card Grid Row 1 */}
      <section className="py-16 section-cream">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reports.slice(1, 4).map((r) => (
              <ReportCard key={r.slug} report={r} onDownload={handleDownload} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Report 2 (reversed) */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <FeaturedReport report={reports[4]} reverse onDownload={handleDownload} />
        </div>
      </section>

      {/* 3-Card Grid Row 2 — last 2 reports */}
      <section className="py-16 section-cream">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reports.slice(5, 7).map((r) => (
              <ReportCard key={r.slug} report={r} onDownload={handleDownload} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 section-dark text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Tell Your Story?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Let's turn your impact into a narrative that builds trust and moves stakeholders to action.
            </p>
            <Link to="/bookings" className="btn-primary">
              Book a Story Call
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Get the Report</DialogTitle>
            <DialogDescription>Fill in your details and we'll send it to your inbox.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="first_name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl><Input placeholder="Jane" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="last_name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="jane@org.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="organization" render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl><Input placeholder="Your organization" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <button type="submit" disabled={submitting} className="btn-primary w-full text-center !py-3 disabled:opacity-50">
                {submitting ? "Sending..." : "Send Me the Report"}
              </button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Research;
