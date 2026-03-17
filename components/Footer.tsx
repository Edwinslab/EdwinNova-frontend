"use client";

export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-8 md:px-12 py-10 flex-wrap"
      style={{
        background: "#0B0F1A",
        borderTop: "1px solid rgba(155,233,49,0.08)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="font-syne font-extrabold text-base tracking-widest text-light">
          EDWIN<span style={{ color: "#9BE931" }}>NOVA</span>
        </span>
      </div>

      {/* Event Info */}
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

      {/* Map */}
      <div
        className="relative overflow-hidden rounded-lg shrink-0"
        style={{
          width: "200px",
          height: "120px",
          border: "1px solid rgba(155,233,49,0.12)",
        }}
      >
        <iframe
          title="Alva's Institute of Engineering and Technology Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.8!2d74.9654!3d13.0236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba355f5fb5cac2b%3A0x5ef9b57c1b6279cf!2sAlva&#39;s%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "saturate(0.3) brightness(0.5) contrast(1.2)",
          }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href="https://www.google.com/maps/place/Alva's+Institute+of+Engineering+and+Technology/@13.0236033,74.9676015,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 flex items-end justify-center pb-2"
        >
          <span
            className="text-[9px] font-body font-semibold tracking-wide px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(11,15,26,0.75)",
              color: "#9BE931",
              border: "1px solid rgba(155,233,49,0.2)",
              backdropFilter: "blur(6px)",
            }}
          >
            View on Maps ↗
          </span>
        </a>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col text-xs font-body gap-1">
        <p style={{ color: "rgba(230,237,243,0.6)" }}>
          📧 edwins@aiet.org.in
        </p>
        <p style={{ color: "rgba(230,237,243,0.6)" }}>
          📞 +91 8951169155
        </p>
        <p style={{ color: "rgba(230,237,243,0.4)", maxWidth: "220px" }}>
          📍 Alvas Institute of Engineering and Technology, Mijjar,
          Moodbidre
        </p>
      </div>

      {/* Date */}
      <div
        className="font-mono text-xs"
        style={{ color: "#9BE931", letterSpacing: "0.1em" }}
      >
        APR 3–6, 2026
      </div>
    </footer>
  );
}