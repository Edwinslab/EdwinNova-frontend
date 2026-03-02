"use client";

export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-12 py-8 flex-wrap"
      style={{
        background: "#0B0F1A",
        borderTop: "1px solid rgba(155,233,49,0.08)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="font-syne font-extrabold text-base tracking-widest text-light">
          EDWIN<span style={{ color: "#9BE931" }}>NOVA</span>
        </span>
      </div>

      <div className="text-center">
        <p
          className="font-body text-xs"
          style={{ color: "rgba(230,237,243,0.3)" }}
        >
          Organized by Edwins Lab · Alvas Institute of Engineering and
          Technology
        </p>
        <p
          className="font-body text-xs mt-1"
          style={{ color: "rgba(230,237,243,0.2)" }}
        >
          Mangaluru, Karnataka · April 3–6, 2026
        </p>
      </div>

      <div
        className="font-mono text-xs"
        style={{ color: "#9BE931", letterSpacing: "0.1em" }}
      >
        APR 3–6, 2026
      </div>
    </footer>
  );
}
