"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProposalViewer from "@/components/proposalviewer";
import { Users, FileText, Github, TrendingUp } from "lucide-react";

const GUIDELINES = [
  {
    icon: Users,
    text: "Team of exactly 5 members — 4 devs/designers + 1 PM/business lead",
  },
  {
    icon: FileText,
    text: "Submit a detailed proposal with problem statement and market analysis",
  },
  {
    icon: Github,
    text: "Include GitHub profiles for all technical members",
  },
  {
    icon: TrendingUp,
    text: "Proposal must demonstrate clear market potential and viability",
  },
];

export default function Guidelines() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="guidelines"
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: "100px 5%" }}
    >
      {/* Background glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(155,233,49,0.04) 0%, transparent 70%)",
          top: "30%",
          left: "-10%",
        }}
      />

      {/* Top divider */}
      <motion.div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(155,233,49,0.08) 20%, rgba(155,233,49,0.08) 80%, transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Section label ── */}
        <motion.p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#9BE931",
            marginBottom: 14,
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          // PROPOSAL GUIDELINES
        </motion.p>

        {/* ── Heading ── */}
        <div style={{ overflow: "hidden", marginBottom: 10, textAlign: "center" }}>
          <motion.h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#E6EDF3",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            What we&apos;re looking for
          </motion.h2>
        </div>

        {/* ── Description ── */}
        <motion.p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: "rgba(230,237,243,0.7)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto",
            marginBottom: 36,
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Your proposal is your first impression. Review the guidelines carefully
          before submitting strong proposals have a clear problem statement,
          market analysis, and a credible team.
        </motion.p>

        {/* ── Guidelines grid: 2 col desktop, 1 col mobile ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9">
          {GUIDELINES.map((item, i) => {
            const Icon = item.icon; 
            return (
              <motion.div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "18px 20px",
                  background: "rgba(155,233,49,0.03)",
                  border: "1px solid rgba(155,233,49,0.1)",
                  borderRadius: 12,
                  transition: "border-color 0.25s, background 0.25s",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,233,49,0.28)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(155,233,49,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,233,49,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(155,233,49,0.03)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: "rgba(155,233,49,0.08)",
                    border: "1px solid rgba(155,233,49,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <Icon size={16} color="#9BE931" strokeWidth={1.8} />
                </div>

                {/* Text */}
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "rgba(230,237,243,0.8)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        

        {/* ── PDF Viewer Button ── */}
        <motion.div
          style={{ display: "flex", justifyContent: "center" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <ProposalViewer />
        </motion.div>
      </div>
    </section>
  );
}