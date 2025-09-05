module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#f5f5f5',
        secondary: '#e0e0e0',
        accent: '#2976ff',
        tertiary: '#222',
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
