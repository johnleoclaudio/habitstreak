/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tokyo Night colors using CSS variables that automatically switch with dark mode
        'tokyo-bg': 'rgb(var(--color-bg) / <alpha-value>)',
        'tokyo-bg0': 'rgb(var(--color-bg0) / <alpha-value>)',
        'tokyo-bg1': 'rgb(var(--color-bg1) / <alpha-value>)',
        'tokyo-bg2': 'rgb(var(--color-bg2) / <alpha-value>)',
        'tokyo-bg3': 'rgb(var(--color-bg3) / <alpha-value>)',
        'tokyo-fg': 'rgb(var(--color-fg) / <alpha-value>)',
        'tokyo-fg2': 'rgb(var(--color-fg2) / <alpha-value>)',
        'tokyo-fg3': 'rgb(var(--color-fg3) / <alpha-value>)',
        'tokyo-fg4': 'rgb(var(--color-fg4) / <alpha-value>)',
        'tokyo-blue': 'rgb(var(--color-blue) / <alpha-value>)',
        'tokyo-green': 'rgb(var(--color-green) / <alpha-value>)',
        'tokyo-yellow': 'rgb(var(--color-yellow) / <alpha-value>)',
        'tokyo-red': 'rgb(var(--color-red) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}