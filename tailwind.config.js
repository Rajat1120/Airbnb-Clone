/** @type {import('tailwindcss').Config} */
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
  plugins: [],
};
