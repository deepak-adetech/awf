import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FBFBFD",
          warm: "#F5F5F7",
          ink: "#1D1D1F",
        },
        ink: {
          DEFAULT: "#1D1D1F",
          70: "rgba(29,29,31,0.70)",
          55: "rgba(29,29,31,0.55)",
          40: "rgba(29,29,31,0.40)",
          18: "rgba(29,29,31,0.18)",
          10: "rgba(29,29,31,0.10)",
          "06": "rgba(29,29,31,0.06)",
        },
        azure: {
          50: "#EFF5FE",
          100: "#D9E7FC",
          200: "#B5CFFA",
          300: "#7CABF6",
          400: "#3F88EE",
          500: "#0071E3",
          600: "#0057B3",
          700: "#054089",
          800: "#03306B",
        },
        signal: {
          amber: "#B0852C",
          rust: "#A04A2A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter2: "-0.025em",
      },
      backgroundImage: {
        "blueprint-dots":
          "radial-gradient(rgba(29,29,31,0.10) 1px, transparent 1px)",
        "blueprint-grid":
          "linear-gradient(rgba(29,29,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,29,31,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        dots: "22px 22px",
        grid: "64px 64px",
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "0.35" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flow: {
          "0%": { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 24s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        marquee: "marquee 50s linear infinite",
        flow: "flow 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
