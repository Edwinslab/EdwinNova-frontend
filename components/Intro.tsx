// "use client";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// export default function Intro({ onComplete }: { onComplete: () => void }) {
//   const topRef = useRef<HTMLDivElement>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const logoRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [removed, setRemoved] = useState(false);
//   const [showColor, setShowColor] = useState(false);

//   useEffect(() => {
//     const top = topRef.current;
//     const bottom = bottomRef.current;
//     const logo = logoRef.current;
//     const text = textRef.current;
//     const container = containerRef.current;
//     if (!top || !bottom || !logo || !text || !container) return;

//     let cancelled = false;

//     const run = async () => {
//       // Step 1: panels are already fully open — fade in logo + text immediately
//       await delay(100);
//       if (cancelled) return;
//       logo.style.transition = "opacity 0.5s ease, transform 0.5s ease";
//       logo.style.opacity = "1";
//       logo.style.transform = "translateY(0)";
//       text.style.transition = "opacity 0.5s ease, transform 0.5s ease";
//       text.style.opacity = "1";
//       text.style.transform = "translateY(0)";

//       // Step 2: Hold so user can read it
//       await delay(1800);
//       setShowColor(true);
//       await delay(200);
//       if (cancelled) return;

//       // Step 3: Split apart
//       top.style.transition = "transform 0.75s cubic-bezier(0.76,0,0.24,1)";
//       top.style.transform = "translateY(-100%)";
//       bottom.style.transition = "transform 0.75s cubic-bezier(0.76,0,0.24,1)";
//       bottom.style.transform = "translateY(100%)";

//       // Step 4: Fade out then reveal main
//       await delay(650);
//       if (cancelled) return;
//       container.style.transition = "opacity 0.25s ease";
//       container.style.opacity = "0";

//       await delay(280);
//       if (cancelled) return;
//       setRemoved(true);
//       onComplete();
//     };

//     run();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   if (removed) return null;

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 9999,
//         overflow: "hidden",
//         background: "#E6EDF3",
//       }}
//     >
//       {/* Dark BG grid */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: "#0B0F1A",
//           zIndex: 0,
//           backgroundImage:
//             "linear-gradient(rgba(155,233,49,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(155,233,49,0.05) 1px, transparent 1px)",
//           backgroundSize: "64px 64px",
//         }}
//       />

//       {/* Corner labels */}
//       <div
//         style={{
//           position: "absolute",
//           top: 20,
//           left: 24,
//           zIndex: 1,
//           fontFamily: "'Space Mono',monospace",
//           fontSize: "11px",
//           color: "rgba(155,233,49,0.4)",
//           letterSpacing: "0.15em",
//         }}
//       >
//         // EDWINNOVA_2026
//       </div>
//       <div
//         style={{
//           position: "absolute",
//           top: 20,
//           right: 24,
//           zIndex: 1,
//           fontFamily: "'Space Mono',monospace",
//           fontSize: "11px",
//           color: "rgba(155,233,49,0.4)",
//           letterSpacing: "0.15em",
//         }}
//       >
//         APR 3–6
//       </div>
//       <div
//         style={{
//           position: "absolute",
//           bottom: 20,
//           left: 24,
//           zIndex: 1,
//           fontFamily: "'Space Mono',monospace",
//           fontSize: "11px",
//           color: "rgba(155,233,49,0.4)",
//           letterSpacing: "0.15em",
//         }}
//       >
//         ALVAS INSTITUTE
//       </div>
//       <div
//         style={{
//           position: "absolute",
//           bottom: 20,
//           right: 24,
//           zIndex: 1,
//           fontFamily: "'Space Mono',monospace",
//           fontSize: "11px",
//           color: "rgba(155,233,49,0.4)",
//           letterSpacing: "0.15em",
//         }}
//       >
//         MANGALURU, KA
//       </div>

