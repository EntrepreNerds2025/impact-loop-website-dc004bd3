import { BlogPost } from "@/lib/blog";
import PostCard from "./PostCard";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="border-t border-[#e6e8ef] pt-12 mt-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#6e3acb]">
        Keep Reading
      </p>
      <h2 className="mb-8 font-serif text-2xl font-bold leading-tight text-[#1f2233] md:text-4xl">
        More posts in this thread.
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
