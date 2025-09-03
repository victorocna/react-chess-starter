module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        secondary: '#1e1e1e',
        accent: '#2976ff',
        tertiary: '#2e2e2e',
        grey: '#989898',
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
