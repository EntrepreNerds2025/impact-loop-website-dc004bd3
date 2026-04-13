import { useState, useRef, useEffect } from "react";
import { setSEO, resetSEO } from "@/lib/seo";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Player from "@vimeo/player";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import { slideFromLeft, slideFromRight, scaleIn } from "@/hooks/useScrollAnimation";

const categories = ["All", "Impact Stories", "Initiatives", "Program Highlights", "Event Recaps", "Promo & Hero Videos"];

const projects = [
  {
    id: 13,
    title: "EmployNext — Youth Trades Program",
    category: "Program Highlights",
    description: "EmployNext partnered with construction organizations, employers, and training centres to address youth unemployment and the growing skilled trades shortage across Ontario. Participants gained hands-on experience, industry certifications, and the soft skills employers demand. We produced a documentary-style piece capturing real voices from participants, instructors, and employers to demonstrate the program's impact and inspire the next cohort.",
    vimeoId: "1174716942",
    caseStudy: {
      problem: "Youth unemployment in Ontario was rising while employers in the skilled trades sector faced a critical worker shortage. Existing job programs were placing young people in roles without the certifications or professional habits employers actually needed. EmployNext had results to show but no story assets to prove it to funders, partners, or prospective participants.",
      process: "We developed a documentary-style film structured around three voices: participants sharing their journeys, instructors explaining the rigor of the training, and employers validating what changed. On-site filming across training centres captured the hands-on reality of the program. The edit was built to anchor their impact report and double as a cohort recruitment tool.",
      result: "The film gave EmployNext a credible, reusable story asset to share with government funders and industry partners. It now serves as the primary piece for recruiting new cohorts and demonstrating program outcomes in funding proposals and partner conversations.",
      resultStat: "A single film now serves three high-value uses: funder reporting, partner recruitment, and cohort intake.",
    },
  },
  {
    id: 14,
    title: "Black Creek — Black History Month Event Series",
    category: "Event Recaps",
    description: "Black Creek Community Health Centre's Black History Month programming was designed to strengthen social connection, reduce isolation, and create culturally affirming care pathways. Through barrier-free workshops, cultural food programming, and collaboration with Black-owned businesses and trusted partners, these events helped build trust and improve access to community health supports.",
    vimeoId: "1174716851",
    caseStudy: {
      problem: "Black Creek Community Health Centre was running culturally significant programming that was having real health outcomes. But without documentation, those outcomes were invisible to funders and community partners who needed to see barrier-free access in action, not just described in a report.",
      process: "We produced a cinematic recap spanning three separate events across the series. Each event had its own energy and purpose: cultural food programming, community workshops, and partnership showcases. The film layered authentic community voices with the warmth and movement of each gathering, showing the care pathways being built in real time.",
      result: "The film became a tangible proof point for Black Creek's approach to culturally affirming community health. Funders could see the care model operating, not just read about it. The piece continues to support ongoing programming conversations with community partners and government stakeholders.",
      resultStat: "Three events, one cohesive story that captured both the feeling and the function of culturally affirming care.",
    },
  },
  {
    id: 10,
    title: "Hair for Self-Esteem",
    category: "Program Highlights",
    description: "In collaboration with the Muamba Foundation, the Bartley Skills Development Program, and Aylesbury Public School, this initiative was born from a heartbreaking reality: a young girl was contemplating self-harm because her family couldn't afford to have her hair done. Professional braiders volunteered their craft, educators created safe spaces, and students walked away with the confidence to raise their hands in class.",
    vimeoId: "1135409664",
    caseStudy: {
      problem: "A young girl was contemplating self-harm because her family couldn't afford to get her hair done. The program that emerged was real and had immediate impact, but without documentation, that impact couldn't be shared, scaled, or replicated. Community organizations needed proof that small, targeted investments in dignity produce measurable results in student wellbeing.",
      process: "We produced a documentary-style piece capturing the partnership in action: professional braiders donating their time, Bartley Skills development program participants building trade hours, and students visibly transformed by the experience. The film followed the arc from the founding story to the classroom outcomes, letting real voices carry the proof.",
      result: "The film became a community engagement and partnership development tool. It opened conversations with schools, foundations, and municipal partners about replicating the model. It also stands as one of the strongest examples in our portfolio of how a story told with care can shift perception at an organizational level.",
      resultStat: "The video demonstrated measurable gains in student confidence and classroom participation, and opened doors to future community health partnerships.",
    },
  },
  {
    id: 4,
    title: "CafCan — Our People's Keeper Program Launch",
    category: "Program Highlights",
    description: "After securing improved funding in 2024, CafCan needed to visually demonstrate the real-world impact of their Our People's Keeper employment program for newcomers. We produced a launch recap featuring candid testimonials from counselors and program participants, followed by a series of ten cohort session videos capturing each stage of the journey.",
    vimeoId: "1143331891",
    caseStudy: {
      problem: "CafCan had secured improved government funding in 2024, but funders required clear evidence of outcomes to justify renewal. Text-based reports weren't capturing the human transformation happening inside the program. They also needed story assets that could build a pipeline of future participants and demonstrate the program's value to potential community partners.",
      process: "We built a two-part production strategy: a launch recap anchored by candid testimonials from counselors and participants, and a series of ten cohort session videos documenting each phase of the employment journey. The intent was to create a library of reusable story assets, not a single deliverable.",
      result: "CafCan had a complete story library to support their impact report, funding renewals, and community outreach. The cohort session videos gave future participants a transparent look at what the program involves, reducing drop-off between inquiry and enrollment.",
      resultStat: "10 cohort session videos plus a launch recap built an impact library that replaced generic reporting with real evidence.",
    },
  },
  {
    id: 2,
    title: "Lakeridge Health — I Belong Initiative",
    category: "Initiatives",
    description: "Lakeridge Health needed to bring their I Belong initiative to life as a genuine reflection of the culture they were building. The challenge was showing how values like inclusion, compassion, innovation, teamwork, and joy actually translate into better outcomes for staff, patients, and families.",
    vimeoId: "1140641190",
    previewStart: 30,
    caseStudy: {
      problem: "Lakeridge Health was launching a major inclusion initiative across their health system, but they faced a trust challenge: staff had seen similar initiatives come and go. The organization needed a film that felt genuine, not corporate, to earn real buy-in from the people delivering care every day. At the same time, public stakeholders needed to see alignment with their IDEAA action plans.",
      process: "We produced a documentary-style film built entirely on real staff voices, across departments and care levels. No scripts. No spokesperson narration. The structure followed the values of the initiative and showed how each one translated into lived experience for staff, patients, and families. The edit was built for multiple audiences: internal culture building and external accountability.",
      result: "The film drove measurable inclusion outcomes internally and became a public-facing anchor for Lakeridge's IDEAA commitments. It positioned I Belong as an ongoing organizational shift, not a one-time campaign. The piece was used in staff onboarding, partner communications, and community engagement contexts.",
      resultStat: "Measurable inclusivity results and stronger staff alignment around the organization's IDEAA commitments.",
    },
  },
  {
    id: 7,
    title: "Reddit AI Search Event Recap",
    category: "Event Recaps",
    description: "In collaboration with Jessica Alex Marketing, Impact Loop helped bring a Reddit-led event to life through story-first visual production. The event explored how AI search is reshaping discovery online and why human conversation and community context are becoming the new trust layer for brands and audiences.",
    vimeoId: "1168847247",
    caseStudy: {
      problem: "A premium thought leadership event on AI search and brand discovery needed to generate value beyond the day itself. Speakers had delivered high-value insights that would be lost without proper documentation. The organizer needed assets that could drive ticket sales for the next event, build long-term credibility, and keep the conversation going on social media.",
      process: "We produced two parallel outputs: full-length speaker videos engineered for educational reuse, and a social content package that turned key moments into shareable clips. The social clips were built to spark conversation and highlight the event's POV on AI and brand discovery, not just recap what happened.",
      result: "The full-length speaker videos became ongoing educational content the organizer could deploy well after the event. The social clips drove momentum toward the next event and extended the audience reach beyond those who attended. The event's authority on AI search was reinforced across multiple channels.",
      resultStat: "Event value extended 6+ months post-event through reusable speaker content and clip-driven social distribution.",
    },
  },
  {
    id: 9,
    title: "Canadian Institute for People of Afrikan Ancestry",
    category: "Initiatives",
    description: "CafCan, with support from the Government of Canada, is leading the development of CIPAA. They needed coverage of a key discussion session that brought together professionals and advocates to shape the institute's direction. The challenge was broadening engagement beyond those who had participated in earlier consultations.",
    vimeoId: "1140284690",
    caseStudy: {
      problem: "The development of CIPAA was at a critical juncture. Early consultations had been limited to a small circle of stakeholders, and the organizers needed to demonstrate a broader, more inclusive development process to government funders and prospective participants. Without documentation, the collaborative spirit of the sessions was invisible to those not in the room.",
      process: "We produced a documentary-style recap of a key discussion session, focusing on the diversity of voices present and the quality of engagement happening. The film captured candid exchanges, group dynamics, and individual reflections that showed the institute being shaped by community, not just leadership.",
      result: "The film served as both a transparency tool for government stakeholders and a community recruitment asset. It showed that CIPAA's development process was open, collaborative, and grounded in genuine community input, which became a key proof point in continued funding conversations.",
      resultStat: "A documentary-style recap that expanded community engagement and supported government accountability for the institute's development process.",
    },
  },
  {
    id: 1,
    title: "Octavia Sampson — Wellness Educator",
    category: "Impact Stories",
    description: "Octavia is a psychotherapist and wellness educator who had spent years transforming lives one session at a time, but she knew her message was bigger than her practice. We crafted a cinematic hero video anchored in her authentic story, from a childhood curiosity about what makes people tick to becoming a safe place for women ready to heal.",
    vimeoId: "1142229793",
    caseStudy: {
      problem: "Octavia had years of client impact and a powerful story, but her online presence didn't reflect either. She was relying on word-of-mouth to grow and had no anchor asset that could communicate her value to women globally. Without a compelling entry point, her ability to scale her reach was capped at the size of her existing network.",
      process: "We developed a cinematic hero video built around Octavia's own narrative arc, starting from her childhood curiosity about human behavior through to the practice she built for women navigating healing. The film was designed to make a first-time viewer feel the weight of her work before they ever booked a session.",
      result: "The hero video became the centerpiece of Octavia's digital presence and brand growth strategy. It gave her a credible, emotionally resonant asset to anchor her website, social profiles, and speaking engagements. New clients now arrive having already felt a connection before the first conversation.",
      resultStat: "A brand hero film that turned a practice built on referrals into a scalable personal brand with a global reach pathway.",
    },
  },
  {
    id: 8,
    title: "Iris Ministries — Malawi",
    category: "Impact Stories",
    description: "Iris Ministries needed to give their global supporters a window into the daily reality of their work in southern Malawi, from feeding programs and children's education to church planting and prison ministry. The challenge was translating the scale of 450 churches and countless lives touched into something personal and emotionally resonant.",
    vimeoId: "1140283574",
    caseStudy: {
      problem: "Iris Ministries was operating at significant scale across southern Malawi, but their global donor and prayer base had limited visibility into the day-to-day reality of the work. Generic mission trip photos and newsletters weren't sustaining the depth of emotional connection needed to maintain giving levels and prayer support over time.",
      process: "We produced a cinematic piece shot on the ground in Malawi, capturing the full scope of the ministry across feeding programs, education, worship, and prison outreach. The film was built around real relationships and authentic moments rather than a montage of activities, letting the people of Malawi carry the story.",
      result: "The film gave Iris Ministries a world-class donor communication asset that created genuine emotional connection between global supporters and the communities they were supporting. It became the primary fundraising and awareness piece for the organization's international outreach.",
      resultStat: "A cinematic ministry film that deepened donor connection and created a reusable asset for global fundraising and partner communications.",
    },
  },
  {
    id: 3,
    title: "Breathe Mindful Living",
    category: "Promo & Hero Videos",
    description: "Breathe Mindful Living was launching a new wellness app designed to help people live with more clarity and intention. We created a cinematic piece grounded in the idea that calm is a choice, not a luxury, positioning the app as an invitation into a community of people ready to breathe deeper, live slower, and grow together.",
    vimeoId: "1168844885",
    caseStudy: {
      problem: "The wellness app space is oversaturated with product demos and before/after marketing. Breathe Mindful Living needed a launch asset that stood apart from the noise by focusing on feeling rather than features. They needed to attract early adopters who already believed in mindful living, not convince skeptics.",
      process: "We built the film around a single creative idea: calm is a choice. The production avoided app screenshots and feature walkthroughs in favor of a cinematic mood piece that placed the viewer inside the experience of mindful living. Music, light, and pacing were used as tools to communicate the product's value before a single word was spoken.",
      result: "The launch video gave Breathe Mindful Living an asset that resonated with exactly the audience they needed: people already aligned with the mindful living philosophy who were looking for a community to grow with. The film became the primary acquisition asset for the launch campaign.",
      resultStat: "A cinematic brand launch film that prioritized emotional resonance over feature promotion, attracting aligned early adopters from day one.",
    },
  },
  {
    id: 5,
    title: "Muamba Foundation x Bartley Skills Winnipeg",
    category: "Event Recaps",
    description: "The Muamba Foundation, in partnership with Brands for Canada and the Bartley Skills Development Program, hosted a community event at Gordon Bell High School in Winnipeg designed to build confidence and opportunity for local youth. We collaborated with Butter Knife Creative in Winnipeg to produce a polished recap.",
    vimeoId: "1159742453",
    caseStudy: {
      problem: "A community event delivering real youth impact in Winnipeg needed documentation that could be used to justify the investment, grow the partnership, and demonstrate outcomes to funders in Toronto and across the country. Without a strong recap, the event would live and die in the room.",
      process: "We collaborated with Butter Knife Creative in Winnipeg to capture the event on the ground, then produced a polished recap from Toronto. The film focused on the confidence and engagement visible in the youth participants, the quality of the partnership, and the emotional energy of a community coming together around opportunity.",
      result: "The recap gave the Muamba Foundation and their partners a compelling proof point for the value of community-driven youth programs. The film is now used to build new regional partnerships and demonstrate the model to funders and potential sponsors looking to invest in similar initiatives.",
      resultStat: "A cross-city production model that delivered national-quality event coverage for a community program with real youth impact.",
    },
  },
  {
    id: 6,
    title: "Millions Retreat Full Recap",
    category: "Event Recaps",
    description: "The Millions Retreat needed to showcase the value it delivers to its entrepreneurial members. Not just highlight reels, but the real motivation, education, and empowerment that the experience brings to founders starting and scaling their businesses. We produced a full recap capturing the breakthroughs, connections, and moments that remind entrepreneurs why they started.",
    vimeoId: "1064687560",
    caseStudy: {
      problem: "Premium retreat experiences are difficult to sell with words. Prospective attendees need to feel what past attendees experienced, not just read a schedule. The Millions Retreat had strong energy and real outcomes, but no video asset that could translate that into ticket sales for future events.",
      process: "We produced a full-length recap focused on the emotional arc of the retreat: the moments of breakthrough, the connections formed, and the tangible shifts in perspective that past attendees described. The film balanced educational value with raw motivation, showing both the intellectual content and the human experience.",
      result: "The recap serves a dual purpose: it gives past attendees a piece that reflects and celebrates their experience, and it gives prospective attendees a compelling reason to invest in the next event. It now functions as the primary sales asset for retreat promotion.",
      resultStat: "A retreat recap that doubled as a sales tool, turning past attendee emotion into future ticket conversions.",
    },
  },
  {
    id: 12,
    title: "KidTalks Global",
    category: "Promo & Hero Videos",
    description: "Dr. Gregg Gary, educator and motivational speaker, had a vision: a ten-week leadership and speaking program designed to equip kids with the confidence, communication skills, and moral foundation to thrive in a world dominated by screens. We produced a cinematic piece that frames the problem and positions KidTalks as the solution.",
    vimeoId: "1145353261",
    caseStudy: {
      problem: "Parents and educators understood that kids were struggling with confidence and communication in a screen-saturated world, but they weren't connecting that problem to the need for structured leadership development. Dr. Gary needed a hero film that would make the urgency undeniable and position KidTalks as the solution parents had been searching for.",
      process: "We built the film around a clear narrative arc: establish the problem parents already feel but can't quite name, then show how KidTalks addresses it at the root level. The film featured Dr. Gary's voice as the authority while centering the outcomes for kids, making parents feel seen before making the ask.",
      result: "The hero film became the foundational marketing asset for KidTalks, giving Dr. Gary a compelling way to communicate the program's value to parents, schools, and community organizations. It now anchors the program's website and partnership outreach.",
      resultStat: "A hero film that transformed a vision for youth development into a compelling, shareable program pitch that parents and educators immediately understood.",
    },
  },
];

