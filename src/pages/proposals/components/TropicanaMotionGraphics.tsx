import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- 1. The 45-Year Timeline ---------- */
const TimelineLoop = () => {
  const milestones = [
    { year: "1980", x: 8, label: "Founded" },
    { year: "1988", x: 22, label: "TDSB Childcare" },
    { year: "2017", x: 48, label: "Scholarships" },
    { year: "2022", x: 66, label: "Strategic Plan" },
    { year: "2024", x: 82, label: "$228M SBCCI" },
    { year: "2026", x: 95, label: "FriendRaiser" },
  ];
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-impact-dark to-[#0a1628] flex flex-col items-center justify-center overflow-hidden">
      <p className="absolute top-4 left-5 text-impact-blue/80 text-[10px] uppercase tracking-[0.25em] font-medium">45 Years of the Tropicana Effect</p>
      <svg viewBox="0 0 100 30" className="w-[88%] h-auto mt-4">
        <motion.line
          x1="3" y1="15" x2="97" y2="15"
          stroke="#3b82f6" strokeWidth="0.4" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 7, times: [0, 0.45, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
        />
        {milestones.map((m, i) => (
          <g key={m.year}>
            <motion.circle
              cx={m.x} cy="15" r="1.4"
              fill="#60a5fa"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 7, times: [0, 0.1 + i * 0.08, 0.18 + i * 0.08, 0.85, 1], repeat: Infinity, ease: "easeOut" }}
            />
            <motion.text
              x={m.x} y="9" textAnchor="middle" fill="#ffffff" fontSize="2.2" fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 7, times: [0, 0.1 + i * 0.08, 0.2 + i * 0.08, 0.85, 1], repeat: Infinity }}
            >{m.year}</motion.text>
            <motion.text
              x={m.x} y="22" textAnchor="middle" fill="#93c5fd" fontSize="1.6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 7, times: [0, 0.12 + i * 0.08, 0.22 + i * 0.08, 0.85, 1], repeat: Infinity }}
            >{m.label}</motion.text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">01 — Timeline</p>
        <p className="text-impact-blue/70 text-[9px] uppercase tracking-[0.2em]">Animated reference</p>
      </div>
    </div>
  );
};

