const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.svelte',
    './index.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        orange: colors.orange,
        emerald: colors.emerald,
        teal: colors.teal,
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
