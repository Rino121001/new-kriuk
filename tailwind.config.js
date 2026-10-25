/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FCF3E3",
        paper: "#FFFBF3",
        ink: "#241811",
        inkSoft: "#54443A",
        chili: {
          DEFAULT: "#D6402A",
          dark: "#A62E1C",
          light: "#F06A4C",
        },
        gold: {
          DEFAULT: "#EFA23E",
          dark: "#C97F26",
          light: "#FAD79A",
        },
        leaf: {
          DEFAULT: "#5B7F3A",
          dark: "#42602A",
        },
        line: "#E7D2AE",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        chip: "2rem",
      },
      boxShadow: {
        soft: "0 4px 0 0 #E7D2AE",
        card: "0 2px 0 0 rgba(36,24,17,0.08)",
      },
    },
  },
  plugins: [],
};
