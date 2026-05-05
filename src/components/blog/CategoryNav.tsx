import { Link, useLocation } from "react-router-dom";
import { ALL_CATEGORIES, categorySlug, getCategoryCounts } from "@/lib/blog";

interface CategoryNavProps {
  activeCategory?: string;
}

export const CategoryNav = ({ activeCategory }: CategoryNavProps) => {
  const counts = getCategoryCounts();
  const location = useLocation();
  const isAllActive = !activeCategory && location.pathname === "/blog";

  const baseClass = "px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors";
  const activeClass = `${baseClass} bg-[#1f2233] text-white`;
  const inactiveClass = `${baseClass} bg-[#f5f4ff] text-[#1f2233] hover:bg-[#1f2233] hover:text-white`;

  return (
    <nav aria-label="Blog categories" className="mb-8 flex flex-wrap gap-2">
      <Link to="/blog" className={isAllActive ? activeClass : inactiveClass}>
        All Posts
      </Link>
      {ALL_CATEGORIES.map((cat) => {
        const slug = categorySlug(cat);
        const isActive = activeCategory === slug;
        return (
          <Link key={cat} to={`/blog/category/${slug}`} className={isActive ? activeClass : inactiveClass}>
            {cat} <span className="ml-1 opacity-50">({counts[cat] || 0})</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNav;
