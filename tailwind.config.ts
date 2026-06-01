import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./i18n/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        // Brand design tokens (ported from the original :root)
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        navy: "var(--navy)",
        "navy-deep": "var(--navy-deep)",
        blue: "var(--blue)",
        "blue-strong": "var(--blue-strong)",
        "blue-soft": "var(--blue-soft)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        "border-strong": "var(--border-strong)",
        success: "var(--success)",
        "success-soft": "var(--success-soft)",
        danger: "var(--danger)",
        "danger-soft": "var(--danger-soft)",
        // shadcn semantic tokens (so ui primitives work)
        border: "var(--border)",
        input: "var(--border-strong)",
        ring: "var(--blue)",
        background: "var(--surface)",
        foreground: "var(--ink)",
        primary: { DEFAULT: "var(--navy)", foreground: "#ffffff" },
        secondary: { DEFAULT: "var(--surface-alt)", foreground: "var(--ink)" },
        accent: { DEFAULT: "var(--blue-soft)", foreground: "var(--blue)" },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.04)",
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.5s forwards cubic-bezier(0.2,0.7,0.2,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
