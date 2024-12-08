const { light } = require('@mui/material/styles/createPalette');
const { color } = require('framer-motion');

// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBackgroungd:'#333',
        lightBackground:'#fff',
      }
      // Si quieres extender la paleta de colores o cualquier otra cosa, lo haces aquí
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-filters'), 
  ],
}
