/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#02060a',
        panel: '#061019',
        'panel-elevated': 'rgba(10, 18, 28, 0.5)',
        primary: '#f5f7fa',
        secondary: '#91a4b8',
        accent: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['"Aeonik Pro"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
