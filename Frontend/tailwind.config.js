/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#0a0e27",
          900: "#0f1638",
          850: "#151d3d",
          800: "#1a2651",
          700: "#2d3e6f",
        },
        accent: {
          pink: "#ff006e",
          purple: "#b537f2",
          orange: "#ff6b35",
        },
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #0a0e27 0%, #1a2651 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(181, 55, 242, 0.1) 100%)",
        "gradient-accent": "linear-gradient(135deg, #ff006e 0%, #ff6b35 100%)",
      },
      boxShadow: {
        "glow-pink": "0 0 20px rgba(255, 0, 110, 0.3)",
        "glow-purple": "0 0 20px rgba(181, 55, 242, 0.3)",
        "glow-orange": "0 0 20px rgba(255, 107, 53, 0.3)",
        "card-hover": "0 20px 50px rgba(255, 0, 110, 0.15)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "slide-in": "slide-in 0.3s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(255, 0, 110, 0.3)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 40px rgba(255, 0, 110, 0.5)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
}
