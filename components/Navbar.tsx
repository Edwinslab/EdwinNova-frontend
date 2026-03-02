"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Stages", href: "#stages" },
  { label: "Prizes", href: "#prizes" },
  { label: "Incubation", href: "#incubation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section
      const sections = links.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    
    // Call on load to set initial state
    onScroll();
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-12"
      style={{
        height: 68,
        background: scrolled ? "rgba(11,15,26,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(155,233,49,0.08)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <a className="flex items-center">
        <span className="font-syne font-extrabold text-lg tracking-widest text-light">
          EDWIN<span style={{ color: "#9BE931" }}>NOVA</span>
        </span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map((l) => {
          const isActive = activeSection === l.href.replace("#", "");
          return (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="font-body text-sm no-underline transition-colors duration-200"
                style={{
                  color: isActive ? "#9BE931" : "rgba(230,237,243,0.55)",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#9BE931")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = isActive
                    ? "#9BE931"
                    : "rgba(230,237,243,0.55)")
                }
              >
                {l.label}
              </a>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "#9BE931" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      <div className="hidden md:block">
        <a
          href="#apply"
          onClick={(e) => handleNavClick(e, "#apply")}
          className="font-mono font-bold text-xs tracking-widest px-6 py-2.5 rounded-sm transition-all duration-300 no-underline"
          style={{
            background: "#9BE931",
            color: "#0B0F1A",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 24px rgba(155,233,49,0.5)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow = "none")
          }
        >
          APPLY NOW
        </a>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          color: "#9BE931",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-full left-0 right-0 md:hidden py-6 px-6 flex flex-col gap-5"
            style={{
              background: "rgba(17,22,32,0.98)",
              borderBottom: "1px solid rgba(155,233,49,0.1)",
              backdropFilter: "blur(16px)",
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="font-syne font-bold text-base no-underline"
                style={{ color: "#E6EDF3" }}
                onClick={(e) => {
                  setMenuOpen(false);
                  handleNavClick(e, l.href);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#apply"
              className="font-mono font-bold text-xs tracking-widest px-6 py-3 rounded-sm text-center no-underline"
              style={{ background: "#9BE931", color: "#0B0F1A" }}
              onClick={(e) => {
                setMenuOpen(false);
                handleNavClick(e, "#apply");
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              APPLY NOW
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}