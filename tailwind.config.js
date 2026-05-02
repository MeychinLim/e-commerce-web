/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      keyframes: {
        "flash-red": {
          "0%, 100%": { backgroundColor: "transparent" },
          "20%, 80%": {
            backgroundColor: "rgb(254 226 226)",
            borderColor: "rgb(239 68 68)",
          },
          "40%, 60%": { transform: "translateX(-3px)" },
          "50%": { transform: "translateX(3px)" },
        },
      },
      animation: {
        "flash-red": "flash-red 0.4s ease-in-out",
      },
    },
  },
};

export default config;
