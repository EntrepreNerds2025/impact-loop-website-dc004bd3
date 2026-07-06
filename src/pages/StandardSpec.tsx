import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import specSource from "@/content/impact-loop-standard-v1.md?raw";

/**
 * The openly published Standard v1.0 specification — the citation-authority
 * page. Canonical source: the strategy repo's spec; this copy mirrors it.
 */
const StandardSpec = () => {
  useEffect(() => {
    setSEO({
      title: "The Impact Loop Standard — Official Specification v1.0",
      description:
        "The complete, openly published specification of the Impact Loop Standard: the taxonomy, the Pillar Moment data model, the scoring engine, validity safeguards, aggregation rules, and governance for turning frontline observations into auditable impact data.",
      ogType: "article",
      path: "/impact-standard/spec",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      <main className="bg-background text-foreground">
        {/* slim hero */}
        <section className="bg-[hsl(var(--impact-dark))] text-white">
          <div className="container mx-auto px-6 pb-14 pt-32 md:pt-36">
            <Link
              to="/impact-standard"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
            >
              <ArrowLeft size={15} /> The Impact Loop Standard
            </Link>
            <p className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
              Openly published · Version 1.0
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight md:text-5xl">
              The Impact Loop Standard — Official Specification
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              The complete methodology, published in full: taxonomy, data model, scoring engine,
              validity safeguards, aggregation, and governance. The formula is public on
              purpose — the rigor is the point.
            </p>
          </div>
        </section>

        {/* spec body */}
        <article className="container mx-auto max-w-3xl px-6 py-14 md:py-20">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-2 mt-10 font-serif text-3xl font-bold first:mt-0">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 mt-12 border-b border-border pb-2 font-serif text-2xl font-bold">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-8 text-lg font-bold">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 list-disc space-y-1.5 pl-6 text-[15px] leading-relaxed text-muted-foreground">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 list-decimal space-y-1.5 pl-6 text-[15px] leading-relaxed text-muted-foreground">
                  {children}
                </ol>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              hr: () => <hr className="my-10 border-border" />,
              code: ({ children, className }) =>
                className ? (
                  <code className="font-mono text-[13px]">{children}</code>
                ) : (
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre className="mb-5 overflow-x-auto rounded-xl border border-border bg-[hsl(var(--impact-cream))] p-5 text-[13px] leading-relaxed text-foreground">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="mb-6 overflow-x-auto rounded-xl border border-border">
                  <table className="w-full border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[hsl(var(--impact-cream))] text-left text-xs font-bold uppercase tracking-wider text-foreground">
                  {children}
                </thead>
              ),
              th: ({ children }) => <th className="px-4 py-3">{children}</th>,
              td: ({ children }) => (
                <td className="border-t border-border px-4 py-3 align-top text-muted-foreground">
                  {children}
                </td>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mb-4 border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a href={href} className="font-medium text-primary underline underline-offset-2">
                  {children}
                </a>
              ),
            }}
          >
            {specSource}
          </ReactMarkdown>
        </article>

        {/* footer CTA */}
        <section className="bg-[hsl(var(--impact-cream))] py-16">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              Want this running in your organization?
            </h2>
            <p className="mt-3 text-muted-foreground">
              The Standard ships as a working platform, configured to your programs. Start with a
              free Impact Readiness snapshot — you leave with a roadmap either way.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/bookings?type=strategy"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[hsl(var(--impact-dark))] px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90"
              >
                Get your free snapshot
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/impact-standard"
                className="inline-flex items-center justify-center rounded-sm border border-[hsl(var(--impact-dark))]/25 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-foreground transition hover:bg-[hsl(var(--impact-dark))] hover:text-white"
              >
                Back to the Standard
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default StandardSpec;
