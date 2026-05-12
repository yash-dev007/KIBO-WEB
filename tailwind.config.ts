import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-warm": "var(--paper-warm)",
        "paper-dark": "var(--paper-dark)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-mute": "var(--ink-mute)",
        "ink-faint": "var(--ink-faint)",
        coral: "var(--coral)",
        "coral-soft": "var(--coral-soft)",
        ash: "var(--ash)",
        teal: "var(--teal)",
        mustard: "var(--mustard)",
        olive: "var(--olive)",
        bone: "var(--bone)",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        custom: "var(--shadow)",
      },
      animation: {
        "marquee-x": "marquee-x 52s linear infinite",
        "marquee-x-reverse": "marquee-x 64s linear infinite reverse",
        pulse: "pulse 2.4s ease-in-out infinite",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
