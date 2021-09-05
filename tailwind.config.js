const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: colors.teal,
      },
      fontFamily: {
        roboto: "Roboto",
        poppins: "Poppins",
      },
      screens: {
        xs: "400px",
        "3sm": "450px",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
      backgroundColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
