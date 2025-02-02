/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Circular",
        "Avenir Next Rounded",
        "Brandon Grotesque",
        "Airbnb Cereal VF",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
    extend: {
      screens: {
        "2xl": "1680px",
        "1xl": "1440px",
        "1xzl": "1435px",
        "1xxl": "1355px",
        "1xlx": "1280px",
        "1xll": "1200px",
        "1lg": "1124px",
        "1md": "956px",
        "1smd": "936px",
        "1smm": "824px",
        "1sm": "751px",
        "1xz": "744px",
        "1xsm": "620px",
        "1xs": "550px",
        "1xss": "480px",
        "1xsss": "400px",
      },
      boxShadow: {
        "3xl": "-1px 3.5px 5px 1px #CFCFD1",
        "2xl": "0 10px 20px rgba(0, 0, 0, 0.2)",
        AddGuestShadow: "-5px 0px 5px 0px #CFCFD1",
        checkOutShadow: "5px 0px 5px 0px #CFCFD1, -5px 0px 5px 0px #CFCFD1",
        checkInShadow: "5px 0px 5px 0px #CFCFD1, -5px 0px 5px 0px #CFCFD1",
        destinationShadow: "5px 0px 5px 0px #CFCFD1",
        priceCardShadow: "0px 6px 16px rgba(0, 0, 0, 0.12)",
        modalShadow: "0px 2px 12px rgba(0,0,0,0.15)",
        sliderShadow:
          "0 -5px 5px rgba(0,0,0,0.2),0 5px 5px #ffffff,inset 0 -20px 30px #ffffffe5,inset 0 10px 20px rgba(0,0,0,0.2)",
        sliderShadow2:
          " 0 -5px 5px rgba(255,255,255,0.4),inset 0 5px 3px rgba(255,255,255,0.8),inset 0 -5px 5px rgba(0,0,0,0.2),0 11px 18px rgba(0,0,0,0.18),0 -20px 30px rgba(255,255,255,0.8)",
        reviewShadow: "0px 6px 16px rgba(0, 0, 0, 0.12)",
      },
      colors: {
        pink: "#ff385c",
        "dark-pink": "#e63253",
        grey: "#717171",
        "grey-light": "#B3B3B3",
        "grey-light-50": "#cacaca",
        "grey-dim": "#DBDBDB",
        "shadow-gray": "#e6e6e6",
        "shadow-gray-light": "#f5f5f5",
        "border-color": "#b0b0b0",
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
          "0%": { height: "4.9rem" },
          "100%": { height: "var(--expanded-height)", "z-index": "10" },
        },
        collapse: {
          "0%": { height: "9.8rem" },
          "100%": { height: "4.9rem" },
        },
        shimmer: {
          "0%": { opacity: "40%" },
          "100%": { opacity: "100%" },
        },

        bgShadow: {
          "0%": { "background-color": "white" },
          "100%": { "background-color": "#e6e6e6" },
        },
        formBlur: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        slideInLeft: "slideInLeft 0.3s ease-in-out forwards",
        slideInRight: "slideInRight 0.3s ease-in-out forwards",
        expand: "expand 0.2s ease-in-out forwards",
        collapse: "collapse 0.2s  ease-in-out forwards",
        shimmer: "shimmer 1.5s infinite alternate",
        bgShadow: "bgShadow 0.3s ease-in-out forwards",
        formBlur: "formBlur 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addBase }) {
      addBase({
        ":root": {
          "--expanded-height": "14rem",
        },
        "@screen 1md": {
          ":root": {
            "--expanded-height": "11rem",
          },
        },
      });

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
