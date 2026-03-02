"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    day: "APR 2 — DAY 0",
    title: "Arrival & Networking",
    desc: "Teams arrive, check into college accommodation. Informal networking with fellow entrepreneurs from across colleges.",
    side: "left",
  },
  {
    day: "APR 3 — DAY 1",
    title: "Discovery & Planning",
    desc: "Meet your investor-mentor. Present your idea, gather real feedback, refine your strategy. Deliverable: comprehensive product plan and development roadmap.",
    side: "right",
  },
  {
    day: "APR 4 — DAY 2",
    title: "Execution Sprint I",
    desc: "First 16-hour build cycle begins. Teams execute under watchful evaluators. First checkpoint assessment determines early standings.",
    side: "left",
  },
  {
    day: "APR 5 — DAY 3",
    title: "Sprint II + Finalist Selection",
    desc: "Second and third cycles. Based on cumulative performance, top 4 teams per domain (12 total) advance to the Shark Tank finals.",
    side: "right",
  },
  {
    day: "APR 6 — DAY 4",
    title: "🦈 Shark Tank Finals",
    desc: "Top 12 teams pitch to the investor panel. Live demos, business model, Q&A. Prizes announced. Investment discussions begin.",
    side: "left",
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="timeline"
      ref={ref}
      style={{ background: "#0B0F1A", padding: "112px 5%" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#9BE931" }}
          >
            // Event Schedule
          </p>
          <h2
            className="font-syne font-extrabold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            4 Days. <span style={{ color: "#9BE931" }}>6 Stages.</span> 1 Shot.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(155,233,49,0.25), transparent)",
            }}
          />

          <div className="flex flex-col gap-12">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                className="relative grid md:grid-cols-[1fr_60px_1fr] items-start gap-0"
              >
                {ev.side === "left" ? (
                  <>
                    <div className="md:text-right md:pr-10 pl-8 md:pl-0">
                      <p
                        className="font-mono text-[10px] tracking-widest mb-1.5"
                        style={{ color: "#9BE931" }}
                      >
                        {ev.day}
                      </p>
                      <h3 className="font-syne font-bold text-lg mb-2 text-light">
                        {ev.title}
                      </h3>
                      <p
                        className="font-body text-sm leading-relaxed"
                        style={{ color: "rgba(230,237,243,0.45)" }}
                      >
                        {ev.desc}
                      </p>
                    </div>
                    <div className="hidden md:flex justify-center pt-1.5 z-10">
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0"
                        style={{
                          background: "#0B0F1A",
                          borderColor: "#9BE931",
                          boxShadow: "0 0 12px rgba(155,233,49,0.4)",
                        }}
                      />
                    </div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <div className="hidden md:flex justify-center pt-1.5 z-10">
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0"
                        style={{
                          background: "#0B0F1A",
                          borderColor: "#9BE931",
                          boxShadow: "0 0 12px rgba(155,233,49,0.4)",
                        }}
                      />
                    </div>
                    <div className="md:pl-10 pl-8">
                      <p
                        className="font-mono text-[10px] tracking-widest mb-1.5"
                        style={{ color: "#9BE931" }}
                      >
                        {ev.day}
                      </p>
                      <h3 className="font-syne font-bold text-lg mb-2 text-light">
                        {ev.title}
                      </h3>
                      <p
                        className="font-body text-sm leading-relaxed"
                        style={{ color: "rgba(230,237,243,0.45)" }}
                      >
                        {ev.desc}
                      </p>
                    </div>
                  </>
                )}

                {/* Mobile dot */}
                <div
                  className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 md:hidden"
                  style={{
                    borderColor: "#9BE931",
                    background: "#0B0F1A",
                    boxShadow: "0 0 10px rgba(155,233,49,0.4)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
