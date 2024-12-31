/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "gradient-move": "gradient-move 6s ease infinite",
      },

      colors: {
        blurwhite: "#ffffff9f",
        blurwhiteDark: "#ffffff3f",

        text: "#070804",
        background: "#fcfdfa",
        primary: "#9db463",
        secondary: "#a6d4b9",
        accent: "#7fc1af",

        textDark: "#fbfcf8",
        backgroundDark: "#030401",
        primaryDark: "#849b4b",
        secondaryDark: "#2b5a3e",
        accentDark: "#3d7f6e",
      },

      fontFamily: {
        logo: ["Abril Fatface", "Serif"],
      },
    },
  },
  plugins: ["tailwindcss-animate", require("tailwind-scrollbar")],
};
