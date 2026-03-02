"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const perks = [
  {
    icon: "🏢",
    title: "Rent-Free Workspace",
    desc: "Dedicated office space at Alvas for 1 full year — zero rent.",
  },
  {
    icon: "⚡",
    title: "Free Infrastructure",
    desc: "Electricity, high-speed internet, and college facilities included.",
  },
  {
    icon: "🔬",
    title: "Lab Access",
    desc: "Access to college laboratories, equipment, and technical resources.",
  },
  {
    icon: "🧠",
    title: "Expert Mentorship",
    desc: "Guidance from faculty advisors and industry professionals.",
  },
  {
    icon: "🌐",
    title: "Alumni Network",
    desc: "Warm introductions to Alvas alumni and industry partners.",
  },
  {
    icon: "📈",
    title: "Equity Model",
    desc: "In exchange: 5–10% equity stake, creating long-term institutional alignment.",
  },
];

export default function Incubation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="incubation"
      ref={ref}
      style={{ background: "#0B0F1A", padding: "112px 5%" }}
      className="relative overflow-hidden"
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(155,233,49,0.04) 0%, transparent 70%)",
          bottom: "-200px",
          right: "-100px",
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#9BE931" }}
          >
            // Post-Event Incubation
          </p>
          <h2
            className="font-syne font-extrabold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Get Invested ! <br />Get a real <span style={{ color: "#9BE931" }}>office.</span>
          </h2>
          <p
            className="font-body leading-relaxed mb-4"
            style={{ color: "rgba(230,237,243,0.55)" }}
          >
            Startups that receive investment from event sponsors get access to a
            comprehensive incubation package at Alvas Institute of Engineering
            and Technology — completely free for one year.
          </p>
          <p
            className="font-body leading-relaxed"
            style={{ color: "rgba(230,237,243,0.55)" }}
          >
            In exchange, Alvas Education Foundation acquires a 3% equity stake,
            aligning the institution's success with yours. This isn't charity —
            it's partnership.
          </p>

          <div
            className="mt-8 p-5 rounded-xl"
            style={{
              background: "rgba(155,233,49,0.06)",
              border: "1px solid rgba(155,233,49,0.15)",
            }}
          >
            <p
              className="font-mono text-[10px] tracking-widest mb-2"
              style={{ color: "#9BE931" }}
            >
              // NOTE
            </p>
            <p
              className="font-body text-xs leading-relaxed"
              style={{ color: "rgba(230,237,243,0.5)" }}
            >
              Equity stake only applies to startups that receive external
              investment from event sponsors. Teams that win prize money but
              don't receive investment have zero equity obligations.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {perks.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.55 }}
              className="rounded-xl p-5 flex items-start gap-3 transition-all duration-300"
              style={{
                background: "#161C2A",
                border: "1px solid rgba(155,233,49,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(155,233,49,0.25)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(155,233,49,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                style={{ background: "rgba(155,233,49,0.08)" }}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="font-syne font-bold text-sm mb-1 text-light">
                  {p.title}
                </h3>
                <p
                  className="font-body text-xs leading-relaxed"
                  style={{ color: "rgba(230,237,243,0.4)" }}
                >
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