//       {/* TOP PANEL — dark, logo at bottom */}
//       <div
//         ref={topRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: "50%",
//           zIndex: 2,
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-end",
//           background: "#E6EDF3",
//           backgroundImage:
//             "linear-gradient(rgba(155,233,49,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155,233,49,0.04) 1px, transparent 1px)",
//           backgroundSize: "64px 64px",
//         }}
//       >
//         {/* Green seam at bottom */}
//         {/* { showColor ? (
//           <div
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: "2px",
//             zIndex: 3,
//             background: "rgba(155,233,49,0.8)",
//             boxShadow:
//               "0 0 12px rgba(155,233,49,0.6), 0 0 24px rgba(155,233,49,0.2)",
          
//           }}
//           className="ease-in duration-500"
//         /> ) : false} */}

//         <div
//           ref={logoRef}
//           style={{
//             opacity: 0,
//             transform: "translateY(20px)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             paddingBottom: "40px",
//             zIndex: 2,
//           }}
//         >
//           <Image
//             src="/new-logo.png"
//             width={200}
//             height={100}
//             alt="Edwin Nova Logo"
//             style={{ animation: "floatBob 2.5s ease-in-out infinite" }}
//           />
//           {/* <p
//             style={{
//               fontFamily: "'Space Mono',monospace",
//               fontSize: "11px",
//               letterSpacing: "0.25em",
//               color: "rgba(155,233,49,0.5)",
//               marginTop: "10px",
//             }}
//           >
//             EDWINS LAB
//           </p> */}
//         </div>
//       </div>

//       {/* BOTTOM PANEL — dark, text at top */}
//       <div
//         ref={bottomRef}
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: "50%",
//           zIndex: 2,
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           background: "#E6EDF3",
//           backgroundImage:
//             "linear-gradient(rgba(155,233,49,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155,233,49,0.04) 1px, transparent 1px)",
//           backgroundSize: "64px 64px",
//         }}
//       >
//         <div
//           ref={textRef}
//           style={{
//             opacity: 0,
//             transform: "translateY(-20px)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             paddingTop: "40px",
//             zIndex: 2,
//           }}
//         >
//           <h1
//             style={{
//               fontFamily: "'Syne',sans-serif",
//               fontWeight: 800,
//               fontSize: "clamp(3rem, 10vw, 8rem)",
//               lineHeight: 1,
//               letterSpacing: "-0.02em",
//               color: "#0B0F1A",
//               margin: 0,
//             }}
//           >
//             EDWIN<span style={{ color: "#9BE931" }}>NOVA</span>
//           </h1>
//           <p
//             style={{
//               fontFamily: "'Space Mono',monospace",
//               fontSize: "31px",
//               letterSpacing: "0.3em",
//               color: "#0B0F1A",
//               marginTop: "10px",
//             }}
//           >
//             FROM REQUIREMENTS TO REALITY
//           </p>
//         </div>
//       </div>

//       <style>{`
//         @keyframes floatBob {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); }
//         }
//       `}</style>
//     </div>
//   );
// }

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }


