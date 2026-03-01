import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";

const bookingTypes = [
  {
    icon: MessageSquare,
    title: "Storytelling Diagnostic",
    duration: "30-45 minutes",
    description:
      "A focused conversation to understand your storytelling challenges and explore potential solutions.",
    ideal: "Nonprofit leaders, CSR teams, and communications directors exploring whether Impact Loop is the right fit",
  },
  {
    icon: Calendar,
    title: "Workshop Discovery Call",
    duration: "30 minutes",
    description:
      "Discuss your team's training needs and explore workshop options for building internal capacity.",
    ideal: "Internal teams responsible for impact reporting, communications, or stakeholder trust",
  },
  {
    icon: Clock,
    title: "System Pilot Call",
    duration: "45 minutes",
    description:
      "Deep dive into implementing a custom storytelling system for your organization.",
    ideal: "Organizations and corporate teams ready to invest in storytelling infrastructure that supports accountability and long-term trust",
  },
];

const Bookings = () => {
  useEffect(() => {
    setSEO({
      title: "Book a Call — Impact Loop",
      description: "Schedule a free storytelling diagnostic call with Impact Loop. Explore how cinematic storytelling can build trust for your organization.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

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
              Book a Call
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Every great story starts with a conversation. Choose the call type
              that fits where you are right now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Types */}
      <section className="py-20 bg-impact-cream">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {bookingTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 shadow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-impact-blue/10 flex items-center justify-center mb-5">
                  <type.icon className="w-6 h-6 text-impact-blue" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-impact-dark mb-2">
                  {type.title}
                </h3>
                <p className="text-impact-blue text-sm font-medium mb-4">
                  {type.duration}
                </p>
                <p className="text-impact-dark/70 text-sm mb-4">
                  {type.description}
                </p>
                <p className="text-impact-dark/50 text-xs">
                  <span className="font-semibold">Ideal for:</span> {type.ideal}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Calendly Embed Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl font-bold text-impact-dark mb-4">
                  Schedule Your Call
                </h2>
                <p className="text-impact-dark/60">
                  Select a time that works for you. All calls are conducted via Zoom.
                </p>
              </div>

              <iframe
                src="https://calendly.com/rovonnrussell/impactcall"
                width="100%"
                height="700"
                frameBorder="0"
                title="Schedule a call with Impact Loop"
                className="rounded-lg"
              />

              {/* Manual contact option */}
              <div className="mt-8 text-center border-t border-border pt-8">
                <p className="text-impact-dark/60 text-sm mb-2">
                  Prefer to reach out directly?
                </p>
                <a
                  href="mailto:rovonn@impactloop.ca"
                  className="text-impact-blue hover:text-impact-purple transition-colors duration-300 font-medium"
                >
                  rovonn@impactloop.ca
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-impact-dark mb-6">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div>
                  <div className="w-8 h-8 rounded-full bg-impact-blue text-white flex items-center justify-center font-bold mb-4">
                    1
                  </div>
                  <h4 className="font-semibold text-impact-dark mb-2">We Listen</h4>
                  <p className="text-impact-dark/60 text-sm">
                    You share your current challenges, goals, and storytelling history.
                  </p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-impact-blue text-white flex items-center justify-center font-bold mb-4">
                    2
                  </div>
                  <h4 className="font-semibold text-impact-dark mb-2">We Explore</h4>
                  <p className="text-impact-dark/60 text-sm">
                    Together, we identify opportunities and discuss what's possible.
                  </p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-impact-blue text-white flex items-center justify-center font-bold mb-4">
                    3
                  </div>
                  <h4 className="font-semibold text-impact-dark mb-2">We Recommend</h4>
                  <p className="text-impact-dark/60 text-sm">
                    You leave with clarity on next steps, whether with us or on your own.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bookings;