module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#FF6923',
        'brand-light': '#FFECD0',
        'brand-dark': '#c73f00',
        'by-black': '#131517',
        'by-light-black': '#292D31',
      }
    },
  },
  plugins: [],
}