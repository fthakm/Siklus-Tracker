/** tailwind.config.js */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",   // biru utama
        secondary: "#607d8b", // abu-abu
        background: "#f5f7fa",
        surface: "#ffffff"
      },
      borderRadius: {
        'xl': '1rem'
      }
    }
  },
  plugins: []
};
