/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Poppins"],
    },
    extend: {
      boxShadow: {
        "3xl": "-1px 3.5px 5px 1px #CFCFD1",
      },
      colors: {
        pink: "#ff385c",
        grey: "#717171;",
        "grey-light": "#B3B3B3",
        "grey-dim": "#DBDBDB",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newStyle = {
        ".border-blur": {
          "border-left-width": "10px",
          "border-right-width": "10px",
          "border-color": "transparent",
          "border-left-style": "inset",
          "border-right-style": "inset",
          "backdrop-filter": "blur(20px)",
          position: "absolute",
          // top: "0",
          // bottom: "0",
          left: "0",
          right: "0",
          /*  "border-image":
            "linear-gradient(to right, rgba(255, 255, 255, 0), #e5e7eb, rgba(255, 255, 255, 0)) 1", */
        },
      };

      addUtilities(newStyle);
    }),
  ],
};
