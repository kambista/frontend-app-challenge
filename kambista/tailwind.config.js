/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,html}",
    "./components/**/*.{js,jsx,ts,tsx,html}",
    "./config/**/*.{js,jsx,ts,tsx,html}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#05e2c3",
          200: "#5BE2C4",
          500: "#05e2c3",
        },
        black: {
          DEFAULT: "#000",
        },
      },
      fontFamily: {
        mthin: ["Montserrat-Thin"],
        mextralight: ["Montserrat-ExtraLight"],
        mlight: ["Montserrat-Light"],
        mregular: ["Montserrat-Regular"],
        mmedium: ["Montserrat-Medium"],
        msemibold: ["Montserrat-SemiBold"],
        mbold: ["Montserrat-Bold"],
        mextrabold: ["Montserrat-ExtraBold"],
        mblack: ["Montserrat-Black"],
      },
    },
  },
  plugins: [],
}