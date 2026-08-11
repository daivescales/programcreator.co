import type { Config } from "tailwindcss";

/** Tailwind v4 uses @theme in globals.css; this documents v3 tokens. */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "navy-900": "var(--pc-navy-900)",
        "navy-800": "var(--pc-navy-800)",
        "navy-700": "var(--pc-navy-700)",
        "navy-600": "var(--pc-navy-600)",
        "pc-line": "var(--pc-line)",
        "pc-line-2": "var(--pc-line-2)",
        "pc-white": "var(--pc-white)",
        "pc-text": "var(--pc-text)",
        "pc-muted": "var(--pc-muted)",
        accent: "var(--pc-accent)",
        "accent-2": "var(--pc-accent-2)",
        "pc-glow": "var(--pc-glow)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
        exit: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "glow-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3%, -2%) scale(1.06)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "70%": { transform: "scale(2.2)", opacity: "0" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "mock-cycle": {
          "0%, 90%": { opacity: "1" },
          "95%, 100%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "glow-drift": "glow-drift 26s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        "mock-cycle": "mock-cycle 7s ease-in-out infinite",
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
      },
    },
  },
};

export default config;
