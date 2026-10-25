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
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface)",
          subtle: "var(--surface-subtle)",
          muted: "var(--surface-muted)",
        },
        border: "var(--border)",
        accent: {
          DEFAULT: "#C25E00",
          hover: "#A84E00",
          subtle: "#FFF8F0",
          border: "#FBE3CC",
        },
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#9CA3AF",
        },
        charcoal: "#0f0f23",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ABCSynt", '"Instrument Serif"', "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["var(--font-heading)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        academic: "1.15",
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
