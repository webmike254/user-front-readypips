/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F8FA",
        card: "#FFFFFF",
        primary: "#5B3DF5",
        "primary-hover": "#6A4CF8",
        border: "#E9E9EC",
        "text-primary": "#121212",
        "text-secondary": "#707070",
        "text-muted": "#9A9A9A",
        success: "#22C55E",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: "18px",
        input: "12px",
        button: "12px",
        image: "18px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,.05)",
        "card-hover": "0 4px 16px rgba(0,0,0,.08)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
