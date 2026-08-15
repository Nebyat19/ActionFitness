/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{vue,html,js}', './index.html'],
  theme: {
    extend: {
      colors: {
        'primary-red': '#ef212f',
        'primary-green': '#93b902',
        'accent-orange': '#c7621e',
        'accent-gold': '#af8b10',
        black: '#000000',
        'light-green': '#c7fc00',
        white: '#ffffff',
        // Dark mode colors
        'dark-primary-red': '#b71c1c',
        'dark-primary-green': '#689f38',
        'dark-accent-orange': '#8d6e63',
        'dark-accent-gold': '#6d4c41',
        'dark-black': '#121212',
        'dark-light-green': '#9e9d24',
        'dark-white': '#e0e0e0',
        // Admin dashboard tokens — a calm control-panel palette, distinct
        // from the public site's black/neon-green marketing look, tied to
        // the brand via the same accent green.
        admin: {
          canvas: '#F6F6F3',
          surface: '#FFFFFF',
          ink: '#1C1E1B',
          muted: '#6B6F66',
          subtle: '#9A9D93',
          line: '#E6E6E0',
          sidebar: '#15171A',
          'sidebar-line': '#262A2E',
          'sidebar-hover': '#20232A',
          'sidebar-text': '#B7BAB2',
          accent: '#93B902',
          'accent-ink': '#1C1E1B',
          'accent-dark': '#7A9902',
          danger: '#DC2626',
          'danger-surface': '#FEF2F2'
        }
      }
    },
    fontFamily: {
      bebas: ['Bebas Neue', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      cursive: ['Edu AU VIC WA NT Hand', 'cursive'],
      anton: ['Anton', 'sans-serif'],
      robot: ["Roboto Condensed", "sans-serif"]
    }
  },
  plugins: []
}
