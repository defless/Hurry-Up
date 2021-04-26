module.exports = {
  purge: ['./pages/*.{js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'depeche': '#ED1C2F',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
