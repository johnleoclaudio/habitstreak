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
        // Gruvbox colors using CSS variables that automatically switch with dark mode
        'gruvbox-bg': 'rgb(var(--color-bg) / <alpha-value>)',
        'gruvbox-bg0': 'rgb(var(--color-bg0) / <alpha-value>)',
        'gruvbox-bg1': 'rgb(var(--color-bg1) / <alpha-value>)',
        'gruvbox-bg2': 'rgb(var(--color-bg2) / <alpha-value>)',
        'gruvbox-bg3': 'rgb(var(--color-bg3) / <alpha-value>)',
        'gruvbox-bg4': 'rgb(var(--color-bg4) / <alpha-value>)',
        'gruvbox-fg': 'rgb(var(--color-fg) / <alpha-value>)',
        'gruvbox-fg0': 'rgb(var(--color-fg0) / <alpha-value>)',
        'gruvbox-fg1': 'rgb(var(--color-fg1) / <alpha-value>)',
        'gruvbox-fg2': 'rgb(var(--color-fg2) / <alpha-value>)',
        'gruvbox-fg3': 'rgb(var(--color-fg3) / <alpha-value>)',
        'gruvbox-fg4': 'rgb(var(--color-fg4) / <alpha-value>)',
        
        // Accent colors (same for both modes)
        gruvbox: {
          red: {
            dim: '#cc241d',
            bright: '#fb4934',
          },
          green: {
            dim: '#98971a',
            bright: '#b8bb26',
          },
          yellow: {
            dim: '#d79921',
            bright: '#fabd2f',
          },
          blue: {
            dim: '#458588',
            bright: '#83a598',
          },
          purple: {
            dim: '#b16286',
            bright: '#d3869b',
          },
          aqua: {
            dim: '#689d6a',
            bright: '#8ec07c',
          },
          orange: {
            dim: '#d65d0e',
            bright: '#fe8019',
          },
          gray: {
            dim: '#928374',
            bright: '#a89984',
          },
        }
      }
    },
  },
  plugins: [],
}