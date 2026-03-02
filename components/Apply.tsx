"use client";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";

/* ─── Data ────────────────────────────────────────────────────── */
const reqs = [
  {
    num: "5",
    label: "Members per team",
    detail: "Cross-functional squad",
  },
  {
    num: "1",
    label: "PM / Business Lead",
    detail: "Vision & strategy driver",
  },
  {
    num: "4",
    label: "Devs / Designers",
    detail: "Builders & creators",
  },
  {
    num: "1",
    label: "Startup idea",
    detail: "Problem worth solving",
  },
];

const checklist = [
  "Startup idea + problem statement",
  "Target market analysis",
  "Business model overview",
  "GitHub profiles (tech members)",
  "Resumes for all members",
];

const DEADLINE = new Date("2026-03-15T23:59:59");

/* ─── Countdown Hook ─────────────────────────────────────────── */
function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      mins: Math.floor((diff % 3_600_000) / 60_000),
      secs: Math.floor((diff % 60_000) / 1000),
    };
  }, [target]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return time;
}

/* ─── Floating Particles ─────────────────────────────────────── */
function Particles({ count = 20 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.05,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated counter digit ─────────────────────────────────── */
function CountdownUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className="font-syne font-extrabold text-center relative overflow-hidden rounded-lg"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
            color: "#9BE931",
            background: "rgba(155,233,49,0.04)",
            border: "1px solid rgba(155,233,49,0.12)",
            width: "clamp(56px, 14vw, 84px)",
            height: "clamp(48px, 10vw, 72px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textShadow: "0 0 20px rgba(155,233,49,0.3)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="inline-block"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Glow under the box */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full blur-md"
          style={{
            width: "60%",
            height: 4,
            background: "rgba(155,233,49,0.25)",
          }}
        />
      </div>
      <span
        className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase mt-2"
        style={{ color: "rgba(230,237,243,0.35)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Animated Checklist Item ────────────────────────────────── */
function CheckItem({
  text,
  index,
  inView,
}: {
  text: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: 0.8 + index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      className="flex items-start gap-3 group"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{
          delay: 1.0 + index * 0.1,
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        className="w-5 h-5 rounded-sm flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{
          background: "rgba(155,233,49,0.1)",
          border: "1px solid rgba(155,233,49,0.3)",
        }}
      >
        <motion.svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 1.1 + index * 0.1, duration: 0.3 }}
        >
          <motion.path
            d="M2 5L4.5 7.5L8 3"
            fill="none"
            stroke="#9BE931"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: 1.1 + index * 0.1, duration: 0.4 }}
          />
        </motion.svg>
      </motion.div>
      <span
        className="font-body text-sm leading-relaxed"
        style={{ color: "rgba(230,237,243,0.5)" }}
      >
        {text}
      </span>
    </motion.div>
  );
}

