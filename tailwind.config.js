/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Assure-toi que JSX est inclus
    "./public/index.html" // ✅ Inclure l'index HTML si nécessaire
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};