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
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          950: "#111111",
          900: "#1A1A1A",
          800: "#333333",
          600: "#666666",
          500: "#999999",
          200: "#E5E5E5",
          100: "#F5F5F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "6xl": "72rem",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        md: "0.375rem",
      },
    },
  },
  plugins: [],
};
export default config;
