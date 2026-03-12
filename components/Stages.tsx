"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stages = [
  {
    num: "01",
    day: "DAY 1 MORNING",
    title: "Investor Discovery",
    desc: "PM/Business Lead presents the startup idea to your assigned investor-stakeholder. Get honest feedback on market viability and investment potential.",
  },
  {
    num: "02",
    day: "DAY 1 AFTERNOON",
    title: "Requirements & Strategy",
    desc: "Deep dialogue with your investor-stakeholder. Document refined strategy, competitive positioning, and create a detailed execution roadmap.",
  },
  {
    num: "03",
    day: "DAY 2",
    title: "Sprint I — Build",
    desc: "First 16-hour cycle. Ship working software. Incremental value delivery is rewarded. Checkpoint evaluation at the end of the cycle.",
  },
  {
    num: "04",
    day: "DAY 3 MORNING",
    title: "Sprint II — Iterate",
    desc: "Second cycle. Incorporate feedback. Push your prototype further. Demonstrate resilience and quality under pressure.",
  },
  {
    num: "05",
    day: "DAY 3 EVENING",
    title: "Sprint III & Selection",
    desc: "Final build cycle + finalist selection. Top performing teams in every domain. Cumulative performance determines who makes the cut.",
  },
  {
    num: "06",
    day: "DAY 4 — FINALS",
    title: "Shark Tank Pitch",
    desc: "Top teams pitch to investors. Live demo, market opportunity, business model, Q&A. Only finalists are eligible for investment.",
  },
];

