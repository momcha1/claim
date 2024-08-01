/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainboard: "#1C2761",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom, #1C2761 65%, transparent 65%)", // Custom gradient
      },
      clipPath: {
        slanted: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
      },
    },
  },
  plugins: [],
};
