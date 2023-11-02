/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          1: '#cccc00',
          2: '#ff00ff',
          3: '#00ff00',
          4: '#dedb4f',
        }
      },
      container: {
        center: true,
        padding: '2rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1024px',
        '2xl': '1280px',
      }
    },
  },
  plugins: [],
}
