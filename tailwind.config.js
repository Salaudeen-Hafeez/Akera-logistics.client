// const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('./images/bg-image.jpg')",
      },
      backgroundColor: {
        packagebg: '#C7D2FE',
        userbg: '#EDE9FE',
        btnbg: '#C4B5FD',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
