import type { Config } from "tailwindcss";

/**
 * Tailwind v4 primarily uses @theme in globals.css.
 * This file documents the v2 design tokens and easing for tooling/reference.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "navy-900": "var(--pc-navy-900)",
        "navy-800": "var(--pc-navy-800)",
        "navy-700": "var(--pc-navy-700)",
        "navy-600": "var(--pc-navy-600)",
        "navy-500": "var(--pc-navy-500)",
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
        "aurora-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(4%, -3%) scale(1.08)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "aurora-drift": "aurora-drift 24s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      borderRadius: {
        DEFAULT: "4px",
      },
    },
  },
};

export default config;
