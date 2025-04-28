/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat_400Regular'],
        montBold: ['Montserrat_700Bold'],
        montItalic: ['Montserrat_400Regular_Italic'],
      },
      colors: {
        primary: '#00E3C2',
        primaryLight: '#B2E7DF',
        secondary: '#060F26',
        secondaryLight: '#2D313D',
        secondaryUltraLight: '#606B89',
        informative: '#456DD3',
        informativeLight: '#D2E9FF',
        informativeUltraLight: '#E8EEF4',
        informativeDark: '#082774',
        success: '#05BE50',
        successLight: '#D9FFE8',
        warning: '#FF3D4A',
        warningLight: '#F1E1E4',
        ['k-gray-60']: '#686868',
        ['k-gray-40']: '#A7A7A7',
        ['k-gray-25']: '#E0E0E0',
        ['k-gray-21']: '#EEEDED',
        ['k-gray-20']: '#EFF0F6',
        ['k-gray-10']: '#F6F6F9',
        highlight: '##F9F0E9',
        highlightDark: '#7B3F0A',
      },
    },
  },
  plugins: [],
};