const VISIBLE_COUNT = 6;

const CaseStudySection = ({ caseStudy }: { caseStudy: typeof projects[0]["caseStudy"] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mt-8 border border-white/10 rounded-xl overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        <div className="p-6">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">The Problem</p>
          <p className="text-white/65 text-sm leading-relaxed">{caseStudy.problem}</p>
        </div>
        <div className="p-6">
          <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold uppercase tracking-widest mb-3">Our Process</p>
          <p className="text-white/65 text-sm leading-relaxed">{caseStudy.process}</p>
        </div>
        <div className="p-6">
          <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">The Result</p>
          <p className="text-white/65 text-sm leading-relaxed mb-4">{caseStudy.result}</p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-white/80 text-xs leading-relaxed italic">{caseStudy.resultStat}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
      className="py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
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
      </div>

      {/* Case Study */}
      <CaseStudySection caseStudy={project.caseStudy} />

      {/* Post-project CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 flex items-center gap-6"
      >
        <button
          onClick={() => onPlay(project.vimeoId)}
          className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors duration-300 text-sm font-medium"
        >
          <Play className="w-4 h-4" fill="currentColor" />
          Watch the Film
        </button>
        <Link
          to="/bookings"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-sm font-medium"
        >
          Get a film like this
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setSEO({
      title: "Our Work — Impact Loop",
      description: "Explore Impact Loop's portfolio of cinematic impact stories, event recaps, and documentary films for nonprofits and changemakers.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

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
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Explore our portfolio of impact stories that have helped organizations
              connect with funders, communities, and stakeholders.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              Each project below includes the problem we were solving, the process we used, and the real outcome it created.
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
            Ready to Build a Story Asset Like These?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Every film in this portfolio started with a conversation about what needed to be proven, to whom, and why it mattered. Book a call to have that conversation about your organization.
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
