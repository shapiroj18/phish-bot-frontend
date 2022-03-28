const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // descriptions by https://encycolorpedia.com
      // color scheme: https://aco-viewer.appspot.com/5b59b6e3ded3f7dc6418356bfd6c275a
      'medium-dark-magenta': '#654c60',
      'medium-light-green-cyan': '#93a198',
      'very-light-orange': '#eddcd1',
      'medium-light-orange': '#f58962',
      'very-light-brown': '#f9f6f3',
      'medium-light-cyan': '#97cec7',
      'medium-light-brown': '#fbc780'
    },
    fontFamily: {
      butler: ["Butler"]
    }
  },
  plugins: [],
}
