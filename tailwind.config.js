/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "gray-10": "#F6F6F9",
        "gray-23": "#E0E4EB",
        "gray-25": "#E0E0E0",
        "gray-30": "#CCCCCC",
        "gray-40": "#A7A7A7",
        "gray-60": "#686868",
        primary: "#00E3C2",
        "primary-dark": "#060F26",
        "informative-blue-dark": "#082774",
        "informative-blue-light": "#D2E9FF",
        "warning-light": "#F9F0E9",
        "warning-dark": "#7B3F0A",
      },
      fontFamily: {
        "montserrat-light": ["Montserrat_300Light"],
        "montserrat-regular": ["Montserrat_400Regular"],
        "montserrat-medium": ["Montserrat_500Medium"],
        "montserrat-semibold": ["Montserrat_600SemiBold"],
        "montserrat-bold": ["Montserrat_700Bold"],
        "montserrat-black": ["Montserrat_900Black"],
        "montserrat-italic": ["Montserrat_400Regular_Italic"],
      },
      boxShadow: {
        coupon: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
      },
    },
  },
  plugins: [],
};
