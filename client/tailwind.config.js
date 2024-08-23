/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#1e1e1e",
        "darker-gray": "#0f0f0f",
        "light-gray": "#2d2d2d",
        "medium-gray": "#3c3c3c",
        "input-bg": "#c0c0c0",
      },
    },
  },
  plugins: [],
};
