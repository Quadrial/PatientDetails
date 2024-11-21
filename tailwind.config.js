/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-cyan': '#01F0D0',
        'custom-light-gray': '#F6F7F8',
        'custom-gray-light': '#C8CCD414',
        'custom-gray-light-2': '#C8CCD41A',
        'custom-gray-light-3': '#C8CCD4',
        'custom-dark-blue': '#072635',
        'custom-light-gray-2': '#E3E4E6',
        'custom-pink': '#FFE6F1',
        'custom-light-blue': '#E0F3FA',
        'custom-light-pink': '#FFE6E9',
        'custom-black': '#000000',
        'custom-lavender': '#F4F0FE',
        'custom-light-lavender': '#CBC8D4',
        'custom-purple': '#7E6CAB',
        'custom-light-purple': '#8C6FE6',
        'custom-pink-light': '#C26EB4',
        'custom-rose': '#E66FD2',
        'custom-light-teal': '#D8FCF7',
        'custom-gray': '#EDEDED',
        'custom-gray-dark': '#707070',
      }
    },
  },
  plugins: [],
}