import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import Player from "@vimeo/player";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import { slideFromLeft, slideFromRight, scaleIn } from "@/hooks/useScrollAnimation";

const categories = ["All", "Impact Stories", "Initiatives", "Program Highlights", "Event Recaps", "Promo & Hero Videos"];

const projects = [
  {
    id: 1,
    title: "Octavia Sampson — Wellness Educator",
    category: "Impact Stories",
    description: "Octavia is a psychotherapist and wellness educator who had spent years transforming lives one session at a time — but she knew her message was bigger than her practice. She wanted to scale her impact, grow her personal brand, and reach women globally who were navigating their mental health journeys alone. We crafted a cinematic hero video anchored in her authentic story — from a childhood curiosity about what makes people tick to becoming a safe place for women ready to heal. The result is a piece that doesn't just introduce Octavia; it makes you feel why her work matters.",
    vimeoId: "1142229793",
  },
  {
    id: 2,
    title: "Lakeridge Health — I Belong Initiative",
    category: "Initiatives",
    description: "Lakeridge Health needed to bring their I Belong initiative to life — not as a corporate announcement, but as a genuine reflection of the culture they were building. The challenge was showing how values like inclusion, compassion, innovation, teamwork, and joy actually translate into better outcomes for staff, patients, and families. We produced a documentary-style piece featuring real staff voices that drove measurable inclusivity results, amplified public awareness, and aligned the organization with their IDEAA action plans — proving this wasn't a one-off campaign but an ongoing commitment to systemic change.",
    vimeoId: "1140641190",
    previewStart: 8,
  },
  {
    id: 3,
    title: "Breathe Mindful Living",
    category: "Promo & Hero Videos",
    description: "Breathe Mindful Living was launching a new wellness app designed to help people live with more clarity and intention — but they needed a promo that captured the feeling of mindful living without being preachy or clinical. We created a cinematic piece grounded in the idea that calm is a choice, not a luxury. The video positions the app as more than a tool — it's an invitation into a community of people ready to breathe deeper, live slower, and grow together. The result is a launch asset that feels as grounding as the product itself.",
    vimeoId: "1168844885",
  },
  {
    id: 4,
    title: "CafCan — Our People's Keeper Program Launch",
    category: "Program Highlights",
    description: "After securing improved funding in 2024, CafCan needed to visually demonstrate the real-world impact of their Our People's Keeper employment program for newcomers. They needed clear visuals, compelling testimonials, and undeniable proof of outcomes to satisfy funders and inspire future participants. We produced a launch recap featuring candid testimonials from counselors and program participants, followed by a series of ten cohort session videos capturing each stage of the journey — all built to anchor their impact report with stories that numbers alone can't tell.",
    vimeoId: "1143331891",
  },
  {
    id: 5,
    title: "Muamba Foundation x Bartley Skills Winnipeg",
    category: "Event Recaps",
    description: "The Muamba Foundation, in partnership with Brands for Canada and the Bartley Skills Development Program, hosted a community event at Gordon Bell High School in Winnipeg designed to build confidence and opportunity for local youth. They needed a recap that captured the energy, emotion, and impact of the day. We collaborated with Butter Knife Creative in Winnipeg, who filmed the event on the ground, and produced a polished recap video that showcased the confidence it built in participating youth and the power of community-driven partnerships.",
    vimeoId: "1159742453",
  },
  {
    id: 6,
    title: "Millions Retreat Full Recap",
    category: "Event Recaps",
    description: "The Millions Retreat needed to showcase the value it delivers to its entrepreneurial members — not just highlight reels, but the real motivation, education, and empowerment that the experience brings to founders starting and scaling their businesses. We produced a full recap that captures the heartbeat of the retreat: the breakthroughs, the connections, and the moments that remind entrepreneurs why they started. The video now serves as both a testament to past attendees and a compelling invitation for future ones.",
    vimeoId: "1064687560",
  },
  {
    id: 7,
    title: "Reddit AI Search Event Recap",
    category: "Event Recaps",
    description: "In collaboration with Jessica Alex Marketing, Impact Loop helped bring a Reddit-led event to life through story-first visual production. The event explored how AI search is reshaping discovery online and why human conversation and community context are becoming the new trust layer for brands and audiences. We produced full-length speaker videos designed for education and long-term reuse, alongside a social content package that turned key moments into shareable clips — building momentum for the next event while giving attendees a reason to revisit the insights.",
    vimeoId: "1168847247",
  },
  {
    id: 8,
    title: "Iris Ministries — Malawi",
    category: "Impact Stories",
    description: "Iris Ministries needed to give their global supporters a window into the daily reality of their work in southern Malawi — from feeding programs and children's education to church planting and prison ministry. The challenge was translating the scale of 450 churches and countless lives touched into something personal and emotionally resonant. We produced a cinematic piece that captures the laughter, the worship, and the gratitude on the ground — giving donors and prayer partners a tangible connection to the impact their generosity makes possible.",
    vimeoId: "1140283574",
  },
  {
    id: 9,
    title: "Canadian Institute for People of Afrikan Ancestry",
    category: "Initiatives",
    description: "CafCan, with support from the Government of Canada, is leading the development of CIPAA. They needed coverage of a key discussion session that brought together professionals and advocates to shape the institute's direction. The challenge was broadening engagement beyond those who had participated in earlier consultations. We produced a documentary-style recap capturing the camaraderie, the fresh voices, and the shared commitment to building generational capacity within the community — a piece designed to fuel continued engagement and demonstrate the collaborative process to stakeholders.",
    vimeoId: "1140284690",
  },
  {
    id: 10,
    title: "Hair for Self-Esteem",
    category: "Program Highlights",
    description: "In collaboration with the Muamba Foundation, the Bartley Skills Development Program, and Aylesbury Public School, this initiative was born from a heartbreaking reality: a young girl was contemplating self-harm because her family couldn't afford to have her hair done. We produced a video capturing the power of what happens when community steps in — professional braiders volunteering their craft, educators creating safe spaces, and students walking away with the confidence to raise their hands in class. The result is a piece that proves self-esteem starts with being seen.",
    vimeoId: "1135409664",
  },
  {
    id: 11,
    title: "Black Creek Community Health Ambassadors",
    category: "Initiatives",
    description: "Black Creek Community Health Centre needed to showcase their innovative Community Health Ambassador model — a grassroots approach born during the pandemic where trusted community members became the bridge between residents and critical health services. The video captures ambassadors delivering meals, checking blood pressure, and building the kind of trust that institutions alone can't create. The piece helped inspire other community centres across the region to adopt the same model, proving that health equity starts with the people who already belong to the community.",
    vimeoId: "833854968",
    previewStart: 15,
  },
  {
    id: 12,
    title: "KidTalks Global",
    category: "Promo & Hero Videos",
    description: "Dr. Gregg Gary, educator and motivational speaker, had a vision: a ten-week leadership and speaking program designed to equip kids with the confidence, communication skills, and moral foundation to thrive in a world dominated by screens. He needed a hero video that would make parents feel the urgency and the opportunity. We produced a cinematic piece that frames the problem — social media replacing real connection — and positions KidTalks as the solution, helping every child discover their right heart, right mind, and right voice leading to right action.",
    vimeoId: "1145353261",
  },
];

