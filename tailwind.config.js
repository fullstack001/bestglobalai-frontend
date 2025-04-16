/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      keyframes: {
        "grow-shrink": {
          "0%, 100%": { width: "20rem", height: "3rem" },
          "50%": { width: "24rem", height: "3.5rem" },
        },
      },
      animation: {
        "grow-shrink": "grow-shrink 2s ease-in-out infinite",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