/* ─── Stagger variants ───────────────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN APPLY SECTION                                           */
/* ═══════════════════════════════════════════════════════════════ */
export default function Apply() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const countdown = useCountdown(DEADLINE);

  /* Scroll parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
  });
  const bgY = useTransform(smoothProgress, [0, 1], [60, -60]);
  const lineScale = useTransform(smoothProgress, [0.1, 0.5], [0, 1]);

  /* CTA hover */
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section
      id="apply"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#111620", padding: "120px 5% 100px" }}
    >
      {/* ── Background layers ── */}
      <Particles count={25} />

      {/* Large radial glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute"
          style={{
            width: "120%",
            height: "120%",
            top: "-10%",
            left: "-10%",
            background:
              "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(155,233,49,0.06) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Animated horizontal accent line */}
      <motion.div
        style={{ scaleX: lineScale, transformOrigin: "center" }}
        className="absolute top-0 left-[10%] right-[10%] h-px z-10"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(155,233,49,0.3), transparent)",
          }}
        />
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.2 } : {}}
        transition={{ delay: 0.5 }}
        className="absolute top-8 left-8 font-mono text-xs"
        style={{ color: "#9BE931" }}
      >
        {"// APPLY"}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.2 } : {}}
        transition={{ delay: 0.6 }}
        className="absolute top-8 right-8 font-mono text-xs"
        style={{ color: "#9BE931" }}
      >
        EDWINNOVA_2026
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* ── Section header ── */}
        <motion.div variants={fadeUp} className="text-center mb-6">
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: "#9BE931" }}
          >
            {"// Apply Now"}
          </p>

          <h2
            className="font-syne font-extrabold leading-none mb-3"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="text-white">READY TO </span>
            <motion.span
              style={{ color: "#9BE931" }}
              animate={{
                textShadow: [
                  "0 0 10px rgba(155,233,49,0.3)",
                  "0 0 30px rgba(155,233,49,0.5)",
                  "0 0 10px rgba(155,233,49,0.3)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              LAUNCH
            </motion.span>
          </h2>

          <h2
            className="font-syne font-extrabold leading-none mb-8"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.02em",
              WebkitTextStroke: "2px rgba(230,237,243,0.2)",
              color: "transparent",
            }}
          >
            YOUR STARTUP?
          </h2>
        </motion.div>

        {/* ── Countdown timer ── */}
        <motion.div variants={fadeUp} className="mb-10">
          <p
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-center mb-4"
            style={{ color: "rgba(230,237,243,0.3)" }}
          >
            Applications close in
          </p>
          <div className="flex items-center justify-center gap-3 md:gap-5">
            <CountdownUnit value={countdown.days} label="Days" />
            <span
              className="font-syne font-bold text-xl md:text-2xl -mt-4"
              style={{ color: "rgba(155,233,49,0.3)" }}
            >
              :
            </span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span
              className="font-syne font-bold text-xl md:text-2xl -mt-4"
              style={{ color: "rgba(155,233,49,0.3)" }}
            >
              :
            </span>
            <CountdownUnit value={countdown.mins} label="Mins" />
            <span
              className="font-syne font-bold text-xl md:text-2xl -mt-4"
              style={{ color: "rgba(155,233,49,0.3)" }}
            >
              :
            </span>
            <CountdownUnit value={countdown.secs} label="Secs" />
          </div>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={fadeUp}
          className="font-body text-base leading-relaxed text-center max-w-xl mx-auto mb-10"
          style={{ color: "rgba(230,237,243,0.5)" }}
        >
          Submit your startup idea and team details. 24 teams will be selected
          across 3 innovation domains. Make your mark before the clock runs out.
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div variants={fadeUp} className="flex justify-center mb-16">
          <motion.a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-mono font-bold text-sm tracking-[0.15em] px-12 py-5 rounded-sm no-underline overflow-hidden block"
            style={{ background: "#9BE931", color: "#0B0F1A" }}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            whileHover={{
              scale: 1.04,
              y: -3,
              boxShadow:
                "0 0 50px rgba(155,233,49,0.35), 0 0 100px rgba(155,233,49,0.1), 0 20px 40px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
              }}
              animate={ctaHovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
              transition={
                ctaHovered
                  ? { duration: 0.7, ease: "easeInOut" }
                  : { duration: 0 }
              }
            />

            <span className="relative z-10 flex items-center gap-3">
              APPLY NOW
              <motion.span
                animate={ctaHovered ? { x: [0, 5, 0] } : { x: 0 }}
                transition={
                  ctaHovered
                    ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                    : {}
                }
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </motion.div>

        {/* ── Team Requirements Cards ── */}
        <motion.div variants={fadeUp}>
          <p
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-center mb-6"
            style={{ color: "#9BE931" }}
          >
            {"// Team Requirements"}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {reqs.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  delay: 0.4 + i * 0.12,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                className="group relative rounded-xl p-5 text-center overflow-hidden cursor-default"
                style={{
                  background: "rgba(22,28,42,0.7)",
                  border: "1px solid rgba(155,233,49,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(155,233,49,0.08) 0%, transparent 70%)",
                  }}
                />

                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-[20%] right-[20%] h-[2px] rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #9BE931, transparent)",
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  {/* <motion.span
                    className="text-2xl block mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {r.icon}
                  </motion.span> */}

                  {/* Number */}
                  <motion.div
                    className="font-syne font-extrabold leading-none mb-1"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      color: "#9BE931",
                      textShadow: "0 0 15px rgba(155,233,49,0.2)",
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.5 + i * 0.12,
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                    }}
                  >
                    {r.num}
                  </motion.div>

                  {/* Label */}
                  <div
                    className="font-body text-xs mb-1"
                    style={{ color: "rgba(230,237,243,0.5)" }}
                  >
                    {r.label}
                  </div>

                  {/* Detail (appears on hover) */}
                  <div
                    className="font-mono text-[9px] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "rgba(155,233,49,0.5)" }}
                  >
                    {r.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Application Checklist ── */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: "rgba(22,28,42,0.5)",
            border: "1px solid rgba(155,233,49,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Subtle scanline texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(155,233,49,0.3) 3px, rgba(155,233,49,0.3) 4px)",
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#9BE931",
                  boxShadow: "0 0 8px rgba(155,233,49,0.5)",
                }}
              />
              <p
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "#9BE931" }}
              >
                {"Application must include"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checklist.map((item, i) => (
                <CheckItem key={i} text={item} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom subtle CTA reminder ── */}
        <motion.div
          variants={fadeUp}
          className="mt-10 text-center"
        >
          <motion.p
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(230,237,243,0.2)" }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            24 spots only — don&apos;t wait
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}