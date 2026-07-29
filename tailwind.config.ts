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
        surface: "#121821",
        line: "#1E2833",
        sky: {
          400: "#93C0FF",
          500: "#6BA8FF",
          600: "#4A8CE8",
        },
        text: {
          primary: "#FFFFFF",
          muted: "#A6B2C4",
          faint: "#6B7686",
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
