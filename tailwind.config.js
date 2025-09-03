module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#f5f5f5', // light background
        secondary: '#e0e0e0', // lighter surface
        accent: '#2976ff', // keep accent blue
        tertiary: '#f9f9f9', // white surface
      },
      fontFamily: {
        chess: '"Noto Chess", "Noto Sans", sans-serif',
      },
    },
  },
  content: [
    './components/**/*.jsx', //
    './chess/**/*.jsx',
    './pages/**/*.js',
  ],
};
