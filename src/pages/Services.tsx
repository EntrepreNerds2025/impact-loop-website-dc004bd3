import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, BookOpen, Compass, Video, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const services = [
  {
    icon: Users,
    title: "Workshops & Training",
    tagline: "Build internal storytelling capacity",
    description:
      "Equip your team with the skills to identify, capture, and share impact stories on an ongoing basis.",
    forWho: "Organizations wanting to build sustainable in-house storytelling capabilities",
    problem: "Your team sees impactful moments but doesn't know how to capture them effectively",
    outcomes: [
      "Story identification frameworks",
      "Interview techniques training",
      "Content planning templates",
      "Ongoing support resources",
    ],
    color: "impact-blue",
  },
  {
    icon: BookOpen,
    title: "Framework Kit Access",
    tagline: "Self-guided system materials",
    description:
      "Access our complete storytelling framework, templates, and guides to implement at your own pace.",
    forWho: "Self-starters who want proven systems without hands-on guidance",
    problem: "You know stories matter but lack a structured approach to capturing them",
    outcomes: [
      "Story Standard guidelines",
      "Story Types catalog",
      "Intake prompts library",
      "Implementation checklists",
    ],
    color: "impact-purple",
  },
  {
    icon: Compass,
    title: "System Setup (Pilot)",
    tagline: "Guided implementation",
    description:
      "Work directly with Impact Loop to implement a storytelling system tailored to your organization.",
    forWho: "Organizations ready to invest in a custom storytelling infrastructure",
    problem: "You need expert guidance to build a system that fits your unique context",
    outcomes: [
      "Custom framework adaptation",
      "Team training sessions",
      "First story capture support",
      "90-day implementation plan",
    ],
    color: "impact-blue",
  },
  {
    icon: Video,
    title: "Video as Proof",
    tagline: "Limited availability production",
    description:
      "Full-service cinematic video production for organizations ready to capture their most important stories.",
    forWho: "Organizations with high-stakes storytelling needs (funding, campaigns, milestones)",
    problem: "You have stories that need professional-grade production to do them justice",
    outcomes: [
      "Cinematic video production",
      "Story development support",
      "Strategic deployment plan",
      "Evergreen content library",
    ],
    color: "impact-purple",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pathways, Not <span className="text-gradient">Packages</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Every organization is at a different stage. Choose the pathway that
              matches where you are and where you want to go.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section ref={ref} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-16 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 rounded-xl ${
                  index % 2 === 0 ? "bg-impact-cream" : "bg-white border border-border"
                }`}
              >
                {/* Icon & Title */}
                <div className="lg:col-span-2">
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${
                      service.color === "impact-blue"
                        ? "bg-impact-blue/10"
                        : "bg-impact-purple/10"
                    }`}
                  >
                    <service.icon
                      className={`w-7 h-7 ${
                        service.color === "impact-blue"
                          ? "text-impact-blue"
                          : "text-impact-purple"
                      }`}
                    />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-impact-dark mb-2">
                    {service.title}
                  </h2>
                  <p
                    className={`font-medium text-sm ${
                      service.color === "impact-blue"
                        ? "text-impact-blue"
                        : "text-impact-purple"
                    }`}
                  >
                    {service.tagline}
                  </p>
                  <p className="text-impact-dark/70 mt-4 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Details */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-impact-dark uppercase tracking-wider mb-2">
                      Who It's For
                    </h4>
                    <p className="text-impact-dark/70">{service.forWho}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-impact-dark uppercase tracking-wider mb-2">
                      The Problem It Solves
                    </h4>
                    <p className="text-impact-dark/70">{service.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-impact-dark uppercase tracking-wider mb-2">
                      What You Get
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-center gap-2 text-impact-dark/70 text-sm"
                        >
                          <ArrowRight className="w-4 h-4 text-impact-blue" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/bookings"
                    className={`inline-flex items-center gap-2 font-medium transition-colors duration-300 ${
                      service.color === "impact-blue"
                        ? "text-impact-blue hover:text-impact-purple"
                        : "text-impact-purple hover:text-impact-blue"
                    }`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 section-purple">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Not Sure Where to Start?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Book a free Storytelling Diagnostic. We'll explore your current
              situation and recommend the best path forward.
            </p>
            <Link to="/bookings" className="btn-secondary">
              Book Your Free Diagnostic
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;