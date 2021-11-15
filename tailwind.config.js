module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          light: '#ee3f98',
          DEFAULT: '#500b37',
          dark: '#1d0d23',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
