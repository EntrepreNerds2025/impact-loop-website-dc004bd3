import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BlogPost, formatPostDate, categorySlug } from "@/lib/blog";

interface PostCardProps {
  post: BlogPost;
  variant?: "default" | "feature";
}

export const PostCard = ({ post, variant = "default" }: PostCardProps) => {
  const isFeature = variant === "feature";
  return (
    <article
      className={
        isFeature
          ? "group rounded-md border border-[#e6e8ef] bg-white p-7 transition-colors hover:border-[#2e44d6] md:p-9"
          : "group rounded-md border border-[#e6e8ef] bg-white p-6 transition-colors hover:border-[#2e44d6]"
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-[#6b6f7a]">
        <Link
          to={`/blog/category/${categorySlug(post.category)}`}
          className="font-semibold text-[#6e3acb] hover:underline"
        >
          {post.category}
        </Link>
        <span className="opacity-50">·</span>
        <span>{formatPostDate(post.date)}</span>
        <span className="opacity-50">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>
      <Link to={`/blog/${post.slug}`} className="block">
        <h2
          className={
            isFeature
              ? "mb-3 font-serif text-2xl font-bold leading-tight text-[#1f2233] transition-colors group-hover:text-[#2e44d6] md:text-4xl"
              : "mb-3 font-serif text-xl font-bold leading-tight text-[#1f2233] transition-colors group-hover:text-[#2e44d6] md:text-2xl"
          }
        >
          {post.title}
        </h2>
        <p className="mb-4 leading-relaxed text-[#6b6f7a]">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#6e3acb]">
          Read the post
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </article>
  );
};

export default PostCard;
