/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {},
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
      },
    },
  },
  plugins: [],
};
