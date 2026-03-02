"use client";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const cards = [
  {
    icon: "🎯",
    title: "Students Win",
    desc: "Real funding opportunities, hands-on mentorship from active investors, and incubation space for your venture.",
    accent: "rgba(155,233,49,0.15)",
    highlight: "#9BE931",
  },
  {
    icon: "💼",
    title: "Investors Win",
    desc: "Curated deal flow from vetted teams. Watch execution firsthand before committing a single rupee.",
    accent: "rgba(155,233,49,0.12)",
    highlight: "#9BE931",
  },
  // {
  //   icon: "🏛️",
  //   title: "College Wins",
  //   desc: "Establishes Alvas as a premier startup hub with equity-backed sustainability model for future editions.",
  //   accent: "rgba(155,233,49,0.10)",
  //   highlight: "#9BE931",
  // },
];

/* ── Animated number ───────────────────────────────────────────── */
function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
      className="font-syne font-extrabold inline-block"
      style={{ color: "#9BE931", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
    >
      {value}
    </motion.span>
  );
}

/* ── Carousel dot indicator ────────────────────────────────────── */
function CarouselDots({
  total,
  active,
  onSelect,
}: {
  total: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="relative p-1 cursor-pointer"
          aria-label={`Go to card ${i + 1}`}
        >
          <div
            className="rounded-full transition-all duration-500"
            style={{
              width: i === active ? 28 : 8,
              height: 8,
              background:
                i === active ? "#9BE931" : "rgba(155,233,49,0.2)",
              boxShadow:
                i === active ? "0 0 12px rgba(155,233,49,0.5)" : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}

/* ── Progress bar for auto-rotate timer ────────────────────────── */
function AutoPlayProgress({
  isActive,
  duration,
}: {
  isActive: boolean;
  duration: number;
}) {
  return (
    <div
      className="h-[2px] rounded-full overflow-hidden"
      style={{ width: 60, background: "rgba(155,233,49,0.1)" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: "#9BE931", originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={
          isActive
            ? { duration: duration / 1000, ease: "linear" }
            : { duration: 0.2 }
        }
      />
    </div>
  );
}

// Framer motion variants for stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

/* ── Slide animation variants ─────────────────────────────────── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? 8 : -8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 26,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? -8 : 8,
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
  }),
};

/* ── Background card (peek) ───────────────────────────────────── */
function PeekCard({
  card,
  side,
  onClick,
}: {
  card: (typeof cards)[0];
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-1/2 -translate-y-1/2 hidden lg:block cursor-pointer"
      style={{
        [side]: -24,
        width: 60,
        zIndex: 1,
      }}
      whileHover={{
        scale: 1.05,
        x: side === "left" ? 6 : -6,
      }}
    >
      <div
        className="rounded-xl p-3 flex items-center justify-center backdrop-blur-md"
        style={{
          background: "rgba(22,28,42,0.8)",
          border: "1px solid rgba(155,233,49,0.15)",
          height: 80,
          boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
        }}
      >
        <span className="text-xl">{card.icon}</span>
      </div>
    </motion.div>
  );
}

/* ── Main About Section ────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const textRef = useRef(null);

  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });
  const textInView = useInView(textRef, { once: true, margin: "-50px" });

  /* ── Auto-rotating card state ── */
  const [activeCard, setActiveCard] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const AUTO_PLAY_INTERVAL = 4000;

  const goToCard = useCallback(
    (index: number) => {
      setDirection(index > activeCard ? 1 : -1);
      setActiveCard(index);
      setProgressKey((k) => k + 1);
    },
    [activeCard]
  );

  const nextCard = useCallback(() => {
    setDirection(1);
    setActiveCard((prev) => (prev + 1) % cards.length);
    setProgressKey((k) => k + 1);
  }, []);

  const prevCard = useCallback(() => {
    setDirection(-1);
    setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);
    setProgressKey((k) => k + 1);
  }, []);

  /* Auto-play timer */
  useEffect(() => {
    if (isPaused || !cardsInView) return;
    const timer = setInterval(nextCard, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, cardsInView, nextCard]);

  /* ── Scroll-driven parallax ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
  });

  const bgY = useTransform(smoothProgress, [0, 1], [100, -100]);
  const lineWidth = useTransform(smoothProgress, [0.1, 0.4], ["0%", "100%"]);
  const glowOpacity = useTransform(
    smoothProgress,
    [0.2, 0.5, 0.8],
    [0.1, 0.4, 0.1]
  );

  /* Prev / next peek indices */
  const prevIndex = (activeCard - 1 + cards.length) % cards.length;
  const nextIndex = (activeCard + 1) % cards.length;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "#111620", padding: "112px 5%" }}
    >
      {/* ── Background decorative elements ── */}
      <motion.div
        style={{ y: bgY, opacity: glowOpacity }}
        className="absolute pointer-events-none z-0"
      >
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(155,233,49,0.08) 0%, transparent 60%)",
            top: -200,
            left: -300,
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(155,233,49,0.05) 0%, transparent 70%)",
            bottom: -100,
            right: -200,
          }}
        />
      </motion.div>

      {/* Animated horizontal line at top */}
      <motion.div
        style={{ width: lineWidth }}
        className="absolute top-0 left-0 h-px z-10"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(155,233,49,0.4), transparent)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10">
        {/* ── Left: Text Content ── */}
        <motion.div
          ref={textRef}
          variants={containerVariants}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <p
              className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "#9BE931" }}
            >
              {"// About the Event"}
            </p>

            <h2
              className="font-syne font-extrabold leading-tight mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              <span className="block text-white">Not just a hackathon.</span>
              <span className="block" style={{ color: "#9BE931" }}>
                A launchpad.
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-body leading-relaxed mb-4"
            style={{ color: "rgba(230,237,243,0.6)", fontSize: "0.95rem" }}
          >
            EDWINNOVA is a 4-day startup hackathon that bridges the gap between
            student entrepreneurs and real investors. Unlike traditional
            hackathons, we connect pre-vetted startup ideas with potential
            investors who serve as stakeholders, mentors, and potential funders.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-body leading-relaxed mb-8"
            style={{ color: "rgba(230,237,243,0.6)", fontSize: "0.95rem" }}
          >
            By selecting  top startup ideas and inviting investors to sponsor
            the event in exchange for first access, we create a win-win
            ecosystem where everyone has genuine skin in the game.
          </motion.p>

          {/* ── Animated Stats Row ── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 py-6"
            style={{
              borderTop: "1px solid rgba(155,233,49,0.15)",
              borderBottom: "1px solid rgba(155,233,49,0.15)",
            }}
          >
            {[
              { val: "₹1L +", label: "Prize Pool" },
              { val: "3", label: "Domains" },
              { val: "48h", label: "Build Sprint" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.4 + i * 0.15,
                  duration: 0.5,
                  type: "spring",
                }}
                className="text-center"
              >
                <AnimatedNumber value={stat.val} inView={inView} />
                <div
                  className="font-mono text-[10px] tracking-widest mt-1"
                  style={{ color: "rgba(230,237,243,0.4)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Auto-rotating Cards Carousel ── */}
        <div ref={cardsRef} className="flex flex-col items-center gap-6">
          {/* Card carousel container */}
          <div
            className="relative w-full"
            style={{ minHeight: 280, perspective: 1200 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Peek cards on sides (desktop) */}
            <PeekCard card={cards[prevIndex]} side="left" onClick={prevCard} />
            <PeekCard card={cards[nextIndex]} side="right" onClick={nextCard} />

            {/* Main animated card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeCard}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full"
              >
                <div
                  className="rounded-2xl p-8 md:p-10 relative overflow-hidden group cursor-default"
                  style={{
                    background: "rgba(22, 28, 42, 0.7)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(155,233,49,0.18)",
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(155,233,49,0.08)",
                  }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      background: [
                        "radial-gradient(ellipse at 20% 50%, rgba(155,233,49,0.04) 0%, transparent 60%)",
                        "radial-gradient(ellipse at 80% 50%, rgba(155,233,49,0.06) 0%, transparent 60%)",
                        "radial-gradient(ellipse at 20% 50%, rgba(155,233,49,0.04) 0%, transparent 60%)",
                      ],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Green accent line on left */}
                  <motion.div
                    className="absolute left-0 top-0 w-[3px] rounded-full"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "100%", opacity: 1 }}
                    transition={{ duration: 0.6, ease: "circOut", delay: 0.15 }}
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, #9BE931, transparent)",
                      boxShadow: "0 0 12px rgba(155,233,49,0.6)",
                    }}
                  />

                  {/* Card number */}
                  <motion.span
                    className="absolute top-6 right-8 font-syne font-extrabold pointer-events-none select-none"
                    style={{
                      fontSize: "clamp(4rem, 8vw, 7rem)",
                      color: "rgba(155,233,49,0.04)",
                      lineHeight: 1,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {String(activeCard + 1).padStart(2, "0")}
                  </motion.span>

                  {/* Card content */}
                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 relative"
                      style={{
                        background: cards[activeCard].accent,
                        border: "1px solid rgba(155,233,49,0.25)",
                        boxShadow: "0 0 20px rgba(155,233,49,0.1)",
                      }}
                      initial={{ rotate: -15, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                      }}
                    >
                      {cards[activeCard].icon}
                    </motion.div>

                    <motion.h3
                      className="font-syne font-bold text-2xl md:text-3xl mb-4 text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                    >
                      {cards[activeCard].title}
                    </motion.h3>

                    <motion.p
                      className="font-body text-base md:text-lg leading-relaxed max-w-lg"
                      style={{ color: "rgba(230,237,243,0.6)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                    >
                      {cards[activeCard].desc}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Controls: Dots + Arrows + Progress ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-5"
          >
            {/* Prev arrow */}
            <motion.button
              onClick={prevCard}
              whileHover={{ scale: 1.15, x: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{
                background: "rgba(155,233,49,0.06)",
                border: "1px solid rgba(155,233,49,0.2)",
                color: "#9BE931",
              }}
              aria-label="Previous card"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 12L6 8l4-4" />
              </svg>
            </motion.button>

            {/* Dots */}
            <CarouselDots
              total={cards.length}
              active={activeCard}
              onSelect={(i) => goToCard(i)}
            />

            {/* Progress */}
            <AutoPlayProgress
              key={progressKey}
              isActive={!isPaused && cardsInView}
              duration={AUTO_PLAY_INTERVAL}
            />

            {/* Next arrow */}
            <motion.button
              onClick={nextCard}
              whileHover={{ scale: 1.15, x: 2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{
                background: "rgba(155,233,49,0.06)",
                border: "1px solid rgba(155,233,49,0.2)",
                color: "#9BE931",
              }}
              aria-label="Next card"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 4l4 4-4 4" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Pause hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={cardsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "rgba(230,237,243,0.25)" }}
          >
            {isPaused ? "PAUSED — HOVER TO BROWSE" : "AUTO-PLAYING"}
          </motion.p>
        </div>
      </div>
    </section>
  );
}