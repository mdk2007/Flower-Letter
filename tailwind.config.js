/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#f9f6f0',
          200: '#f4ede4',
          300: '#ece3d4',
          400: '#ded0be',
          500: '#c5b49f',
        },
        blush: {
          50: '#fdf8f7',
          100: '#fbf0ed',
          200: '#f7dcd5',
          300: '#eec2b7',
          400: '#e09e90',
          500: '#cf7767',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e7ede9',
          200: '#d0ddd4',
          300: '#adbfb3',
          400: '#7c9082',
          500: '#5c7263',
          600: '#46574c',
        },
        vintage: {
          ink: '#2d2724',
          muted: '#685e57',
          border: '#e4dacf',
          gold: '#c5a059',
          seal: '#962b32',
          sealDark: '#751a21',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
