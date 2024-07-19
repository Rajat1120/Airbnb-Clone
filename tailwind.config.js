/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: [
        "Airbnb Cereal VF",
        "Circular",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
    extend: {
      boxShadow: {
        "3xl": "-1px 3.5px 5px 1px #CFCFD1",
        "2xl": "0 10px 20px rgba(0, 0, 0, 0.2)",
        AddGuestShadow: "-5px 0px 5px 0px #CFCFD1",
        checkOutShadow: "5px 0px 5px 0px #CFCFD1, -5px 0px 5px 0px #CFCFD1",
        checkInShadow: "5px 0px 5px 0px #CFCFD1, -5px 0px 5px 0px #CFCFD1",
        destinationShadow: "5px 0px 5px 0px #CFCFD1",
        sliderShadow:
          "0 -5px 5px rgba(0,0,0,0.2),0 5px 5px #ffffff,inset 0 -20px 30px #ffffffe5,inset 0 10px 20px rgba(0,0,0,0.2)",
        sliderShadow2:
          " 0 -5px 5px rgba(255,255,255,0.4),inset 0 5px 3px rgba(255,255,255,0.8),inset 0 -5px 5px rgba(0,0,0,0.2),0 11px 18px rgba(0,0,0,0.18),0 -20px 30px rgba(255,255,255,0.8)",
      },
      colors: {
        pink: "#ff385c",
        "dark-pink": "#e63253",
        grey: "#717171;",
        "grey-light": "#B3B3B3",
        "grey-light-50": "#cacaca",
        "grey-dim": "#DBDBDB",
        "shadow-gray": "#e6e6e6",
        "shadow-gray-light": "#f5f5f5",
      },
      gridTemplateColumns: {
        "four-col": "repeat(4, minmax(10rem,18.87rem))",
      },
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-3.2rem)", opacity: "1" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(3.2rem)", opacity: "1" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        expand: {
          "0%": { height: "0rem" },
          "100%": { height: "5rem" },
        },
        collapse: {
          "0%": { height: "5rem" },
          "100%": { height: "0rem" },
        },
      },
      animation: {
        slideInLeft: "slideInLeft 0.3s ease-in-out forwards",
        slideInRight: "slideInRight 0.3s ease-in-out forwards",
        expand: "expand 0.3s ease-in-out forwards",
        collapse: "collapse 0.3s  ease-in-out forwards",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".border-blur": {
          "border-left-width": "10px",
          "border-right-width": "10px",
          "border-color": "transparent",
          "border-left-style": "inset",
          "border-right-style": "inset",
          "backdrop-filter": "blur(20px)",
          position: "absolute",
          left: "0",
          right: "0",
        },
        ".remove-scrollbar": {
          "::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar in WebKit browsers
          },
        },
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        ".cursor-disable": {
          opacity: "40%",
          cursor: "not-allowed",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
