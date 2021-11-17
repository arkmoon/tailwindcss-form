module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          light: '#ee3f98',
          DEFAULT: '#500b37',
          dark: '#2b0b50',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
