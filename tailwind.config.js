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
        "2xl": "0 10px 20px rgba(0, 0, 0, 0.2)",
        AddGuestShadow: "-5px 0px 5px 0px #CFCFD1",
        checkOutShadow: "5px 0px 5px 0px #CFCFD1, -5px 0px 5px 0px #CFCFD1",
        checkInShadow: "5px 0px 5px 0px #CFCFD1, -5px 0px 5px 0px #CFCFD1",

        destinationShadow: "5px 0px 5px 0px #CFCFD1",

        /*  "inset-shadow": {
          "-10px-0px-9px-1px": "#EFEFEF",
          "10px-0px-10px-1px": "#EFEFEF",
        }, */
      },
      colors: {
        pink: "#ff385c",
        "dark-pink": "#e63253",
        grey: "#717171;",
        "grey-light": "#B3B3B3",
        "grey-dim": "#DBDBDB",
        "shadow-gray": "#e6e6e6",
        "shadow-gray-light": "#f5f5f5",
      },
      gridTemplateColumns: {
        "four-col": "repeat(4, minmax(10rem,18.87rem))",
      },
      backFaceVisibility: ["hidden"],
      keyframes: {
        moveUp: {
          "0%": { transform: "translateY(0rem)" },
          "100%": { transform: "translateY(-5rem)" },
        },
        moveDown: {
          "0%": { transform: "translateY(0rem)" },
          "100%": { transform: "translateY(5rem)" },
        },
        moveUpHouse: {
          "0%": { transform: "translateY(0rem)" },
          "100%": { transform: "translateY(-5rem)" },
        },
        moveDownHouse: {
          "0%": { transform: "translateY(-5rem)" },
          "100%": { transform: "translateY( 0rem)" },
        },

        moveAfterUp: {
          "0%": { transform: "translateY(9rem)" },
          "100%": { transform: "translateY(4.5rem)" },
        },
        moveAfterDown: {
          "0%": { transform: "translateY( 4.5rem)" },
          "100%": { transform: "translateY(9.9rem)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-3.5rem)", opacity: "1" },

          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(3.5rem)", opacity: "1" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        moveUp: "moveUp 0.2s  forwards ",
        moveDown: "moveDown 0.2s   forwards ",
        moveUpHouse: "moveUpHouse 0.2s  forwards ",
        moveDownHouse: "moveDownHouse   0.2s forwards  ",
        moveAfterUp: "moveAfterUp 0.2s forwards ",
        moveAfterDown: "moveAfterDown 0.2s forwards ",
        slideInLeft: "slideInLeft 0.3s ease-in-out forwards ",
        slideInRight: "slideInRight 0.3s ease-in-out forwards ",
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
        ".remove-scrollbar": {
          "::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar in WebKit browsers
          },
        },
      };

      addUtilities(newStyle);
    }),
  ],
};
