import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Quote, Download, ArrowRight, ShieldCheck, Info } from "lucide-react";
import type {
  Cohort,
  ImpactStat,
  Outcome,
  Partner,
  StaffQuote,
  StandardData,
  Testimonial,
  MediaPhoto,
  MediaVideo,
} from "@/data/impactPages/types";
import { pillarById } from "@/data/impactPages/types";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06 },
  }),
};

const reveal = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "-80px" },
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  dark,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {kicker && (
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
          {kicker}
        </p>
      )}
      <h2
        className={`font-serif text-3xl font-bold md:text-4xl ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ---------- HERO -------------------------------------------------------------

export function HeroSection({
  organizationName,
  programName,
  hero,
  reportingPeriod,
  communityServed,
}: {
  organizationName: string;
  programName: string;
  hero?: {
    kicker?: string;
    headline?: string;
    subhead?: string;
    image?: string;
    videoVimeoId?: string;
  };
  reportingPeriod?: string;
  communityServed?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--impact-dark))] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,hsl(var(--impact-purple)/0.28),transparent_32%),linear-gradient(135deg,hsl(var(--impact-dark))_0%,hsl(var(--impact-dark-lighter))_55%,hsl(var(--impact-blue)/0.5)_100%)]" />
      <div className="container relative z-10 mx-auto px-6 pb-24 pt-36">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur">
            {hero?.kicker || `${organizationName} · Impact Report`}
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {hero?.headline || programName}
          </h1>
          {hero?.subhead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {hero.subhead}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
            {communityServed && <span>{communityServed}</span>}
            {reportingPeriod && <span>{reportingPeriod}</span>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- OVERVIEW ---------------------------------------------------------

export function OverviewSection({
  programName,
  programDescription,
  communityServed,
}: {
  programName: string;
  programDescription?: string;
  communityServed?: string;
}) {
  return (
    <section className="container mx-auto px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
          The Program
        </p>
        <h2 className="font-serif text-3xl font-bold md:text-4xl">{programName}</h2>
        {programDescription && (
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {programDescription}
          </p>
        )}
        {communityServed && (
          <p className="mt-4 text-sm font-medium text-foreground/70">
            Community served: {communityServed}
          </p>
        )}
      </div>
    </section>
  );
}

// ---------- STATS ------------------------------------------------------------

export function StatsSection({ stats }: { stats: ImpactStat[] }) {
  return (
    <section className="bg-[hsl(var(--impact-cream))] py-20 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          {...reveal}
          variants={fadeUp}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp} className="text-center">
              <div className="font-serif text-4xl font-bold text-foreground md:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium text-foreground/70">{s.label}</div>
              {s.sublabel && (
                <div className="mt-1 text-xs text-muted-foreground">{s.sublabel}</div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------- COHORTS ----------------------------------------------------------

export function CohortsSection({ cohorts }: { cohorts: Cohort[] }) {
  return (
    <section className="container mx-auto px-6 py-20 md:py-24">
      <SectionHeading kicker="Reach" title="Cohorts & sessions" />
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cohorts.map((c, i) => (
          <motion.div
            key={c.name + i}
            {...reveal}
            custom={i}
            variants={fadeUp}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="font-serif text-xl font-semibold">{c.name}</div>
            {c.focus && <div className="mt-1 text-sm text-primary">{c.focus}</div>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {typeof c.participants === "number" && (
                <span>{c.participants} participants</span>
              )}
              {c.date && <span>{c.date}</span>}
              {c.location && <span>{c.location}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------- OUTCOMES ---------------------------------------------------------

export function OutcomesSection({ outcomes }: { outcomes: Outcome[] }) {
  return (
    <section className="bg-muted py-20 md:py-24">
      <div className="container mx-auto px-6">
        <SectionHeading kicker="Outcomes" title="What changed" />
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label + i}
              {...reveal}
              custom={i}
              variants={fadeUp}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="font-serif text-2xl font-bold text-primary">{o.value}</div>
              <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {o.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- HIGHLIGHTS -------------------------------------------------------

export function HighlightsSection({ highlights }: { highlights: string[] }) {
  return (
    <section className="container mx-auto px-6 py-20 md:py-24">
      <SectionHeading kicker="Impact highlights" title="Moments that mattered" />
      <ul className="mx-auto max-w-3xl space-y-4">
        {highlights.map((h, i) => (
          <motion.li
            key={i}
            {...reveal}
            custom={i}
            variants={fadeUp}
            className="flex gap-4 rounded-xl border border-border bg-card p-5"
          >
            <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <span className="text-foreground/85">{h}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// ---------- STORIES / TESTIMONIALS ------------------------------------------

export function StoriesSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-[hsl(var(--impact-cream))] py-20 md:py-24">
      <div className="container mx-auto px-6">
        <SectionHeading kicker="In their words" title="Stories families feel" />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              {...reveal}
              custom={i}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <Quote className="mb-4 h-7 w-7 text-primary" />
              <blockquote className="font-serif text-xl leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              {(t.attribution || t.role) && (
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  {t.attribution}
                  {t.role ? ` · ${t.role}` : ""}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- STAFF QUOTES -----------------------------------------------------

export function StaffSection({ quotes }: { quotes: StaffQuote[] }) {
  return (
    <section className="container mx-auto px-6 py-20 md:py-24">
      <SectionHeading kicker="From the team" title="The people doing the work" />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {quotes.map((q, i) => (
          <motion.figure
            key={i}
            {...reveal}
            custom={i}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-7"
          >
            <blockquote className="text-lg leading-relaxed text-foreground/85">
              "{q.quote}"
            </blockquote>
            {(q.name || q.role) && (
              <figcaption className="mt-4 text-sm font-medium text-foreground">
                {q.name}
                {q.role ? <span className="text-muted-foreground"> · {q.role}</span> : null}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

// ---------- PARTNERS ---------------------------------------------------------

export function PartnersSection({ partners }: { partners: Partner[] }) {
  const detailed = partners.some((p) => p.contribution);
  return (
    <section className="bg-muted py-20 md:py-24">
      <div className="container mx-auto px-6">
        <SectionHeading kicker="Funders & partners" title="Made possible together" />
        {detailed ? (
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            {partners.map((p, i) => (
              <motion.div
                key={p.name + i}
                {...reveal}
                custom={i}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  {p.logo && (
                    <img src={p.logo} alt={p.name} className="h-8 w-auto object-contain" />
                  )}
                  <div className="font-semibold text-foreground">{p.name}</div>
                </div>
                {p.contribution && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.contribution}
                  </p>
                )}
                {p.outcome && (
                  <p className="mt-2 text-sm text-foreground/70">
                    <strong className="text-foreground">Outcome:</strong> {p.outcome}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {partners.map((p, i) => (
              <div key={p.name + i} className="flex items-center gap-3">
                {p.logo && (
                  <img src={p.logo} alt={p.name} className="h-10 w-auto object-contain" />
                )}
                <span className="font-medium text-foreground/80">{p.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- MEDIA ------------------------------------------------------------

export function MediaSection({
  photos,
  videos,
}: {
  photos?: MediaPhoto[];
  videos?: MediaVideo[];
}) {
  return (
    <section className="container mx-auto px-6 py-20 md:py-24">
      <SectionHeading kicker="Visual proof" title="See the work" />
      {videos && videos.length > 0 && (
        <div className="mx-auto mb-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {videos.map((v, i) => (
            <div key={v.id + i} className="overflow-hidden rounded-2xl border border-border bg-black">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={
                    v.provider === "youtube"
                      ? `https://www.youtube.com/embed/${v.id}`
                      : `https://player.vimeo.com/video/${v.id}`
                  }
                  title={v.title || "Program video"}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {photos && photos.length > 0 && (
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3">
          {photos.map((p, i) => (
            <figure key={p.src + i} className="overflow-hidden rounded-xl border border-border">
              <img src={p.src} alt={p.alt || ""} className="h-full w-full object-cover" loading="lazy" />
              {p.caption && (
                <figcaption className="bg-card p-2 text-xs text-muted-foreground">
                  {p.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

// ---------- IMPACT LOOP STANDARD PREVIEW ------------------------------------

export function StandardSection({ standard }: { standard: StandardData }) {
  const isIllustrative = standard.status === "illustrative";
  return (
    <section className="bg-[hsl(var(--impact-dark))] py-20 text-white md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
            <ShieldCheck size={14} /> The Impact Loop Standard
          </p>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Transformation, measured
          </h2>
          {standard.summary && (
            <p className="mt-4 text-lg leading-relaxed text-white/70">{standard.summary}</p>
          )}
        </div>

        {isIllustrative && (
          <div className="mx-auto mb-8 flex max-w-3xl items-start gap-3 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p>
              <strong>Illustrative preview.</strong> These pillar scores map this program's
              existing qualitative outcomes onto the Standard to show what measured data would
              look like. They are not yet audited Pillar Moment data — that begins once staff
              start logging observations.
            </p>
          </div>
        )}

        {standard.pillars && standard.pillars.length > 0 && (
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {standard.pillars.map((p) => {
              const def = pillarById(p.pillar);
              return (
                <div key={p.pillar} className="rounded-xl border border-white/12 bg-white/5 p-5">
                  <div className="mb-3 h-1.5 w-10 rounded-full" style={{ backgroundColor: def.color }} />
                  <div className="text-sm font-semibold text-white/80">{def.name}</div>
                  <div className="mt-1 font-serif text-3xl font-bold">{p.current}</div>
                  {typeof p.growth === "number" && (
                    <div className={`text-xs font-semibold ${p.growth >= 0 ? "text-emerald-300" : "text-red-300"}`}>
                      {p.growth >= 0 ? "▲" : "▼"} {Math.abs(p.growth)} pts
                    </div>
                  )}
                  {p.confidence && (
                    <div className="mt-2 text-[10px] uppercase tracking-wider text-white/40">
                      {p.confidence}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {standard.sampleObservations && standard.sampleObservations.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-white/40">
              Sample observations
            </p>
            {standard.sampleObservations.map((o, i) => {
              const def = pillarById(o.pillar);
              return (
                <blockquote
                  key={i}
                  className="rounded-xl border-l-4 bg-white/5 p-4 text-sm italic text-white/80"
                  style={{ borderLeftColor: def.color }}
                >
                  "{o.note}"
                  <span className="mt-1 block text-[11px] not-italic text-white/40">
                    {def.name}
                    {o.date ? ` · ${o.date}` : ""}
                  </span>
                </blockquote>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/impact-standard"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 underline-offset-4 hover:underline"
          >
            How the Standard works <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA / DOWNLOAD ---------------------------------------------------

export function CtaSection({
  cta,
  allowDownload,
  onDownload,
}: {
  cta?: { heading?: string; body?: string; buttonLabel?: string; buttonHref?: string };
  allowDownload?: boolean;
  onDownload?: () => void;
}) {
  return (
    <section className="bg-[hsl(var(--impact-dark))] py-20 text-white md:py-24">
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">
          {cta?.heading || "Want to support this work?"}
        </h2>
        {cta?.body && (
          <p className="mt-5 text-lg leading-relaxed text-white/70">{cta.body}</p>
        )}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {cta?.buttonLabel && (
            <Link
              to={cta.buttonHref || "/contact"}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[hsl(var(--impact-dark))] transition hover:bg-white/90"
            >
              {cta.buttonLabel}
              <ArrowRight size={16} />
            </Link>
          )}
          {allowDownload && (
            <button
              onClick={onDownload}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[hsl(var(--impact-dark))]"
            >
              <Download size={16} /> Download report
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
