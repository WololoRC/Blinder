const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      custom: ["Mitrl", 'Mitrl'],
      /* Add other font families if needed */
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      orange: colors.orange,
      pink: colors.pink,
      red: colors.red,
      blue: colors.blue,
      purple: colors.purple,
      ultrapink : '#FD3A73',
      brightpink: '#be185d',
      brightpink2: '#FDC5F5',
      whitep: '#F0E6EF',
      lightBlue: '#ADD8E6',
      indigo: "#4338ca",
      ultragray: "#424242",
      lightgray: "#cbd5e",
      purple_light: "#9370DB",
      purple_dark: "#4B0082",
      purple_medium: "#800080",
      greenlol: "#4ade80",
      Cardpink: "#fee2e2",
      tagpurple: "#f0abfc",
      simplegradient: "#E94058",
      redlol: "#f43f5e",
      orangelol: "#f5af19",
      orangelul: "#FF655B",
      thisblack: "#292929",
      epicgray: "#4E4E4E",
      crazygray: "#4E4E4E",
      epicpink: "#CF4265",
      epicblack: "#212121",
      fantasyli: "#7678ed",
      fantasyviolet: "#3d348b",

      black1: "#232027",
      black2: "#1A181B",
      black3: "#0E0E0E",

      black4: "#262626",

      pink2: "#cf4265",
      white2: "#fee2e2",

      pinkgradient1: "#FC599D",
      pinkgradient2: "#C159B6",
      bluegradient3: "#7C61B6",

      brightblack2: "#555251",
      white3: "#D7E1EC",
      bluechat: "#006ffd",
      brightblack: "#939090",
      

      red1: "#FF1F4A",
      purple1: "#DE00AA",

      purple2: "#CA0CF5",

      blue1: "#7000DE",

      blue2: "#3000F6",



      whitegr: "#F5F7FA",
    graygr2: "#B8C6DB",

       gradient: {
          'white-to-rpink': ['white', 'var(--rpink-2)'],
        },

    },
  },
  plugins: [require('daisyui')],
 
}
