// const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('./images/logistics-bg.jpg')",
      },
      backgroundColor: {
        packagebg: '#C7D2FE',
        userbg: '#EDE9FE',
        btnbg: '#C4B5FD',
        mainbg: '#FDFEFF',
        comp: 'E2E4E7',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};