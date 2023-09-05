/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gotham: ["var(--font-gotham)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  variants: {},
  plugins: ["@tailwindcss/forms"],
  darkMode: "class",
};
