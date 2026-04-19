/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#faf8ff",
        "on-surface": "#131b2e",
        "on-surface-variant": "#5b5a6a",

        "surface-container": "#f3f4ff",
        "surface-card": "#ffffff",

        primary: "#4f46e5",
        secondary: "#9333ea",

        success: "#16a34a",
        warning: "#f59e0b",
        error: "#dc2626",

        outline: "#e5e7eb",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.08)",
        glow: "0 0 20px rgba(79,70,229,0.3)",
      },

      backdropBlur: {
        xl: "20px",
      }
    },
  },
  plugins: [],
};
