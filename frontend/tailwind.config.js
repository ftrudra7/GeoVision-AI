/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        planetary: {
          void: '#020408',
          abyss: '#030712',
          deep: '#050b18',
          surface: '#0a1124',
          panel: 'rgba(8, 15, 30, 0.72)',
          glass: 'rgba(12, 22, 45, 0.55)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-light': 'rgba(255, 255, 255, 0.15)',
          glow: 'rgba(56, 189, 248, 0.15)',
          accent: '#38bdf8',
          'accent-muted': 'rgba(56, 189, 248, 0.2)',
          navy: '#0b1938'
        }
      },
      fontFamily: {
        sans: ['"Aeonik Pro"', 'Aeonik', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}
