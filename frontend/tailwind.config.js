/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Colors - Enhanced
        primary: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#1e40af",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e3a8a",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#6d28d9",
          100: "#f3e8ff",
          200: "#e9d5ff",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        // Semantic Colors - Enhanced
        success: {
          DEFAULT: "#10b981",
          50: "#ecfdf5",
          100: "#d1fae5",
          light: "#6ee7b7",
          600: "#059669",
          dark: "#047857",
        },
        danger: {
          DEFAULT: "#ef4444",
          50: "#fef2f2",
          100: "#fee2e2",
          light: "#f87171",
          600: "#dc2626",
          dark: "#991b1b",
        },
        warning: {
          DEFAULT: "#f59e0b",
          50: "#fffbeb",
          100: "#fef3c7",
          light: "#fbbf24",
          600: "#d97706",
          dark: "#92400e",
        },
        info: {
          DEFAULT: "#06b6d4",
          50: "#ecf8fb",
          100: "#cffafe",
          light: "#22d3ee",
          600: "#0891b2",
          dark: "#164e63",
        },
        // Neutral Colors (Light Mode) - Enhanced
        light: {
          bg: "#ffffff",
          surface: "#f8fafc",
          border: "#e2e8f0",
          text: "#0f172a",
          "text-secondary": "#475569",
          hover: "#f1f5f9",
        },
        // Neutral Colors (Dark Mode) - Enhanced
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          card: "#334155",
          border: "#404b5c",
          text: "#f8fafc",
          "text-secondary": "#94a3b8",
          hover: "#293548",
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        "card-lg": "0 12px 28px rgba(0,0,0,0.12)",
        "dark-card": "0 2px 8px rgba(0,0,0,0.4)",
        "dark-card-lg": "0 12px 28px rgba(0,0,0,0.5)",
        "sm": "0 1px 2px rgba(0,0,0,0.05)",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      transition: {
        "fast": "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
        "base": "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        "slow": "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
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
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        slideDown: "slideDown 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        fadeIn: "fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        slideInLeft: "slideInLeft 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
