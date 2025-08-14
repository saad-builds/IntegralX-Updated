/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#ec4899',
        'brand-yellow': '#facc15',
        'brand-purple': '#a855f7',
        'brand-dark-blue': '#1e3a8a',
        'brand-bg-start': '#37075a',
        'brand-bg-end': '#111827',
      },
      backgroundImage: {
        'gradient-button': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-services-bg': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'gradient-card-border': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
