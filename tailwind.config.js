/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {},
    fontFamily: {
      sans: ["Poppins"],
    },
    extend: {
      colors: {
        pink: "#ff385c",
        grey: "#717171;",
      },
    },
  },
  plugins: [],
};
