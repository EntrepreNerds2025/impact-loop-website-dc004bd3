const DEFAULT_TITLE = "Impact Loop — Cinematic Storytelling for Nonprofits & Changemakers";
const DEFAULT_DESCRIPTION =
  "Impact Loop designs storytelling systems that protect human stories in an AI-saturated world.";

function setOrCreateMeta(property: string, content: string, isOg = false) {
  const attr = isOg ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function setSEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "article",
  canonical,
}: {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}) {
  document.title = title || DEFAULT_TITLE;
  setOrCreateMeta("description", description || DEFAULT_DESCRIPTION);
  setOrCreateMeta("og:title", ogTitle || title || DEFAULT_TITLE, true);
  setOrCreateMeta("og:description", ogDescription || description || DEFAULT_DESCRIPTION, true);
  setOrCreateMeta("og:type", ogType, true);
  if (ogImage) setOrCreateMeta("og:image", ogImage, true);
  if (canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }
}

export function resetSEO() {
  document.title = DEFAULT_TITLE;
  setOrCreateMeta("description", DEFAULT_DESCRIPTION);
  setOrCreateMeta("og:title", DEFAULT_TITLE, true);
  setOrCreateMeta("og:description", DEFAULT_DESCRIPTION, true);
  setOrCreateMeta("og:type", "website", true);
}
