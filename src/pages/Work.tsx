import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";

const categories = ["All", "Impact Stories", "Testimonials", "Program Highlights", "Event Recaps"];

const projects = [
  {
    id: 1,
    title: "Community Health Initiative",
    category: "Impact Stories",
    description: "How a local health clinic transformed their patient outcomes narrative.",
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
    vimeoId: "76979871",
  },
  {
    id: 2,
    title: "Youth Empowerment Program",
    category: "Testimonials",
    description: "Young leaders sharing their transformation stories.",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    vimeoId: "76979871",
  },
  {
    id: 3,
    title: "Environmental Restoration",
    category: "Program Highlights",
    description: "A conservation project's journey from vision to reality.",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    vimeoId: "76979871",
  },
  {
    id: 4,
    title: "Education Access Campaign",
    category: "Impact Stories",
    description: "Bridging the gap for underserved students.",
    thumbnail: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
    vimeoId: "76979871",
  },
  {
    id: 5,
    title: "Housing First Initiative",
    category: "Event Recaps",
    description: "Annual gala capturing the spirit of community support.",
    thumbnail: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop",
    vimeoId: "76979871",
  },
  {
    id: 6,
    title: "Mental Health Awareness",
    category: "Testimonials",
    description: "Breaking stigma through authentic personal stories.",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
    vimeoId: "76979871",
  },
];

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

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
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
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

      {/* Filter */}
      <section className="py-8 bg-impact-dark border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-impact-blue text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section ref={ref} className="py-20 bg-impact-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Thumbnail */}
                <div
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer mb-4"
                  onClick={() => setSelectedVideo(project.vimeoId)}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-impact-dark/40 group-hover:bg-impact-dark/60 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-impact-blue transition-colors duration-300">
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <span className="text-impact-blue text-xs uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-serif text-xl font-semibold text-white mt-2 mb-2">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
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