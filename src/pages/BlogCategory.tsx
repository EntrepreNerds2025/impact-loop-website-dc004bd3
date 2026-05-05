import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { categoryFromSlug, categorySlug, getPostsByCategory } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import CategoryNav from "@/components/blog/CategoryNav";
import NotFound from "./NotFound";

const CATEGORY_BLURBS: Record<string, string> = {
  Storytelling:
    "Narrative architecture, story capture, and the craft of nonprofit communications. Why some impact stories convert donors and others get scrolled past.",
  Strategy:
    "How to think about brand, content, and AI for impact-driven organizations. Diagnostic-first thinking applied to mission-led work.",
  "AI for Impact":
    "Practical AI for nonprofits, foundations, and CSR teams. ADAPT cycles in motion, with the workflows and architecture decisions that hold up in production.",
  "Case Study":
    "What working with Impact Loop actually looks like. Anonymized client cycles where appropriate, named where permission has been granted.",
  "Industry Insight":
    "Trend analysis and commentary on the nonprofit, ESG, and impact storytelling space. Built from real engagements, not industry vibes.",
};

const BlogCategory = () => {
  const { categorySlug: slug } = useParams<{ categorySlug: string }>();
  const category = slug ? categoryFromSlug(slug) : undefined;

  useEffect(() => {
    if (!category) return;
    setSEO({
      title: `${category} | Blog | Impact Loop`,
      description: CATEGORY_BLURBS[category] || `Posts in the ${category} category.`,
      ogType: "website",
    });
    return resetSEO;
  }, [category]);

  if (!category) return <NotFound />;

  const posts = getPostsByCategory(category);

  return (
    <Layout>
      <main>
        <section className="bg-gradient-to-br from-[#2e44d6] via-[#4838d8] to-[#6e3acb] px-6 py-20 text-white md:px-12 md:py-28">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/blog"
              className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f7d76a] hover:underline"
            >
              <ArrowLeft size={12} /> All Posts
            </Link>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#f7d76a]">Category</p>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-[1.0] md:text-7xl">
              {category}
            </h1>
            <p className="max-w-3xl font-serif text-lg italic leading-relaxed text-white/90 md:text-xl">
              {CATEGORY_BLURBS[category]}
            </p>
          </div>
        </section>

        <section className="bg-[#fafbfd] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-5xl">
            <CategoryNav activeCategory={categorySlug(category)} />
            {posts.length === 0 ? (
              <div className="rounded-md border border-[#e6e8ef] bg-white p-12 text-center">
                <p className="text-[#6b6f7a]">No posts published in this category yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {posts.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default BlogCategory;
