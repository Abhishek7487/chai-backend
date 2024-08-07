/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#FF0000",
      secondary: "#000000",
      tertiary: "#191919",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      ubuntu: ["Ubuntu", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
