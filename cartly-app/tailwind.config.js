/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:"#8FA31E",
        secondary:"#556B2F",
        accent:"#C6D870",
        bg:"#EFF5D2",
      },
      fontFamily:{
        poppins: ["Poppins_400Regular"],
        poppinsSemi: ["Poppins_600SemiBold"],
        poppinsBold: ["Poppins_700Bold"],
      }
    },
  },
  plugins: [],
}