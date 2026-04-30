/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#07050f',
        abyss: '#0e0818',
        dusk: '#1a0f2e',
        twilight: '#2d1b5e',
        mystic: '#4a2c8a',
        amethyst: '#7c4dca',
        lavender: '#b794f4',
        gold: '#c9a84c',
        'gold-light': '#e8cc7e',
        'gold-dim': '#7d6420',
        ivory: '#f5f0e8',
        mist: '#c4b8d8',
        smoke: '#6b5f7e',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      animation: {
        'card-flip': 'cardFlip 0.7s ease-in-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'star-fall': 'starFall 1s ease-out forwards',
      },
      keyframes: {
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)', opacity: '0' },
          '50%': { transform: 'rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(201,168,76,0.3), 0 0 30px rgba(124,77,202,0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(201,168,76,0.6), 0 0 50px rgba(124,77,202,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        starFall: {
          '0%': { opacity: '0', transform: 'translateY(-30px) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c, #e8cc7e, #c9a84c)',
        'mystic-gradient': 'linear-gradient(135deg, #1a0f2e, #2d1b5e, #1a0f2e)',
        'card-back': 'linear-gradient(135deg, #1a0f2e 0%, #2d1b5e 50%, #1a0f2e 100%)',
      },
    },
  },
  plugins: [],
}
