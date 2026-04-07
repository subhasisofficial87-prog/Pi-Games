/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-pink': '#ff0080',
        'neon-magenta': '#ff00ff',
        'neon-green': '#00ff00',
        'neon-purple': '#b026ff',
        'dark-bg': '#0a0e27'
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff',
        'neon-pink': '0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 40px #ff0080',
        'neon-magenta': '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