/* ---------- 2. Numbers Ticker ---------- */
const NumbersTickerLoop = () => {
  const stats = [
    { value: "$16M", label: "FY2025 Revenue", sub: "Audited financial statements" },
    { value: "45+", label: "Years of Service", sub: "Founded 1980" },
    { value: "8", label: "Program Areas", sub: "Counselling, employment, youth, childcare, family, seniors, community, national" },
    { value: "$228M", label: "SBCCI Administered", sub: "1 of 4 national BNFIN intermediaries" },
    { value: "89%", label: "Government-funded", sub: "The exact gap FriendRaiser closes" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % stats.length), 2400);
    return () => clearInterval(t);
  }, [stats.length]);
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0a1628] to-impact-dark flex flex-col items-center justify-center overflow-hidden">
      <p className="absolute top-4 left-5 text-impact-blue/80 text-[10px] uppercase tracking-[0.25em] font-medium">By the Numbers</p>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center px-4"
        >
          <p className="font-serif text-5xl md:text-6xl font-bold text-white tracking-tight">{stats[i].value}</p>
          <p className="text-impact-blue text-xs uppercase tracking-[0.25em] mt-2 font-medium">{stats[i].label}</p>
          <p className="text-white/50 text-[10px] mt-2 max-w-[220px] mx-auto">{stats[i].sub}</p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">02 — Numbers</p>
        <div className="flex gap-1">
          {stats.map((_, idx) => (
            <div key={idx} className={`w-1 h-1 rounded-full transition-colors ${idx === i ? "bg-impact-blue" : "bg-white/20"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- 3. Program Wheel ---------- */
const ProgramWheelLoop = () => {
  const programs = [
    "Counselling", "Employment", "Youth Dev", "Childcare",
    "Family", "Seniors", "Community", "SBCCI",
  ];
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-impact-dark to-[#0a1628] flex flex-col items-center justify-center overflow-hidden">
      <p className="absolute top-4 left-5 text-impact-blue/80 text-[10px] uppercase tracking-[0.25em] font-medium">8-Program Ecosystem</p>
      <svg viewBox="0 0 200 200" className="w-[78%] h-auto max-h-[80%]">
        <motion.circle
          cx="100" cy="100" r="22"
          fill="none" stroke="#3b82f6" strokeWidth="0.5"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <text x="100" y="98" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="700">TROPICANA</text>
        <text x="100" y="106" textAnchor="middle" fill="#60a5fa" fontSize="4">EST. 1980</text>
        {programs.map((label, i) => {
          const angle = (i * 360) / programs.length - 90;
          const rad = (angle * Math.PI) / 180;
          const innerR = 28;
          const outerR = 72;
          const labelR = 86;
          const x1 = 100 + Math.cos(rad) * innerR;
          const y1 = 100 + Math.sin(rad) * innerR;
          const x2 = 100 + Math.cos(rad) * outerR;
          const y2 = 100 + Math.sin(rad) * outerR;
          const lx = 100 + Math.cos(rad) * labelR;
          const ly = 100 + Math.sin(rad) * labelR;
          return (
            <g key={label}>
              <motion.line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#3b82f6" strokeWidth="0.6" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 6, times: [0, 0.15 + i * 0.06, 0.85, 1], repeat: Infinity, ease: "easeOut" }}
              />
              <motion.circle
                cx={x2} cy={y2} r="2.5" fill="#60a5fa"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1, 1, 0] }}
                transition={{ duration: 6, times: [0, 0.18 + i * 0.06, 0.25 + i * 0.06, 0.85, 1], repeat: Infinity }}
              />
              <motion.text
                x={lx} y={ly + 1.5} textAnchor="middle" fill="#ffffff" fontSize="4.5" fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: 6, times: [0, 0.18 + i * 0.06, 0.28 + i * 0.06, 0.85, 1], repeat: Infinity }}
              >{label}</motion.text>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">03 — Program Wheel</p>
        <p className="text-impact-blue/70 text-[9px] uppercase tracking-[0.2em]">8 spokes</p>
      </div>
    </div>
  );
};

/* ---------- 4. Map of Impact ---------- */
const MapOfImpactLoop = () => {
  const sites = [
    { x: 60, y: 55, label: "Huntingwood HQ", delay: 0 },
    { x: 52, y: 72, label: "Childcare 425", delay: 0.5 },
    { x: 56, y: 70, label: "Childcare 431", delay: 1.0 },
    { x: 32, y: 40, label: "TEC North York", delay: 1.5 },
  ];
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0a1628] to-impact-dark flex flex-col items-center justify-center overflow-hidden">
      <p className="absolute top-4 left-5 text-impact-blue/80 text-[10px] uppercase tracking-[0.25em] font-medium">GTA Footprint &amp; National Reach</p>
      <svg viewBox="0 0 100 100" className="w-[78%] h-auto max-h-[80%]">
        {/* Loose Toronto/GTA silhouette */}
        <motion.path
          d="M 18 38 L 28 32 L 42 28 L 58 26 L 72 30 L 82 38 L 86 50 L 84 62 L 78 72 L 68 80 L 56 84 L 42 82 L 30 76 L 22 66 L 18 54 Z"
          fill="rgba(59, 130, 246, 0.08)"
          stroke="rgba(96, 165, 250, 0.4)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        {/* Lake Ontario hint */}
        <line x1="18" y1="80" x2="86" y2="84" stroke="#1e3a5f" strokeWidth="0.6" />
        {sites.map((s, i) => (
          <g key={s.label}>
            <motion.circle
              cx={s.x} cy={s.y} r="2"
              fill="rgba(96, 165, 250, 0.2)"
              animate={{ r: [1, 6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: s.delay, ease: "easeOut" }}
            />
            <motion.circle
              cx={s.x} cy={s.y} r="1.4"
              fill="#60a5fa"
              initial={{ scale: 0, y: -5 }}
              animate={{ scale: [0, 1.4, 1], y: [-5, 0, 0] }}
              transition={{ duration: 0.6, delay: s.delay, repeat: Infinity, repeatDelay: 5.4 }}
            />
            <motion.text
              x={s.x + 3} y={s.y + 0.8} fill="#ffffff" fontSize="2.4" fontWeight="500"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, times: [0, 0.1 + i * 0.05, 0.85, 1], repeat: Infinity, delay: s.delay }}
            >{s.label}</motion.text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">04 — Map of Impact</p>
        <p className="text-impact-blue/70 text-[9px] uppercase tracking-[0.2em]">4 sites + national</p>
      </div>
    </div>
  );
};

/* ---------- 5. Future Vision ---------- */
const FutureVisionLoop = () => {
  const priorities = [
    { label: "Self-Sufficiency", angle: -90 },
    { label: "Partnership", angle: -30 },
    { label: "Innovation", angle: 30 },
    { label: "HR", angle: 90 },
    { label: "Technology", angle: 150 },
    { label: "Excellence", angle: 210 },
  ];
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-impact-dark via-[#0a1628] to-impact-dark flex flex-col items-center justify-center overflow-hidden">
      <p className="absolute top-4 left-5 text-impact-blue/80 text-[10px] uppercase tracking-[0.25em] font-medium">Strategic Plan 2022–2027</p>
      <svg viewBox="0 0 200 140" className="w-[88%] h-auto max-h-[80%]">
        <text x="100" y="68" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="700">VISION</text>
        <text x="100" y="76" textAnchor="middle" fill="#60a5fa" fontSize="4">2022 — 2027</text>
        {priorities.map((pri, i) => {
          const rad = (pri.angle * Math.PI) / 180;
          const r = 48;
          const x = 100 + Math.cos(rad) * r;
          const y = 70 + Math.sin(rad) * r * 0.62;
          return (
            <g key={pri.label}>
              <motion.rect
                x={x - 18} y={y - 5} width="36" height="10" rx="1"
                fill="rgba(59, 130, 246, 0.12)"
                stroke="#3b82f6" strokeWidth="0.4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.8] }}
                transition={{ duration: 6, times: [0, 0.15 + i * 0.08, 0.85, 1], repeat: Infinity, ease: "easeOut" }}
              />
              <motion.text
                x={x} y={y + 1.4} textAnchor="middle" fill="#ffffff" fontSize="3.4" fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: 6, times: [0, 0.18 + i * 0.08, 0.25 + i * 0.08, 0.85, 1], repeat: Infinity }}
              >{pri.label}</motion.text>
            </g>
          );
        })}
        <motion.circle
          cx="100" cy="70" r="20"
          fill="none" stroke="#60a5fa" strokeWidth="0.4"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 text-[10px] italic text-center max-w-[80%]">
        "Communities free from the impact of racial and systemic barriers."
      </p>
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">05 — Future Vision</p>
        <p className="text-impact-blue/70 text-[9px] uppercase tracking-[0.2em]">6 priorities</p>
      </div>
    </div>
  );
};

/* ---------- The full grid ---------- */
const TropicanaMotionGraphics = () => {
  const tiles = [
    { Component: TimelineLoop, caption: "Animated 45-year timeline. Locks to narration as the CEO walks through Tropicana's evolution." },
    { Component: NumbersTickerLoop, caption: "Stat ticker built from real Tropicana audited figures. Each number earns its place by tying to the donor ask." },
    { Component: ProgramWheelLoop, caption: "Radial diagram that reveals each of the 8 program areas as the narrator names them." },
    { Component: MapOfImpactLoop, caption: "Geographic reveal of Tropicana's 4 GTA sites, then pulls back to show national SBCCI reach." },
    { Component: FutureVisionLoop, caption: "Closing graphic. The 6 strategic priorities assemble around the vision statement, leading directly into the donor ask." },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tiles.slice(0, 4).map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-sm overflow-hidden border border-impact-dark/10 bg-impact-cream"
          >
            <div className="relative aspect-video w-full">
              <t.Component />
            </div>
            <div className="p-5">
              <p className="text-impact-dark/70 leading-relaxed text-sm">{t.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-sm overflow-hidden border border-impact-dark/10 bg-impact-cream"
      >
        <div className="relative aspect-[16/6] w-full">
          <FutureVisionLoop />
        </div>
        <div className="p-5">
          <p className="text-impact-dark/70 leading-relaxed text-sm">{tiles[4].caption}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TropicanaMotionGraphics;