/* ── Mobile Card Component ── */
function MobileStageCard({
  stage,
  index,
  activeIndex,
}: {
  stage: typeof stages[0];
  index: number;
  activeIndex: number;
}) {
  const isActive = index === activeIndex;

  return (
    <div
      className="flex-shrink-0 w-[85vw] snap-center transition-all duration-500"
      style={{
        scrollSnapAlign: "center",
        opacity: isActive ? 1 : 0.5,
        transform: isActive ? "scale(1)" : "scale(0.96)",
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden p-6 pb-8 transition-all duration-500"
        style={{
          background: "rgba(22, 28, 42, 0.7)",
          backdropFilter: "blur(12px)",
          border: isActive
            ? "1px solid rgba(155,233,49,0.2)"
            : "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Background number watermark */}
        <div
          className="absolute -right-4 -top-6 font-syne font-extrabold leading-none select-none pointer-events-none"
          style={{ fontSize: "8rem", color: "rgba(155,233,49,0.06)", zIndex: 0 }}
        >
          {stage.num}
        </div>

        <div className="relative z-10">
          {/* Day pill */}
          <span
            className="inline-block font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(155,233,49,0.08)",
              border: "1px solid rgba(155,233,49,0.2)",
              color: "#9BE931",
            }}
          >
            {stage.day}
          </span>

          {/* Title */}
          <h3 className="font-syne font-bold text-2xl text-white leading-tight mb-4">
            {stage.title}
          </h3>

          {/* Green accent line */}
          <div className="w-10 h-[2px] mb-4" style={{ background: "#9BE931" }} />

          {/* Description */}
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "rgba(230,237,243,0.75)" }}
          >
            {stage.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile Swipeable Section with Auto-Scroll ── */
function MobileStages() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const AUTO_SCROLL_INTERVAL = 3000; // scroll every 3 seconds
  const RESUME_DELAY = 4000; // resume 4s after user stops touching

  /* Scroll to a specific card index */
  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth * 0.85; // 85vw
    const gap = 16; // gap-4 = 1rem = 16px
    const targetScroll = index * (cardWidth + gap);

    container.scrollTo({ left: targetScroll, behavior: "smooth" });
    setActiveIndex(index);
  };

  /* Start auto-scrolling */
  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollTimer.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev >= stages.length - 1 ? 0 : prev + 1;
        scrollToCard(next);
        return next;
      });
    }, AUTO_SCROLL_INTERVAL);
  };

  /* Stop auto-scrolling */
  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  /* Pause on touch, resume after delay */
  const handleTouchStart = () => {
    setIsTouching(true);
    stopAutoScroll();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      startAutoScroll();
    }, RESUME_DELAY);
  };

  /* Track which card is visible during manual scroll */
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.85 + 16;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, stages.length - 1));
  };

  /* Initialize auto-scroll on mount */
  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="stages-mobile"
      className="block md:hidden py-20 px-0"
      style={{ background: "#111620" }}
    >
      {/* Header */}
      <div className="px-6 mb-10">
        <p
          className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#9BE931" }}
        >
          // Competition Format
        </p>
        <h2
          className="font-syne font-extrabold leading-tight text-white"
          style={{ fontSize: "clamp(1.75rem, 6vw, 2.5rem)" }}
        >
          6 Stages of <span style={{ color: "#9BE931" }}>Innovation</span>
        </h2>
        <p className="font-body text-sm mt-3" style={{ color: "rgba(230,237,243,0.45)" }}>
          {isTouching ? "Release to resume auto-scroll" : "Auto-scrolling · Touch to pause"}
        </p>
      </div>

      {/* Horizontally scrollable card strip */}
      <div
        ref={scrollRef}
        className="mobile-stage-scroll flex gap-4 overflow-x-auto px-6 pb-4"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleTouchStart}
        onMouseLeave={handleTouchEnd}
        onScroll={handleScroll}
      >
        <style>{`
          .mobile-stage-scroll::-webkit-scrollbar { display: none; }
        `}</style>
        {stages.map((s, i) => (
          <MobileStageCard key={i} stage={s} index={i} activeIndex={activeIndex} />
        ))}
        {/* Right padding spacer so last card can snap to center */}
        <div className="flex-shrink-0 w-[7.5vw]" />
      </div>

      {/* Dot indicators (tappable) */}
      <div className="flex justify-center gap-2 mt-6 px-6">
        {stages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              scrollToCard(i);
              stopAutoScroll();
              if (resumeTimer.current) clearTimeout(resumeTimer.current);
              resumeTimer.current = setTimeout(() => startAutoScroll(), RESUME_DELAY);
            }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === activeIndex ? "24px" : "8px",
              height: "8px",
              background: i === activeIndex ? "#9BE931" : "rgba(155,233,49,0.2)",
            }}
            aria-label={`Go to stage ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Desktop Scroll-Hijack Section (unchanged logic) ── */
function DesktopStages() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.3333%"]);

  return (
    <section
      id="stages-desktop"
      ref={targetRef}
      className="relative hidden md:block"
      style={{ height: "600vh", background: "#111620" }}
    >
      <div
        className="sticky top-0 flex h-screen items-center overflow-hidden"
        style={{ background: "#111620" }}
      >
        {/* Sticky Header */}
        <div className="absolute top-16 md:top-24 left-6 md:left-16 lg:left-24 z-10 pointer-events-none">
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#9BE931" }}
          >
            // Competition Format
          </p>
          <h2
            className="font-syne font-extrabold leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            6 Stages of <span style={{ color: "#9BE931" }}>Innovation</span>
          </h2>
        </div>

        <motion.div
          style={{ x, display: "flex", width: "600vw", willChange: "transform" }}
          className="h-full items-center"
        >
          {stages.map((s, i) => (
            <div
              key={i}
              className="w-[100vw] h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative shrink-0"
            >
              <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 mt-32 md:mt-24">
                {/* Visual Left - Number and Title */}
                <div className="w-full md:w-1/2 relative flex items-center">
                  <div
                    className="font-syne font-extrabold leading-none select-none pointer-events-none absolute -left-10 lg:-left-20 top-1/2 -translate-y-1/2"
                    style={{
                      fontSize: "clamp(12rem, 25vw, 25rem)",
                      color: "rgba(155,233,49,0.05)",
                      zIndex: 0,
                    }}
                  >
                    {s.num}
                  </div>

                  <div className="relative z-10 pl-6 md:pl-10 lg:pl-16 border-l-2 border-[#9BE931] py-4">
                    <span
                      className="inline-block font-mono text-[10px] md:text-sm tracking-widest px-4 py-2 rounded-full mb-6"
                      style={{
                        background: "rgba(155,233,49,0.08)",
                        border: "1px solid rgba(155,233,49,0.2)",
                        color: "#9BE931",
                      }}
                    >
                      {s.day}
                    </span>
                    <h3 className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Text Right - Description */}
                <div className="w-full md:w-1/2 flex items-center relative z-10">
                  <div
                    className="p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-white/5"
                    style={{ background: "rgba(22, 28, 42, 0.6)" }}
                  >
                    <p
                      className="font-body text-xl md:text-2xl lg:text-3xl leading-relaxed"
                      style={{ color: "rgba(230,237,243,0.85)" }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Export ── */
export default function Stages() {
  return (
    <div id="stages">
      <MobileStages />
      <DesktopStages />
    </div>
  );
}