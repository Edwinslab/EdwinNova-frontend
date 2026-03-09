"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";

export default function ProposalViewer() {
  const [open, setOpen] = useState(false);

  // Lock scroll on BOTH html and body + touch
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 28px",
          background: "rgba(155,233,49,0.06)",
          border: "1px solid rgba(155,233,49,0.2)",
          borderRadius: 10,
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.15em",
          color: "#9BE931",
          cursor: "pointer",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "rgba(155,233,49,0.12)";
          el.style.borderColor = "rgba(155,233,49,0.45)";
          el.style.boxShadow = "0 0 24px rgba(155,233,49,0.12)";
          el.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = "rgba(155,233,49,0.06)";
          el.style.borderColor = "rgba(155,233,49,0.2)";
          el.style.boxShadow = "none";
          el.style.transform = "none";
        }}
      >
        <FileText size={15} />
        VIEW PROPOSAL GUIDELINES
      </button>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 24px 24px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop — blocks scroll events */}
            <motion.div
              onClick={() => setOpen(false)}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(5,8,15,0.88)",
                backdropFilter: "blur(14px)",
                cursor: "pointer",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal container */}
            <motion.div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 900,
                height: "85vh",
                background: "#111620",
                border: "1px solid rgba(155,233,49,0.12)",
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(155,233,49,0.05)",
              }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Header bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  borderBottom: "1px solid rgba(155,233,49,0.08)",
                  background: "rgba(155,233,49,0.02)",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <FileText size={14} style={{ color: "#9BE931" }} />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      color: "rgba(155,233,49,0.6)",
                    }}
                  >
                    // PROPOSAL GUIDELINES
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(155,233,49,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(230,237,243,0.4)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(155,233,49,0.1)";
                    el.style.borderColor = "rgba(155,233,49,0.3)";
                    el.style.color = "#9BE931";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.borderColor = "rgba(155,233,49,0.1)";
                    el.style.color = "rgba(230,237,243,0.4)";
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* PDF iframe */}
              <iframe
  src="/pdfjs/web/viewer.html?file=/proposal-guidelines.pdf"
  title="Proposal Guidelines"
  style={{
    flex: 1,
    width: "100%",
    border: "none",
    background: "#1a1f2e",
  }}
/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}