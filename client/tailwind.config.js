/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        wallpaper: "url('./src/img/adrien-olichon.jpg')",
      },
      colors: {
        'cool-grey': '#819dad',
        gold: '#896e36',
      },
    },
  },
  plugins: [],
};
