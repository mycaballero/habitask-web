/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red:{
          '350' : '#F24855'
        },
        secondary: {
          '90': '#000C44',
        },
        tertiary: {
          '90': '#FEF3C7'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

