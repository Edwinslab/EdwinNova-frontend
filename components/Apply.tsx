"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import Link from "next/link";

const DOMAINS = [
  {
    name: "WildCard",
    href: "/wildcard",
    tag: "01",
    desc: "Build anything — your rules",
    detail: "No domain restrictions. Any problem, any solution.",
  },
  {
    name: "RootCode",
    href: "/rootcode",
    tag: "02",
    desc: "Low-level systems & infra",
    detail: "AgriTech revolution. Hack the field, feed the future.",
  },
  {
    name: "TideHack",
    href: "/tidehack",
    tag: "03",
    desc: "Ride the wave of innovation",
    detail: "Coastal innovation. Build for the ocean, build for the people.",
  },
];

export default function DomainButtons() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 14 + 10,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.25 + 0.05,
      })),
    []
  );

  return (
    <section
      id="domains"
      ref={ref}
      className="relative overflow-hidden flex flex-col items-center justify-center px-6"
      style={{ background: "#0B0F1A", paddingTop: "112px", paddingBottom: "112px" }}
    >

      {/* ── Radial glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(155,233,49,0.05) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "#9BE931",
              opacity: p.opacity,
            }}
            animate={{ y: [0, -60, 0], opacity: [p.opacity, p.opacity * 2.5, p.opacity] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Corner labels ── */}
      <motion.span
        className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.25em]"
        style={{ color: "rgba(155,233,49,0.2)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
      </motion.span>
      <motion.span
        className="absolute top-8 right-8 font-mono text-[10px] tracking-[0.25em]"
        style={{ color: "rgba(155,233,49,0.2)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        APR 3–6
      </motion.span>

      {/* ── Section label ── */}
      <motion.p
        className="font-mono text-xs tracking-[0.35em] uppercase mb-5 relative z-10"
        style={{ color: "#9BE931" }}
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="font-bold mr-2">//</span>
        SELECT DOMAIN
      </motion.p>

      {/* ── Main heading ── */}
      <motion.h2
        className="font-syne font-extrabold text-center relative z-10 mb-4"
        style={{
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: "#E6EDF3",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        Pick Your <span style={{ color: "#9BE931" }}>Battlefield.</span>
      </motion.h2>

      {/* ── Subheading ── */}
      <motion.p
        className="font-body text-center relative z-10 mb-14 max-w-lg"
        style={{ color: "rgba(230,237,243,0.5)", fontSize: "0.95rem", lineHeight: 1.7 }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Three domains. Three real world problems. One chance to build something
        that matters. Choose the arena that fits your vision.
      </motion.p>

      {/* ── Domain cards ── */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-5 relative z-10 w-full max-w-3xl">
        {DOMAINS.map((d, i) => (
          <DomainCard key={d.tag} domain={d} index={i} inView={inView} />
        ))}
      </div>
     
    </section>
  );
}

function DomainCard({
  domain,
  index,
  inView,
}: {
  domain: (typeof DOMAINS)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={domain.href} className="no-underline">
      <motion.div
        className="relative flex flex-col justify-between rounded-xl overflow-visible"
        style={{
          width: 220,
          height: 120,
          padding: "18px 20px 16px",
          background: hovered
            ? "linear-gradient(135deg, rgba(155,233,49,0.15), rgba(155,233,49,0.06))"
            : "rgba(155,233,49,0.04)",
          border: hovered
            ? "1px solid rgba(155,233,49,0.45)"
            : "1px solid rgba(155,233,49,0.12)",
          boxShadow: hovered
            ? "0 8px 32px rgba(155,233,49,0.15), 0 0 24px rgba(155,233,49,0.08), inset 0 1px 0 rgba(155,233,49,0.18)"
            : "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(155,233,49,0.06)",
          cursor: "pointer",
          transition: "background 0.25s, border 0.25s, box-shadow 0.25s",
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        whileHover={{ y: -5 }}
        whileTap={{ y: -1, scale: 0.97 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.span
          className="absolute font-mono text-sm font-medium tracking-wide px-4 py-2 rounded-lg pointer-events-none whitespace-nowrap z-20"
          style={{
            background: hovered ? "#9BE931" : "rgba(155,233,49,0.08)",
            color: hovered ? "#0B0F1A" : "rgba(155,233,49,0.7)",
            border: hovered ? "1px solid #9BE931" : "1px solid rgba(155,233,49,0.12)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            left: "50%",
            x: "-50%",
          }}
          animate={{ top: hovered ? -48 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }}
        >
          Explore Domain
          <span
            className="absolute w-2.5 h-2.5"
            style={{
              background: hovered ? "#9BE931" : "rgba(155,233,49,0.08)",
              borderRight: hovered ? "1px solid #9BE931" : "1px solid rgba(155,233,49,0.12)",
              borderBottom: hovered ? "1px solid #9BE931" : "1px solid rgba(155,233,49,0.12)",
              bottom: -6, left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
            }}
          />
        </motion.span>

        {/* Top row: tag + arrow */}
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[9px] tracking-widest"
            style={{ color: "rgba(155,233,49,0.35)" }}
          >
            {domain.tag}
          </span>
          <motion.span
            className="font-mono text-xs"
            style={{ color: hovered ? "#9BE931" : "rgba(155,233,49,0.2)" }}
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </div>

        {/* Domain name */}
        <span
          className="font-syne font-semibold text-base tracking-wide whitespace-nowrap"
          style={{ color: hovered ? "#9BE931" : "#E6EDF3" }}
        >
          {domain.name}
        </span>

        {/* Description — always visible, brighter on hover */}
        <span
          className="font-body text-[11px] leading-snug"
          style={{
            color: hovered ? "rgba(155,233,49,0.7)" : "rgba(230,237,243,0.35)",
            transition: "color 0.25s",
          }}
        >
          {domain.desc}
        </span>
      </motion.div>
    </Link>
  );
}