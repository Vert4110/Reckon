import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F1F4EF",
        "paper-raised": "#FFFFFF",
        ink: "#16232B",
        "ink-soft": "#4A5A62",
        amber: "#FFB343",
        teal: "#2F6F64",
        hairline: "#C9D2C8",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
