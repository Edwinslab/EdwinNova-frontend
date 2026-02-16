"use client";

import { useEffect, useState } from "react";

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const now = new Date();

    let eventDate = new Date(now.getFullYear(), 3, 3, 0, 0, 0);

    if (eventDate.getTime() < now.getTime()) {
      eventDate = new Date(now.getFullYear() + 1, 3, 3, 0, 0, 0);
    }

    const eventTime = eventDate.getTime();

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = eventTime - currentTime;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0"),
        minutes: String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0"),
        seconds: String(
          Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e6edf3] mb-8 sm:mb-12 text-center px-4">
        Community Lab <span className="text-[#9be931]">Hackathon</span>
      </h1>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
        <Box label="Days" value={timeLeft.days} />
        <Box label="Hours" value={timeLeft.hours} />
        <Box label="Minutes" value={timeLeft.minutes} />
        <Box label="Seconds" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#e6edf3] rounded-lg p-4 sm:p-5 md:p-6 min-w-[80px] sm:min-w-[100px] md:w-32 flex-1 sm:flex-none flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition-transform duration-300">
      <div className="text-black text-4xl sm:text-5xl md:text-6xl font-bold">
        {value}
      </div>
      <div className="text-[#0b0f1a] font-semibold mt-1 sm:mt-2 text-sm sm:text-base">
        {label}
      </div>
    </div>
  );
}
