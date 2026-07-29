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
        ink: "#04060B",
        navy: {
          950: "#060C1A",
          900: "#0A1428",
          800: "#0F1D3A",
          700: "#16294F",
          600: "#1D3768",
          500: "#264785",
        },
        azure: {
          600: "#1E4FD8",
          500: "#2B5CE6",
          400: "#4E7CF0",
          300: "#7BA0F7",
        },
        mist: {
          100: "#EAEFFA",
          300: "#AFBDD9",
          500: "#7A88A6",
          700: "#4A5673",
        },
        surface: "#F5F7FC",
      },
      fontFamily: {
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "7xl": "80rem",
      },
      boxShadow: {
        azure: "0 0 24px rgba(43, 92, 230, 0.35)",
        "azure-soft": "0 0 40px rgba(43, 92, 230, 0.18)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-dot": {
          "0%": { top: "0%", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        pulseAzure: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "scroll-dot": "scroll-dot 2s ease-in-out infinite",
        "pulse-azure": "pulseAzure 1.4s ease-in-out infinite",
        shake: "shake 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
