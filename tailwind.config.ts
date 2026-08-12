import type { Config } from "tailwindcss";

/** Tailwind v4 uses @theme in globals.css; this file documents shared tokens for tooling. */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "navy-900": "var(--pc-navy-900)",
        "navy-800": "var(--pc-navy-800)",
        "navy-750": "var(--pc-navy-750)",
        "pc-surface": "var(--pc-surface)",
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
        hand: ["var(--font-hand)", "cursive"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        wordmark: "600",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
        exit: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      borderRadius: {
        control: "4px",
        panel: "6px",
        sm: "4px",
        md: "4px",
        lg: "6px",
        xl: "6px",
        "2xl": "8px",
      },
    },
  },
};

export default config;
