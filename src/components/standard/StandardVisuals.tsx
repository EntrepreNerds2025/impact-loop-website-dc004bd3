import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ImagePlus,
  CalendarClock,
  Sparkles,
  TrendingUp,
  Minus,
  TrendingDown,
  Link2,
  ShieldCheck,
  Database,
} from "lucide-react";

/* ============================================================================
   StandardVisuals — premium, animated visuals for /impact-standard.
   Self-contained (no cross-file imports beyond libraries) so it drops in clean.
   HARD RULES honored:
   - v1 formula is sacred: weighted average of ratings (1 to 5) x 20,
     recency on a 30-day half-life, a setback is rating 1 at full weight.
   - Pillar colors never change.
   - Anything not measured is labeled Illustrative.
   - No partner quotes.
   - No em dashes in copy.
   ========================================================================== */

const PILLAR = {
  identity: "#7C3AED",
  character: "#2563EB",
  relationships: "#0D9488",
  service: "#EA580C",
  purpose: "#CA8A04",
};

const IllustrativeTag = ({ children = "Illustrative example, not measured data" }: { children?: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-amber-700">
    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
    {children}
  </span>
);

/* ---------------------------------------------------------------------------
   ImagePlaceholder — renders your photo once you drop a file at `src`.
   Until then it shows a designed placeholder that names the exact path to add.
   Replace later: add the image to /public/images/... and it appears. No code change.
   ------------------------------------------------------------------------- */
type ImgProps = {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  className?: string;
  rounded?: string;
};

export const ImagePlaceholder = ({
  src,
  alt,
  caption,
  ratio = "16 / 9",
  className = "",
  rounded = "rounded-2xl",
}: ImgProps) => {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative overflow-hidden ${rounded} border border-border bg-[hsl(var(--impact-cream))] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--impact-purple)/0.10),transparent_45%),radial-gradient(circle_at_80%_90%,hsl(var(--impact-blue)/0.10),transparent_45%)] p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
            <ImagePlus size={20} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Photo placeholder</p>
            {caption && <p className="mt-1 text-sm font-semibold text-foreground">{caption}</p>}
            <p className="mt-2 inline-block rounded bg-background/70 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
              add: {src}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   CinematicBand — full-bleed image strip with an overlaid line.
   Sits just under the hero to give the page the home page's cinematic weight.
   ------------------------------------------------------------------------- */
