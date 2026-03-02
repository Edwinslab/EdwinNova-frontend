"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroScene from "./HeroScene";

function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date("2026-04-03T09:00:00");
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ d, h, m, s });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-3">
      {[
        { val: pad(time.d), label: "DAYS" },
        { val: pad(time.h), label: "HRS" },
        { val: pad(time.m), label: "MIN" },
        { val: pad(time.s), label: "SEC" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="text-center">
            <span className="font-syne font-extrabold text-3xl text-light block leading-none">
              {item.val}
            </span>
            <span
              className="font-mono text-[9px] tracking-widest mt-1 block"
              style={{ color: "rgba(230,237,243,0.35)" }}
            >
              {item.label}
            </span>
          </div>
          {i < 3 && (
            <span
              className="font-syne font-bold text-2xl leading-none"
              style={{ color: "rgba(155,233,49,0.4)" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const stats = [
  // { num: "24", label: "Startup Teams" },
  // { num: "120", label: "Entrepreneurs" },
  { num: "4", label: "Days" },
  { num: "3", label: "Domains" },
];

export default function Hero() {
  const ref = useRef<HTMLTableSectionElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as any,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      id="hero"
      ref={ref as any}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ padding: "100px 5% 80px" }}
    >
      <HeroScene />
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(155,233,49,0.05) 0%, transparent 70%)",
          top: "50%",
          left: "20%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className="block w-8 h-px"
              style={{ background: "#9BE931" }}
            />
            <span
              className="font-mono text-xs tracking-[0.25em] uppercase"
              style={{ color: "#9BE931" }}
            >
              Apr 3–6, 2026 · Alvas Institute of Engineering and Technology, Moodbidri
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="font-syne font-extrabold leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            THE <span style={{ color: "#9BE931" }}>HACKATHON</span>
            <br />
            {/* <span
              style={{
                WebkitTextStroke: "2px rgba(230,237,243,0.8)",
                color: "transparent",
              }}
            >
              HACKATHON
            </span> */}
            {/* <br /> */}
            THAT <span >FUNDS</span> YOU <span
              style={{
                WebkitTextStroke: "2px rgba(230,237,243,0.8)",
                color: "transparent",
              }}
            >
              IDEAS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-body text-base leading-relaxed mb-10 max-w-lg"
            style={{ color: "rgba(230,237,243,0.55)" }}
          >
             Pre-vetted startup teams. Real investor-mentors. Win prizes <em>and</em> get the chance to secure actual
            funding for your venture.                                          
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href="#apply"
              className="font-mono font-bold text-sm tracking-wider px-8 py-4 rounded-sm no-underline transition-all duration-300"
              style={{ background: "#9BE931", color: "#0B0F1A" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 40px rgba(155,233,49,0.5)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              APPLY NOW →
            </a>
            <a
              href="#about"
              className="font-mono text-sm tracking-wide px-8 py-4 rounded-sm no-underline transition-all duration-300"
              style={{
                border: "1px solid rgba(230,237,243,0.15)",
                color: "rgba(230,237,243,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#9BE931";
                (e.currentTarget as HTMLElement).style.color = "#9BE931";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(230,237,243,0.15)";
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(230,237,243,0.7)";
              }}
            >
              LEARN MORE
            </a>
          </motion.div>
        </div>

        {/* Right card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: "#161C2A",
              border: "1px solid rgba(155,233,49,0.12)",
            }}
          >
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(155,233,49,0.1) 0%, transparent 70%)",
              }}
            />

            <p
              className="font-mono text-xs tracking-widest mb-6"
              style={{ color: "#9BE931" }}
            >
              // EVENT AT A GLANCE
            </p>

            <div className="grid grid-cols-2 gap-5 mb-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div
                    className="font-syne font-extrabold text-4xl leading-none"
                    style={{ color: "#9BE931" }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="font-body text-xs mt-1"
                    style={{ color: "rgba(230,237,243,0.4)" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              className="rounded-xl p-5 text-center"
              style={{
                background: "rgba(155,233,49,0.05)",
                border: "1px solid rgba(155,233,49,0.1)",
              }}
            >
              <p
                className="font-mono text-[10px] tracking-widest mb-4"
                style={{ color: "#9BE931" }}
              >
                // COUNTDOWN TO LAUNCH
              </p>
              <Countdown />
            </div>
          </div>
        </motion.div>
      </motion.div>


      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-mono text-[9px] tracking-widest"
          style={{ color: "rgba(155,233,49,0.5)" }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, rgba(155,233,49,0.5), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
