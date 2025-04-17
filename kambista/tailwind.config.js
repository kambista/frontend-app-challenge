/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,html}",
    "./components/**/*.{js,jsx,ts,tsx,html}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFDEDE",
        black: {
          DEFAULT: "#000",
        },
        gray: {
          DEFAULT: "#F7F7F7",
          800: "#434343",
        },
      },
      // fontFamily: {
      //   qlight: ["Quicksand-Light"],
      //   qregular: ["Quicksand-Regular"],
      //   qmedium: ["Quicksand-Medium"],
      //   qsemibold: ["Quicksand-SemiBold"],
      //   qbold: ["Quicksand-Bold"],
      // },
    },
  },
  plugins: [],
}