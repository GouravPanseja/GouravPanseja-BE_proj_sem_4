/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xxs':'420px',
      'xbs':'500px',
      'xs': '560px',
      'sm': '640px', // Small screens, mobile phones
      'md': '768px', // Medium screens, tablets
      'lg': '1024px', // Large screens, laptops
      'xl': '1280px', // Extra large screens, desktops
      '2xl':'1536px', // Extra extra large screens, wide desktops
      'c1': '800px',
    },

  },
  plugins: [],
}