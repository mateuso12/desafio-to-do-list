/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-100': '#F2F2F2',
        'gray-200': '#D9D9D9',
        'blue-300': '#337def',
        'gray-400': '#808080',
        'blue-500': '#001629',
        'blue-600': '#262626',
        'blue-700': '#002647',
        'purple-200': '#8284fa',
        'purple-500': '#5E60CE',
        'blue-200': '#4EA8DE',
        'blue-500': '#1E6F9F',
        'red-500': '#E25858'
      }
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    screens: {
      md:{ 'min':"736px", 'max': '1023px'},
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
