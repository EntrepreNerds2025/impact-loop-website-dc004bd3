import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { setSEO, resetSEO } from "@/lib/seo";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const SITE_URL = "https://impact-loop-website.lovable.app";

/** Enhanced markdown-to-HTML renderer with editorial features */
function renderMarkdown(md: string) {
  let imageIndex = 0;

  let html = md
    // Horizontal rules (must come before other line-based replacements)
    .replace(/^---$/gm, '<div class="editorial-divider"><span></span><span></span><span></span></div>')
    // Images with alt as caption, alternating float
    .replace(/!\[(.+?)\]\((.+?)\)/g, (_match, alt, url) => {
      const side = imageIndex % 2 === 0 ? "left" : "right";
      imageIndex++;
      return `<figure class="editorial-image editorial-image-${side}"><img src="${url}" alt="${alt}" loading="lazy" /><figcaption>${alt}</figcaption></figure>`;
    })
    // Blockquotes as pullquotes
    .replace(/^> (.+)$/gm, '<blockquote class="editorial-pullquote"><span class="pullquote-mark">\u201C</span>$1</blockquote>')
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="editorial-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="editorial-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h2 class="editorial-h1">$1</h2>')
    // Numbered lists: lines starting with digit)
    .replace(/^(\d+)\) (.+)$/gm, '<li class="editorial-li editorial-li-ordered" value="$1">$2</li>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="editorial-li">$1</li>')
    // Bold & italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-[hsl(var(--primary))] underline hover:text-[hsl(var(--secondary))]" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Double newlines = paragraphs
    .replace(/\n{2,}/g, '</p><p class="editorial-p">')
    // Single newlines
    .replace(/\n/g, "<br />");

  // Wrap consecutive <li> in <ul>
  html = html.replace(
    /(<li class="editorial-li(?:-ordered)?"[^>]*>[\s\S]*?<\/li>)(?:<br \/>)?/g,
    "$1"
  );

  // Add drop cap class to first paragraph
  html = `<p class="editorial-p editorial-drop-cap">${html}</p>`;

  return html;
}

function getReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
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

  const readTime = getReadTime(post.content);

  return (
    <Layout>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Progress
          value={progress}
          className="h-1 rounded-none bg-transparent"
        />
      </div>

      <article>
        {/* Hero with cover image */}
        <section
          className="relative min-h-[70vh] flex items-end overflow-hidden"
          style={
            post.cover_image
              ? {
                  backgroundImage: `url(${post.cover_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--impact-dark))] via-[hsl(var(--impact-dark))]/70 to-transparent" />

          <div className="relative z-10 container mx-auto px-6 pb-16 pt-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
                {post.title}
              </h1>
              <div className="flex items-center gap-4">
                <Avatar className="h-11 w-11 border-2 border-white/20">
                  <AvatarFallback className="bg-[hsl(var(--primary))] text-primary-foreground text-sm font-semibold">
                    {getInitials(post.author)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white/70 text-sm">
                  <p className="text-white font-medium">{post.author}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    {post.published_at && (
                      <time dateTime={post.published_at}>
                        {format(new Date(post.published_at), "MMMM d, yyyy")}
                      </time>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {readTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto editorial-content text-foreground"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(post.content),
              }}
            />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-gradient-to-br from-[hsl(var(--impact-dark))] to-[hsl(var(--impact-dark-lighter))]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">
              Want to tell your story?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Let's design a storytelling system that builds trust and moves
              people to action.
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
