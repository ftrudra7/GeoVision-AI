/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#05080D',
        panel: '#0B111A',
        'panel-elevated': '#101823',
        primary: '#ffffff',
        secondary: '#94a3b8',
        accent: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
