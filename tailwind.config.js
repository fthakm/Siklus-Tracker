/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        secondary: "#607d8b",
        background: "#f5f7fa",
        surface: "#ffffff"
      },
      borderRadius: {
        'xl': '1rem'
      }
    },
  },
  plugins: [],
};
