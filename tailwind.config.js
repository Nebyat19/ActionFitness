/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{vue,html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'primary-red': '#ef212f',
        'primary-green': '#93b902',
        'accent-orange': '#c7621e',
        'accent-gold': '#af8b10',
        'black': '#000000',
        'light-green': '#c7fc00',
        'white': '#ffffff',
        // Dark mode colors
        'dark-primary-red': '#b71c1c',
        'dark-primary-green': '#689f38',
        'dark-accent-orange': '#8d6e63',
        'dark-accent-gold': '#6d4c41',
        'dark-black': '#121212',
        'dark-light-green': '#9e9d24',
        'dark-white': '#e0e0e0',
      },
    },
    fontFamily:{
    bebas: ["Bebas Neue", "sans-serif"],
    poppins: ["Poppins", "sans-serif"],
    cursive: ["Edu AU VIC WA NT Hand", 'cursive']
    
    }
  },
  plugins: [],
}

