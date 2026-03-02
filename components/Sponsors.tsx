"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tiers = [
  {
    name: "🥇 Title Sponsor",
    amount: "₹1,00,000+",
    benefits: [
      "Exclusive naming rights",
      "Keynote speaking slot",
      "First access to all 24 startups",
      "Dedicated investor-mentor role",
      "Logo on all materials",
      "Priority investment discussions",
    ],
  },
  {
    name: "🥈 Domain Sponsor",
    amount: "₹50,000",
    benefits: [
      "Own one innovation domain",
      "Mentor 8 curated teams",
      "Branded domain championship",
      "Logo placement",
      "Investment access to domain finalists",
    ],
  },
  {
    name: "🥉 Associate Sponsor",
    amount: "₹25,000",
    benefits: [
      "Brand visibility",
      "Networking with investors",
      "Access to pitch finals",
      "Digital presence",
    ],
  },
];

export default function Sponsors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="sponsors"
      ref={ref}
      className="relative z-10"
      style={{ padding: "112px 5%" }}
    >
      <div className="max-w-4xl mx-auto relative z-20">
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
            // Sponsorship
          </p>
          <h2
            className="font-syne font-extrabold leading-tight mb-4 text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
          >
            Invest in the{" "}
            <span style={{ color: "#9BE931" }}>Next Generation</span>
          </h2>
          <p
            className="font-body text-sm max-w-md mx-auto"
            style={{ color: "rgba(230,237,243,0.8)", lineHeight: 1.75, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            Our model transforms sponsors from passive brand displayers into
            active participants with genuine stake in startup outcomes.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5 drop-shadow-2xl">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.13, duration: 0.6 }}
              className="rounded-xl p-7 transition-all duration-300 relative overflow-hidden backdrop-blur-md"
              style={{
                background: "rgba(22, 28, 42, 0.8)",
                border: "1px solid rgba(155,233,49,0.15)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(155,233,49,0.4)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(155,233,49,0.15)")
              }
            >
              <div className="flex items-center justify-between mb-5 relative z-10">
                <h3 className="font-syne font-extrabold text-lg text-white">
                  {tier.name}
                </h3>
                <span
                  className="font-mono text-xs px-4 py-1.5 rounded-full"
                  style={{
                    background: "rgba(155,233,49,0.1)",
                    border: "1px solid rgba(155,233,49,0.25)",
                    color: "#9BE931",
                  }}
                >
                  {tier.amount}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 relative z-10">
                {tier.benefits.map((b, j) => (
                  <span
                    key={j}
                    className="font-body text-xs px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(230,237,243,0.8)",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-12 text-center relative z-20"
        >
          <p
            className="font-body text-sm mb-5"
            style={{ color: "rgba(230,237,243,0.8)", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            Interested in sponsoring? Reach out to the organizing team.
          </p>
          <a
            href="mailto:edwinslabs@alvas.org"
            className="font-mono text-sm tracking-wide px-8 py-3 rounded-sm no-underline transition-all duration-300 inline-block bg-[#111620]"
            style={{
              border: "1px solid rgba(155,233,49,0.4)",
              color: "#9BE931",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(155,233,49,0.1)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "#111620")
            }
          >
            BECOME A SPONSOR →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
