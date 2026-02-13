/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri-Regular'],
        'amiri-bold': ['Amiri-Bold'],
        quran: ['AlQuranIndoPak'],
        nastaliq: ['Mehr-Nastaliq'],
        uthmani: ['KFGQPCUthmanTahaNaskh-Bold'],
      },
    },
  },
  plugins: [],
};
