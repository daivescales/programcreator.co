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
        base: "#0B0F14",
        surface: "#141B24",
        line: "#232E3B",
        sky: {
          400: "#93C0FF",
          500: "#6BA8FF",
          600: "#4A8CE8",
        },
        text: {
          primary: "#FFFFFF",
          muted: "#C6D0DE",
          faint: "#94A0B0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "5xl": "64rem",
      },
    },
  },
  plugins: [],
};
export default config;
