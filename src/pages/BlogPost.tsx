import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { setSEO, resetSEO } from "@/lib/seo";

const SITE_URL = "https://impact-loop-website.lovable.app";

/** Very simple markdown-to-HTML: headings, bold, italic, links, paragraphs */
function renderMarkdown(md: string) {
  const html = md
    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-xl font-semibold mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl font-semibold mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h2 class="font-serif text-3xl font-bold mt-12 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline hover:text-secondary" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n{2,}/g, '</p><p class="mb-4 leading-relaxed">')
    .replace(/\n/g, "<br />");
  return `<p class="mb-4 leading-relaxed">${html}</p>`;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (!post) return;
    setSEO({
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      ogTitle: post.meta_title || post.title,
      ogDescription: post.meta_description || post.excerpt,
      ogImage: post.og_image || post.cover_image || undefined,
      ogType: "article",
      canonical: `${SITE_URL}/blog/${post.slug}`,
    });
    return resetSEO;
  }, [post]);

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-20 container mx-auto px-6">
          <div className="max-w-3xl mx-auto animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="aspect-[16/9] bg-muted rounded-sm" />
            <div className="space-y-3">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="pt-32 pb-20 container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        {/* Header */}
        <section className="pt-32 pb-12 section-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center gap-4 text-white/60 text-sm">
                <span>{post.author}</span>
                {post.published_at && (
                  <>
                    <span>·</span>
                    <time dateTime={post.published_at}>
                      {format(new Date(post.published_at), "MMMM d, yyyy")}
                    </time>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cover */}
        {post.cover_image && (
          <div className="container mx-auto px-6 -mt-2">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover rounded-sm"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div
              className="max-w-3xl mx-auto prose-impact text-foreground"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 section-cream">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Want to tell your story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Let's design a storytelling system that builds trust and moves people to action.
            </p>
            <Link to="/bookings" className="btn-primary">
              Book a Story Call
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;
