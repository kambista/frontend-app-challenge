/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary': '#00e3c2',
        'primary-ultra-light': '#b2e7df',
        'secondary': '#060f26',
        'secondary-light': '#2d313d',
        'secondary-lighter': '#606b89',
        'gray-60': '#686868',
        'gray-40': '#a7a7a7',
        'gray-25': '#e0e0e0',
        'gray-21': '#eeeded',
        'gray-20': '#eff0f6',
        'gray-10': '#f6f6f9',
        'green': '#05be50',
        'green-lighter': '#d9ffe8',
        'red': '#ff3d4a',
        'red-lighter': '#f1e1e4',
        'blue': '#456dd3',
        'blue-lighter': '#d2e9ff',
        'blue-ultra-light': '#e8eef4',
      }
    },
  },
  plugins: [],
}