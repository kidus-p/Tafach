/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gloria: ['Gloria Hallelujah', 'sans-serif'],
        Dancing:[ "Dancing Script", "cursive"],
        Yellowtail:["Yellowtail", 'sans-serif']
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
    
      animation: {
        slideIn: 'slideIn 0.8s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
        vibrate: {
          '0%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(-2px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(-5deg)' },
        },
      },
      animation: {
        vibrate: 'vibrate 0.1s linear infinite',
        rotate : 'rotate 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

