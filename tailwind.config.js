/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,jsx}",
    ],
    
    theme: {
      extend: {
        screens: {
          'xs': '320px',
          // => @media (min-width: 320px) { ... }
        },
        colors: {
          'primary-nav': '#222835',
          'secondary-nav': '#2b3342',
          'primary-body': '#121212',
        },
        width: {
          '90': '90%',
          '10' : '10%'
        },
        fontFamily: {
          "font-noto" : "Noto Sans Osmanya"
        },
      },
    },
    plugins: [],
  };