export const CinematicBand = () => (
  <section className="relative">
    <ImagePlaceholder
      src="/images/standard/field-band.jpg"
      alt="Frontline youth program in session"
      ratio="21 / 7"
      rounded="rounded-none"
      caption="A wide, warm shot of your program in action"
      className="min-h-[220px]"
    />
    <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[hsl(var(--impact-dark))]/80 via-[hsl(var(--impact-dark))]/20 to-transparent">
      <div className="container mx-auto px-6 pb-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl font-serif text-2xl font-bold leading-snug text-white md:text-3xl"
        >
          The growth is real in the room. The Standard makes it real on paper.
        </motion.p>
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------------------
   MomentPhoto — small square placeholder for a face behind a number.
   ------------------------------------------------------------------------- */
export const MomentPhoto = () => (
  <ImagePlaceholder
    src="/images/standard/moment.jpg"
    alt="A youth worker and participant"
    ratio="1 / 1"
    caption="The person behind the moment"
    rounded="rounded-xl"
  />
);

/* ---------------------------------------------------------------------------
   RecencyCurve — the 30-day half-life, drawn. weight = 0.5 ^ (days / 30).
   ------------------------------------------------------------------------- */
const RecencyCurve = () => {
  const W = 340, H = 190, padL = 38, padB = 30, padT = 12, padR = 14;
  const x = (d: number) => padL + (d / 90) * (W - padL - padR);
  const y = (w: number) => padT + (1 - w) * (H - padT - padB);
  const days = [0, 6, 12, 18, 24, 30, 40, 50, 60, 75, 90];
  const path = days
    .map((d, i) => `${i ? "L" : "M"}${x(d).toFixed(1)},${y(Math.pow(0.5, d / 30)).toFixed(1)}`)
    .join(" ");
  const area = `${path} L${x(90).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;
  const hx = x(30), hy = y(0.5);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Recency weight decays on a 30-day half-life">
      <defs>
        <linearGradient id="recencyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--impact-blue))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="hsl(var(--impact-blue))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((w) => (
        <g key={w}>
          <line x1={padL} y1={y(w)} x2={W - padR} y2={y(w)} stroke="hsl(var(--border))" strokeWidth="1" />
          <text x={padL - 8} y={y(w) + 3} textAnchor="end" className="fill-muted-foreground" style={{ fontSize: 9 }}>
            {w.toFixed(1)}
          </text>
        </g>
      ))}
      {[0, 30, 60, 90].map((d) => (
        <text key={d} x={x(d)} y={H - 12} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 9 }}>
          {d}d
        </text>
      ))}
      <motion.path
        d={area}
        fill="url(#recencyFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="hsl(var(--impact-blue))"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      />
      <line x1={hx} y1={padT} x2={hx} y2={H - padB} stroke={PILLAR.identity} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <motion.circle
        cx={hx}
        cy={hy}
        r="5"
        fill={PILLAR.identity}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
      <text x={hx + 8} y={hy - 8} className="fill-foreground" style={{ fontSize: 10, fontWeight: 700 }}>
        Day 30 = half weight
      </text>
    </svg>
  );
};

/* Count-up used by the worked example. */
const ScoreCountUp = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n}</span>;
};

/* Worked example data. Illustrative. Setback is rating 1 at full weight. */
const OBS = [
  { rating: 5, when: "Today", days: 0, kind: "growth", note: "Led the check-in circle" },
  { rating: 4, when: "2 weeks ago", days: 14, kind: "growth", note: "Welcomed a newcomer" },
  { rating: 1, when: "3 weeks ago", days: 21, kind: "setback", note: "Walked out of a session" },
  { rating: 4, when: "5 weeks ago", days: 35, kind: "growth", note: "Helped settle a dispute" },
];
const wRound = (d: number) => Math.round(Math.pow(0.5, d / 30) * 100) / 100;

/* ---------------------------------------------------------------------------
   FormulaAnatomy — the centerpiece. Shows the sacred formula in the open.
   ------------------------------------------------------------------------- */
export const FormulaAnatomy = () => {
  const sumW = OBS.reduce((a, o) => a + wRound(o.days), 0);
  const sumRW = OBS.reduce((a, o) => a + o.rating * wRound(o.days), 0);
  const avg = sumRW / sumW;
  const score = Math.round(avg * 20);

  const dirIcon = { growth: TrendingUp, setback: TrendingDown, steady: Minus } as const;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">The formula, in the open</p>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">How a rating becomes a score</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Deliberately simple, so a funder can audit it. A staff member rates each moment from 1 to 5. Recent moments
            weigh more than older ones on a 30-day half-life, and the result is scaled to a familiar 0 to 100. This is the
            approach we are developing and testing with our pilot partners.
          </p>
        </div>

        {/* The equation, color-coded */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-4xl rounded-3xl border border-border bg-[hsl(var(--impact-cream))] p-7 shadow-sm md:p-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 text-center">
            <span className="font-serif text-2xl font-bold text-foreground md:text-3xl">Pillar score</span>
            <span className="text-2xl text-muted-foreground md:text-3xl">=</span>
            <span className="inline-flex flex-col items-center rounded-2xl border border-[hsl(var(--impact-blue))]/25 bg-background px-4 py-3">
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[hsl(var(--impact-blue))]">
                recency-weighted average
              </span>
              <span className="mt-1 font-serif text-xl font-bold md:text-2xl">of ratings (1 to 5)</span>
            </span>
            <span className="text-2xl text-muted-foreground md:text-3xl">&times;</span>
            <span className="inline-flex flex-col items-center rounded-2xl border border-[hsl(var(--impact-purple))]/25 bg-background px-4 py-3">
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[hsl(var(--impact-purple))]">
                scale
              </span>
              <span className="mt-1 font-serif text-xl font-bold md:text-2xl">20</span>
            </span>
          </div>
          <p className="mt-6 text-center font-mono text-xs text-muted-foreground md:text-sm">
            recency weight = 0.5 ^ ( days since the moment &divide; 30 )
          </p>
        </motion.div>

        {/* Two influences: recency curve + direction */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--impact-blue))]/10 text-[hsl(var(--impact-blue))]">
                <CalendarClock size={18} />
              </span>
              <h3 className="text-base font-bold">Recency, on a 30-day half-life</h3>
            </div>
            <RecencyCurve />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A moment from today counts fully. One from a month ago counts about half. So a score reflects who a young
              person is now, not who they were a year ago.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--impact-purple))]/10 text-[hsl(var(--impact-purple))]">
                <Sparkles size={18} />
              </span>
              <h3 className="text-base font-bold">Direction, kept honest</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 rounded-xl border border-border bg-[hsl(var(--impact-cream))] p-3">
                <TrendingUp size={18} className="mt-0.5 flex-none" style={{ color: PILLAR.relationships }} />
                <p className="text-sm leading-relaxed text-foreground">
                  <span className="font-bold">Growth counts fully.</span> A clear step forward earns a high rating.
                </p>
              </li>
              <li className="flex items-start gap-3 rounded-xl border border-border bg-[hsl(var(--impact-cream))] p-3">
                <Minus size={18} className="mt-0.5 flex-none text-muted-foreground" />
                <p className="text-sm leading-relaxed text-foreground">
                  <span className="font-bold">A steady day counts for less.</span> Not every moment is a milestone, and
                  the math says so.
                </p>
              </li>
              <li className="flex items-start gap-3 rounded-xl border border-border bg-[hsl(var(--impact-cream))] p-3">
                <TrendingDown size={18} className="mt-0.5 flex-none" style={{ color: PILLAR.service }} />
                <p className="text-sm leading-relaxed text-foreground">
                  <span className="font-bold">A setback is a rating of 1, at full weight.</span> Honest data, not a
                  feel-good meter. That honesty is what funders end up trusting.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Worked example */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[hsl(var(--impact-cream))] px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PILLAR.relationships }} />
              <h3 className="font-serif text-lg font-bold">Worked example: the Relationships pillar</h3>
            </div>
            <IllustrativeTag />
          </div>
          <div className="grid gap-0 md:grid-cols-[1.5fr_1fr]">
            <div className="p-6">
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                <span>Moment</span>
                <span className="text-right">Rating</span>
                <span className="text-right">Weight</span>
              </div>
              <div className="mt-2 space-y-2">
                {OBS.map((o, i) => {
                  const Icon = dirIcon[o.kind as keyof typeof dirIcon] || Minus;
                  const w = wRound(o.days);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.12 }}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 rounded-lg border border-border px-3 py-2"
                    >
                      <span className="flex items-center gap-2 text-sm">
                        <Icon
                          size={15}
                          className="flex-none"
                          style={{ color: o.kind === "setback" ? PILLAR.service : PILLAR.relationships }}
                        />
                        <span className="truncate">
                          <span className="text-foreground">{o.note}</span>
                          <span className="ml-1 text-xs text-muted-foreground">{o.when}</span>
                        </span>
                      </span>
                      <span className="text-right text-sm font-bold tabular-nums">{o.rating}</span>
                      <span className="text-right text-sm tabular-nums text-muted-foreground">{w.toFixed(2)}</span>
                    </motion.div>
                  );
                })}
              </div>
              <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
                weighted average = {sumRW.toFixed(2)} &divide; {sumW.toFixed(2)} = {avg.toFixed(2)}
                <br />
                score = {avg.toFixed(2)} &times; 20 = {score}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-t border-border bg-[hsl(var(--impact-dark))] p-6 text-center text-white md:border-l md:border-t-0">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white/60">Relationships score</p>
              <p className="font-serif text-6xl font-bold" style={{ color: "#5EEAD4" }}>
                <ScoreCountUp value={score} />
              </p>
              <p className="text-xs text-white/60">out of 100</p>
              <div className="mt-2 h-2 w-full max-w-[160px] overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: PILLAR.relationships }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------------
   LedgerChain — the append-only evidence ledger, drawn as a chained row.
   Schematic. Hashes are representative, not real records.
   ------------------------------------------------------------------------- */
const BLOCKS = [
  { color: PILLAR.identity, hash: "a7f3c1", label: "Spoke up in group" },
  { color: PILLAR.relationships, hash: "b2e9d4", label: "Settled a dispute" },
  { color: PILLAR.service, hash: "c4a180", label: "Led the warm-up" },
  { color: PILLAR.purpose, hash: "d9f267", label: "Set a term goal" },
];

export const LedgerChain = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mx-auto mt-4 max-w-4xl rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8"
  >
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Database size={18} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Append-only evidence ledger</p>
          <h3 className="font-serif text-lg font-bold">Every number traces back to a dated, chained record</h3>
        </div>
      </div>
      <IllustrativeTag>Schematic</IllustrativeTag>
    </div>
    <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
      {BLOCKS.map((b, i, arr) => (
        <div key={b.hash} className="flex flex-1 flex-col items-center md:flex-row md:items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.14 }}
            className="w-full rounded-xl border border-border bg-[hsl(var(--impact-cream))] p-4"
          >
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.color }} />
              <span className="font-mono text-[0.65rem] text-muted-foreground">#{b.hash}</span>
            </div>
            <p className="mt-2 text-sm font-semibold leading-snug text-foreground">{b.label}</p>
            <p className="mt-1 font-mono text-[0.6rem] text-muted-foreground">prev &rarr; {arr[i - 1]?.hash || "genesis"}</p>
          </motion.div>
          {i < arr.length - 1 && (
            <div className="flex items-center justify-center py-1 text-muted-foreground md:px-2 md:py-0">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.14 * i + 0.2 }}
              >
                <Link2 size={16} className="rotate-90 md:rotate-0" />
              </motion.span>
            </div>
          )}
        </div>
      ))}
    </div>
    <p className="mt-5 flex items-center gap-2 text-xs leading-relaxed text-muted-foreground">
      <ShieldCheck size={15} className="flex-none text-primary" />
      Corrections are visible additions, never silent edits. The whole history can be re-verified independently, the
      audit trail a funder's evaluator actually asks for.
    </p>
  </motion.div>
);
