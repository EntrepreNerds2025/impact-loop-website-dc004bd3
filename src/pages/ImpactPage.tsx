import { useParams } from "react-router-dom";
import ImpactPageTemplate from "@/components/impact-page/ImpactPageTemplate";
import { getImpactPage } from "@/data/impactPages";
import NotFound from "./NotFound";

/**
 * Route component for /impact/:slug.
 * Looks the page up in the registry and renders it through the config-driven
 * template. Unknown slugs fall back to the existing NotFound page.
 */
const ImpactPage = () => {
  const { slug } = useParams();
  const page = getImpactPage(slug);
  if (!page) return <NotFound />;
  return <ImpactPageTemplate page={page} />;
};

export default ImpactPage;
