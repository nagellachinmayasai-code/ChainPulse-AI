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
  "on-surface-variant": "#464555",

  "surface-container-low": "#f2f3ff",
  "surface-container": "#eaedff",
  "surface-container-high": "#e2e7ff",
  "surface-container-highest": "#dae2fd",
  "surface-container-lowest": "#ffffff",

  primary: "#3525cd",
  secondary: "#831ada",
  tertiary: "#0ea5e9",

  success: "#16a34a",
  warning: "#f59e0b",
  error: "#ba1a1a",

  outline: "#777587",
  "outline-variant": "#c7c4d8",
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
