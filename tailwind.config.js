module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: theme => ({
        "home":"url('/images/background.png')",
      })
    },
    fontFamily:{
      montserrat: ['Montserrat', 'sans-serif'],
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
