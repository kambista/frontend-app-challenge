/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        kambista: {
          cyan: "#5BE2C4",
          navy: "#0A1F33",
          mint: "#9EEFD9",
          muted: "#686868",
          screen: "#F3F4F6",
          border: "#E5E7EB",
          infoBg: "#E8F4FC",
          infoText: "#1E3A5F",
          registerBtn: "#5BE2C4",
        },
      },
    },
  },
  plugins: [],
}