/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./projects.html",
    "./research.html",
    "./contact.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        surface: {
          DEFAULT: "var(--bg-card)",
          subtle: "var(--bg-secondary)",
          muted: "var(--bg-muted)",
        },
        border: "var(--border-color)",
        accent: {
          DEFAULT: "#C25E00",
          hover: "#A84E00",
          light: "#FFF8F0",
          subtle: "#FFF8F0",
          border: "#FBE3CC",
          dark: "#D95D1E",
        },
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#9CA3AF",
        },
        charcoal: "#0f0f23",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Roboto", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        sans: ["var(--font-sans)", "Roboto", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        heading: ["var(--font-heading)", "Roboto", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", '"Roboto Mono"', "ui-monospace", "monospace"],
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

