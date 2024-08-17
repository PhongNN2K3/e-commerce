/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scrollbar: {
        width: "4px",
        height: "4px",
        trackColor: "gray-200",
        thumbColor: "gray-600",
      },
    },
  },
  plugins: [],
};