const VISIBLE_COUNT = 6;

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const textVariants = isEven ? slideFromLeft : slideFromRight;
  const videoOrder = isEven ? "md:order-2" : "md:order-1";
  const textOrder = isEven ? "md:order-1" : "md:order-2";

  // Loop a 10-second preview using Vimeo Player SDK
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const player = new Player(iframe);
    const LOOP_START = project.previewStart ?? 0;
    const LOOP_END = LOOP_START + 10;

    player.setCurrentTime(LOOP_START);

    const handleTimeUpdate = (data: { seconds: number }) => {
      if (data.seconds >= LOOP_END) {
        player.setCurrentTime(LOOP_START);
      }
    };

    player.on("timeupdate", handleTimeUpdate);
    return () => {
      player.off("timeupdate", handleTimeUpdate);
    };
  }, [project.previewStart]);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-16 md:py-24"
    >
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
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
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
    </motion.div>
  );
};

const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, VISIBLE_COUNT);

  const hasMore = filteredProjects.length > VISIBLE_COUNT;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

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

      {/* Category Tabs */}
      <section className="py-6 bg-impact-dark border-b border-white/10 sticky top-[72px] z-30 backdrop-blur-md bg-impact-dark/90">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Portfolio */}
      <section className="bg-impact-dark">
        <div className="container mx-auto px-6 divide-y divide-white/10">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                onPlay={setSelectedVideo}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* View More */}
        {hasMore && !showAll && (
          <div className="container mx-auto px-6 pb-20 text-center">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
            >
              View More Projects
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          </div>
        )}
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
