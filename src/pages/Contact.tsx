import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { setSEO, resetSEO } from "@/lib/seo";

const serviceOptions = [
  "Video Production",
  "Consulting",
  "Custom Software / App Development",
  "Workshops & Training",
  "Impact Media Hub",
  "Story System Setup",
  "Other",
];

const Contact = () => {
  useEffect(() => {
    setSEO({
      title: "Contact — Impact Loop",
      description: "Get in touch with Impact Loop. Reach out about video production, consulting, workshops, or storytelling strategy.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    service_interest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.service_interest || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim() || null,
          service_interest: form.service_interest,
          message: form.message.trim(),
        });

      if (dbError) throw dbError;

      // Send email notification
      try {
        await supabase.functions.invoke("send-contact-notification", {
          body: {
            name: form.name.trim(),
            email: form.email.trim(),
            organization: form.organization.trim(),
            service_interest: form.service_interest,
            message: form.message.trim(),
          },
        });
      } catch {
        console.warn("Email notification could not be sent.");
      }

      // POST to CRM
      const crmRes = await fetch(
        "https://oyjbpxdcazamsdtrrmey.supabase.co/functions/v1/receive-inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95amJweGRjYXphbXNkdHJybWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjM0MTgsImV4cCI6MjA4Nzc5OTQxOH0.n-j0RqwqckV3kisVL-JnjDx84AEOGUKY6SWxnLFUjmE",
          },
          body: JSON.stringify({
            first_name: form.name.trim(),
            email: form.email.trim(),
            company_name: form.organization.trim() || undefined,
            service_interest: form.service_interest,
            message: form.message.trim(),
            business_unit: "impact_loop",
          }),
        }
      );

      if (!crmRes.ok) {
        throw new Error("CRM submission failed");
      }

      toast.success("Thank you! We'll be in touch soon.");
      setForm({ name: "", email: "", organization: "", service_interest: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-impact-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Whether you're exploring video production, consulting, or workshops — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-20 section-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-background rounded-xl p-8 md:p-10 shadow-sm space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                    Organization
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    maxLength={150}
                    value={form.organization}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    placeholder="Your organization (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="service_interest" className="block text-sm font-medium text-foreground mb-2">
                    What are you interested in? <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="service_interest"
                    name="service_interest"
                    required
                    value={form.service_interest}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  >
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={2000}
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Prefer to reach out directly?
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:rovonn@impactloop.ca"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    rovonn@impactloop.ca
                  </a>
                  <a
                    href="tel:+16478329775"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    (647) 832-9775
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                    Toronto, ON, Canada
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Want to book a call instead?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Schedule a free storytelling diagnostic call and we'll explore what's possible.
                </p>
                <a
                  href="/bookings"
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium text-sm"
                >
                  Book a Story Call →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
