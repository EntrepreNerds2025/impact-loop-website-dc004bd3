import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import { slideFromLeft, slideFromRight, scaleIn } from "@/hooks/useScrollAnimation";

const projects = [
  {
    id: 1,
    title: "Community Health Initiative",
    category: "Impact Story",
    description: "A local health clinic needed to communicate the real-world outcomes of their patient care programs to secure continued funding. We crafted a documentary-style piece that followed patients and staff, turning clinical data into a human narrative that resonated with funders and community partners alike.",
    vimeoId: "76979871",
    previewVimeoId: "1168718287",
  },
  {
    id: 2,
    title: "Youth Empowerment Program",
    category: "Testimonial",
    description: "Young leaders from an after-school mentorship program wanted their voices heard by the donors who made it possible. We sat down with six participants and captured candid, unscripted conversations about growth, resilience, and the moments that changed their trajectories.",
    vimeoId: "76979871",
    previewVimeoId: "1168718353",
  },
  {
    id: 3,
    title: "Environmental Restoration",
    category: "Program Highlight",
    description: "A conservation nonprofit had spent three years restoring a critical wetland habitat but struggled to show stakeholders the scale of their progress. We produced a visual journey from barren land to thriving ecosystem, combining aerial footage with on-the-ground interviews.",
    vimeoId: "76979871",
    previewVimeoId: "1168718362",
  },
  {
    id: 4,
    title: "Education Access Campaign",
    category: "Impact Story",
    description: "An education foundation needed to demonstrate how their scholarship program was closing opportunity gaps in underserved communities. We followed three students from application to graduation, creating a compelling case for expanded investment.",
    vimeoId: "76979871",
    previewVimeoId: "1168718383",
  },
  {
    id: 5,
    title: "Housing First Initiative",
    category: "Event Recap",
    description: "The annual gala for a housing-first organization needed to capture the energy of the evening while reinforcing the urgency of their mission. We produced a same-day edit highlight reel alongside a longer documentary piece featuring residents sharing their stories of stability.",
    vimeoId: "76979871",
    previewVimeoId: "1168718335",
  },
  {
    id: 6,
    title: "Mental Health Awareness",
    category: "Testimonial",
    description: "Breaking the stigma around mental health required authentic, vulnerable storytelling. We partnered with a wellness organization to capture personal narratives from people at different stages of their mental health journeys, creating a series that sparked meaningful community dialogue.",
    vimeoId: "76979871",
    previewVimeoId: "1168718317",
  },
];

const ProjectRow = ({
  project,
  index,
  onPlay,
}: {
  project: typeof projects[0];
  index: number;
  onPlay: (id: string) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const textVariants = isEven ? slideFromLeft : slideFromRight;
  const videoOrder = isEven ? "md:order-2" : "md:order-1";
  const textOrder = isEven ? "md:order-1" : "md:order-2";

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-16 md:py-24">
      {/* Text */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={textOrder}
      >
        <span className="text-primary text-xs uppercase tracking-widest font-medium">
          {project.category}
        </span>
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
          {project.title}
        </h2>
        <p className="text-white/60 text-base md:text-lg leading-relaxed">
          {project.description}
        </p>
      </motion.div>

      {/* Video */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`${videoOrder} group relative overflow-hidden rounded-xl cursor-pointer bg-[hsl(var(--impact-dark))]`}
        style={{ aspectRatio: "2.35 / 1" }}
        onClick={() => onPlay(project.vimeoId)}
      >
        <iframe
          src={`https://player.vimeo.com/video/${project.previewVimeoId}?background=1&autoplay=1&loop=1&muted=1`}
          className="absolute pointer-events-none"
          style={{ border: 0, width: "140%", height: "140%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          allow="autoplay"
          title={`${project.title} preview`}
        />
        <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/40 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-7 h-7 text-primary-foreground ml-1" fill="white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-impact-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Our Work
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Stories That <span className="text-gradient">Build Trust</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Explore our portfolio of impact stories that have helped organizations
              connect with funders, communities, and stakeholders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Editorial Portfolio */}
      <section className="bg-impact-dark">
        <div className="container mx-auto px-6 divide-y divide-white/10">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onPlay={setSelectedVideo}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 section-purple">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            See the Process Behind the Work
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Want to understand how we create these stories? Book a call to learn
            about our approach and how it could work for your organization.
          </p>
          <a href="/bookings" className="btn-secondary">
            Book a Discovery Call
          </a>
        </div>
      </section>

      <VimeoLightbox
        vimeoId={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </Layout>
  );
};

export default Work;
