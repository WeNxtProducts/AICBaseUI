/** @type {import('tailwindcss').Config} */
export default {
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
 theme: {
  extend: {
   colors: {
    appBackGround: '#f3f6f9',
    fieldFocus: '#06a1b6',
   },
  },
 },
 plugins: [],
};
