"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
    desc: "Top  teams pitch to investors. Live demo, market opportunity, business model, Q&A. Only finalists are eligible for investment.",
  },
];

export default function Stages() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 6 panels = 600vw. End position is -500vw which is -(500/600) * 100% = -83.3333%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.3333%"]);

  return (
    <section 
      id="stages" 
      ref={targetRef} 
      className="relative" 
      style={{ height: "600vh", background: "#111620" }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden" style={{ background: "#111620" }}>
        
        {/* Sticky Header */}
        <div className="absolute top-16 md:top-24 left-6 md:left-16 lg:left-24 z-10 pointer-events-none">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#9BE931" }}>
            // Competition Format
          </p>
          <h2 className="font-syne font-extrabold leading-tight text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
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
                  {/* Huge background number */}
                  <div 
                    className="font-syne font-extrabold leading-none select-none pointer-events-none absolute -left-10 lg:-left-20 top-1/2 -translate-y-1/2" 
                    style={{ fontSize: "clamp(12rem, 25vw, 25rem)", color: "rgba(155,233,49,0.05)", zIndex: 0 }}
                  >
                    {s.num}
                  </div>
                  
                  {/* Title and Day over the number */}
                  <div className="relative z-10 pl-6 md:pl-10 lg:pl-16 border-l-2 border-[#9BE931] py-4">
                    <span
                      className="inline-block font-mono text-[10px] md:text-sm tracking-widest px-4 py-2 rounded-full mb-6"
                      style={{ background: "rgba(155,233,49,0.08)", border: "1px solid rgba(155,233,49,0.2)", color: "#9BE931" }}
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
                    <p className="font-body text-xl md:text-2xl lg:text-3xl leading-relaxed" style={{ color: "rgba(230,237,243,0.85)" }}>
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
