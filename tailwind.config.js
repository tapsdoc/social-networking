/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,ts}",
    "./libs/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      primary: {
        "50":"#eff6ff",
        "100":"#dbeafe",
        "200":"#bfdbfe",
        "300":"#93c5fd",
        "400":"#60a5fa",
        "500":"#3b82f6",
        "600":"#2563eb",
        "700":"#1d4ed8",
        "800":"#1e40af",
        "900":"#1e3a8a",
        "950":"#172554"
      }
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}

