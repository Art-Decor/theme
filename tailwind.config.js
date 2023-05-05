/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js,twig,css}",
    "./src/**/*.{html,twig,php}",
    "./templates/**/*.{html,js,twig}",
    "./wallsociety.theme",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          90: "#F5F4F5",
        },
      },
    },
  },
  plugins: [],
};
