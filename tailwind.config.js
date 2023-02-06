/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      ss: { max: "300000px" },
      xl: { max: "1200px" },
      lg: { max: "820px" },
      md: { max: "786px" },
      sm: { max: "550px" },
      xsm: { raw: "786px" },
    },
  },
  plugins: [],
}
