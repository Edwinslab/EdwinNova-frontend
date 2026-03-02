"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const prizes = [
  // {
  //   pos: "PER DOMAIN · 2ND PLACE",
  //   amount: "₹10K",
  //   sub: "× 3 domains = ₹30,000",
  //   note: "Awarded by independent judges based on overall performance in your innovation domain.",
  //   featured: false,
  // },
  // {
  //   pos: "PER DOMAIN · 1ST PLACE",
  //   amount: "₹25K",
  //   sub: "× 3 domains = ₹75,000",
  //   note: "Top team in each domain. Plus eligible for investor funding discussions after finals.",
  //   featured: true,
  // },
  {
    pos: "BONUS OPPORTUNITY",
    amount: "💰",
    sub: "Investor Funding",
    note: "All  finalists can attract investment from sponsor-investors, independent of prize results.",
    featured: false,
  },
];

export default function Prizes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="prizes"
      ref={ref}
      className="relative z-10"
      style={{ padding: "112px 5%" }}
    >
      <div className="max-w-5xl mx-auto relative z-20 drop-shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#9BE931", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            // Prize Structure
          </p>
          <h2
            className="font-syne font-extrabold leading-tight text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
          >
            Win Big. <span style={{ color: "#9BE931" }}>Get Funded.</span>
          </h2>
          <p
            className="font-body text-sm mt-4 max-w-md mx-auto"
            style={{ color: "rgba(230,237,243,0.8)", lineHeight: 1.75, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            Prizes are awarded per innovation domain. Investment opportunities
            are completely separate and available to all 12 finalists.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-6 mb-10">
          {prizes.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
              className="rounded-2xl w-96 p-8 text-center relative overflow-hidden transition-all duration-350 backdrop-blur-md"
              style={{
                background: p.featured
                  ? "linear-gradient(135deg, rgba(22, 28, 42, 0.9) 0%, rgba(155,233,49,0.15) 100%)"
                  : "rgba(22, 28, 42, 0.8)",
                border: p.featured
                  ? "1px solid #9BE931"
                  : "1px solid rgba(155,233,49,0.15)",
                transform: p.featured ? "scale(1.04)" : "none",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = p.featured
                  ? "scale(1.04) translateY(-6px)"
                  : "translateY(-6px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = p.featured
                  ? "scale(1.04)"
                  : "none";
              }}
            >
              <div className="relative z-10">
                {p.featured && (
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(155,233,49,0.15) 0%, transparent 70%)",
                    }}
                  />
                )}
                <p
                  className="font-mono text-[10px] tracking-widest mb-3"
                  style={{ color: "rgba(230,237,243,0.6)" }}
                >
                  {p.pos}
                </p>
                <div
                  className="font-syne font-extrabold leading-none mb-2"
                  style={{ fontSize: "2.8rem", color: p.featured ? "#9BE931" : "#ffffff", textShadow: p.featured ? "0 0 15px rgba(155,233,49,0.4)" : "none" }}
                >
                  {p.amount}
                </div>
                <p
                  className="font-mono text-xs mb-5 uppercase"
                  style={{ color: p.featured ? "#9BE931" : "rgba(230,237,243,0.7)" }}
                >
                  {p.sub}
                </p>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(230,237,243,0.8)" }}
                >
                  {p.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="rounded-xl p-7 text-center max-w-sm mx-auto relative overflow-hidden backdrop-blur-md drop-shadow-2xl"
          style={{ 
            background: "rgba(155, 233, 49, 0.95)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(155,233,49,0.3)" 
          }}
        >
          <div className="relative z-10">
            <p
              className="font-mono text-xs tracking-widest opacity-80 mb-1 font-bold"
              style={{ color: "#0B0F1A" }}
            >
              TOTAL PRIZE POOL
            </p>
            <div
              className="font-syne font-extrabold text-4xl leading-none mt-2"
              style={{ color: "#0B0F1A" }}
            >
              ₹1,00,000 +
            </div>
            <p
              className="font-body text-xs mt-3 font-medium opacity-80"
              style={{ color: "#0B0F1A" }}
            >
              Across 3 domains · 6 winning teams
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
