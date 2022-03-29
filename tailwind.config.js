const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // descriptions by https://encycolorpedia.com
      // colors from https://imagecolorpicker.com/en
      'magenta': '#765c71',
      'medium-dark-magenta': '#4d3649',
      'medium-light-red-orange': '#f98660',
      'medium-light-brown': '#ffc156',
      'light-brown': '#fee3b8',
      'off-white': '#fffeff',
    },
    fontFamily: {
      butler: ["Butler"],
      butler_bold: ["Butler-Bold"]
    }
  },
  plugins: [],
}
