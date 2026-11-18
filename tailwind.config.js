import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lab: {
          950: "#080A0D",
          900: "#0D1117",
          850: "#121820",
          800: "#1A2230",
          700: "#232E3F",
        },
        accent: {
          DEFAULT: "#FF4D24",
          soft: "#FF773D",
          deep: "#C93110",
        },
        ice: {
          DEFAULT: "#DDE5EC",
          dim: "#667585",
          cyan: "#57D7E8",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 77, 36, 0.35)",
        "glow-sm": "0 0 18px rgba(255, 77, 36, 0.28)",
        panel: "0 30px 80px rgba(0,0,0,0.55)",
      },
      animation: {
        "pulse-slow": "pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "dash-flow": "dashFlow 1.6s linear infinite",
        scanline: "scanline 4.5s linear infinite",
        "blink-dot": "blinkDot 1.4s steps(2, start) infinite",
      },
      keyframes: {
        dashFlow: {
          to: { strokeDashoffset: "-24" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1200%)" },
        },
        blinkDot: {
          "50%": { opacity: "0.15" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
