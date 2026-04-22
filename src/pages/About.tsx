import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ClientLogosSection from "@/components/home/ClientLogosSection";
import { setSEO, resetSEO } from "@/lib/seo";
import founderPhoto from "@/assets/founder/rovonn.png";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    setSEO({
      title: "About: Impact Loop",
      description: "Impact Loop bridges the trust gap for nonprofits and corporations through authentic, cinematic storytelling systems.",
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
              About Impact Loop
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Storytelling as <span className="text-gradient">Infrastructure</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              In a world drowning in content, trust has become the scarcest resource.
              We help organizations earn it through authentic stories.
            </p>
            <p className="text-white/50 text-xs md:text-sm uppercase tracking-[0.25em] mt-8">
              Toronto-based. Serving nonprofits, healthcare institutions, and community organizations across Canada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Now */}
      <section ref={ref} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-8">
                Why Impact Loop Exists Now
              </h2>
              <div className="prose prose-lg max-w-none text-impact-dark/70">
                <p className="text-xl leading-relaxed mb-6">
                  Organizations across sectors are facing a trust crisis. Nonprofits
                  are seeing declining fundraising effectiveness. Corporations are
                  navigating increased ESG scrutiny, skepticism around CSR messaging,
                  and rising expectations for proof. At the same time, AI-generated
                  content is making all audiences more skeptical than ever.
                </p>
                <p className="leading-relaxed mb-6">
                  At the same time, there's never been more demand for proof. Funders
                  want to see real outcomes. Community members want to hear from real
                  people. Boards want tangible evidence of impact.
                </p>
                <p className="leading-relaxed mb-6">
                  For corporate teams, this pressure shows up in sustainability
                  reporting, CSR communications, and internal alignment, where
                  credibility matters as much as clarity.
                </p>
                <p className="leading-relaxed">
                  Impact Loop bridges this gap. We help organizations capture authentic
                  stories that serve as proof of their work and deploy them
                  strategically to build lasting trust with every audience that matters.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Shift */}
      <section className="py-24 section-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
                The Shift from Content to Trust
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4">
                    The Old Way
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    <li>• Create content to fill channels</li>
                    <li>• Focus on quantity and frequency</li>
                    <li>• Use stock footage and templates</li>
                    <li>• Tell people what you do</li>
                    <li>• Hope it resonates</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4">
                    The Impact Loop Way
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    <li>• Create proof that builds trust</li>
                    <li>• Focus on authenticity and impact</li>
                    <li>• Capture real stories from real people</li>
                    <li>• Show the transformation you create</li>
                    <li>• Deploy strategically for maximum effect</li>
                    <li>• Stand up to scrutiny from funders, stakeholders, and leadership</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-impact-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-8">
                Storytelling as Infrastructure
              </h2>
              <div className="prose prose-lg max-w-none text-impact-dark/70">
                <p className="text-xl leading-relaxed mb-6">
                  A single video is a moment. A storytelling system is infrastructure
                  that grows with your organization.
                </p>
                <p className="leading-relaxed mb-6">
                  We don't just make videos. We help you build a repeatable process for
                  identifying, capturing, and deploying the stories that matter most.
                  This means:
                </p>
                <ul className="space-y-3 mb-6">
                  <li>A framework for recognizing story-worthy moments</li>
                  <li>Templates and prompts for gathering authentic testimonials</li>
                  <li>Guidelines for protecting trust while amplifying impact</li>
                  <li>A strategy for using stories across all your communications</li>
                </ul>
                <p className="leading-relaxed">
                  The result? An organization that doesn't just have content, but has a
                  library of proof that compounds in value over time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Rovonn */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src={founderPhoto}
                  alt="Rovonn Russell, Founder of Impact Loop"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-sm -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                The Person Behind Impact Loop
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-2">
                Rovonn Russell
              </h2>
              <p className="text-xl text-muted-foreground font-serif italic mb-6">
                Founder & Storytelling Director
              </p>
              <div className="space-y-4 text-impact-dark/70 leading-relaxed">
                <p>
                  With over a decade in documentary filmmaking and organizational
                  communications, Rovonn built Impact Loop to solve a problem he
                  kept seeing: organizations doing meaningful work but struggling
                  to prove it in ways that earn real trust.
                </p>
                <p>
                  His background spans healthcare, community development,
                  corporate partnerships, and faith-based organizations across
                  Canada and internationally, with recent Signature Productions
                  for Lakeridge Health, CAFCAN Social Services (Caribbean
                  African Canadian), Black Creek Black History Month, and the
                  Muamba Foundation. That range gives him a sharp eye for what
                  makes a story hold up under scrutiny, whether the audience is
                  a government funder, a corporate board, or a community that
                  has been burned by empty promises before.
                </p>
                <p>
                  Every client works directly with Rovonn. No account managers,
                  no handoffs. The person who designs your story strategy is the
                  same person who directs the shoot and oversees the edit.
                </p>
                <p>
                  For larger productions, Rovonn assembles a vetted Toronto-based
                  creative team: directors of photography, camera assistants,
                  sound engineers, gaffers, composers, motion designers, and
                  colorists, each chosen for the specific project. The scale
                  matches the stakes.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/bookings"
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium"
                >
                  Book a conversation with Rovonn
                  <span className="text-lg">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Ban    </Layout>
  );
};

export default About;
