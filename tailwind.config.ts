import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#9BE931",
          dim: "rgba(155,233,49,0.12)",
          glow: "rgba(155,233,49,0.35)",
        },
        dark: {
          DEFAULT: "#0B0F1A",
          2: "#111620",
          3: "#161C2A",
          4: "#1D2335",
        },
        light: "#E6EDF3",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        body: ["DM Sans", "sans-serif"],
      },
      animation: {
        "pulse-green": "pulseGreen 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
      },
      keyframes: {
        pulseGreen: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(155,233,49,0)" },
          "50%": { boxShadow: "0 0 24px rgba(155,233,49,0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
