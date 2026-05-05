import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import CategoryNav from "@/components/blog/CategoryNav";

const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-[#2e44d6] via-[#4838d8] to-[#6e3acb] px-6 py-20 text-white md:px-12 md:py-28">
    <div className="mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-[#f7d76a]">
          The Impact Loop Blog
        </p>
        <h1 className="mb-8 font-serif text-5xl font-bold leading-[1.0] md:text-7xl lg:text-8xl">
          Storytelling, strategy, and{" "}
          <span className="italic text-[#f7d76a]">practical AI</span> for impact-driven teams.
        </h1>
        <p className="max-w-3xl font-serif text-xl italic leading-relaxed text-white/90 md:text-2xl">
          Field notes from running ADAPT cycles with nonprofits, foundations, and CSR teams. Rooted in real production work, written for the people doing the work.
        </p>
      </motion.div>
    </div>
  </section>
);

const EmptyState = () => (
  <div className="rounded-md border border-[#e6e8ef] bg-white p-12 text-center">
    <p className="mb-6 text-[#6b6f7a]">
      First posts dropping soon. The Nonprofit AI Adoption Workbook is the fastest way to start.
    </p>
    <Link
      to="/nonprofit-ai-workbook"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1f2233] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#2e44d6]"
    >
      Get the Workbook <ArrowRight size={14} />
    </Link>
  </div>
);

const Blog = () => {
  useEffect(() => {
    setSEO({
      title: "Blog: Impact Loop",
      description:
        "Storytelling, strategy, and practical AI for nonprofits, foundations, and CSR teams. ADAPT cycles in motion, written by Rovonn Russell.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <Layout>
      <main>
        <HeroSection />
        <section className="bg-[#fafbfd] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-5xl">
            <CategoryNav />
            {posts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-8">
                {featured && <PostCard post={featured} variant="feature" />}
                {rest.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {rest.map((p) => (
                      <PostCard key={p.slug} post={p} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Blog;
