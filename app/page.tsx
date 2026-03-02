"use client";
import { useState, useRef } from "react";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Stages from "@/components/Stages";
import Prizes from "@/components/Prizes";
import Sponsors from "@/components/Sponsors";
import Incubation from "@/components/Incubation";
import Apply from "@/components/Apply";
import Footer from "@/components/Footer";
import TerminalChat from "@/components/Terminal";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = () => {
    if (mainRef.current) {
      mainRef.current.style.transition = "opacity 0.5s ease";
      mainRef.current.style.opacity = "1";
    }
    setIntroComplete(true);
  };

  return (
    <>
      <Cursor />
      {!introComplete && <Intro onComplete={handleIntroComplete} />}
      <div ref={mainRef} style={{ opacity: 0 }}>
        <Navbar />
        <Hero />
        <About />
        <Stages />
        <Prizes />
        <Incubation />
        <Apply />
        <Footer />
      </div>

      <TerminalChat />
    </>
  );
}