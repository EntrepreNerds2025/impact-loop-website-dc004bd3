import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { getPostBySlug, getRelatedPosts, formatPostDate, categorySlug } from "@/lib/blog";
import MarkdownContent from "@/components/blog/MarkdownContent";
import FAQSection from "@/components/blog/FAQSection";
import RelatedPosts from "@/components/blog/RelatedPosts";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    setSEO({
      title: post.seoTitle || `${post.title} | Impact Loop`,
      description: post.metaDescription || post.excerpt,
      ogType: "article",
    });
    return resetSEO;
  }, [post]);

  if (!post) return <NotFound />;

  const related = getRelatedPosts(post.slug, 3);

  return (
    <Layout>
      <main>
        <article className="bg-white px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Link
              to={`/blog/category/${categorySlug(post.category)}`}
              className="mb-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#6e3acb] hover:underline"
            >
              {post.category}
            </Link>

            <h1 className="mb-6 font-serif text-4xl font-bold leading-[1.05] text-[#1f2233] md:text-6xl">
              {post.title}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-[#6b6f7a]">
              <span>{formatPostDate(post.date)}</span>
              <span className="opacity-50">·</span>
              <span>{post.readingMinutes} min read</span>
              <span className="opacity-50">·</span>
              <span>{post.wordCount.toLocaleString()} words</span>
            </div>

            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="mb-12 aspect-[16/9] w-full rounded-md object-cover"
                loading="eager"
              />
            )}

            <MarkdownContent content={post.body} />

            <FAQSection faqs={post.faq || []} />

            <section className="mt-12 rounded-md bg-[#1f2233] py-10 px-6 text-white md:px-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#f7d76a]">
                Run This With Your Team
              </p>
              <h2 className="mb-4 font-serif text-2xl font-bold leading-tight md:text-3xl">
                If this resonated, two ways forward.
              </h2>
              <p className="mb-6 leading-relaxed text-white/80">
                Pick the door that fits where you are right now.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/nonprofit-ai-workbook"
                  className="inline-flex items-center gap-2 rounded-md bg-[#f7d76a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#1f2233] transition-colors hover:bg-[#f5cc4d]"
                >
                  Free workbook <ArrowRight size={14} />
                </Link>
                <Link
                  to="/adapt-ai-training"
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
                >
                  ADAPT AI Training
                </Link>
              </div>
            </section>

            <RelatedPosts posts={related} />

            <div className="mt-12 border-t border-[#e6e8ef] pt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6e3acb] hover:underline"
              >
                <ArrowLeft size={14} /> Back to all posts
              </Link>
            </div>
          </div>
        </article>
      </main>
    </Layout>
  );
};

export default BlogPost;
