/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#ebf5ff",
          100: "#d6eaff",
          600: "#1e40af",
          700: "#1d4ed8",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          700: "#374151",
          800: "#1f2937",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
