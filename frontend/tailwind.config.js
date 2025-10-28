/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#1e40af",
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#6d28d9",
        },
        // Semantic Colors
        success: {
          DEFAULT: "#10b981",
          light: "#6ee7b7",
          dark: "#047857",
        },
        danger: {
          DEFAULT: "#ef4444",
          light: "#f87171",
          dark: "#dc2626",
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
        info: {
          DEFAULT: "#06b6d4",
          light: "#22d3ee",
          dark: "#0891b2",
        },
        // Neutral Colors (Light Mode)
        light: {
          bg: "#ffffff",
          surface: "#f9fafb",
          border: "#e5e7eb",
          text: "#1f2937",
          "text-secondary": "#6b7280",
        },
        // Neutral Colors (Dark Mode)
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          card: "#334155",
          border: "#475569",
          text: "#f1f5f9",
          "text-secondary": "#cbd5e1",
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        "card-lg": "0 10px 25px rgba(0,0,0,0.1)",
        "dark-card": "0 1px 3px rgba(0,0,0,0.3)",
        "dark-card-lg": "0 10px 25px rgba(0,0,0,0.3)",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      transition: {
        "fast": "all 150ms ease-in-out",
        "base": "all 300ms ease-in-out",
        "slow": "all 500ms ease-in-out",
      },
      transitionDuration: {
        "fast": "150ms",
        "base": "300ms",
        "slow": "500ms",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideDown: "slideDown 150ms ease-in-out",
        fadeIn: "fadeIn 300ms ease-in-out",
        slideInLeft: "slideInLeft 300ms ease-in-out",
      },
    },
  },
  plugins: [],
};
