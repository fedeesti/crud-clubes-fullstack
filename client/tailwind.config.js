/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        manrope: ['Manrope'],
      },
      backgroundImage: {
        wallpaper: "url('./src/img/adrien-olichon.jpg')",
        'banner-team': 'url(./src/img/stadium-banner.jpg)',
      },
      colors: {
        'cool-grey': '#819dad',
        gold: '#896e36',
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fit, 1fr)',
      },
      gridTemplateColumns: {
        'team-view': 'minmax(150px, 21%) 1fr',
      },
      boxShadow: {
        section: '20px 20px 60px #d9d5d5, -20px -20px 60px #ffffff',
      },
    },
  },
  plugins: [],
};