"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);
  const [showColor, setShowColor] = useState(false);

  useEffect(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const container = containerRef.current;
    if (!top || !bottom || !logo || !text || !container) return;

    let cancelled = false;

    const run = async () => {
      await delay(100);
      if (cancelled) return;
      logo.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      logo.style.opacity = "1";
      logo.style.transform = "translateY(0)";
      text.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      text.style.opacity = "1";
      text.style.transform = "translateY(0)";

      await delay(1800);
      setShowColor(true);
      await delay(200);
      if (cancelled) return;

      top.style.transition = "transform 0.75s cubic-bezier(0.76,0,0.24,1)";
      top.style.transform = "translateY(-100%)";
      bottom.style.transition = "transform 0.75s cubic-bezier(0.76,0,0.24,1)";
      bottom.style.transform = "translateY(100%)";

      await delay(650);
      if (cancelled) return;
      container.style.transition = "opacity 0.25s ease";
      container.style.opacity = "0";

      await delay(280);
      if (cancelled) return;
      setRemoved(true);
      onComplete();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (removed) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        background: "#E6EDF3",
      }}
    >
      {/* Dark BG grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0B0F1A",
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(155,233,49,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(155,233,49,0.05) 1px, transparent 1px)",
          backgroundSize: "clamp(32px, 6vw, 64px) clamp(32px, 6vw, 64px)",
        }}
      />

      {/* Corner labels */}
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 3vw, 20px)",
          left: "clamp(12px, 3vw, 24px)",
          zIndex: 1,
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(8px, 2vw, 11px)",
          color: "rgba(155,233,49,0.4)",
          letterSpacing: "0.15em",
          whiteSpace: "nowrap",
        }}
      >
        // EDWINNOVA_2026
      </div>
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 3vw, 20px)",
          right: "clamp(12px, 3vw, 24px)",
          zIndex: 1,
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(8px, 2vw, 11px)",
          color: "rgba(155,233,49,0.4)",
          letterSpacing: "0.15em",
          whiteSpace: "nowrap",
        }}
      >
        APR 3–6
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "clamp(12px, 3vw, 20px)",
          left: "clamp(12px, 3vw, 24px)",
          zIndex: 1,
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(8px, 2vw, 11px)",
          color: "rgba(155,233,49,0.4)",
          letterSpacing: "0.15em",
          whiteSpace: "nowrap",
        }}
      >
        ALVAS INSTITUTE
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "clamp(12px, 3vw, 20px)",
          right: "clamp(12px, 3vw, 24px)",
          zIndex: 1,
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(8px, 2vw, 11px)",
          color: "rgba(155,233,49,0.4)",
          letterSpacing: "0.15em",
          whiteSpace: "nowrap",
        }}
      >
        MANGALURU, KA
      </div>

      {/* TOP PANEL */}
      <div
        ref={topRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          zIndex: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          background: "#E6EDF3",
          backgroundImage:
            "linear-gradient(rgba(155,233,49,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155,233,49,0.04) 1px, transparent 1px)",
          backgroundSize: "clamp(32px, 6vw, 64px) clamp(32px, 6vw, 64px)",
        }}
      >
        <div
          ref={logoRef}
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "clamp(10px, 3vh, 20px)",
            paddingBottom: "clamp(20px, 5vh, 40px)",
            zIndex: 2,
            width: "100%",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Image
            src="/new-logo.png"
            width={200}
            height={100}
            alt="Edwin Nova Logo"
            style={{
              animation: "floatBob 2.5s ease-in-out infinite",
              maxWidth: "min(200px, 60vw)",
              height: "auto",
              width: "auto",
            }}
          />
        </div>
      </div>

      {/* BOTTOM PANEL */}
      <div
        ref={bottomRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          zIndex: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "#E6EDF3",
          backgroundImage:
            "linear-gradient(rgba(155,233,49,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155,233,49,0.04) 1px, transparent 1px)",
          backgroundSize: "clamp(32px, 6vw, 64px) clamp(32px, 6vw, 64px)",
        }}
      >
        <div
          ref={textRef}
          style={{
            opacity: 0,
            transform: "translateY(-20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "clamp(20px, 5vh, 40px)",
            zIndex: 2,
            width: "100%",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 8vw, 8rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#0B0F1A",
              margin: 0,
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            EDWIN<span style={{ color: "#9BE931" }}>NOVA</span>
          </h1>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "clamp(14px, 3.5vw, 31px)",
              letterSpacing: "0.2em",
              color: "#0B0F1A",
              marginTop: "clamp(6px, 2vh, 10px)",
              textAlign: "center",
              wordBreak: "break-word",
              paddingLeft: "8px",
              paddingRight: "8px",
            }}
          >
            FROM REQUIREMENTS TO REALITY
          </p>
        </div>
      </div>

      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @media (max-width: 480px) {
          @keyframes floatBob {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
        }
      `}</style>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}