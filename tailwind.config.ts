import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAFAF8",
          warm: "#F4F2EC",
          ink: "#0E1411",
        },
        ink: {
          DEFAULT: "#0E1411",
          70: "rgba(14,20,17,0.70)",
          55: "rgba(14,20,17,0.55)",
          40: "rgba(14,20,17,0.40)",
          18: "rgba(14,20,17,0.18)",
          10: "rgba(14,20,17,0.10)",
          "06": "rgba(14,20,17,0.06)",
        },
        forge: {
          50: "#EAF5F0",
          100: "#CFE7DA",
          200: "#9CCFB7",
          300: "#5DAE8B",
          400: "#2C8B66",
          500: "#0D6B4E",
          600: "#0A5740",
          700: "#08442F",
          800: "#06301F",
        },
        signal: {
          amber: "#C58B22",
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
          "radial-gradient(rgba(14,20,17,0.10) 1px, transparent 1px)",
        "blueprint-grid":
          "linear-gradient(rgba(14,20,17,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14,20,17,0.05) 1px, transparent 1px)",
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
