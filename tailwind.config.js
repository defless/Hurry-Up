module.exports = {
  purge: [
    './pages/*.{js}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'depeche': '#ED1C2F',
    }),
    fontFamily: {
       'sans': ['ui-sans-serif', 'system-ui'],
       'serif': ['ui-serif', 'Georgia'],
       'mono': ['ui-monospace', 'SFMono-Regular'],
       'raleway': ['Raleway'],
       'logo': ['Satisfy'],
      },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
